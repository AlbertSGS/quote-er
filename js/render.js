// ---- Page render ----

function render() {
  renderStaticText();
  renderTabBar();
  renderGrid();
  renderConfigs();
  renderProfileSection();
  renderSummary();
}

function renderStaticText() {
  setElText('brand-sub',             s('brandSub'));
  setElText('btn-reset',             s('reset'));
  setElText('btn-print-header',      s('printEstimate'));
  setElText('section-select-title',  s('selectComponents'));
  setElText('section-config-title',  s('configureItems'));
  setElText('summary-title',         s('estimateSummary'));
}

function setElText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function renderTabBar() {
  const bar = document.getElementById('tab-bar');
  if (!bar) return;
  bar.innerHTML = `
    <button class="tab ${state.category === 'interior' ? 'active' : ''}"
            onclick="switchCategory('interior')">${s('interior')}</button>
    <button class="tab ${state.category === 'exterior' ? 'active' : ''}"
            onclick="switchCategory('exterior')">
      ${s('exterior')} <span class="pill">${s('comingSoon')}</span>
    </button>`;
}

function renderGrid() {
  const grid = document.getElementById('component-grid');
  grid.innerHTML = getComponents().map(comp => {
    const count = getInstancesOf(comp.id).length;
    const active = count > 0;
    let badge = '';
    if (count === 1) badge = '✓';
    else if (count > 1) badge = String(count);
    return `
      <div class="comp-card ${active ? 'selected' : ''} ${comp.comingSoon ? 'coming-soon' : ''}"
           onclick="${comp.comingSoon ? '' : `addInstance('${comp.id}')`}">
        <div class="comp-check">${badge}</div>
        <div class="comp-icon">${comp.icon}</div>
        <div class="comp-name">${t(comp, 'name')}</div>
        <div class="comp-tagline">${t(comp, 'tagline')}</div>
        ${comp.comingSoon ? `<div class="coming-soon-label">${s('comingSoon')}</div>` : ''}
      </div>`;
  }).join('');
}

function renderConfigs() {
  const section   = document.getElementById('config-section');
  const container = document.getElementById('config-cards');
  if (state.instances.length === 0) { section.style.display = 'none'; return; }
  section.style.display = '';
  container.innerHTML = state.instances.map(renderConfigCard).join('');
  container.ondragover = containerDragOver;
  container.ondrop     = containerDrop;
}

function renderFinalPriceRow(instanceId, estimate) {
  const hasOverride = state.finalPrices[instanceId] != null;
  const value = hasOverride
    ? (parseFloat(state.finalPrices[instanceId]) || 0)
    : Math.round(estimate * 1.35);
  return `
    <div class="final-price-row${hasOverride ? ' has-override' : ''}" id="finalprice-row-${instanceId}">
      <div class="final-price-left">
        <span class="final-price-label">Final Price</span>
        <span class="final-price-auto-hint">auto · 35% margin</span>
      </div>
      <div class="final-price-right">
        <span class="final-price-prefix">$</span>
        <input type="number" class="final-price-input" id="finalprice-input-${instanceId}"
               min="0" step="1" value="${Math.round(value)}"
               oninput="updateFinalPrice('${instanceId}', this.value)" />
        <button class="final-price-reset" onclick="resetFinalPrice('${instanceId}')" title="Reset to auto (1.35× estimate)">↺</button>
      </div>
    </div>`;
}

function renderConfigCard(instance) {
  const comp = getComponent(instance.compId);
  if (!comp) return '';
  if (comp.customType === 'bathroom') return renderBathroomCard(instance);

  const vals        = instance.values || {};
  const estimate    = calcInstance(instance);
  const siblings    = getInstancesOf(instance.compId);
  const idx         = siblings.findIndex(i => i.instanceId === instance.instanceId);
  const showNum     = siblings.length > 1;
  const title       = showNum ? `${t(comp, 'name')} ${idx + 1}` : t(comp, 'name');

  return `
    <div class="config-card" id="config-${instance.instanceId}">
      <div class="config-header">
        <span class="drag-handle" draggable="true"
              ondragstart="dragStart(event,'${instance.instanceId}')"
              ondragend="dragEnd(event,'${instance.instanceId}')">⠿</span>
        <span class="config-icon">${comp.icon}</span>
        <h3>${title}</h3>
        <button class="config-remove" onclick="removeInstance('${instance.instanceId}')">${s('removeBtn')}</button>
      </div>
      <div class="config-fields">
        ${comp.fields.map(f => renderField(instance.instanceId, f, vals)).join('')}
      </div>
      <div class="config-subtotal" id="subtotal-${instance.instanceId}">
        ${s('componentEstimate')} <strong>${fmt(estimate)}</strong>
      </div>
      ${renderFinalPriceRow(instance.instanceId, estimate)}
    </div>`;
}

function renderField(instanceId, field, vals) {
  const val = vals[field.id] !== undefined ? vals[field.id]
    : (field.type === 'select' ? field.options[0].value : '');
  let inputHtml = '';
  if (field.type === 'number') {
    inputHtml = `<input type="number" min="${field.min ?? 0}" step="any"
      placeholder="${field.placeholder || '0'}" value="${val}"
      oninput="updateValue('${instanceId}', '${field.id}', this.value)" />`;
  } else if (field.type === 'select') {
    const opts = field.options.map(o =>
      `<option value="${o.value}" ${val === o.value ? 'selected' : ''}>${t(o, 'label')}${o.priceLabel ? ' — ' + o.priceLabel : ''}</option>`
    ).join('');
    inputHtml = `<select onchange="updateValue('${instanceId}', '${field.id}', this.value)">${opts}</select>`;
  }
  const hint = t(field, 'hint');
  return `
    <div class="field-group">
      <label>${t(field, 'label')}${field.unit ? ` <span class="unit">(${field.unit})</span>` : ''}</label>
      ${hint ? `<div class="field-hint">${hint}</div>` : ''}
      ${inputHtml}
    </div>`;
}

function updateSubtotal(instanceId) {
  const el   = document.getElementById(`subtotal-${instanceId}`);
  const inst = getInstance(instanceId);
  if (!el || !inst) return;
  const estimate = calcInstance(inst);
  el.innerHTML = `${s('componentEstimate')} <strong>${fmt(estimate)}</strong>`;
  if (!state.finalPrices[instanceId]) {
    const fpInput = document.getElementById(`finalprice-input-${instanceId}`);
    if (fpInput) fpInput.value = Math.round(estimate * 1.35);
  }
}

// ---- Summary ----

function renderSummary() {
  saveState();
  const container = document.getElementById('summary-content');
  if (state.instances.length === 0) {
    container.innerHTML = `<p class="summary-empty-msg">${s('emptyPrompt')}</p>`;
    return;
  }

  // Pre-compute per-compId counts and running indexes for numbering
  const compCounts = {};
  state.instances.forEach(inst => {
    compCounts[inst.compId] = (compCounts[inst.compId] || 0) + 1;
  });
  const compIndexes = {};

  const lines = state.instances.map(inst => {
    const comp = getComponent(inst.compId);
    if (!comp) return null;
    compIndexes[inst.compId] = (compIndexes[inst.compId] || 0) + 1;
    const showNum    = compCounts[inst.compId] > 1;
    const displayName = showNum
      ? `${t(comp, 'name')} ${compIndexes[inst.compId]}`
      : t(comp, 'name');
    return { inst, comp, displayName, amount: getFinalPrice(inst) };
  }).filter(Boolean);

  const total = lines.reduce((sum, l) => sum + l.amount, 0);

  container.innerHTML = `
    <div class="summary-items">
      ${lines.map(({ inst, comp, displayName, amount }) => `
        <div class="summary-line">
          <div class="summary-line-left">
            <span class="summary-line-icon">${comp.icon}</span>
            <div>
              <div class="summary-line-name">${displayName}</div>
              <div class="summary-line-detail">${getSummaryDetail(inst)}</div>
            </div>
          </div>
          <div class="summary-line-amount ${amount === 0 ? 'zero' : ''}">${fmt(amount)}</div>
        </div>`).join('')}
    </div>
    <div class="summary-totals">
      <div class="total-row grand">
        <span>${s('estimatedTotal')}</span>
        <span class="grand-amount">${fmt(total)}</span>
      </div>
      <p class="disclaimer">${s('disclaimer')}</p>
      <button class="btn-print" onclick="printQuote()">${s('printEstimate')}</button>
    </div>`;
}

function renderProfileSection() {
  const section = document.getElementById('profile-section');
  if (!section) return;
  const p = state.profile;

  const logoHtml = p.logoDataUrl
    ? `<div class="profile-logo-preview">
         <img src="${p.logoDataUrl}" alt="Logo" />
         <button class="btn-remove-logo" onclick="clearLogo()" title="Remove logo">✕</button>
       </div>
       <label class="btn-upload-logo">
         Change Logo
         <input type="file" accept="image/*" onchange="handleLogoUpload(this)" />
       </label>`
    : `<label class="btn-upload-logo">
         + Upload Logo
         <input type="file" accept="image/*" onchange="handleLogoUpload(this)" />
       </label>`;

  section.innerHTML = `
    <div class="section-title">Quote Details</div>
    <div class="config-card">
      <div class="config-header">
        <span class="config-icon">📋</span>
        <h3>Client &amp; Company Information</h3>
      </div>
      <div class="profile-logo-area">
        <div class="profile-logo-label">Company Logo</div>
        ${logoHtml}
      </div>
      <div class="profile-subsection-title">Client</div>
      <div class="config-fields">
        ${profileField('clientName',      'To (Client Name)',   p.clientName,      'e.g. John Smith')}
        ${profileField('serviceLocation', 'Service Location',   p.serviceLocation, 'e.g. 123 Main St')}
        ${profileField('contactInfo',     'Contact Info',       p.contactInfo,     'e.g. john@email.com')}
      </div>
      <div class="profile-subsection-title">Company</div>
      <div class="config-fields">
        ${profileField('companyName',   'Company Name',    p.companyName,   'e.g. Company Ltd.')}
        ${profileField('companyEmail',  'Company Email',   p.companyEmail,  'e.g. info@company.com')}
        ${profileField('contactName',   'Contact Name',    p.contactName,   'e.g. Jane Doe')}
        ${profileField('contactPhone',  'Contact Phone',   p.contactPhone,  'e.g. (604) 555-0100')}
        ${profileField('designerName',  'Designer Name',   p.designerName,  'e.g. Alex Lee')}
        ${profileField('designerPhone', 'Designer Phone',  p.designerPhone, 'e.g. (604) 555-0200')}
      </div>
    </div>`;
}

function profileField(field, label, value, placeholder) {
  return `
    <div class="field-group">
      <label>${label}</label>
      <input type="text" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}"
             oninput="updateProfile('${field}', this.value)" />
    </div>`;
}

function getSummaryDetail(instance) {
  const comp = getComponent(instance.compId);
  if (!comp) return '—';
  if (comp.customType === 'bathroom') {
    const items = (instance.bathData?.items || []).length;
    return `${items} line item${items !== 1 ? 's' : ''}`;
  }
  const vals  = instance.values || {};
  const parts = [];
  comp.fields.forEach(f => {
    const val = vals[f.id];
    if (f.type === 'number') {
      const n = parseFloat(val);
      if (n > 0) parts.push(`${n} ${f.unit || ''}`);
    } else if (f.type === 'select') {
      const opt = f.options.find(o => o.value === val) || f.options[0];
      if (opt) parts.push(t(opt, 'label'));
    }
  });
  return parts.join(' · ') || '—';
}
