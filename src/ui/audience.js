/** Render/update functions share the application lifecycle and delegated events.
 * Dependencies are read on each call so role/language transitions cannot capture stale state. */
export function createUiAudience(dependencies) {
  function renderAudienceContext() {
    const { experience, state, escape, infoButton, knowledge } = dependencies;

    const copy = experience[state.audience];
    const customer = state.audience === 'customer';
    document.querySelector('.intro .eyebrow').textContent = copy.eyebrow;
    document.querySelector('.intro h1').innerHTML =
      `${escape(copy.heroLine1)}<br><span>${escape(copy.heroLine2)}</span>`;
    document.querySelector('.intro-copy').textContent = copy.heroText;
    document.getElementById('audience-context').innerHTML =
      `<div class="section-title"><h2 id="audience-title">${escape(copy.title)}</h2>${infoButton('policy', knowledge.new_home, experience.info.policyLabel)}</div>${customer ? `<fieldset class="portfolio-options"><legend>${escape(copy.portfolioLabel)}</legend>${experience.portfolios.map((item) => `<label class="portfolio-option"><input type="radio" name="customer-portfolio" data-portfolio="${item.id}" value="${item.id}" ${item.id === state.portfolioId ? 'checked' : ''}><span><strong>${escape(item.label)}</strong><span class="small-label">${escape(item.effect)}</span></span></label>`).join('')}</fieldset><p class="fine-print">${escape(copy.bundleNotice)}</p>` : `<p>${escape(copy.text)}</p>`}<p class="fine-print audience-notice">${escape(copy.notice)}</p>`;
    document
      .querySelectorAll('#audience-nav [data-audience]')
      .forEach((link) =>
        link.setAttribute(
          'aria-current',
          link.dataset.audience === state.audience ? 'page' : 'false',
        ),
      );
  }
  function updatePolicyContext() {
    const {
      experience,
      workspace,
      state,
      calculateHomePrice,
      escape,
      policyContext,
      money,
      knowledge,
      icon,
    } = dependencies;

    let panel = document.getElementById('policy-context');
    if (!panel) {
      panel = document.createElement('section');
      panel.id = 'policy-context';
      panel.className = 'policy-context';
      panel.setAttribute('aria-label', experience.customer.portfolioLabel);
      workspace.querySelector('.workspace-heading').after(panel);
    }
    panel.hidden = state.activeCase === 'pet';
    const price =
      state.activeCase === 'new_home' ? calculateHomePrice(state) : null;
    panel.innerHTML = `<p>${escape(policyContext(state))}</p>${state.activeCase === 'new_home' ? `<div class="policy-price"><span class="small-label">${escape(experience.policyContext.homePriceLabel)}</span><strong id="policy-price">${price ? `${money(price.projectedAnnualCents)} ${escape(knowledge.new_home.preventionIncentive.copy.perYear)}` : escape(knowledge.new_home.preventionIncentive.copy.unavailableLabel)}</strong></div>` : ''}${state.audience === 'customer' ? `<button type="button" class="text-button" data-policy-questions>${escape(experience.policyContext.questionsLabel)} ${icon('arrow')}</button>` : ''}`;
  }
  function renderAudienceNav() {
    const { escape, experience } = dependencies;

    document.getElementById('audience-nav').innerHTML =
      `<span class="small-label">${escape(experience.roleLabel)}</span><a href="#tutustu" data-audience="visitor">${escape(experience.roles.visitor)}</a><a href="#asiakas" data-audience="customer">${escape(experience.roles.customer)}</a><a href="./personnel.html">${escape(experience.roles.staff)}</a>`;
  }
  function updateLanguageShell() {
    const { language, t } = dependencies;

    document.documentElement.lang = language;
    document.title = t(
      document.body.dataset.page === 'personnel'
        ? 'shell.staffTitle'
        : 'shell.customerTitle',
    );
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const node = [...element.childNodes].find(
        (node) => node.nodeType === 3 && node.textContent.trim(),
      );
      if (node)
        node.textContent = node.textContent.replace(
          node.textContent.trim(),
          t(element.dataset.i18n),
        );
    });
    document
      .querySelectorAll('[data-i18n-aria-label]')
      .forEach((element) =>
        element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel)),
      );
    document
      .querySelectorAll('[data-language]')
      .forEach((button) =>
        button.setAttribute(
          'aria-pressed',
          String(button.dataset.language === language),
        ),
      );
    document.querySelectorAll('a[href]').forEach((link) => {
      const raw = link.getAttribute('href');
      if (!/^\.\/(index|personnel)\.html/.test(raw)) return;
      const url = new URL(raw, location.href);
      if (language === 'en') url.searchParams.set('lang', 'en');
      else url.searchParams.delete('lang');
      link.setAttribute(
        'href',
        `./${url.pathname.split('/').pop()}${url.search}${url.hash}`,
      );
    });
  }
  return {
    renderAudienceContext,
    updatePolicyContext,
    renderAudienceNav,
    updateLanguageShell,
  };
}
