/** Render/update functions share the application lifecycle and delegated events.
 * Dependencies are read on each call so role/language transitions cannot capture stale state. */
export function createBabyView(dependencies) {
  function buildBabyPacket(state) {
    const { knowledge, audienceCopy, applicableTasks } = dependencies;

    const module = knowledge.first_baby;
    const condition = module.controls
      .find((item) => item.id === 'equipmentCondition')
      .options.find(
        (option) => option.value === state.cases.first_baby.equipmentCondition,
      )?.label;
    return [
      module.persona,
      audienceCopy(state, 'first_baby').packetContext,
      `${module.presentation.conditionLabel}: ${condition}`,
      '',
      module.actions[0].text,
      '',
      ...applicableTasks(state, 'first_baby').map(
        (task) =>
          `${state.cases.first_baby.completedTaskIds.has(task.id) ? '[x]' : '[ ]'} ${task.title}`,
      ),
      '',
      module.actions[0].confirmation,
    ].join('\n');
  }
  function babyTopics() {
    const {
      knowledge,
      state,
      visibleTasks,
      insightDetails,
      escape,
      caseTaskCards,
    } = dependencies;

    const module = knowledge.first_baby;
    const context = state.cases.first_baby;
    const categories =
      context.category === 'all'
        ? ['car', 'sleep', 'home']
        : [context.category];
    return categories
      .map((category) => {
        const tasks = visibleTasks(state, 'first_baby')
          .filter((task) => task.category === category)
          .map((task) => task.id);
        const notes =
          category === 'car'
            ? insightDetails(module.insights.approval, module)
            : category === 'sleep'
              ? module.standards
                  .map((item) => insightDetails(item, module))
                  .join('')
              : '';
        return `<section class="card topic-card" aria-labelledby="baby-${category}-heading"><h3 id="baby-${category}-heading">${escape(module.presentation.topicTitles[category])}</h3><div class="topic-tasks">${caseTaskCards('first_baby', tasks)}</div>${notes}</section>`;
      })
      .join('');
  }
  function renderBaby() {
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
      insightCard,
      hasPolicy,
      icon,
      evidence,
    } = dependencies;

    const module = knowledge.first_baby;
    workspace.innerHTML = `${caseHeading(module)}<div class="workspace-grid adaptive-workspace"><div class="stack"><section class="card"><div class="card-heading"><h3>${escape(audienceCopy(state).contextTitle)}</h3><span class="badge">${t('common.exampleProfile')}</span></div><p class="persona">${escape(module.persona)}</p>${module.controls.map((control) => choiceControl('first_baby', control)).join('')}<p class="fine-print persona-notice">${escape(module.demoNotice)}</p>${progressCard(module)}</section></div><div class="stack"><div id="case-tasks" class="stack">${babyTopics()}</div><section class="card supporting-notes" id="baby-insights"></section>${insightCard(hasPolicy(state, 'unborn-child') ? module.insights.existingInsurance : module.insights.insurance, module, `insurance-note ${hasPolicy(state, 'unborn-child') ? 'insurance-owned' : 'insurance-acquisition'}`)}<section class="card"><h3>${escape(module.actions[0].title)}</h3><p class="insight-text">${escape(module.actions[0].text)}</p><button type="button" class="primary-button" data-action="prepare-questions">${escape(module.actions[0].label)} ${icon('arrow')}</button>${evidence(module.actions[0], module)}</section></div></div>`;
    updateBabyView();
  }
  function updateBabyView(tasksChanged = false) {
    const {
      knowledge,
      state,
      insightDetails,
      updateCaseProgress,
      arrangeWorkspace,
    } = dependencies;

    const module = knowledge.first_baby;
    const context = state.cases.first_baby;
    if (tasksChanged)
      document.getElementById('case-tasks').innerHTML = babyTopics();
    document.getElementById('baby-insights').innerHTML = insightDetails(
      context.equipmentCondition === 'used'
        ? module.insights.usedEquipment
        : module.insights.newEquipment,
      module,
    );
    updateCaseProgress();
    if (tasksChanged) arrangeWorkspace();
  }
  return { buildBabyPacket, babyTopics, renderBaby, updateBabyView };
}
