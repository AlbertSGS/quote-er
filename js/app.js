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

// ---- Drag to reorder ----

let _draggedId = null;
let _dragOverId = null;

function dragStart(event, instanceId) {
  _draggedId = instanceId;
  event.dataTransfer.effectAllowed = 'move';
  const card = document.getElementById(`config-${instanceId}`);
  if (card) {
    const rect = card.getBoundingClientRect();
    event.dataTransfer.setDragImage(card, event.clientX - rect.left, event.clientY - rect.top);
  }
  setTimeout(() => {
    if (card) card.classList.add('dragging');
  }, 0);
}

function dragEnd(event, instanceId) {
  const card = document.getElementById(`config-${instanceId}`);
  if (card) card.classList.remove('dragging');
  _clearDragOver();
  _draggedId = null;
}

function dragEnter(event, instanceId) {
  if (!_draggedId || instanceId === _draggedId) return;
  event.preventDefault();
  if (_dragOverId !== instanceId) {
    _clearDragOver();
    _dragOverId = instanceId;
    const el = document.getElementById(`config-${instanceId}`);
    if (el) el.classList.add('drag-over');
  }
}

function dragOver(event) {
  if (!_draggedId) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function dragLeave(event, instanceId) {
  if (event.currentTarget.contains(event.relatedTarget)) return;
  if (_dragOverId === instanceId) _clearDragOver();
}

function dragDrop(event, targetId) {
  event.preventDefault();
  _clearDragOver();
  if (!_draggedId || _draggedId === targetId) { _draggedId = null; return; }
  const fromIdx = state.instances.findIndex(i => i.instanceId === _draggedId);
  const [moved] = state.instances.splice(fromIdx, 1);
  const insertIdx = state.instances.findIndex(i => i.instanceId === targetId);
  state.instances.splice(insertIdx, 0, moved);
  _draggedId = null;
  render();
}

function _clearDragOver() {
  if (_dragOverId) {
    const el = document.getElementById(`config-${_dragOverId}`);
    if (el) el.classList.remove('drag-over');
    _dragOverId = null;
  }
}

// ---- Init ----

loadState();
render();
