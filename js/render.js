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
    const sel = state.selected.includes(comp.id);
    return `
      <div class="comp-card ${sel ? 'selected' : ''} ${comp.comingSoon ? 'coming-soon' : ''}"
           onclick="toggleComponent('${comp.id}')">
        <div class="comp-check">${sel ? '✓' : ''}</div>
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
  const ordered   = state.selected.map(id => getComponent(id)).filter(Boolean);
  if (ordered.length === 0) { section.style.display = 'none'; return; }
  section.style.display = '';
  container.innerHTML = ordered.map(renderConfigCard).join('');
}

function renderConfigCard(comp) {
  if (comp.customType === 'bathroom') return renderBathroomManager();
  const vals = getValues(comp.id);
  return `
    <div class="config-card" id="config-${comp.id}">
      <div class="config-header">
        <span class="config-icon">${comp.icon}</span>
        <h3>${t(comp, 'name')}</h3>
        <button class="config-remove" onclick="toggleComponent('${comp.id}')">${s('removeBtn')}</button>
      </div>
      <div class="config-fields">
        ${comp.fields.map(f => renderField(comp.id, f, vals)).join('')}
      </div>
      <div class="config-subtotal" id="subtotal-${comp.id}">
        ${s('componentEstimate')} <strong>${fmt(calcComponent(comp))}</strong>
      </div>
    </div>`;
}

function renderField(compId, field, vals) {
  const val = vals[field.id] !== undefined ? vals[field.id]
    : (field.type === 'select' ? field.options[0].value : '');
  let inputHtml = '';
  if (field.type === 'number') {
    inputHtml = `<input type="number" min="${field.min ?? 0}" step="any"
      placeholder="${field.placeholder || '0'}" value="${val}"
      oninput="updateValue('${compId}', '${field.id}', this.value)" />`;
  } else if (field.type === 'select') {
    const opts = field.options.map(o =>
      `<option value="${o.value}" ${val === o.value ? 'selected' : ''}>${t(o, 'label')}${o.priceLabel ? ' — ' + o.priceLabel : ''}</option>`
    ).join('');
    inputHtml = `<select onchange="updateValue('${compId}', '${field.id}', this.value)">${opts}</select>`;
  }
  const hint = t(field, 'hint');
  return `
    <div class="field-group">
      <label>${t(field, 'label')}${field.unit ? ` <span class="unit">(${field.unit})</span>` : ''}</label>
      ${hint ? `<div class="field-hint">${hint}</div>` : ''}
      ${inputHtml}
    </div>`;
}

function updateSubtotal(compId) {
  const el   = document.getElementById(`subtotal-${compId}`);
  const comp = getComponent(compId);
  if (el && comp) el.innerHTML = `${s('componentEstimate')} <strong>${fmt(calcComponent(comp))}</strong>`;
}

// ---- Summary ----

function renderSummary() {
  saveState();
  const container = document.getElementById('summary-content');
  const ordered   = state.selected.map(id => getComponent(id)).filter(Boolean);
  if (ordered.length === 0) {
    container.innerHTML = `<p class="summary-empty-msg">${s('emptyPrompt')}</p>`;
    return;
  }
  const lines       = ordered.map(comp => ({ comp, amount: calcComponent(comp) }));
  const subtotal    = lines.reduce((sum, l) => sum + l.amount, 0);
  const contingency = Math.round(subtotal * 0.15);
  const total       = subtotal + contingency;

  container.innerHTML = `
    <div class="summary-items">
      ${lines.map(({ comp, amount }) => `
        <div class="summary-line">
          <div class="summary-line-left">
            <span class="summary-line-icon">${comp.icon}</span>
            <div>
              <div class="summary-line-name">${t(comp, 'name')}</div>
              <div class="summary-line-detail">${getSummaryDetail(comp)}</div>
            </div>
          </div>
          <div class="summary-line-amount ${amount === 0 ? 'zero' : ''}">${fmt(amount)}</div>
        </div>`).join('')}
    </div>
    <div class="summary-totals">
      <div class="total-row"><span>${s('materialsLabour')}</span><span>${fmt(subtotal)}</span></div>
      <div class="total-row"><span>${s('overhead')}</span><span>${fmt(contingency)}</span></div>
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
        ${profileField('companyName',   'Company Name',    p.companyName,   'e.g. BBN Renovations Ltd.')}
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

function getSummaryDetail(comp) {
  if (comp.customType === 'bathroom') {
    const n     = state.bathrooms.length;
    const items = state.bathrooms.reduce((sum, b) => sum + b.items.length, 0);
    return s('bathroomSummary')(n, items);
  }
  const vals  = getValues(comp.id);
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
