async function loadLogoPng() {
  try {
    const res = await fetch('assets/logo.png');
    if (!res.ok) return null;
    const blob = await res.blob();
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload  = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch(e) {}
  return null;
}

async function printQuote() {
  if (typeof pdfMake === 'undefined') {
    alert('PDF library not loaded. Please check your internet connection.');
    return;
  }
  const previewWin = window.open('', '_blank');
  if (!previewWin) {
    alert('Please allow pop-ups to preview the quotation.');
    return;
  }
  previewWin.document.write(`<html><head><title>Generating quotation…</title></head>
    <body style="margin:0;display:flex;align-items:center;justify-content:center;
                 height:100vh;background:#444;font-family:sans-serif">
      <p style="color:#fff;font-size:15px">Generating quotation…</p>
    </body></html>`);

  const logoSvg = await loadLogoPng();

  pdfMake.createPdf(buildDocDef(logoSvg)).getBlob(blob => {
    const url = URL.createObjectURL(blob);
    previewWin.location.href = url;
  });
}

function buildDocDef(logoSvg) {
  const isZh   = state.lang === 'zh';
  const RED    = '#B12418';
  const RULE   = '#DDDDDD';
  const today  = new Date().toLocaleDateString('en-CA');

  const ordered  = state.selected.map(id => getComponent(id)).filter(Boolean);
  const subtotal = ordered.reduce((sum, comp) => sum + calcComponent(comp), 0);
  const overhead = Math.round(subtotal * 0.15);
  const total    = subtotal + overhead;

  const logoEl = logoSvg
    ? { image: logoSvg, width: 260, alignment: 'center' }
    : { text: '', margin: [0, 0, 0, 0] };

  const pageHeader = () => ({
    stack: [
      logoEl,
      { text: 'To:',                fontSize: 9, margin: [0, 8, 0, 2] },
      { text: 'Service Locations:', fontSize: 9, margin: [0, 0, 0, 2] },
      { text: 'Contact info:',      fontSize: 9, margin: [0, 0, 0, 4] },
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 503, y2: 0, lineWidth: 0.5, lineColor: RULE }] },
    ],
    margin: [46, 16, 46, 0]
  });

  const pageFooter = () => ({
    stack: [
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 503, y2: 0, lineWidth: 0.5, lineColor: RULE }] },
      {
        columns: [
          { stack: [
            { text: '[Company Name]',    fontSize: 8, bold: true },
            { text: 'company@email.com', fontSize: 8, color: '#666' }
          ]},
          { stack: [
            { text: '[Name]',        fontSize: 8, bold: true },
            { text: '(XXX) XXX-XXXX', fontSize: 8, color: '#666' }
          ], alignment: 'center' },
          { stack: [
            { text: '[Designer]',     fontSize: 8, bold: true },
            { text: '(XXX) XXX-XXXX', fontSize: 8, color: '#666' }
          ], alignment: 'right' },
        ],
        margin: [0, 4, 0, 0]
      }
    ],
    margin: [46, 6, 46, 0]
  });

  const tableLayout = {
    hLineWidth: (i, node) => (i === 0 || i === node.table.body.length) ? 0 : 0.5,
    vLineWidth: () => 0,
    hLineColor: () => RULE,
    paddingLeft:   () => 8,
    paddingRight:  () => 8,
    paddingTop:    () => 6,
    paddingBottom: () => 6,
  };

  const tableHeaderRow = [
    { text: isZh ? '项目'    : 'Item',               color: 'white', bold: true, fontSize: 9, fillColor: RED },
    { text: isZh ? '说明及规格' : 'Description & Spec', color: 'white', bold: true, fontSize: 9, fillColor: RED },
    { text: isZh ? '金额 $'  : 'Amount $',            color: 'white', bold: true, fontSize: 9, fillColor: RED, alignment: 'right' },
  ];

  const content = [];

  content.push({ text: isZh ? '工程报价单' : 'Exterior Work Quotation', fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 6] });
  content.push({ text: `${isZh ? '日期' : 'Date'}: ${today}`, fontSize: 10, bold: true, alignment: 'center', margin: [0, 0, 0, 18] });

  if (ordered.length === 0) {
    content.push({ text: isZh ? '暂无项目' : 'No items selected', fontSize: 9, color: '#AAA', italics: true, margin: [0, 0, 0, 14] });
  } else {
    const allRows = [];
    ordered.forEach(comp => {
      const rows = buildSectionRows(comp, isZh);
      allRows.push(...rows);
    });
    content.push({ table: { widths: [100, '*', 72], body: [tableHeaderRow, ...allRows] }, layout: tableLayout, margin: [0, 0, 0, 16] });
  }

  content.push({
    columns: [
      { text: '', width: '*' },
      {
        width: 240,
        columns: [
          { text: isZh ? '小计' : 'Total Amount (Sub-Total):', fontSize: 10, bold: true, color: RED },
          { text: `${fmt(total)} CAD`,                          fontSize: 10, bold: true, color: RED, alignment: 'right' }
        ]
      }
    ],
    margin: [0, 0, 0, 18]
  });

  content.push({
    text: 'BBN Renovations Ltd. promises for quality work and 1 year warranty for all projects done, with no extra cost.',
    fontSize: 9
  });

  return {
    pageSize: 'LETTER',
    pageMargins: [46, 148, 46, 70],
    header: pageHeader,
    footer: pageFooter,
    content,
    defaultStyle: { font: 'Roboto', fontSize: 10, lineHeight: 1.35 }
  };
}

function buildSectionRows(comp, isZh) {
  const noDesc = { text: '—', fontSize: 9, color: '#AAA', italics: true };

  if (comp.customType === 'bathroom') {
    const single = state.bathrooms.length === 1;
    const rows   = [];
    state.bathrooms.forEach(bath => {
      const itemName = single
        ? (isZh ? '浴室装修' : 'Bathroom Renovation')
        : (isZh ? `浴室 ${bath.label}` : `Bathroom ${bath.label}`);
      const detailLines = bath.items
        .map(bi => {
          const def = BATHROOM_ITEMS.find(d => d.id === bi.itemId);
          if (!def) return null;
          const qty = parseFloat(bi.qty);
          return t(def, 'label') + (qty && qty !== 1 ? ` ×${qty}` : '');
        })
        .filter(Boolean);
      const descStack = detailLines.length
        ? { stack: detailLines.map(l => ({ text: l, fontSize: 9 })) }
        : noDesc;
      rows.push([
        { text: itemName, fontSize: 9 },
        descStack,
        { text: fmt(calcOneBathroom(bath)), fontSize: 9, bold: true, alignment: 'right' }
      ]);
    });
    return rows.length ? rows : [[{ text: '—', colSpan: 3, fontSize: 9, color: '#AAA' }, {}, {}]];
  }

  const price   = calcComponent(comp);
  const details = describeCompForQuote(comp);
  const descStack = details.length
    ? { stack: details.map(l => ({ text: l, fontSize: 9 })) }
    : noDesc;
  return [[
    { text: t(comp, 'name'), fontSize: 9 },
    descStack,
    { text: fmt(price), fontSize: 9, bold: true, alignment: 'right' }
  ]];
}

function describeCompForQuote(comp) {
  const vals  = getValues(comp.id);
  const lines = [];
  comp.fields.forEach(f => {
    const val = vals[f.id];
    if (!val) return;
    if (f.type === 'number') {
      const n = parseFloat(val);
      if (n > 0) lines.push(`${t(f, 'label')}: ${n} ${f.unit || ''}`);
    } else if (f.type === 'select') {
      const opt = f.options.find(o => o.value === val) || f.options[0];
      if (opt) lines.push(`${t(f, 'label')}: ${t(opt, 'label')}`);
    }
  });
  return lines;
}
