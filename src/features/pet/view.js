/** Render/update functions share the application lifecycle and delegated events.
 * Dependencies are read on each call so role/language transitions cannot capture stale state. */
export function createPetView(dependencies) {
  function buildPetPacket(state) {
    const { knowledge, audienceCopy, petRoute } = dependencies;

    const module = knowledge.pet;
    const context = state.cases.pet;
    const duration =
      module.controls
        .find((control) => control.id === 'duration')
        .options.find((option) => option.value === context.duration)?.label ||
      module.rules.observations.unknownResultLabel;
    const labels = (entries, ids, fallback) =>
      entries
        .filter((entry) => (ids || []).includes(entry.id))
        .map((entry) => entry.label)
        .join('; ') || fallback;
    return [
      module.persona,
      audienceCopy(state, 'pet').packetContext,
      `${module.presentation.symptomsLabel}: ${labels(module.symptoms, context.symptomIds, module.packet.emptySymptomsLabel)}`,
      `${module.presentation.emergencyLabel}: ${labels(module.emergencySigns, context.emergencySignIds, module.packet.unselectedEmergencyLabel)}`,
      `${module.presentation.durationLabel}: ${duration}`,
      ...module.observations.map(
        (item) =>
          `${item.label}: ${item.options.find((option) => option.value === context.observations?.[item.id])?.label || module.rules.observations.unknownResultLabel}`,
      ),
      module.packet.unknownBackgroundLabel,
      module.packet.temperatureLabel,
      '',
      `${module.presentation.routeLabel}: ${module.insights[petRoute(state)].title}`,
      module.insights[petRoute(state)].text,
      '',
      module.packet.completedTasksLabel,
      ...module.tasks.map(
        (task) =>
          `${context.completedTaskIds.has(task.id) ? '[x]' : '[ ]'} ${task.title}`,
      ),
      '',
      module.presentation.notSent,
    ].join('\n');
  }
  function petChecks(entries, field) {
    const { state, escape, evidence, knowledge } = dependencies;

    return `<div class="check-options">${entries.map((item) => `<div><label class="option-checkbox"><input type="checkbox" data-pet-field="${field}" value="${item.id}" ${state.cases.pet[field].includes(item.id) ? 'checked' : ''}><span>${escape(item.label)}</span></label>${evidence(item, knowledge.pet)}</div>`).join('')}</div>`;
  }
  function renderPet() {
    const {
      knowledge,
      workspace,
      caseHeading,
      escape,
      audienceCopy,
      state,
      t,
      progressCard,
      choiceControl,
      caseTaskCards,
      evidence,
      icon,
    } = dependencies;

    const module = knowledge.pet;
    workspace.innerHTML = `${caseHeading(module)}<section class="card route-card" id="pet-route" aria-live="polite" aria-labelledby="pet-route-heading"></section>
      <div class="workspace-grid adaptive-workspace"><div class="stack"><section class="card"><div class="card-heading"><h3>${escape(audienceCopy(state).contextTitle)}</h3><span class="badge">${t('common.exampleProfile')}</span></div><p class="persona">${escape(module.persona)}</p><p class="fine-print">${escape(module.demoNotice)}</p>${progressCard(module)}</section></div>
      <div class="stack">
      <section class="card topic-card"><fieldset class="field"><legend>${escape(module.controls[0].label)}</legend><p class="field-help">${escape(module.controls[0].help)}</p>${petChecks(module.symptoms, 'symptomIds')}</fieldset>${choiceControl('pet', module.controls[2])}<p class="preparation-label">${escape(audienceCopy(state).tasksTitle || module.presentation.tasksTitle)}</p><div class="topic-tasks">${caseTaskCards('pet', ['symptom-timeline'])}</div></section>
      <section class="card topic-card"><fieldset class="field"><legend>${escape(module.controls[1].label)}</legend><p class="field-help">${escape(module.controls[1].help)}</p>${petChecks(module.emergencySigns, 'emergencySignIds')}</fieldset><p class="preparation-label">${escape(audienceCopy(state).tasksTitle || module.presentation.tasksTitle)}</p><div class="topic-tasks">${caseTaskCards('pet', ['notice-urgency'])}</div></section>
      <section class="card topic-card" aria-labelledby="observations-heading"><h3 id="observations-heading">${escape(module.presentation.observationsTitle)}</h3>${module.observations.map((item) => `<div class="field"><label for="observation-${item.id}">${escape(item.label)}</label><select id="observation-${item.id}" data-observation="${item.id}">${item.options.map((option) => `<option value="${option.value}" ${state.cases.pet.observations[item.id] === option.value ? 'selected' : ''}>${escape(option.label)}</option>`).join('')}</select>${evidence(item, module)}${item.id === 'waterRetention' ? `<p class="preparation-label">${escape(audienceCopy(state).tasksTitle || module.presentation.tasksTitle)}</p><div class="topic-tasks">${caseTaskCards('pet', ['water-observation'])}</div>` : ''}</div>`).join('')}</section>
      <section class="card draft-card"><h3>${escape(module.packet.title)}</h3><p class="fine-print">${escape(module.presentation.notSent)}</p><p class="preparation-label">${escape(audienceCopy(state).tasksTitle || module.presentation.tasksTitle)}</p><div class="topic-tasks">${caseTaskCards('pet', ['background'])}</div><details class="packet-preview"><summary>${escape(module.presentation.packetLabel)}</summary><label class="sr-only" for="pet-packet">${escape(module.presentation.packetLabel)}</label><textarea id="pet-packet" rows="8" readonly></textarea></details>${evidence(module.packet, module)}</section>
</div></div><div class="pet-guidance-feedback" id="pet-guidance-feedback" hidden><div><strong id="pet-feedback-heading"></strong><p class="fine-print">${escape(module.presentation.guidancePrompt)}</p></div><button type="button" class="primary-button" data-show-pet-guidance>${escape(module.presentation.showGuidanceLabel)} ${icon('arrow')}</button></div>`;
    updatePetView();
  }
  function updatePetView() {
    const {
      knowledge,
      petRoute,
      state,
      petServiceAccess,
      petPrimaryAction,
      petIntroAvailable,
      escape,
      evidence,
      icon,
      dialog,
      updateCaseProgress,
    } = dependencies;

    const module = knowledge.pet;
    const route = petRoute(state);
    const container = document.getElementById('pet-route');
    const access = petServiceAccess(state);
    const viewKey = `${route}:${access}:${!!state.cases.pet.introContactUsed}`;
    if (container.dataset.viewKey !== viewKey) {
      const insight = module.insights[route];
      const action = petPrimaryAction(state);
      const insured = access === 'included' && route !== 'emergency';
      const intro = petIntroAvailable(state);
      const used =
        access === 'notIncluded' &&
        state.cases.pet.introContactUsed &&
        route !== 'emergency';
      const boundary = module.insights.alwaysVisibleBoundary;
      const title = insured
        ? route === 'urgent'
          ? module.presentation.insuredUrgentTitle
          : module.presentation.insuredContactTitle
        : insight.title;
      container.dataset.route = route;
      container.dataset.access = access;
      container.dataset.viewKey = viewKey;
      container.innerHTML = `<h3 id="pet-route-heading">${escape(title)}</h3><p>${escape(insight.text)}</p>${insured ? `<p class="service-access-text">${escape(module.service.access.includedText)}</p>` : ''}${intro ? `<div class="intro-offer" data-intro-offer><h4>${escape(module.introOffer.title)}</h4><p>${escape(module.introOffer.text)}</p><p class="fine-print">${escape(module.introOffer.notice)}</p>${evidence(module.introOffer, module)}</div>` : ''}${used ? `<p class="intro-used fine-print" data-intro-used>${escape(module.introOffer.usedText)}</p>` : ''}<p class="fine-print">${escape(insight.limitation)}</p><button type="button" class="primary-button" data-action="${action.id}">${escape(action.label)} ${icon('arrow')}</button>${insured ? `<details class="topic-details"><summary>${escape(module.presentation.channelDetailsLabel)}</summary><p class="fine-print">${escape(module.presentation.serviceHoursTemplate.replace('{weekday}', module.service.availability.weekdayChatVideo).replace('{weekend}', module.service.availability.weekendChatVideo).replace('{otherTimes}', module.service.availability.otherTimes))}</p><p class="fine-print">${escape(module.service.access.demoNotice)}</p>${evidence(module.service, module)}</details>` : ''}${evidence(insight, module)}${evidence(module.rules.routing, module)}<div class="emergency-boundary" aria-labelledby="boundary-heading"><h4 id="boundary-heading">${escape(boundary.title)}</h4><p class="fine-print">${escape(boundary.text)}</p><p class="fine-print">${escape(boundary.limitation)}</p>${evidence(boundary, module)}</div>`;
    }
    if (
      dialog.open &&
      ['pet', 'pet-info', 'policy'].includes(dialog.dataset.case) &&
      dialog.dataset.route !== route
    ) {
      dialog.close();
      const heading = document.getElementById('pet-route-heading');
      heading.tabIndex = -1;
      heading.focus();
    }
    document.getElementById('pet-packet').value = buildPetPacket(state);
    if (dialog.open && dialog.dataset.case === 'pet')
      document.getElementById('scenario-packet').value = buildPetPacket(state);
    document.getElementById('pet-feedback-heading').textContent =
      document.getElementById('pet-route-heading').textContent;
    document.getElementById('pet-guidance-feedback').dataset.route = route;
    syncPetGuidanceFeedback();
    updateCaseProgress();
  }
  function syncPetGuidanceFeedback() {
    const { state, petRoute } = dependencies;

    if (state.activeCase !== 'pet') return;
    const heading = document.getElementById('pet-route-heading');
    if (!heading) return;
    const bounds = heading.getBoundingClientRect();
    const show =
      petRoute(state) !== 'contact' &&
      (bounds.bottom < 0 || bounds.top > window.innerHeight);
    document.getElementById('pet-guidance-feedback').hidden = !show;
    document.body.classList.toggle('pet-guidance-visible', show);
  }
  return {
    buildPetPacket,
    petChecks,
    renderPet,
    updatePetView,
    syncPetGuidanceFeedback,
  };
}
