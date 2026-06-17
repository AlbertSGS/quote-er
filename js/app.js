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

let _draggedId      = null;
let _dragOverId     = null;
let _dragInsertBefore = true;

function dragStart(event, instanceId) {
  _draggedId = instanceId;
  event.dataTransfer.effectAllowed = 'move';

  // Build a compact ghost: just the icon + title
  const card  = document.getElementById(`config-${instanceId}`);
  const icon  = card?.querySelector('.config-icon')?.textContent || '';
  const title = card?.querySelector('h3')?.textContent || '';
  const ghost = document.createElement('div');
  ghost.className = 'drag-ghost';
  ghost.textContent = `${icon} ${title}`;
  document.body.appendChild(ghost);
  event.dataTransfer.setDragImage(ghost, Math.round(ghost.offsetWidth / 2), Math.round(ghost.offsetHeight / 2));

  setTimeout(() => {
    ghost.remove();
    document.getElementById('config-cards')?.classList.add('cards-dragging');
    if (card) card.classList.add('dragging');
  }, 0);
}

function dragEnd(event, instanceId) {
  document.getElementById('config-cards')?.classList.remove('cards-dragging');
  const card = document.getElementById(`config-${instanceId}`);
  if (card) card.classList.remove('dragging');
  _clearDragOver();
  _draggedId = null;
}

function dragEnter(event, instanceId) {
  if (!_draggedId || instanceId === _draggedId) return;
  event.preventDefault();
}

function dragOver(event, instanceId) {
  if (!_draggedId || instanceId === _draggedId) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';

  const el = document.getElementById(`config-${instanceId}`);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const insertBefore = event.clientY < rect.top + rect.height / 2;

  if (_dragOverId !== instanceId || _dragInsertBefore !== insertBefore) {
    _clearDragOver();
    _dragOverId = instanceId;
    _dragInsertBefore = insertBefore;
    el.classList.add(insertBefore ? 'drag-above' : 'drag-below');
  }
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
  let insertIdx = state.instances.findIndex(i => i.instanceId === targetId);
  if (!_dragInsertBefore) insertIdx++;
  state.instances.splice(insertIdx, 0, moved);
  _draggedId = null;
  render();
}

function _clearDragOver() {
  if (_dragOverId) {
    const el = document.getElementById(`config-${_dragOverId}`);
    if (el) { el.classList.remove('drag-above'); el.classList.remove('drag-below'); }
    _dragOverId = null;
  }
}

// ---- Init ----

loadState();
render();
