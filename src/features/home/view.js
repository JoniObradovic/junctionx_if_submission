/** Render/update functions share the application lifecycle and delegated events.
 * Dependencies are read on each call so role/language transitions cannot capture stale state. */
export function createHomeView(dependencies) {
  function pricingCard(module) {
    const {
      audienceCopy,
      state,
      escape,
      infoButton,
      experience,
      percent,
      evidence,
    } = dependencies;

    const config = module.preventionIncentive;
    const audience = audienceCopy(state, 'new_home');
    const copy = {
      ...config.copy,
      title: audience.priceTitle,
      intro: audience.priceIntro,
    };
    return `<section class="card pricing-card" aria-labelledby="pricing-heading" aria-describedby="pricing-concept pricing-limitation">
      <p class="eyebrow" id="pricing-concept">${escape(copy.conceptLabel)}</p>
      <div class="section-title"><h3 id="pricing-heading" tabindex="-1">${escape(copy.title)}</h3>${infoButton('pricing', module, experience.info.pricingLabel)}</div><p class="pricing-intro">${escape(copy.intro)}</p>
      <div id="pricing-result"><p class="small-label" id="annual-price-label">${escape(copy.projectedLabel)}</p><div class="annual-price"><output id="annual-price" aria-labelledby="annual-price-label"></output><span>${escape(copy.perYear)}</span></div>
        <div class="pricing-saving"><span>${escape(copy.savingLabel)}</span><strong><span id="prevention-saving"></span> ${escape(copy.perYear)}</strong></div>

        <p class="fine-print pricing-count">${escape(copy.eligibleCountLabel)} <strong id="pricing-eligible-count"></strong> · ${escape(copy.capLabel)} <strong id="pricing-cap"></strong></p>
      </div><p class="limitation" id="pricing-unavailable" hidden>${escape(copy.unavailableLabel)}</p>
      <p class="sr-only" role="status" id="pricing-announcement" aria-live="polite"></p>
      <p class="pricing-verification">${escape(copy.verificationNotice)}</p><p class="fine-print" id="pricing-limitation">${escape(config.limitation)}</p>
      <details class="pricing-assumptions"><summary>${escape(copy.assumptionsLabel)}</summary><dl class="pricing-breakdown"><div><dt>${escape(copy.baseLabel)}</dt><dd id="base-annual-price"></dd></div><div><dt>${escape(copy.bundleLabel)} <span id="bundle-rate"></span></dt><dd id="bundle-saving"></dd></div><div class="pricing-subtotal"><dt>${escape(copy.afterBundleLabel)}</dt><dd id="after-bundle-price"></dd></div><div><dt>${escape(copy.preventionLabel)} <span id="prevention-rate"></span></dt><dd id="prevention-discount"></dd></div></dl><p class="fine-print">${escape(copy.assumptionsText)}</p><ul class="pricing-actions">${config.eligibleActions
        .filter((action) => action.policyId === config.policyId)
        .map(
          (action) =>
            `<li><span>${escape(module.tasks.find((task) => task.id === action.taskId).title)}<span class="small-label" data-pricing-status="${escape(action.taskId)}"></span></span><strong>${escape(copy.taskBenefitTemplate.replace('{percent}', percent(action.discountBps)))}</strong></li>`,
        )
        .join(
          '',
        )}</ul><p class="fine-print">${escape(copy.preparationNotice)}</p><p class="fine-print">${escape(copy.verificationPlan)}</p></details>
      ${evidence(config, module, copy.evidenceLabel)}<p class="fine-print pricing-separation">${escape(copy.deductionNotice)}</p>
    </section>`;
  }
  function pricingFeedback(module) {
    const { escape, icon } = dependencies;

    const copy = module.preventionIncentive.copy;
    return `<div class="pricing-feedback" id="pricing-feedback" hidden><div><span class="small-label">${escape(copy.feedbackLabel)}</span><strong id="pricing-feedback-price"></strong><span class="fine-print" id="pricing-feedback-saving"></span></div><button type="button" class="primary-button" data-show-pricing>${escape(copy.showCalculationLabel)} ${icon('arrow')}</button></div>`;
  }
  function updatePricingView(showFeedback = false) {
    const { knowledge, state, calculateHomePrice, money, percent } =
      dependencies;

    const config = knowledge.new_home.preventionIncentive;
    const completed = state.cases.new_home.completedTaskIds;
    const result = calculateHomePrice(state);
    document.getElementById('pricing-feedback').hidden =
      !showFeedback || !result;
    document.body.classList.toggle(
      'pricing-feedback-visible',
      showFeedback && !!result,
    );
    const policyPrice = document.getElementById('policy-price');
    if (policyPrice)
      policyPrice.textContent = result
        ? `${money(result.projectedAnnualCents)} ${config.copy.perYear}`
        : config.copy.unavailableLabel;
    document.getElementById('pricing-result').hidden = !result;
    document.getElementById('pricing-unavailable').hidden = !!result;
    document.querySelectorAll('[data-pricing-status]').forEach((element) => {
      element.textContent = completed.has(element.dataset.pricingStatus)
        ? config.copy.completedLabel
        : config.copy.incompleteLabel;
    });
    if (!result) {
      document.getElementById('pricing-announcement').textContent =
        config.copy.unavailableLabel;
      return;
    }
    const values = {
      'annual-price': money(result.projectedAnnualCents),
      'prevention-saving': money(result.preventionSavingCents),
      'base-annual-price': money(result.baseAnnualCents),
      'bundle-rate': `${percent(result.bundleDiscountBps)} %`,
      'bundle-saving': `−${money(result.bundleSavingCents)}`,
      'after-bundle-price': money(result.afterBundleCents),
      'prevention-rate': `${percent(result.preventionDiscountBps)} %`,
      'prevention-discount': `−${money(result.preventionSavingCents)}`,
      'pricing-eligible-count': `${result.completedActionCount}/${result.eligibleActionCount}`,
      'pricing-cap': `${percent(result.preventionCapBps)} %`,
    };
    Object.entries(values).forEach(([id, value]) => {
      document.getElementById(id).textContent = value;
    });
    document.getElementById('pricing-feedback-price').textContent =
      `${values['annual-price']} ${config.copy.perYear}`;
    document.getElementById('pricing-feedback-saving').textContent =
      config.copy.feedbackSavingTemplate.replace(
        '{saving}',
        values['prevention-saving'],
      );
    document.getElementById('pricing-announcement').textContent =
      config.copy.announcementTemplate
        .replace('{price}', values['annual-price'])
        .replace('{saving}', values['prevention-saving']);
  }
  function publishedBenefitsCard(module) {
    const { escape, visibleBenefits, state, evidence } = dependencies;

    const benefits = module.publishedBenefits;
    return `<section class="card reference-benefits" aria-labelledby="benefits-heading"><h3 id="benefits-heading">${escape(benefits.title)}</h3><p class="fine-print">${escape(benefits.notice)}</p>${visibleBenefits(
      state,
    )
      .map(
        (item) =>
          `<details class="reference-benefit" data-benefit="${escape(item.id)}"><summary>${escape(item.title)}</summary><p>${escape(item.text)}</p><p class="fine-print">${escape(item.limitation)}</p>${evidence(item, module)}</details>`,
      )
      .join('')}</section>`;
  }
  function claimsGuidanceCard(module) {
    const { escape, evidence } = dependencies;

    const guide = module.claimsGuidance;
    return `<section class="card claims-guidance" aria-labelledby="claims-guidance-heading"><h3 id="claims-guidance-heading">${escape(guide.title)}</h3><p class="limitation" id="claim-success-evidence">${escape(guide.successNotice)}</p><p class="fine-print">${escape(guide.limitation)}</p>${guide.items.map((item) => `<details class="reference-benefit"><summary>${escape(item.title)}</summary><p>${escape(item.text)}</p>${evidence(item, module)}</details>`).join('')}</section>`;
  }
  function renderTasks(module, taskIds = module.tasks.map((task) => task.id)) {
    const { state, percent, escape, priorityLabels, t, evidence, icon } =
      dependencies;

    const home = state.cases.new_home;
    return taskIds
      .map((id) => module.tasks.find((task) => task.id === id))
      .filter(Boolean)
      .map((task) => {
        if (task.id === 'professional-review')
          return homePipeTask(module, task);
        const completed = home.completedTaskIds.has(task.id);
        const action = module.actions.find((item) => item.id === task.actionId);
        const incentive = module.preventionIncentive;
        const benefit = incentive.eligibleActions.find(
          (item) =>
            item.taskId === task.id && item.policyId === incentive.policyId,
        );
        const benefitLabel = benefit
          ? incentive.copy.taskBenefitTemplate.replace(
              '{percent}',
              percent(benefit.discountBps),
            )
          : incentive.copy.preparationLabel;
        return `<article class="task inline-task" id="task-${task.id}" data-complete="${completed}"><label class="task-toggle"><input type="checkbox" data-task="${task.id}" ${completed ? 'checked' : ''}><span>${escape(task.title)}</span></label><div class="task-body"><p class="task-why">${escape(task.why)}</p><div class="task-meta"><span class="badge ${task.priority === 'high' ? 'priority-high' : ''}">${escape(priorityLabels[task.priority])}</span><span class="badge ${benefit ? 'incentive-badge' : ''}">${escape(benefitLabel)}</span><span class="complete-label" ${completed ? '' : 'hidden'}>${t('tasks.complete')}</span></div>${evidence(task, module)}${action ? `<button type="button" class="primary-button" data-action="${action.id}">${escape(action.label)} ${icon('arrow')}</button>` : ''}</div></article>`;
      })
      .join('');
  }
  function homePipeTask(module, task) {
    const { state, escape, t, infoButton, experience, evidence, icon } =
      dependencies;

    const home = state.cases.new_home;
    const [pipeControl, surfaceControl] = module.controls;
    const complete = home.completedTaskIds.has(task.id);
    return `<article class="task inline-task pipe-task" id="task-${task.id}" data-complete="${complete}"><label class="task-toggle"><input type="checkbox" data-task="${task.id}" ${complete ? 'checked' : ''}><span>${escape(module.presentation.pipeTaskTitle)}</span></label><div class="task-body"><p class="task-why">${escape(module.presentation.pipeTaskHelp)}</p>
      <div class="field"><label for="pipework-year">${escape(pipeControl.label)}</label><div class="range-value"><output class="year-value" id="pipework-value" for="pipework-year"></output><span id="pipework-age"></span></div><input type="range" id="pipework-year" min="${pipeControl.min}" max="${pipeControl.max}" step="${pipeControl.step}" value="${home.lastKnownPipeworkYear}" aria-describedby="pipework-help"><p id="pipework-help" class="field-help">${escape(pipeControl.help)}</p><label class="unknown-year"><input type="checkbox" id="unknown-pipework-year" ${home.pipeworkYear === null ? 'checked' : ''}>${escape(module.presentation.unknownYearLabel)}</label></div>
      <div class="inline-result" role="status"><div><span>${escape(module.presentation.resultLabel)}</span><output id="deduction-percent" aria-label="${t('home.leakageDeduction')}"></output><p class="fine-print" id="deduction-context"></p></div>${infoButton('deduction', module, experience.info.deductionLabel)}</div>
      <fieldset class="field" aria-describedby="surface-help"><legend>${escape(surfaceControl.label)}</legend><div class="segmented">${surfaceControl.options.map((option) => `<label><input type="radio" name="surface-year" value="${option.value}" ${option.value === home.surfaceYear ? 'checked' : ''}><span>${escape(option.label)}</span></label>`).join('')}</div><p id="surface-help" class="field-help">${escape(surfaceControl.help)}</p><p id="surface-text" class="task-why"></p></fieldset>
      <div class="task-meta"><span class="badge">${escape(module.preventionIncentive.copy.preparationLabel)}</span><span class="complete-label" ${complete ? '' : 'hidden'}>${t('tasks.complete')}</span></div>${evidence(task, module)}<button type="button" class="primary-button" data-action="plumbing-help">${escape(module.actions[0].label)} ${icon('arrow')}</button></div></article>`;
  }
  function renderHome() {
    const {
      knowledge,
      workspace,
      caseHeading,
      escape,
      audienceCopy,
      state,
      icon,
    } = dependencies;

    const module = knowledge.new_home;
    workspace.innerHTML = `${caseHeading(module)}<div class="workspace-grid home-workspace"><div class="stack"><section class="card home-summary" aria-labelledby="context-heading"><p class="small-label">${escape(module.presentation.homeLabel)}</p><h3 id="context-heading">${escape(audienceCopy(state).contextTitle)}</h3><p class="next-task-title" id="home-next-title"></p><p class="insight-text" id="home-next-reason" role="status"></p><p class="fine-print" id="home-surface-summary"></p><button class="secondary-button" type="button" id="home-next-button" data-show-home-task>${escape(module.presentation.nextActionLabel)} ${icon('arrow')}</button><section class="progress-card context-progress" aria-labelledby="progress-heading"><div class="progress-header"><h3 id="progress-heading">${escape(audienceCopy(state).tasksTitle || module.presentation.tasksTitle)}</h3><output id="progress-count" aria-live="polite"></output></div><progress id="home-progress" aria-labelledby="progress-heading"></progress><p class="fine-print">${escape(module.presentation.progressNotice)}</p></section></section>${pricingCard(module)}</div>
      <section class="card home-task-card" aria-labelledby="tasks-heading"><h3 id="tasks-heading">${escape(audienceCopy(state).tasksTitle || module.presentation.tasksTitle)}</h3><p class="fine-print">${escape(module.presentation.prioritiesNotice)}</p><div class="topic-tasks">${renderTasks(module, ['professional-review', 'main-valve', 'kitchen-leaks', 'floor-drain'])}</div></section></div><div class="support-grid">${publishedBenefitsCard(module)}${state.audience === 'customer' ? claimsGuidanceCard(module) : ''}</div>${pricingFeedback(module)}`;
    updateHomeView();
    updateProgress();
    updatePricingView();
  }
  function updateHomeView() {
    const { state, knowledge, homeGuidance, t } = dependencies;

    const home = state.cases.new_home;
    const module = knowledge.new_home;
    const { result, nextTask } = homeGuidance(state);
    document.getElementById('pipework-value').textContent = result
      ? home.pipeworkYear
      : t('common.unknown');
    document.getElementById('pipework-year').disabled =
      home.pipeworkYear === null;
    document.getElementById('pipework-age').textContent = result
      ? `${result.age} ${t('home.yearsOld')} ${module.referenceYear}`
      : `${t('home.referenceYear')} ${module.referenceYear}`;
    document.getElementById('deduction-percent').textContent = result
      ? `${result.deductionPercent} %`
      : '—';
    document.getElementById('deduction-context').textContent = result
      ? module.insights.deduction.limitation
      : module.insights.deduction.unknownLabel;
    document.getElementById('surface-text').textContent =
      home.surfaceYear === module.defaults.surfaceYear
        ? module.insights.surface.originalText
        : module.insights.surface.renovatedText;
    document.getElementById('home-next-title').textContent = nextTask
      ? nextTask.id === 'professional-review'
        ? module.presentation.pipeTaskTitle
        : nextTask.title
      : module.presentation.allDoneTitle;
    document.getElementById('home-next-reason').textContent = !nextTask
      ? module.presentation.allDoneText
      : !result
        ? module.presentation.missingYearText
        : (result.deductionPercent
            ? module.presentation.deductionText
            : module.presentation.zeroDeductionText
          )
            .replace('{year}', home.pipeworkYear)
            .replace('{percent}', result.deductionPercent);
    document.getElementById('home-surface-summary').textContent =
      module.presentation.surfaceSummary.replace('{year}', home.surfaceYear);
    const button = document.getElementById('home-next-button');
    button.hidden = !nextTask;
    button.dataset.taskTarget = nextTask?.id || '';
  }
  function updateProgress() {
    const { readiness, state, t } = dependencies;

    const ready = readiness(state, 'new_home');
    document.getElementById('progress-count').textContent =
      `${ready.completed}/${ready.total} ${t('tasks.done')}`;
    const progress = document.getElementById('home-progress');
    progress.max = ready.total;
    progress.value = ready.completed;
    document.getElementById('nav-progress-new_home').textContent =
      `${ready.completed}/${ready.total} ${t('tasks.done')} · ${t('home.ageDeductions')}`;
  }
  function buildHomePacket(state) {
    const { knowledge, audienceCopy, t } = dependencies;

    const module = knowledge.new_home;
    const home = state.cases.new_home;
    const controls = module.controls;
    const action = module.actions[0];
    const lines = [
      module.persona,
      audienceCopy(state, 'new_home').packetContext,
      `${controls[0].label}: ${home.pipeworkYear === null ? t('common.unknown') : home.pipeworkYear}`,
      `${controls[1].label}: ${home.surfaceYear}`,
      '',
      action.text,
      '',
      t('packet.taskStatus'),
    ];
    module.tasks.forEach((task) =>
      lines.push(
        `${home.completedTaskIds.has(task.id) ? '[x]' : '[ ]'} ${task.title}`,
      ),
    );
    lines.push('', action.confirmation);
    return lines.join('\n');
  }
  function openHelp() {
    const { knowledge, escape, t, evidence, state, dialog } = dependencies;

    const module = knowledge.new_home;
    const action = module.actions[0];
    document.getElementById('dialog-content').innerHTML =
      `<h2 id="dialog-title">${escape(action.title)}</h2><p class="confirmation" id="dialog-confirmation">${escape(action.confirmation)}</p><p>${escape(action.text)}</p><label class="packet-label" for="help-packet">${t('packet.selectable')}</label><textarea id="help-packet" readonly rows="10"></textarea><p class="fine-print">${escape(action.limitation)}</p>${evidence(action, module)}`;
    document.getElementById('help-packet').value = buildHomePacket(state);
    dialog.dataset.case = 'new_home';
    dialog.dataset.route = '';
    dialog.showModal();
  }
  return {
    pricingCard,
    pricingFeedback,
    updatePricingView,
    publishedBenefitsCard,
    claimsGuidanceCard,
    renderTasks,
    homePipeTask,
    renderHome,
    updateHomeView,
    updateProgress,
    buildHomePacket,
    openHelp,
  };
}
