// ---- Bathroom item catalogue ----

const BATHROOM_ITEMS = [
  // Structural / substrate
  { id: 'misc-materials',  label: 'Miscellaneous Materials (e.g. cement)',  label_zh: '辅料 如水泥',              unit: 'lot',    defaultPrice: 500 },
  { id: 'cement-board',    label: 'Cement Board (3×5)',                     label_zh: '水泥板（3x5）',            unit: 'sheet',  defaultPrice: 30 },
  { id: 'drywall-moist',   label: 'Moisture-Resistant Drywall (4×8)',       label_zh: '防水drywall（4x8）',       unit: 'sheet',  defaultPrice: 32 },
  { id: 'drywall-std',     label: 'Drywall (4×8 / 32 sq ft)',               label_zh: 'drywall（32sqft 4x8）',    unit: 'sheet',  defaultPrice: 19 },
  { id: 'structural-mod',  label: 'Structural Modification (Custom)',        label_zh: '结构改造-个例',            unit: 'lot',    defaultPrice: 0 },

  // Finishes
  { id: 'paint',           label: 'Paint',                                  label_zh: '油漆',                    unit: 'lot',    defaultPrice: 3.5 },
  { id: 'tile-std',        label: 'Tile — Standard (1×2, 2×2)',             label_zh: '瓷砖 标准1*2 2*2',         unit: 'sq ft',  defaultPrice: 4 },
  { id: 'tile-premium',    label: 'Tile — Premium (2×4, 3×3)',              label_zh: '瓷砖 高端 2*4、3*3',       unit: 'sq ft',  defaultPrice: 6 },
  { id: 'tile-custom',     label: 'Tile — Custom Case',                     label_zh: '瓷砖 个例',               unit: 'lot',    defaultPrice: 0 },
  { id: 'water-barrier',   label: 'Water Barrier Strip',                    label_zh: '挡水条',                  unit: 'unit',   defaultPrice: 50 },

  // Plumbing & mechanical
  { id: 'plumbing-mod',    label: 'Plumbing Modification',                  label_zh: '水路改造',                unit: 'lot',    defaultPrice: 400 },
  { id: 'electrical-mod',  label: 'Electrical Modification',                label_zh: '电路改造',                unit: 'lot',    defaultPrice: 400 },
  { id: 'fresh-air',       label: 'Fresh Air System Installation',          label_zh: '新风系统改造',             unit: 'unit',   defaultPrice: 200 },
  { id: 'exhaust-fan',     label: 'New Exhaust Fan',                        label_zh: '全新换气扇排风',           unit: 'unit',   defaultPrice: 100 },

  // Toilet
  { id: 'toilet-std',      label: 'Toilet — Standard',                     label_zh: '马桶 标准',               unit: 'unit',   defaultPrice: 250 },
  { id: 'toilet-smart',    label: 'Toilet — Smart',                        label_zh: '马桶 智能',               unit: 'unit',   defaultPrice: 1800 },

  // Vanity
  { id: 'vanity-24-30',    label: 'Vanity — Standard 24–30"',              label_zh: '洗手台 标准 24-30',        unit: 'unit',   defaultPrice: 500 },
  { id: 'vanity-32-42',    label: 'Vanity — Standard 32–42"',              label_zh: '洗手台 标准 32-42',        unit: 'unit',   defaultPrice: 700 },
  { id: 'vanity-45-60',    label: 'Vanity — Standard 45–60"',              label_zh: '洗手台 标准 45-60',        unit: 'unit',   defaultPrice: 900 },
  { id: 'vanity-70plus',   label: 'Vanity — Standard 70"+',                label_zh: '洗手台 标准 70+',          unit: 'unit',   defaultPrice: 1300 },
  { id: 'vanity-custom',   label: 'Vanity — Custom',                       label_zh: '洗手台 定制',              unit: 'unit',   defaultPrice: 3000 },
  { id: 'vanity-case',     label: 'Vanity — Custom Case',                  label_zh: '洗手台 个例',              unit: 'lot',    defaultPrice: 0 },

  // Faucets
  { id: 'faucet-vanity-std',  label: 'Vanity Faucet — Standard',           label_zh: '洗手台水龙头-标配',        unit: 'unit',   defaultPrice: 100 },
  { id: 'faucet-vanity-bg',   label: 'Vanity Faucet — Black Gold',         label_zh: '洗手台水龙头-黑金',        unit: 'unit',   defaultPrice: 120 },
  { id: 'faucet-shower-std',  label: 'Shower Faucet — Standard',           label_zh: '洗澡水龙头-标准',          unit: 'unit',   defaultPrice: 250 },
  { id: 'faucet-shower-bg',   label: 'Shower Faucet — Black Gold',         label_zh: '洗澡水龙头-黑金',          unit: 'unit',   defaultPrice: 350 },
  { id: 'faucet-tub',         label: 'Bathtub Faucet',                     label_zh: '浴缸水龙头',              unit: 'unit',   defaultPrice: 500 },

  // Shower / glass
  { id: 'door-single-glass',  label: 'Single-Panel Glass Door',            label_zh: '单板玻璃门',              unit: 'unit',   defaultPrice: 600 },
  { id: 'door-l-glass',       label: 'L-Shaped Glass Door',                label_zh: 'L玻璃门',                 unit: 'unit',   defaultPrice: 1000 },
  { id: 'door-hardware-bg',   label: 'Glass Door Hardware — Black Gold',   label_zh: '玻璃门五金 黑金',          unit: 'set',    defaultPrice: 200 },

  // Bathtub
  { id: 'tub-dropin',     label: 'Bathtub — Drop-In',                      label_zh: '浴缸 嵌入式',             unit: 'unit',   defaultPrice: 800 },
  { id: 'tub-freestand',  label: 'Bathtub — Freestanding',                 label_zh: '浴缸 独立',               unit: 'unit',   defaultPrice: 1200 },
  { id: 'tub-custom',     label: 'Bathtub — Custom Case',                  label_zh: '浴缸 个例',               unit: 'lot',    defaultPrice: 0 },

  // Lighting
  { id: 'pot-lights',     label: 'Pot Lights',                             label_zh: '射灯',                    unit: 'unit',   defaultPrice: 10 },
  { id: 'mirror-light',   label: 'Vanity Light (mirror front)',            label_zh: '镜前灯',                  unit: 'unit',   defaultPrice: 150 },

  // Mirrors & accessories
  { id: 'mirror-std',         label: 'Mirror',                             label_zh: '镜子',                    unit: 'unit',   defaultPrice: 100 },
  { id: 'mirror-led',         label: 'LED Mirror',                         label_zh: 'LED镜子',                 unit: 'unit',   defaultPrice: 150 },
  { id: 'bath-accessories',   label: 'Bathroom Accessories Set',           label_zh: '卫浴挂件',                unit: 'set',    defaultPrice: 50 },
];

// ---- Bathroom component definition ----

const COMP_BATHROOM = {
  id: 'bathroom',
  name: 'Bathroom',              name_zh: '浴室',
  icon: '🚿',
  tagline: 'Labour + materials, per bathroom',
  tagline_zh: '人工 + 材料，按浴室计算',
  customType: 'bathroom',
  fields: [],
  calculate() { return 0; }
};

// ---- Bathroom data factory ----

function createEmptyBathData() {
  return {
    labour: { workers: '', pricePerDay: '', days: '' },
    items: []
  };
}

// ---- Bathroom actions (all keyed by instanceId) ----

function updateBathLabour(instanceId, field, value) {
  const inst = getInstance(instanceId);
  if (!inst || !inst.bathData) return;
  inst.bathData.labour[field] = value;
  refreshBathTotals(instanceId);
  renderSummary();
}

function addBathItem(instanceId, itemId) {
  if (!itemId) return;
  const inst = getInstance(instanceId);
  if (!inst || !inst.bathData) return;
  if (inst.bathData.items.some(i => i.itemId === itemId)) return;
  const def = BATHROOM_ITEMS.find(i => i.id === itemId);
  if (!def) return;
  inst.bathData.items.push({ itemId, qty: '1', unitPrice: String(def.defaultPrice) });
  rerenderBathroomCard(instanceId);
}

function removeBathItem(instanceId, itemId) {
  const inst = getInstance(instanceId);
  if (!inst || !inst.bathData) return;
  inst.bathData.items = inst.bathData.items.filter(i => i.itemId !== itemId);
  rerenderBathroomCard(instanceId);
}

function updateBathItem(instanceId, itemId, field, value) {
  const inst = getInstance(instanceId);
  if (!inst || !inst.bathData) return;
  const item = inst.bathData.items.find(i => i.itemId === itemId);
  if (!item) return;
  item[field] = value;
  refreshBathTotals(instanceId);
  renderSummary();
}

function refreshBathTotals(instanceId) {
  const inst = getInstance(instanceId);
  if (!inst || !inst.bathData) return;
  const bathData = inst.bathData;

  const formulaEl = document.getElementById(`bath-labour-formula-${instanceId}`);
  if (formulaEl) {
    formulaEl.textContent = `${bathData.labour.workers || '0'} × $${bathData.labour.pricePerDay || '0'} × ${bathData.labour.days || '0'} days`;
  }
  const ltEl = document.getElementById(`bath-labour-total-${instanceId}`);
  if (ltEl) ltEl.textContent = fmt(calcLabourTotal(bathData));

  bathData.items.forEach(bi => {
    const el    = document.getElementById(`bath-item-total-${instanceId}-${bi.itemId}`);
    const def   = BATHROOM_ITEMS.find(i => i.id === bi.itemId);
    const price = parseFloat(bi.unitPrice) || (def ? def.defaultPrice : 0);
    if (el) el.textContent = fmt((parseFloat(bi.qty) || 0) * price);
  });

  const estimate = calcOneBathroom(bathData);
  const subEl = document.getElementById(`subtotal-${instanceId}`);
  if (subEl) subEl.innerHTML = `${s('componentEstimate')} <strong>${fmt(estimate)}</strong>`;
  if (!state.finalPrices[instanceId]) {
    const fpInput = document.getElementById(`finalprice-input-${instanceId}`);
    if (fpInput) fpInput.value = Math.round(estimate * 1.35);
  }
}

function rerenderBathroomCard(instanceId) {
  const el   = document.getElementById(`config-${instanceId}`);
  const inst = getInstance(instanceId);
  if (el && inst) el.outerHTML = renderBathroomCard(inst);
  renderSummary();
}

// ---- Bathroom render ----

function renderBathroomCard(instance) {
  const bathData    = instance.bathData || { labour: {}, items: [] };
  const estimate    = calcOneBathroom(bathData);
  const labourTotal = calcLabourTotal(bathData);
  const siblings    = getInstancesOf(instance.compId);
  const idx         = siblings.findIndex(i => i.instanceId === instance.instanceId);
  const showNum     = siblings.length > 1;
  const title       = showNum
    ? `${t(COMP_BATHROOM, 'name')} ${idx + 1}`
    : t(COMP_BATHROOM, 'name');

  const addedIds  = bathData.items.map(i => i.itemId);
  const available = BATHROOM_ITEMS.filter(i => !addedIds.includes(i.id));

  const itemsHTML = bathData.items.length > 0 ? `
    <div class="items-table">
      <div class="items-header">
        <span>${s('colItem')}</span>
        <span>${s('colQty')}</span>
        <span>${s('colUnitPrice')}</span>
        <span>${s('colTotal')}</span>
        <span></span>
      </div>
      ${bathData.items.map(bi => {
        const def   = BATHROOM_ITEMS.find(i => i.id === bi.itemId);
        if (!def) return '';
        const price = parseFloat(bi.unitPrice) || def.defaultPrice;
        const total = (parseFloat(bi.qty) || 0) * price;
        return `
          <div class="item-row">
            <span class="item-name">${t(def, 'label')} <span class="item-unit">(${def.unit})</span></span>
            <input class="item-input" type="number" min="0" step="any"
              value="${bi.qty}" placeholder="1"
              oninput="updateBathItem('${instance.instanceId}', '${bi.itemId}', 'qty', this.value)" />
            <input class="item-input" type="number" min="0" step="any"
              value="${bi.unitPrice}" placeholder="${def.defaultPrice}"
              oninput="updateBathItem('${instance.instanceId}', '${bi.itemId}', 'unitPrice', this.value)" />
            <span class="item-total" id="bath-item-total-${instance.instanceId}-${bi.itemId}">${fmt(total)}</span>
            <button class="item-remove" onclick="removeBathItem('${instance.instanceId}', '${bi.itemId}')">✕</button>
          </div>`;
      }).join('')}
    </div>` : `<p class="bath-no-items">${s('noItemsYet')}</p>`;

  const addOpts = available.length > 0
    ? `<option value="">${s('addItemPrompt')}</option>` + available.map(i => `<option value="${i.id}">${t(i, 'label')} (${i.unit})</option>`).join('')
    : `<option value="">${s('allItemsAdded')}</option>`;

  return `
    <div class="config-card" id="config-${instance.instanceId}">
      <div class="config-header">
        <span class="drag-handle" draggable="true"
              ondragstart="dragStart(event,'${instance.instanceId}')"
              ondragend="dragEnd(event,'${instance.instanceId}')">⠿</span>
        <span class="config-icon">🚿</span>
        <h3>${title}</h3>
        <button class="config-remove" onclick="removeInstance('${instance.instanceId}')">${s('removeBtn')}</button>
      </div>

      <div class="bath-section">
        <div class="bath-section-title">${s('labour')}</div>
        <div class="labour-grid">
          <div class="labour-field">
            <label>${s('numWorkers')}</label>
            <input type="number" min="0" step="1" placeholder="0" value="${bathData.labour.workers}"
              oninput="updateBathLabour('${instance.instanceId}', 'workers', this.value)" />
          </div>
          <div class="labour-field">
            <label>${s('ratePerDay')}</label>
            <input type="number" min="0" step="any" placeholder="0" value="${bathData.labour.pricePerDay}"
              oninput="updateBathLabour('${instance.instanceId}', 'pricePerDay', this.value)" />
          </div>
          <div class="labour-field">
            <label>${s('numDays')}</label>
            <input type="number" min="0" step="any" placeholder="0" value="${bathData.labour.days}"
              oninput="updateBathLabour('${instance.instanceId}', 'days', this.value)" />
          </div>
        </div>
        <div class="labour-formula">
          <span id="bath-labour-formula-${instance.instanceId}">${bathData.labour.workers || '0'} × $${bathData.labour.pricePerDay || '0'} × ${bathData.labour.days || '0'} days</span>
          <span>=</span>
          <strong id="bath-labour-total-${instance.instanceId}">${fmt(labourTotal)}</strong>
        </div>
      </div>

      <div class="bath-section">
        <div class="bath-section-title">${s('materialsFixtures')}</div>
        ${itemsHTML}
        <div class="bath-add-item">
          <select onchange="addBathItem('${instance.instanceId}', this.value); this.value=''">
            ${addOpts}
          </select>
        </div>
      </div>

      <div class="config-subtotal" id="subtotal-${instance.instanceId}">
        ${s('componentEstimate')} <strong>${fmt(estimate)}</strong>
      </div>
      ${renderFinalPriceRow(instance.instanceId, estimate)}
    </div>`;
}
