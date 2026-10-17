/** Render/update functions share the application lifecycle and delegated events.
 * Dependencies are read on each call so role/language transitions cannot capture stale state. */
export function createUiDialogs(dependencies) {
  function infoButton(topic, module, label) {
    const { scenarios, knowledge, escape } = dependencies;

    return `<button type="button" class="info-button" data-info="${topic}" data-info-case="${scenarios.find((item) => knowledge[item.id] === module)?.id || 'new_home'}" aria-label="${escape(label)}" title="${escape(label)}"><span aria-hidden="true">i</span></button>`;
  }
  function openInfo(topic, caseId) {
    const {
      knowledge,
      experience,
      escape,
      evidence,
      t,
      dialog,
      petRoute,
      state,
    } = dependencies;

    const module = knowledge[caseId];
    if (!module) return;
    const copy = experience.info;
    let title, content;
    if (topic === 'business') {
      const item = module.business;
      title = copy.businessLabel;
      content = `<p>${escape(item.text)}</p><h3>${escape(copy.metricsLabel)}</h3><ul>${item.proposedMetrics.map((metric) => `<li>${escape(metric)}</li>`).join('')}</ul><p class="fine-print">${escape(item.limitation)}</p>${evidence(item, module)}`;
    } else if (topic === 'pricing') {
      title = copy.pricingLabel;
      content = `<p>${escape(knowledge.new_home.preventionIncentive.copy.assumptionsText)}</p>${evidence(knowledge.new_home.preventionIncentive, knowledge.new_home)}`;
    } else if (topic === 'deduction') {
      title = copy.deductionLabel;
      content = `<p>${escape(knowledge.new_home.presentation.calculationScope)}</p><ul>${knowledge.new_home.rules.leakageDeduction.bands.map((band) => `<li>${band.minAge}–${band.maxAge === null ? '∞' : band.maxAge} ${t('common.years')}: ${band.deductionPercent} %</li>`).join('')}</ul>${evidence(knowledge.new_home.insights.deduction, knowledge.new_home)}${evidence(knowledge.new_home.insights.scope, knowledge.new_home)}${evidence(knowledge.new_home.rules.pipeRepair, knowledge.new_home)}${evidence(knowledge.new_home.rules.technicalLifespan, knowledge.new_home)}`;
    } else if (topic === 'policy') {
      title = copy.policyTitle;
      content = `<p>${escape(copy.policyText)}</p><p class="fine-print">${escape(copy.policyLimits)}</p>${evidence(knowledge.new_home.preventionIncentive, knowledge.new_home)}`;
    } else return;
    document.getElementById('dialog-content').innerHTML =
      `<h2 id="dialog-title">${escape(title)}</h2><p class="confirmation" id="dialog-confirmation">${escape(copy.notice)}</p>${content}`;
    dialog.dataset.case = caseId === 'pet' ? 'pet-info' : 'info';
    dialog.dataset.route = caseId === 'pet' ? petRoute(state) : '';
    dialog.showModal();
  }
  function openScenarioAction(actionId) {
    const {
      state,
      knowledge,
      petAction,
      buildPetPacket,
      buildBabyPacket,
      escape,
      petRoute,
      evidence,
      dialog,
    } = dependencies;

    const caseId = state.activeCase;
    const module = knowledge[caseId];
    const action =
      caseId === 'pet'
        ? petAction(state, actionId)
        : module.actions.find((item) => item.id === actionId);
    if (!action) return;
    const packet =
      caseId === 'pet' ? buildPetPacket(state) : buildBabyPacket(state);
    document.getElementById('dialog-content').innerHTML =
      `<h2 id="dialog-title">${escape(action.title)}</h2><p class="confirmation" id="dialog-confirmation">${escape(action.confirmation)}</p>${caseId === 'pet' && petRoute(state) !== 'contact' ? `<p class="limitation">${escape(module.insights[petRoute(state)].text)}</p>` : ''}<p>${escape(action.text)}</p><label class="packet-label" for="scenario-packet">${escape(module.presentation.packetLabel)}</label><textarea id="scenario-packet" rows="10" readonly></textarea><p class="fine-print">${escape(action.limitation)}</p>${evidence(action, module)}${action.id === 'intro-help' ? `<button type="button" class="primary-button" data-use-pet-intro>${escape(module.introOffer.confirmLabel)}</button><p id="intro-use-status" role="status"></p>` : ''}`;
    document.getElementById('scenario-packet').value = packet;
    dialog.dataset.case = caseId;
    dialog.dataset.route = caseId === 'pet' ? petRoute(state) : '';
    dialog.showModal();
  }
  function openPolicyQuestions() {
    const {
      experience,
      escape,
      buildPolicyQuestions,
      state,
      dialog,
      petRoute,
    } = dependencies;

    const copy = experience.policyContext;
    document.getElementById('dialog-content').innerHTML =
      `<h2 id="dialog-title">${escape(copy.questionsTitle)}</h2><p class="confirmation" id="dialog-confirmation">${escape(copy.notSent)}</p><label class="packet-label" for="policy-packet">${escape(copy.packetLabel)}</label><textarea id="policy-packet" readonly rows="10"></textarea>`;
    document.getElementById('policy-packet').value =
      buildPolicyQuestions(state);
    dialog.dataset.case = 'policy';
    dialog.dataset.route = state.activeCase === 'pet' ? petRoute(state) : '';
    dialog.showModal();
  }
  return { infoButton, openInfo, openScenarioAction, openPolicyQuestions };
}
