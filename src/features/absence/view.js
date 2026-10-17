/** Render/update functions share the application lifecycle and delegated events.
 * Dependencies are read on each call so role/language transitions cannot capture stale state. */
export function createAbsenceView(dependencies) {
  function buildAbsenceDraft(state) {
    const { knowledge, absenceTrip, visibleTasks, displayDate } = dependencies;

    const module = knowledge.absence;
    const context = state.cases.absence;
    const trip = absenceTrip(state);
    const tasks = trip
      ? visibleTasks(state, 'absence').filter(
          (task) =>
            task.delegatable &&
            context.assignedTaskIds.has(task.id) &&
            !context.completedTaskIds.has(task.id),
        )
      : [];
    if (!trip)
      return { taskIds: [], text: module.presentation.invalidTripLabel };
    if (!tasks.length)
      return {
        taskIds: [],
        text: `${module.delegation.emptyText}\n\n${module.presentation.notSent}`,
      };
    const intro = module.delegation.introTemplate
      .replace('{neighborName}', context.neighborName)
      .replace('{departureDate}', displayDate(trip.departure))
      .replace('{returnDate}', displayDate(trip.returnDate))
      .replace('{durationDays}', trip.durationDays);
    return {
      taskIds: tasks.map((task) => task.id),
      text: [
        intro,
        '',
        ...tasks.map((task, index) => `${index + 1}. ${task.delegationText}`),
        '',
        module.delegation.closingText,
        module.presentation.notSent,
      ].join('\n'),
    };
  }
  function absenceTopics() {
    const {
      knowledge,
      escape,
      caseTaskCards,
      insightDetails,
      topicInsight,
      evidence,
    } = dependencies;

    const module = knowledge.absence;
    return `<section class="card topic-card" aria-labelledby="water-heading"><h3 id="water-heading">${escape(module.presentation.waterTitle)}</h3><div class="topic-tasks">${caseTaskCards('absence', ['water-plan', 'appliance-taps'])}</div><p class="limitation">${escape(module.insights.water.limitation)}</p><div id="absence-water">${insightDetails(module.insights.water, module)}</div></section>
      <section class="card topic-card" id="absence-winter" aria-labelledby="heating-heading"><h3 id="heating-heading">${escape(module.presentation.heatingTitle)}</h3><div class="topic-tasks">${caseTaskCards('absence', ['heating'])}</div>${topicInsight(module.insights.winter, module)}</section>
      <section class="card topic-card" aria-labelledby="departure-heading"><h3 id="departure-heading">${escape(module.presentation.departureTitle)}</h3><div class="topic-tasks">${caseTaskCards('absence', ['caretaker', 'locks', 'mailbox', 'travel-documents'])}</div>${evidence(module.insights.preparation, module)}${evidence(module.rules.priorityEscalation, module)}</section>`;
  }
  function renderAbsence() {
    const {
      knowledge,
      workspace,
      caseHeading,
      escape,
      audienceCopy,
      state,
      t,
      choiceControl,
      progressCard,
      icon,
      evidence,
      insightDetails,
    } = dependencies;

    const module = knowledge.absence;
    const range = module.controls.find(
      (control) => control.id === 'durationDays',
    );
    const action = module.actions[0];
    workspace.innerHTML = `${caseHeading(module)}<div class="workspace-grid adaptive-workspace"><div class="stack"><section class="card" aria-labelledby="context-heading"><div class="card-heading"><h3 id="context-heading">${escape(audienceCopy(state).contextTitle)}</h3><span class="badge">${t('common.exampleProfile')}</span></div><p class="persona" id="absence-persona"></p><p class="trip-dates" id="absence-dates"></p>${choiceControl('absence', module.controls[0])}<div class="field"><label for="absence-duration">${escape(range.label)}</label><div class="range-value"><output class="year-value" id="absence-duration-value" for="absence-duration"></output><span>${t('common.days')}</span></div><input id="absence-duration" data-field="durationDays" type="range" min="${range.min}" max="${range.max}" step="${range.step}" value="${state.cases.absence.durationDays}" aria-describedby="help-duration"><div class="range-ends" aria-hidden="true"><span>${range.min} ${t('common.days')}</span><span>${range.max} ${t('common.days')}</span></div><p class="field-help" id="help-duration">${escape(range.help)}</p></div><p class="fine-print">${escape(module.demoNotice)}</p>${progressCard(module)}<p id="absence-preparation" class="fine-print" role="status"></p><p class="fine-print">${escape(module.presentation.priorityNotice)}</p></section></div>
      <div class="stack"><div id="case-tasks" class="stack">${absenceTopics()}</div>
      <section class="card draft-card" aria-labelledby="draft-heading"><h3 id="draft-heading">${escape(module.delegation.title)}</h3><p class="fine-print">${escape(module.presentation.notSent)}</p><label class="packet-label" for="absence-message">${escape(module.presentation.manualCopyLabel)}</label><textarea id="absence-message" rows="7" readonly></textarea><div class="draft-actions"><button type="button" class="primary-button" id="copy-absence">${escape(action.label)} ${icon('book')}</button><p id="copy-status" class="fine-print" role="status"></p></div>${evidence(module.delegation, module)}${evidence(action, module)}</section>
      <section class="card supporting-notes">${insightDetails(module.insights.consequences, module)}<details class="topic-details"><summary>${escape(module.presentation.scopeLabel)}</summary>${evidence(module.rules.buildingMonitoring, module)}${evidence(module.rules.insufficientBaseHeat, module)}</details></section></div></div>`;
    updateAbsenceView();
  }
  function updateAbsenceView(tasksChanged = false) {
    const {
      knowledge,
      state,
      absenceTrip,
      displayDate,
      absencePriority,
      priorityLabels,
      readiness,
      clipboard,
      updateCaseProgress,
      arrangeWorkspace,
    } = dependencies;

    const module = knowledge.absence;
    const context = state.cases.absence;
    const trip = absenceTrip(state);
    document.getElementById('absence-duration-value').textContent =
      context.durationDays;
    document.getElementById('absence-persona').textContent =
      module.presentation.tripTemplate
        .replace('{season}', module.presentation.tripLabels[context.season])
        .replace('{durationDays}', context.durationDays);
    document.getElementById('absence-dates').textContent = trip
      ? `${displayDate(trip.departure)} – ${displayDate(trip.returnDate)}`
      : module.presentation.invalidTripLabel;
    if (tasksChanged)
      document.getElementById('case-tasks').innerHTML = absenceTopics();
    document.getElementById('absence-winter').hidden =
      context.season !== 'winter';
    document.getElementById('absence-water').hidden =
      !trip ||
      context.durationDays <=
        module.rules.extendedAbsence.durationDaysGreaterThan;
    document.querySelectorAll('[data-priority]').forEach((element) => {
      const task = module.tasks.find(
        (item) => item.id === element.dataset.priority,
      );
      const priority = absencePriority(state, task);
      element.textContent = priorityLabels[priority];
      element.className = `badge priority-${priority}`;
    });
    const ready = readiness(state, 'absence');
    document.getElementById('absence-preparation').textContent =
      ready.completed === ready.total
        ? module.insights.preparation.completedLabel
        : module.insights.preparation.pendingLabel;
    const draft = buildAbsenceDraft(state);
    document.getElementById('absence-message').value = draft.text;
    document.getElementById('copy-absence').disabled = !draft.taskIds.length;
    document.getElementById('copy-status').textContent = draft.taskIds.length
      ? ''
      : module.actions[0].emptyLabel;
    clipboard.revision++;
    updateCaseProgress();
    if (tasksChanged) arrangeWorkspace();
  }
  async function copyAbsence() {
    const { state, clipboard, knowledge } = dependencies;

    const draft = buildAbsenceDraft(state);
    if (!draft.taskIds.length) return;
    const revision = clipboard.revision;
    let copied = false;
    try {
      await navigator.clipboard.writeText(draft.text);
      copied = true;
    } catch {
      /* Selectable text remains available. */
    }
    if (state.activeCase !== 'absence' || revision !== clipboard.revision)
      return;
    const action = knowledge.absence.actions[0];
    document.getElementById('copy-status').textContent = copied
      ? action.confirmation
      : `${action.fallbackLabel} ${knowledge.absence.presentation.notSent}`;
    if (!copied) {
      const textarea = document.getElementById('absence-message');
      textarea.focus();
      textarea.select();
    }
  }
  return {
    buildAbsenceDraft,
    absenceTopics,
    renderAbsence,
    updateAbsenceView,
    copyAbsence,
  };
}
