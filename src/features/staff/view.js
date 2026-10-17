/** Render/update functions share the application lifecycle and delegated events.
 * Dependencies are read on each call so role/language transitions cannot capture stale state. */
export function createStaffView(dependencies) {
  function renderPersonnel() {
    const {
      experience,
      workspace,
      escape,
      scenarios,
      knowledge,
      staffAnalytics,
      language,
    } = dependencies;

    const copy = experience.staff;
    document.getElementById('staff-title').textContent = copy.title;
    document.getElementById('staff-subtitle').textContent = copy.subtitle;
    document.getElementById('staff-notice').textContent = copy.notice;
    workspace.innerHTML = `<section class="card analytics-filters" aria-labelledby="staff-filters-heading"><h2 id="staff-filters-heading">${escape(copy.filtersTitle)}</h2><div class="filter-controls"><div><label for="staff-policy-filter">${escape(copy.policyFilterLabel)}</label><select id="staff-policy-filter"><option value="all">${escape(copy.allPoliciesLabel)}</option>${copy.policyTypes.map((type) => `<option value="${type.id}">${escape(type.label)}</option>`).join('')}</select></div><div><label for="staff-case-filter">${escape(copy.caseFilterLabel)}</label><select id="staff-case-filter"><option value="all">${escape(copy.allCasesLabel)}</option>${scenarios.map((item) => `<option value="${item.id}">${escape(knowledge[item.id].title)}</option>`).join('')}</select></div></div><p class="fine-print" id="staff-filter-result" role="status"></p></section><div class="stack" id="staff-report"></div>`;
    function renderReport() {
      const analytics = staffAnalytics({
        policyType: document.getElementById('staff-policy-filter').value,
        caseId: document.getElementById('staff-case-filter').value,
      });
      const summary = analytics.summary;
      const number = (value) =>
        new Intl.NumberFormat(language === 'en' ? 'en-IE' : 'fi-FI', {
          maximumFractionDigits: 1,
        }).format(value);
      const bars = (entries, feedback = false) =>
        `<ul class="analytics-bars">${entries.map((entry) => `<li><div><span>${escape(entry.label)}</span><strong>${entry.count} ${escape(feedback ? (entry.count === 1 ? copy.feedbackSingularLabel : copy.feedbackCountLabel) : entry.count === 1 ? copy.unitSingularLabel : copy.unitLabel)}</strong></div><div class="analytics-track" aria-hidden="true"><span style="width:${summary.customers ? (entry.count / summary.customers) * 100 : 0}%"></span></div></li>`).join('')}</ul>`;
      document.getElementById('staff-filter-result').textContent =
        `${copy.filterResultLabel}: ${summary.customers}`;
      document.getElementById('staff-report').innerHTML =
        `<section class="card" aria-labelledby="staff-analytics-heading"><h2 id="staff-analytics-heading">${escape(copy.analyticsTitle)}</h2><p class="fine-print">${escape(copy.analyticsNotice)}</p><dl class="staff-metrics">${Object.entries(
          copy.metricLabels,
        )
          .map(
            ([key, label]) =>
              `<div><dt>${escape(label)}</dt><dd id="staff-metric-${key}">${key === 'feedback' ? (summary.feedback === null ? '—' : `${number(summary.feedback)}<span class="metric-sample">${summary.feedbackCount} ${escape(summary.feedbackCount === 1 ? copy.feedbackSingularLabel : copy.feedbackCountLabel)}</span>`) : summary[key]}</dd></div>`,
          )
          .join('')}</dl></section>
        <div class="analytics-grid"><section class="card" aria-labelledby="staff-distribution-heading"><h2 id="staff-distribution-heading">${escape(copy.distributionTitle)}</h2><p class="fine-print">${escape(copy.distributionNotice)}</p>${bars(analytics.policyDistribution)}</section><section class="card" aria-labelledby="staff-feedback-heading"><h2 id="staff-feedback-heading">${escape(copy.feedbackTitle)}</h2><p class="fine-print">${escape(copy.feedbackNotice)}</p>${bars(
          analytics.feedbackDistribution.map((entry) => ({
            label: `${entry.score}/5`,
            count: entry.count,
          })),
          true,
        )}</section></div>
        <section class="card" aria-labelledby="staff-preparation-heading"><h2 id="staff-preparation-heading">${escape(copy.preparationTitle)}</h2><p class="fine-print">${escape(copy.preparationNotice)}</p><div class="table-scroll" role="region" tabindex="0" aria-label="${escape(copy.preparationTitle)}"><table><thead><tr><th scope="col">${escape(copy.caseColumn)}</th><th scope="col">${escape(copy.customerCountColumn)}</th><th scope="col">${escape(copy.taskCountColumn)}</th></tr></thead><tbody>${analytics.byCase.map((item) => `<tr><th scope="row">${escape(knowledge[item.id].title)}</th><td>${item.customers}</td><td>${item.total ? `${item.completed} / ${item.total}` : '—'}</td></tr>`).join('')}</tbody></table></div></section>
        <section class="card" aria-labelledby="staff-table-heading"><h2 id="staff-table-heading">${escape(copy.tableTitle)}</h2><div class="table-scroll" role="region" tabindex="0" aria-label="${escape(copy.tableTitle)}"><table id="staff-customer-table"><caption>${escape(copy.tableCaption)}</caption><thead><tr>${Object.values(
          copy.columns,
        )
          .map((label) => `<th scope="col">${escape(label)}</th>`)
          .join(
            '',
          )}</tr></thead><tbody>${analytics.rows.map((customer) => `<tr><th scope="row">${escape(customer.name)}<span class="small-label">${escape(customer.id)}</span></th><td><ul class="table-policies">${customer.policies.map((policy) => `<li>${escape(policy.label)}</li>`).join('')}</ul></td><td>${escape(knowledge[customer.caseId].title)}</td><td>${customer.preparation.completed} / ${customer.preparation.total}</td><td><details><summary>${customer.feedbackScore}/5 · ${escape(copy.feedbackDetailsLabel)}</summary><p class="fine-print">${escape(customer.feedbackText)}</p></details></td></tr>`).join('')}</tbody></table></div>${analytics.rows.length ? '' : `<p class="empty-state">${escape(copy.emptyLabel)}</p>`}</section>`;
    }
    workspace.onchange = (event) => {
      if (
        ['staff-policy-filter', 'staff-case-filter'].includes(event.target.id)
      )
        renderReport();
    };
    renderReport();
  }
  return { renderPersonnel };
}
