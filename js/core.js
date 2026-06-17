// ---- State ----

const state = {
  category: 'interior',
  lang: 'en',
  instances: [],    // [{instanceId, compId, values, bathData?}]
  finalPrices: {},  // {instanceId: price}
  profile: {
    clientName: '', serviceLocation: '', contactInfo: '',
    companyName: '', companyEmail: '',
    contactName: '', contactPhone: '',
    designerName: '', designerPhone: '',
    logoDataUrl: ''
  }
};

const STORAGE_KEY = 'renovation-calc-v2';

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      category:    state.category,
      lang:        state.lang,
      instances:   state.instances,
      finalPrices: state.finalPrices,
      profile:     state.profile
    }));
  } catch (e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    state.category    = saved.category    || 'interior';
    state.lang        = saved.lang        || 'en';
    state.instances   = saved.instances   || [];
    state.finalPrices = saved.finalPrices || {};
    if (saved.profile) Object.assign(state.profile, saved.profile);
    const enBtn = document.getElementById('lang-btn-en');
    const zhBtn = document.getElementById('lang-btn-zh');
    if (enBtn) enBtn.classList.toggle('active', state.lang === 'en');
    if (zhBtn) zhBtn.classList.toggle('active', state.lang === 'zh');
  } catch (e) {}
}

// ---- i18n ----

function s(key) { return UI[state.lang][key] || UI.en[key] || key; }

function t(obj, key) {
  if (state.lang === 'zh') return obj[key + '_zh'] || obj[key];
  return obj[key];
}

function setLang(lang) {
  if (state.lang === lang) return;
  state.lang = lang;
  document.getElementById('lang-btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('lang-btn-zh').classList.toggle('active', lang === 'zh');
  render();
}

// ---- Utils ----

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function fmt(n) {
  if (!n || n === 0) return '$0';
  return '$' + Math.round(n).toLocaleString('en-US');
}

function getComponents() { return COMPONENTS[state.category] || []; }

function getComponent(id) {
  for (const cat of Object.values(COMPONENTS)) {
    const c = cat.find(c => c.id === id);
    if (c) return c;
  }
  return null;
}

function getInstance(instanceId) {
  return state.instances.find(i => i.instanceId === instanceId) || null;
}

function getInstancesOf(compId) {
  return state.instances.filter(i => i.compId === compId);
}

function getValues(instanceId) {
  const inst = getInstance(instanceId);
  return inst ? (inst.values || {}) : {};
}

function initValues(comp) {
  const vals = {};
  comp.fields.forEach(f => {
    vals[f.id] = f.default !== undefined ? String(f.default)
      : f.type === 'select' ? f.options[0].value : '';
  });
  return vals;
}

// ---- Calculations ----

function calcLabourTotal(bathData) {
  const w = parseFloat(bathData.labour?.workers)     || 0;
  const r = parseFloat(bathData.labour?.pricePerDay) || 0;
  const d = parseFloat(bathData.labour?.days)        || 0;
  return w * r * d;
}

function calcOneBathroom(bathData) {
  const labour = calcLabourTotal(bathData);
  const items  = (bathData.items || []).reduce((sum, bi) => {
    const def   = BATHROOM_ITEMS.find(i => i.id === bi.itemId);
    const price = parseFloat(bi.unitPrice) || (def ? def.defaultPrice : 0);
    return sum + (parseFloat(bi.qty) || 0) * price;
  }, 0);
  return labour + items;
}

function calcInstance(instance) {
  const comp = getComponent(instance.compId);
  if (!comp) return 0;
  if (comp.customType === 'bathroom') return calcOneBathroom(instance.bathData || {});
  try { return comp.calculate(instance.values || {}); } catch { return 0; }
}

function getFinalPrice(instance) {
  const override = state.finalPrices[instance.instanceId];
  if (override !== null && override !== undefined && override !== '') {
    return parseFloat(override) || 0;
  }
  return Math.round(calcInstance(instance) * 1.35);
}
