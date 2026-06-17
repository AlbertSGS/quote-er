// ---- State ----

const state = {
  category: 'interior',
  lang: 'en',
  selected: [],
  values: {},
  bathrooms: [],
  finalPrices: {},
  profile: {
    clientName: '', serviceLocation: '', contactInfo: '',
    companyName: '', companyEmail: '',
    contactName: '', contactPhone: '',
    designerName: '', designerPhone: '',
    logoDataUrl: ''
  }
};

const STORAGE_KEY = 'renovation-calc-v1';

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      category:    state.category,
      lang:        state.lang,
      selected:    state.selected,
      values:      state.values,
      bathrooms:   state.bathrooms,
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
    state.selected    = saved.selected    || [];
    state.values      = saved.values      || {};
    state.bathrooms   = saved.bathrooms   || [];
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

function getValues(compId) { return state.values[compId] || {}; }

function initValues(comp) {
  const vals = {};
  comp.fields.forEach(f => {
    vals[f.id] = f.default !== undefined ? String(f.default)
      : f.type === 'select' ? f.options[0].value : '';
  });
  return vals;
}

// ---- Calculations ----

function calcComponent(comp) {
  if (comp.customType === 'bathroom') return calcAllBathrooms();
  try { return comp.calculate(getValues(comp.id)); } catch { return 0; }
}

function calcLabourTotal(bath) {
  const w = parseFloat(bath.labour.workers)    || 0;
  const r = parseFloat(bath.labour.pricePerDay) || 0;
  const d = parseFloat(bath.labour.days)        || 0;
  return w * r * d;
}

function calcOneBathroom(bath) {
  const labour = calcLabourTotal(bath);
  const items  = bath.items.reduce((sum, bi) => {
    const def   = BATHROOM_ITEMS.find(i => i.id === bi.itemId);
    const price = parseFloat(bi.unitPrice) || (def ? def.defaultPrice : 0);
    return sum + (parseFloat(bi.qty) || 0) * price;
  }, 0);
  return labour + items;
}

function calcAllBathrooms() {
  return state.bathrooms.reduce((sum, b) => sum + calcOneBathroom(b), 0);
}

function getFinalPrice(comp) {
  const override = state.finalPrices[comp.id];
  if (override !== null && override !== undefined && override !== '') {
    return parseFloat(override) || 0;
  }
  return Math.round(calcComponent(comp) * 1.35);
}
