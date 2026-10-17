import { createHomeView } from '../features/home/view.js';
import { createAbsenceView } from '../features/absence/view.js';
import { createBabyView } from '../features/baby/view.js';
import { createPetView } from '../features/pet/view.js';
import { createStaffView } from '../features/staff/view.js';
import { createUiWorkspace } from '../ui/workspace.js';
import { createUiDialogs } from '../ui/dialogs.js';
import { createUiAudience } from '../ui/audience.js';
import { parseNavigation, navigationUrl } from './navigation.ts';
import { createDomain } from '../domain/engine.ts';
import {
  canonicalKnowledge,
  canonicalExperience,
  contentForLanguage,
} from '../content/index.ts';
import { translate } from '../locales/catalogue.ts';
import { icons } from '../ui/icons.js';
(function () {
  'use strict';

  const domain = createDomain(canonicalKnowledge, canonicalExperience);
  const {
    createState,
    updateHome,
    setTaskComplete,
    readiness,
    updateScenario,
    absenceTrip,
    absencePriority,
    setAssignment,
    setPetSelection,
    setPetObservation,
    petRoute,
    petIntroAvailable,
    usePetIntro,
    hasPolicy,
    petServiceAccess,
    setPortfolio,
    calculateHomePrice,
  } = domain;
  // Rule results select identities. Display records always come from the active catalogue.
  const applicableTasks = (state, id) =>
    domain
      .applicableTasks(state, id)
      .map((task) => knowledge[id].tasks.find((item) => item.id === task.id));
  const visibleTasks = (state, id) =>
    domain
      .visibleTasks(state, id)
      .map((task) => knowledge[id].tasks.find((item) => item.id === task.id));
  const petPrimaryAction = (state) => {
    const action = domain.petPrimaryAction(state);
    return action
      ? knowledge.pet.actions.find((item) => item.id === action.id)
      : null;
  };
  const homeGuidance = (state) => {
    const result = domain.homeGuidance(state);
    return {
      ...result,
      nextTask:
        knowledge.new_home.tasks.find(
          (item) => item.id === result.nextTask?.id,
        ) || null,
    };
  };
  const staffAnalytics = (filters) => {
    const result = domain.staffAnalytics(filters);
    if (!result) return null;
    return {
      ...result,
      rows: result.rows.map((row) => ({
        ...row,
        ...experience.staff.customers.find((item) => item.id === row.id),
        policies: row.policies.map((policy) => ({
          ...policy,
          label:
            experience.portfolios
              .flatMap((item) => item.policies)
              .find((item) => item.type === policy.type)?.label || policy.label,
        })),
      })),
      policyDistribution: result.policyDistribution.map((item) => ({
        ...item,
        label: experience.staff.policyTypes.find((type) => type.id === item.id)
          .label,
      })),
    };
  };

  let knowledge = canonicalKnowledge;
  let language = 'fi';
  const t = (key) => translate(language, key);
  let experience = canonicalExperience;
  function setLanguage(value) {
    if (!['fi', 'en'].includes(value)) return false;
    language = value;
    ({ knowledge, experience } = contentForLanguage(value));
    return true;
  }
  const scenarios = [
    {
      id: 'new_home',
      icon: 'home',
      get label() {
        return t('scenario.home');
      },
    },
    {
      id: 'absence',
      icon: 'suitcase',
      get label() {
        return t('scenario.absence');
      },
    },
    {
      id: 'first_baby',
      icon: 'baby',
      get label() {
        return t('scenario.baby');
      },
    },
    {
      id: 'pet',
      icon: 'paw',
      get label() {
        return t('scenario.pet');
      },
    },
  ];

  function displayDate(iso) {
    return new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'fi-FI', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${iso}T00:00:00Z`));
  }

  function petAction(state, actionId) {
    const action = petPrimaryAction(state);
    return action?.id === actionId ? action : null;
  }

  function audienceCopy(currentState, caseId = currentState.activeCase) {
    return knowledge[caseId].audiences[
      currentState.audience === 'customer' ? 'customer' : 'visitor'
    ];
  }

  function visibleBenefits(currentState) {
    return knowledge.new_home.publishedBenefits.items.filter(
      (item) =>
        !item.audiences || item.audiences.includes(currentState.audience),
    );
  }

  function policyContext(currentState) {
    const copy = experience.policyContext;
    if (currentState.audience !== 'customer') return copy.visitor;
    if (currentState.activeCase === 'pet')
      return petServiceAccess(currentState) === 'included'
        ? copy.petIncluded
        : copy.petNotIncluded;
    const portfolio = experience.portfolios.find(
      (item) => item.id === currentState.portfolioId,
    );
    if (currentState.activeCase === 'absence')
      return portfolio?.policies.some((item) => item.type === 'travel')
        ? copy.absenceTravel
        : copy.absenceHome;
    if (
      currentState.activeCase === 'first_baby' &&
      hasPolicy(currentState, 'unborn-child')
    )
      return copy.babyIncluded;
    return copy[currentState.activeCase];
  }

  function buildPolicyQuestions(currentState) {
    const copy = experience.policyContext;
    const portfolio =
      currentState.audience === 'customer' &&
      experience.portfolios.find(
        (item) => item.id === currentState.portfolioId,
      );
    const lines = [
      knowledge[currentState.activeCase].title,
      copy.policiesLabel,
      portfolio
        ? portfolio.policies.map((item) => item.label).join(', ')
        : copy.noPolicies,
      '',
      copy.question,
    ];
    if (currentState.activeCase === 'new_home')
      lines.push(buildHomePacket(currentState));
    if (currentState.activeCase === 'absence') {
      const trip = absenceTrip(currentState);
      if (trip)
        lines.push(
          `${displayDate(trip.departure)}–${displayDate(trip.returnDate)}`,
        );
      lines.push(copy.travelQuestion);
    }
    if (currentState.activeCase === 'first_baby')
      lines.push(
        hasPolicy(currentState, 'unborn-child')
          ? copy.babyOwnedQuestion
          : copy.babyQuestion,
      );
    lines.push('', copy.notSent);
    return lines.join('\n');
  }

  const viewContext = {
    get absencePriority() {
      return absencePriority;
    },
    get absenceTrip() {
      return absenceTrip;
    },
    get applicableTasks() {
      return applicableTasks;
    },
    get arrangeWorkspace() {
      return arrangeWorkspace;
    },
    get audienceCopy() {
      return audienceCopy;
    },
    get buildBabyPacket() {
      return buildBabyPacket;
    },
    get buildPetPacket() {
      return buildPetPacket;
    },
    get buildPolicyQuestions() {
      return buildPolicyQuestions;
    },
    get calculateHomePrice() {
      return calculateHomePrice;
    },
    get caseHeading() {
      return caseHeading;
    },
    get caseTaskCards() {
      return caseTaskCards;
    },
    get choiceControl() {
      return choiceControl;
    },
    get clipboard() {
      return clipboard;
    },
    get dialog() {
      return dialog;
    },
    get displayDate() {
      return displayDate;
    },
    get escape() {
      return escape;
    },
    get evidence() {
      return evidence;
    },
    get experience() {
      return experience;
    },
    get hasPolicy() {
      return hasPolicy;
    },
    get homeGuidance() {
      return homeGuidance;
    },
    get icon() {
      return icon;
    },
    get infoButton() {
      return infoButton;
    },
    get insightCard() {
      return insightCard;
    },
    get insightDetails() {
      return insightDetails;
    },
    get knowledge() {
      return knowledge;
    },
    get language() {
      return language;
    },
    get money() {
      return money;
    },
    get percent() {
      return percent;
    },
    get petAction() {
      return petAction;
    },
    get petIntroAvailable() {
      return petIntroAvailable;
    },
    get petPrimaryAction() {
      return petPrimaryAction;
    },
    get petRoute() {
      return petRoute;
    },
    get petServiceAccess() {
      return petServiceAccess;
    },
    get policyContext() {
      return policyContext;
    },
    get priorityLabels() {
      return priorityLabels;
    },
    get progressCard() {
      return progressCard;
    },
    get readiness() {
      return readiness;
    },
    get scenarios() {
      return scenarios;
    },
    get staffAnalytics() {
      return staffAnalytics;
    },
    get state() {
      return state;
    },
    get t() {
      return t;
    },
    get topicInsight() {
      return topicInsight;
    },
    get updateCaseProgress() {
      return updateCaseProgress;
    },
    get visibleBenefits() {
      return visibleBenefits;
    },
    get visibleTasks() {
      return visibleTasks;
    },
    get workspace() {
      return workspace;
    },
  };
  const {
    updatePricingView,
    renderHome,
    updateHomeView,
    updateProgress,
    buildHomePacket,
    openHelp,
  } = createHomeView(viewContext);
  const { renderAbsence, updateAbsenceView, copyAbsence } =
    createAbsenceView(viewContext);
  const { buildBabyPacket, renderBaby, updateBabyView } =
    createBabyView(viewContext);
  const { buildPetPacket, renderPet, updatePetView, syncPetGuidanceFeedback } =
    createPetView(viewContext);
  const { renderPersonnel } = createStaffView(viewContext);
  const {
    caseHeading,
    choiceControl,
    insightCard,
    progressCard,
    updateCaseProgress,
    caseTaskCards,
    topicInsight,
    insightDetails,
  } = createUiWorkspace(viewContext);
  const { infoButton, openInfo, openScenarioAction, openPolicyQuestions } =
    createUiDialogs(viewContext);
  const {
    renderAudienceContext,
    updatePolicyContext,
    renderAudienceNav,
    updateLanguageShell,
  } = createUiAudience(viewContext);

  const workspace = document.getElementById('workspace');
  const initialNavigation = parseNavigation(new URL(location.href));
  const audienceStates = {
    visitor: createState('visitor'),
    customer: createState('customer'),
  };
  let state = audienceStates[initialNavigation.audience];
  state.activeCase = initialNavigation.caseId;
  if (state.audience === 'customer')
    setPortfolio(state, initialNavigation.portfolioId);
  function recordNavigation(push = true) {
    const next = navigationUrl(new URL(location.href), {
      language,
      audience: state.audience,
      caseId: state.activeCase,
      portfolioId: state.portfolioId,
    });
    if (next.href !== location.href)
      history[push ? 'pushState' : 'replaceState'](null, '', next);
  }
  function restoreNavigation() {
    const next = parseNavigation(new URL(location.href));
    if (dialog?.open) dialog.close();
    setLanguage(next.language);
    clipboard.revision++;
    if (document.body.dataset.page === 'personnel') {
      renderPersonnel();
      updateLanguageShell();
      return;
    }
    state = audienceStates[next.audience];
    state.activeCase = next.caseId;
    if (state.audience === 'customer') setPortfolio(state, next.portfolioId);
    renderAudienceNav();
    renderAudienceContext();
    renderNav();
    switchCase(next.caseId);
    updateLanguageShell();
  }
  window.addEventListener('popstate', restoreNavigation);
  const nav = document.getElementById('scenario-nav');
  const dialog = document.getElementById('help-dialog');
  let layoutObserver;
  let layoutFrame = 0;
  function arrangeWorkspace() {
    layoutObserver?.disconnect();
    cancelAnimationFrame(layoutFrame);
    const grid = workspace.querySelector('.adaptive-workspace');
    if (!grid) return;
    const cards = [...grid.querySelectorAll('.card')];
    const balanced = innerWidth > 760 && typeof ResizeObserver !== 'undefined';
    grid.classList.toggle('balanced-workspace', balanced);
    cards.forEach((card) => card.style.removeProperty('grid-row-end'));
    if (!balanced) return;
    // Intrinsic heights determine spans. DOM and keyboard order stay unchanged.
    const fit = (card) => {
      const style = getComputedStyle(grid);
      const gap = parseFloat(style.rowGap);
      const row = parseFloat(style.gridAutoRows);
      const span = `span ${Math.ceil((card.getBoundingClientRect().height + gap) / (row + gap))}`;
      if (card.style.gridRowEnd !== span) card.style.gridRowEnd = span;
    };
    layoutObserver = new ResizeObserver(() => {
      cancelAnimationFrame(layoutFrame);
      layoutFrame = requestAnimationFrame(() => cards.forEach(fit));
    });
    cards.forEach((card) => {
      fit(card);
      layoutObserver.observe(card);
    });
  }
  const statusLabels = {
    get verified() {
      return t('evidence.verified');
    },
    get illustrative() {
      return t('evidence.illustrative');
    },
    get unverified() {
      return t('evidence.unverified');
    },
  };
  const priorityLabels = {
    get critical() {
      return t('priority.critical');
    },
    get high() {
      return t('priority.high');
    },
    get medium() {
      return t('priority.medium');
    },
    get recommendation() {
      return t('priority.recommendation');
    },
  };
  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[char],
    );
  const icon = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ''}</svg>`;
  const money = (cents) =>
    new Intl.NumberFormat(language === 'en' ? 'en-IE' : 'fi-FI', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100);
  const percent = (bps) =>
    new Intl.NumberFormat(language === 'en' ? 'en-IE' : 'fi-FI', {
      maximumFractionDigits: 2,
    }).format(bps / 100);

  function evidence(item, module, summaryLabel = t('evidence.summary')) {
    const sources = item.sourceIds.map((id) =>
      module.sources.find((source) => source.id === id),
    );
    return `<details class="evidence"><summary>${escape(summaryLabel)} <span class="evidence-status">${escape(statusLabels[item.status])}</span></summary><div class="evidence-content">${item.sourceScope ? `<p>${escape(item.sourceScope)}</p>` : ''}<p>${escape(item.limitation)}</p><ul class="source-list">${sources.map((source) => `<li><a lang="fi" href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.publisher)} · ${escape(source.title)}</a><span lang="fi">${escape(source.version)} · ${escape(source.locator)}</span><span>${t('evidence.checked')} ${escape(source.checkedAt)}${source.effectiveFrom ? ` · ${t('evidence.effective')} ${escape(source.effectiveFrom)} ${t('evidence.onwards')}` : ''}</span><span>${escape(statusLabels[source.status])} · ${escape(source.limitation)}</span></li>`).join('')}</ul></div></details>`;
  }

  function renderNav() {
    nav.innerHTML = scenarios
      .map((scenario) => {
        const ready = readiness(state, scenario.id);
        const module = knowledge[scenario.id];
        const label = module.presentation?.navTitle || scenario.label;
        return `<button class="scenario-button" type="button" data-case="${scenario.id}" aria-current="${state.activeCase === scenario.id}"><span class="scenario-icon">${icon(scenario.icon)}</span><span><span class="scenario-name">${escape(label)}</span><span class="scenario-meta" id="nav-progress-${scenario.id}">${ready.completed}/${ready.total} ${t('tasks.done')}${scenario.id === 'new_home' ? ` · ${t('home.ageDeductions')}` : ''}</span></span></button>`;
      })
      .join('');
  }

  const clipboard = { revision: 0 };

  function switchCase(caseId) {
    if (!scenarios.some((item) => item.id === caseId)) return;
    if (dialog.open) dialog.close();
    state.activeCase = caseId;
    document.body.classList.remove('pricing-feedback-visible');
    document.body.classList.remove('pet-guidance-visible');
    nav
      .querySelectorAll('[data-case]')
      .forEach((button) =>
        button.setAttribute(
          'aria-current',
          String(button.dataset.case === caseId),
        ),
      );
    if (caseId === 'new_home') renderHome();
    else if (caseId === 'absence') renderAbsence();
    else if (caseId === 'first_baby') renderBaby();
    else renderPet();
    updatePolicyContext();
    arrangeWorkspace();
  }

  document
    .querySelector('.language-switch')
    .addEventListener('click', (event) => {
      const button = event.target.closest('[data-language]');
      if (!button || language === button.dataset.language) return;
      if (dialog?.open) dialog.close();
      const filters =
        document.body.dataset.page === 'personnel'
          ? [
              document.getElementById('staff-policy-filter').value,
              document.getElementById('staff-case-filter').value,
            ]
          : null;
      setLanguage(button.dataset.language);
      recordNavigation();
      clipboard.revision++;
      if (filters) {
        renderPersonnel();
        document.getElementById('staff-policy-filter').value = filters[0];
        document.getElementById('staff-case-filter').value = filters[1];
        document
          .getElementById('staff-policy-filter')
          .dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        renderAudienceNav();
        renderAudienceContext();
        renderNav();
        switchCase(state.activeCase);
      }
      updateLanguageShell();
      button.focus();
    });
  setLanguage(initialNavigation.language);
  if (document.body.dataset.page === 'personnel') {
    renderPersonnel();
    updateLanguageShell();
    return;
  }
  renderAudienceNav();
  renderAudienceContext();
  window.addEventListener('hashchange', restoreNavigation);
  document.getElementById('audience-nav').addEventListener('click', (event) => {
    const link = event.target.closest('[data-audience]');
    if (
      !link ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    const audience = link.dataset.audience;
    const next = navigationUrl(new URL(location.href), {
      language,
      audience,
      caseId: state.activeCase,
      portfolioId: audienceStates[audience].portfolioId,
    });
    history.pushState(null, '', next);
    restoreNavigation();
  });

  document
    .getElementById('audience-context')
    .addEventListener('change', (event) => {
      if (
        !event.target.dataset.portfolio ||
        !setPortfolio(state, event.target.dataset.portfolio)
      )
        return;
      renderNav();
      switchCase(state.activeCase);
      recordNavigation();
    });

  nav.addEventListener('click', (event) => {
    const button = event.target.closest('[data-case]');
    if (button) {
      switchCase(button.dataset.case);
      recordNavigation();
    }
  });
  workspace.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.info) {
      openInfo(button.dataset.info, button.dataset.infoCase);
      return;
    }
    if (button.hasAttribute('data-policy-questions')) {
      openPolicyQuestions();
      return;
    }
    if (button.hasAttribute('data-show-home-task')) {
      const input = workspace.querySelector(
        `[data-task="${button.dataset.taskTarget}"]`,
      );
      input.focus();
      input.scrollIntoView({ block: 'center' });
      return;
    }
    if (button.hasAttribute('data-show-pet-guidance')) {
      const heading = document.getElementById('pet-route-heading');
      heading.tabIndex = -1;
      heading.focus();
      heading.scrollIntoView({ block: 'start' });
      syncPetGuidanceFeedback();
    }
    if (button.hasAttribute('data-show-pricing')) {
      document.getElementById('pricing-feedback').hidden = true;
      document.body.classList.remove('pricing-feedback-visible');
      document.getElementById('pricing-heading').focus();
      document
        .getElementById('pricing-heading')
        .scrollIntoView({ block: 'start' });
    }
    if (button.dataset.case) {
      switchCase(button.dataset.case);
      recordNavigation();
      workspace.focus();
    }
    if (button.id === 'copy-absence') {
      copyAbsence();
      return;
    }
    if (button.dataset.action === 'plumbing-help') openHelp();
    else if (button.dataset.action) openScenarioAction(button.dataset.action);
  });
  workspace.addEventListener('input', (event) => {
    if (event.target.id === 'pipework-year') {
      updateHome(state, 'pipeworkYear', event.target.valueAsNumber);
      updateHomeView();
    } else if (
      state.activeCase === 'absence' &&
      event.target.dataset.field === 'durationDays'
    ) {
      updateScenario(
        state,
        'absence',
        'durationDays',
        event.target.valueAsNumber,
      );
      updateAbsenceView();
    }
  });
  workspace.addEventListener('change', (event) => {
    const input = event.target;
    const caseId = state.activeCase;
    if (input.dataset.field && input.type !== 'range') {
      updateScenario(state, caseId, input.dataset.field, input.value);
      if (caseId === 'absence') updateAbsenceView(true);
      if (caseId === 'first_baby') updateBabyView(true);
      if (caseId === 'pet') updatePetView();
    }
    if (input.dataset.assign) {
      setAssignment(state, input.dataset.assign, input.checked);
      updateAbsenceView();
    }
    if (input.dataset.petField) {
      setPetSelection(
        state,
        input.dataset.petField,
        input.value,
        input.checked,
      );
      updatePetView();
    }
    if (input.dataset.observation) {
      setPetObservation(state, input.dataset.observation, input.value);
      updatePetView();
    }
    if (input.name === 'surface-year') {
      updateHome(state, 'surfaceYear', Number(input.value));
      updateHomeView();
    }
    if (input.id === 'unknown-pipework-year') {
      updateHome(
        state,
        'pipeworkYear',
        input.checked ? null : state.cases.new_home.lastKnownPipeworkYear,
      );
      updateHomeView();
    }
    if (input.dataset.task) {
      setTaskComplete(state, caseId, input.dataset.task, input.checked);
      const task = input.closest('.task');
      task.dataset.complete = String(input.checked);
      task.querySelector('.complete-label').hidden = !input.checked;
      const assignment = task.querySelector('[data-assign]');
      if (assignment) assignment.disabled = input.checked;
      if (caseId === 'new_home') {
        updateProgress();
        updateHomeView();
        updatePricingView(true);
      }
      if (caseId === 'absence') updateAbsenceView();
      if (caseId === 'first_baby') updateCaseProgress();
      if (caseId === 'pet') updatePetView();
    }
  });
  document
    .getElementById('audience-context')
    .addEventListener('click', (event) => {
      const button = event.target.closest('[data-info]');
      if (button) openInfo(button.dataset.info, button.dataset.infoCase);
    });
  dialog.addEventListener('click', (event) => {
    const button = event.target.closest('[data-use-pet-intro]');
    if (!button || !usePetIntro(state)) return;
    button.disabled = true;
    button.textContent = knowledge.pet.introOffer.usedLabel;
    const status = document.getElementById('intro-use-status');
    status.textContent = knowledge.pet.introOffer.usedText;
    status.tabIndex = -1;
    status.focus();
    updatePetView();
  });
  dialog.addEventListener('close', () => {
    if (
      dialog.dataset.case === 'pet' &&
      state.activeCase === 'pet' &&
      (document.activeElement === document.body ||
        dialog.contains(document.activeElement))
    ) {
      document.querySelector('#pet-route > button')?.focus();
    }
  });
  document
    .getElementById('close-dialog')
    .addEventListener('click', () => dialog.close());
  window.addEventListener('scroll', syncPetGuidanceFeedback, { passive: true });
  window.addEventListener('resize', syncPetGuidanceFeedback);
  window.addEventListener('resize', arrangeWorkspace);
  renderNav();
  switchCase(state.activeCase);
  updateLanguageShell();
})();
