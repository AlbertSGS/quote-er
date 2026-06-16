// ---- Bathroom helpers ----

function createEmptyBathroom(num) {
  return {
    id: 'bath-' + Date.now() + '-' + num,
    label: num,
    labour: { workers: '', pricePerDay: '', days: '' },
    items: []
  };
}

// ---- Bathroom actions ----

function addBathroom() {
  state.bathrooms.push(createEmptyBathroom(state.bathrooms.length + 1));
  rerenderBathroomManager();
}

function removeBathroom(bathId) {
  state.bathrooms = state.bathrooms.filter(b => b.id !== bathId);
  rerenderBathroomManager();
}

function updateBathLabour(bathId, field, value) {
  const bath = state.bathrooms.find(b => b.id === bathId);
  if (!bath) return;
  bath.labour[field] = value;
  refreshBathTotals(bathId);
  renderSummary();
}

function addBathItem(bathId, itemId) {
  if (!itemId) return;
  const bath = state.bathrooms.find(b => b.id === bathId);
  if (!bath || bath.items.some(i => i.itemId === itemId)) return;
  const def = BATHROOM_ITEMS.find(i => i.id === itemId);
  if (!def) return;
  bath.items.push({ itemId, qty: '1', unitPrice: String(def.defaultPrice) });
  rerenderBathroomManager();
}

function removeBathItem(bathId, itemId) {
  const bath = state.bathrooms.find(b => b.id === bathId);
  if (!bath) return;
  bath.items = bath.items.filter(i => i.itemId !== itemId);
  rerenderBathroomManager();
}

function updateBathItem(bathId, itemId, field, value) {
  const bath = state.bathrooms.find(b => b.id === bathId);
  if (!bath) return;
  const item = bath.items.find(i => i.itemId === itemId);
  if (!item) return;
  item[field] = value;
  refreshBathTotals(bathId);
  renderSummary();
}

function refreshBathTotals(bathId) {
  const bath = state.bathrooms.find(b => b.id === bathId);
  if (!bath) return;
  const formulaEl = document.getElementById(`bath-labour-formula-${bathId}`);
  if (formulaEl) formulaEl.textContent = `${bath.labour.workers || '0'} × $${bath.labour.pricePerDay || '0'} × ${bath.labour.days || '0'} days`;
  const ltEl = document.getElementById(`bath-labour-total-${bathId}`);
  if (ltEl) ltEl.textContent = fmt(calcLabourTotal(bath));
  bath.items.forEach(bi => {
    const el = document.getElementById(`bath-item-total-${bathId}-${bi.itemId}`);
    if (el) el.textContent = fmt((parseFloat(bi.qty) || 0) * (parseFloat(bi.unitPrice) || 0));
  });
  const btEl = document.getElementById(`bath-total-${bathId}`);
  if (btEl) btEl.textContent = fmt(calcOneBathroom(bath));
  const subEl = document.getElementById('subtotal-bathroom');
  if (subEl) subEl.innerHTML = `${s('componentEstimate')} <strong>${fmt(calcAllBathrooms())}</strong>`;
}

function rerenderBathroomManager() {
  const el = document.getElementById('config-bathroom');
  if (el) el.outerHTML = renderBathroomManager();
  renderSummary();
}

// ---- Bathroom render ----

function renderBathroomManager() {
  return `
    <div class="config-card" id="config-bathroom">
      <div class="config-header">
        <span class="config-icon">🚿</span>
        <h3>${s('bathroomCount')(state.bathrooms.length)}</h3>
        <button class="config-remove" onclick="toggleComponent('bathroom')">${s('removeBtn')}</button>
      </div>
      <div class="bathroom-list">
        ${state.bathrooms.map(renderOneBathroom).join('')}
      </div>
      <div class="bathroom-add-row">
        <button class="btn-add-bathroom" onclick="addBathroom()">${s('addBathroom')}</button>
      </div>
      <div class="config-subtotal" id="subtotal-bathroom">
        ${s('componentEstimate')} <strong>${fmt(calcAllBathrooms())}</strong>
      </div>
    </div>`;
}

function renderOneBathroom(bath) {
  const labourTotal = calcLabourTotal(bath);
  const bathTotal   = calcOneBathroom(bath);
  const addedIds    = bath.items.map(i => i.itemId);
  const available   = BATHROOM_ITEMS.filter(i => !addedIds.includes(i.id));
  const bathLabel   = `${s('bathrooms').replace('s','').trim()} ${bath.label}`;

  const itemsHTML = bath.items.length > 0 ? `
    <div class="items-table">
      <div class="items-header">
        <span>${s('colItem')}</span>
        <span>${s('colQty')}</span>
        <span>${s('colUnitPrice')}</span>
        <span>${s('colTotal')}</span>
        <span></span>
      </div>
      ${bath.items.map(bi => {
        const def   = BATHROOM_ITEMS.find(i => i.id === bi.itemId);
        if (!def) return '';
        const total = (parseFloat(bi.qty) || 0) * (parseFloat(bi.unitPrice) || 0);
        return `
          <div class="item-row">
            <span class="item-name">${t(def, 'label')} <span class="item-unit">(${def.unit})</span></span>
            <input class="item-input" type="number" min="0" step="any"
              value="${bi.qty}" placeholder="0"
              oninput="updateBathItem('${bath.id}', '${bi.itemId}', 'qty', this.value)" />
            <input class="item-input" type="number" min="0" step="any"
              value="${bi.unitPrice}" placeholder="0"
              oninput="updateBathItem('${bath.id}', '${bi.itemId}', 'unitPrice', this.value)" />
            <span class="item-total" id="bath-item-total-${bath.id}-${bi.itemId}">${fmt(total)}</span>
            <button class="item-remove" onclick="removeBathItem('${bath.id}', '${bi.itemId}')">✕</button>
          </div>`;
      }).join('')}
    </div>` : `<p class="bath-no-items">${s('noItemsYet')}</p>`;

  const addOpts = available.length > 0
    ? `<option value="">${s('addItemPrompt')}</option>` + available.map(i => `<option value="${i.id}">${t(i, 'label')} (${i.unit})</option>`).join('')
    : `<option value="">${s('allItemsAdded')}</option>`;

  return `
    <div class="bath-card">
      <div class="bath-card-header">
        <span>🚿 ${bathLabel}</span>
        ${state.bathrooms.length > 1
          ? `<button class="bath-remove" onclick="removeBathroom('${bath.id}')">${s('removeBtn')}</button>` : ''}
      </div>

      <div class="bath-section">
        <div class="bath-section-title">${s('labour')}</div>
        <div class="labour-grid">
          <div class="labour-field">
            <label>${s('numWorkers')}</label>
            <input type="number" min="0" step="1" placeholder="0" value="${bath.labour.workers}"
              oninput="updateBathLabour('${bath.id}', 'workers', this.value)" />
          </div>
          <div class="labour-field">
            <label>${s('ratePerDay')}</label>
            <input type="number" min="0" step="any" placeholder="0" value="${bath.labour.pricePerDay}"
              oninput="updateBathLabour('${bath.id}', 'pricePerDay', this.value)" />
          </div>
          <div class="labour-field">
            <label>${s('numDays')}</label>
            <input type="number" min="0" step="any" placeholder="0" value="${bath.labour.days}"
              oninput="updateBathLabour('${bath.id}', 'days', this.value)" />
          </div>
        </div>
        <div class="labour-formula">
          <span id="bath-labour-formula-${bath.id}">${bath.labour.workers || '0'} × $${bath.labour.pricePerDay || '0'} × ${bath.labour.days || '0'} days</span>
          <span>=</span>
          <strong id="bath-labour-total-${bath.id}">${fmt(labourTotal)}</strong>
        </div>
      </div>

      <div class="bath-section">
        <div class="bath-section-title">${s('materialsFixtures')}</div>
        ${itemsHTML}
        <div class="bath-add-item">
          <select onchange="addBathItem('${bath.id}', this.value); this.value=''">
            ${addOpts}
          </select>
        </div>
      </div>

      <div class="bath-total">
        <span>${s('bathroomTotal')}</span>
        <strong id="bath-total-${bath.id}">${fmt(bathTotal)}</strong>
      </div>
    </div>`;
}
