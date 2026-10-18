export function createUiWorkspace(dependencies) {
  function caseHeading(module) {
    const { escape, state, audienceCopy, t, infoButton, experience } =
      dependencies;

    return `<div class="workspace-heading"><div class="workspace-title"><h2 id="scenario-title">${escape(module.title)}</h2><p class="case-intro" data-audience-copy="${state.audience}">${escape(audienceCopy(state).caseIntro)}</p></div><div class="heading-tools"><span class="small-label">${t('common.fictionalExample')} · ${module.referenceYear}</span>${infoButton('business', module, experience.info.businessLabel)}</div></div>`;
  }
  function choiceControl(caseId, control) {
    const { escape, state } = dependencies;

    return `<fieldset class="field" aria-describedby="help-${control.id}"><legend>${escape(control.label)}</legend><div class="segmented flexible-options">${control.options.map((option) => `<label><input type="radio" name="${caseId}-${control.id}" data-field="${control.id}" value="${escape(option.value)}" ${state.cases[caseId][control.id] === option.value ? 'checked' : ''}><span>${escape(option.label)}</span></label>`).join('')}</div><p class="field-help" id="help-${control.id}">${escape(control.help)}</p></fieldset>`;
  }
  function insightCard(item, module, extraClass = '') {
    const { escape, evidence } = dependencies;

    return `<section class="card ${extraClass}"><h3>${escape(item.title || item.label)}</h3>${item.text ? `<p class="insight-text">${escape(item.text)}</p>` : ''}<p class="fine-print">${escape(item.limitation)}</p>${evidence(item, module)}</section>`;
  }
  function progressCard(module) {
    const { escape, audienceCopy, state } = dependencies;

    return `<section class="progress-card context-progress" aria-labelledby="case-progress-heading"><div class="progress-header"><h3 id="case-progress-heading">${escape(audienceCopy(state).progressTitle || module.presentation.progressTitle)}</h3><output id="case-progress-count" aria-live="polite"></output></div><progress id="case-progress" aria-labelledby="case-progress-heading"></progress><p class="fine-print">${escape(module.presentation.progressNotice)}</p></section>`;
  }
  function updateCaseProgress() {
    const { readiness, state, t } = dependencies;

    const ready = readiness(state, state.activeCase);
    document.getElementById('case-progress-count').textContent =
      `${ready.completed}/${ready.total} ${t('tasks.done')}`;
    const progress = document.getElementById('case-progress');
    progress.max = ready.total || 1;
    progress.value = ready.completed;
    document.getElementById(`nav-progress-${state.activeCase}`).textContent =
      `${ready.completed}/${ready.total} ${t('tasks.done')}`;
  }
  function caseTaskCards(caseId, taskIds = null) {
    const {
      knowledge,
      visibleTasks,
      state,
      absencePriority,
      escape,
      priorityLabels,
      t,
      evidence,
    } = dependencies;

    const module = knowledge[caseId];
    return (
      visibleTasks(state, caseId)
        .filter((task) => !taskIds || taskIds.includes(task.id))
        .map((task) => {
          const complete = state.cases[caseId].completedTaskIds.has(task.id);
          const priority =
            caseId === 'absence' ? absencePriority(state, task) : task.priority;
          const assignment =
            caseId === 'absence' && task.delegatable
              ? `<label class="assignment"><input type="checkbox" data-assign="${task.id}" ${state.cases.absence.assignedTaskIds.has(task.id) ? 'checked' : ''} ${complete ? 'disabled' : ''}>${escape(module.presentation.assignLabel)}</label>`
              : '';
          return `<article class="task inline-task" data-complete="${complete}"><label class="task-toggle"><input type="checkbox" data-task="${task.id}" ${complete ? 'checked' : ''}><span>${escape(task.title)}</span></label><div class="task-body"><p class="task-why">${escape(task.why)}</p><div class="task-meta"><span class="badge priority-${priority}" data-priority="${task.id}">${escape(priorityLabels[priority])}</span><span class="complete-label" ${complete ? '' : 'hidden'}>${t('tasks.complete')}</span></div>${assignment}${caseId === 'pet' ? `<p class="fine-print">${escape(task.limitation)}</p>` : ''}${evidence(task, module)}</div></article>`;
        })
        .join('') ||
      `<p class="fine-print">${escape(module.presentation.emptyTasksLabel || '')}</p>`
    );
  }
  function topicInsight(item, module) {
    const { escape, evidence } = dependencies;

    return `<div class="topic-insight">${item.text ? `<p class="insight-text">${escape(item.text)}</p>` : ''}<p class="fine-print">${escape(item.limitation)}</p>${evidence(item, module)}</div>`;
  }
  function insightDetails(item, module) {
    const { escape } = dependencies;

    return `<details class="topic-details"><summary>${escape(item.title || item.label)}</summary>${topicInsight(item, module)}</details>`;
  }
  return {
    caseHeading,
    choiceControl,
    insightCard,
    progressCard,
    updateCaseProgress,
    caseTaskCards,
    topicInsight,
    insightDetails,
  };
}
