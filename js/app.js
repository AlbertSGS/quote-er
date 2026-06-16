// ---- Actions ----

function toggleComponent(id) {
  const comp = getComponent(id);
  if (!comp || comp.comingSoon) return;
  const idx = state.selected.indexOf(id);
  if (idx === -1) {
    state.selected.push(id);
    if (comp.customType === 'bathroom' && state.bathrooms.length === 0) {
      state.bathrooms.push(createEmptyBathroom(1));
    }
    if (!state.values[id]) state.values[id] = initValues(comp);
  } else {
    state.selected.splice(idx, 1);
    if (comp.customType === 'bathroom') state.bathrooms = [];
  }
  render();
}

function updateValue(compId, fieldId, value) {
  if (!state.values[compId]) state.values[compId] = {};
  state.values[compId][fieldId] = value;
  updateSubtotal(compId);
  renderSummary();
}

function switchCategory(cat) {
  if (state.category === cat) return;
  state.category  = cat;
  state.selected  = [];
  state.values    = {};
  state.bathrooms = [];
  render();
}

function resetAll() {
  state.selected  = [];
  state.values    = {};
  state.bathrooms = [];
  render();
}

function updateProfile(field, value) {
  state.profile[field] = value;
  saveState();
}

function handleLogoUpload(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    state.profile.logoDataUrl = e.target.result;
    saveState();
    renderProfileSection();
  };
  reader.readAsDataURL(file);
}

function clearLogo() {
  state.profile.logoDataUrl = '';
  saveState();
  renderProfileSection();
}

// ---- Init ----

loadState();
render();
