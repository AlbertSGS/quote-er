// ---- Actions ----

function addInstance(compId) {
  const comp = getComponent(compId);
  if (!comp || comp.comingSoon) return;
  const instanceId = genId();
  const inst = { instanceId, compId, values: initValues(comp) };
  if (comp.customType === 'bathroom') {
    inst.bathData = createEmptyBathData();
  }
  state.instances.push(inst);
  render();
}

function removeInstance(instanceId) {
  state.instances = state.instances.filter(i => i.instanceId !== instanceId);
  delete state.finalPrices[instanceId];
  render();
}

function updateValue(instanceId, fieldId, value) {
  const inst = getInstance(instanceId);
  if (!inst) return;
  if (!inst.values) inst.values = {};
  inst.values[fieldId] = value;
  updateSubtotal(instanceId);
  renderSummary();
}

function switchCategory(cat) {
  if (state.category === cat) return;
  state.category    = cat;
  state.instances   = [];
  state.finalPrices = {};
  render();
}

function resetAll() {
  state.instances   = [];
  state.finalPrices = {};
  render();
}

function updateFinalPrice(instanceId, value) {
  state.finalPrices[instanceId] = value === '' ? null : value;
  const row = document.getElementById(`finalprice-row-${instanceId}`);
  if (row) row.classList.toggle('has-override', value !== '');
  renderSummary();
}

function resetFinalPrice(instanceId) {
  state.finalPrices[instanceId] = null;
  const row = document.getElementById(`finalprice-row-${instanceId}`);
  if (row) row.classList.remove('has-override');
  const inst = getInstance(instanceId);
  if (!inst) return;
  const fpInput = document.getElementById(`finalprice-input-${instanceId}`);
  if (fpInput) fpInput.value = Math.round(calcInstance(inst) * 1.35);
  renderSummary();
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
