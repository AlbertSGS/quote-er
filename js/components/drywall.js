const COMP_DRYWALL = {
  id: 'drywall',
  name: 'Drywall & Ceiling',     name_zh: '干墙与天花板',
  icon: '🔨',
  tagline: 'New drywall, skim coat & repairs',
  tagline_zh: '新墙板、刮腻子与修补',
  fields: [
    {
      id: 'area',
      label: 'Area',             label_zh: '面积',
      type: 'number',
      unit: 'sq ft',
      placeholder: '0',
      min: 0
    },
    {
      id: 'type',
      label: 'Work Type',        label_zh: '工程类型',
      type: 'select',
      options: [
        { label: 'Skim Coat (existing walls)',     label_zh: '刮腻子（现有墙面）',   value: 'skim',    price: 1.5, priceLabel: '$1.50 / sq ft' },
        { label: 'New Drywall (supply & install)', label_zh: '新干墙（供料及安装）', value: 'new',     price: 2.5, priceLabel: '$2.50 / sq ft' },
        { label: 'Ceiling Drywall',               label_zh: '天花板干墙',           value: 'ceiling', price: 3.0, priceLabel: '$3 / sq ft' },
      ]
    }
  ],
  calculate(values) {
    const area  = parseFloat(values.area) || 0;
    const field = this.fields.find(f => f.id === 'type');
    const opt   = field.options.find(o => o.value === values.type) || field.options[0];
    return area * opt.price;
  }
};
