const COMP_PAINT = {
  id: 'paint',
  name: 'Interior Paint',        name_zh: '室内油漆',
  icon: '🖌️',
  tagline: 'Walls, ceilings & trim',
  tagline_zh: '墙壁、天花板与线条',
  fields: [
    {
      id: 'area',
      label: 'Wall Area',        label_zh: '墙面面积',
      type: 'number',
      unit: 'sq ft',
      placeholder: '0',
      min: 0,
      hint:    'Tip: add up (room perimeter × ceiling height) for each room',
      hint_zh: '提示：各房间（周长 × 层高）面积之和'
    },
    {
      id: 'quality',
      label: 'Paint Quality',    label_zh: '油漆品质',
      type: 'select',
      options: [
        { label: 'Standard', label_zh: '标准', value: 'standard', price: 1.5, priceLabel: '$1.50 / sq ft' },
        { label: 'Premium',  label_zh: '高级', value: 'premium',  price: 2.5, priceLabel: '$2.50 / sq ft' },
        { label: 'Luxury',   label_zh: '豪华', value: 'luxury',   price: 3.5, priceLabel: '$3.50 / sq ft' },
      ]
    },
    {
      id: 'coats',
      label: 'Coats',            label_zh: '涂层数',
      type: 'select',
      default: '2',
      options: [
        { label: '1 Coat',  label_zh: '1遍', value: '1', multiplier: 1.0, priceLabel: '× 1.0' },
        { label: '2 Coats', label_zh: '2遍', value: '2', multiplier: 1.6, priceLabel: '× 1.6' },
      ]
    }
  ],
  calculate(values) {
    const area   = parseFloat(values.area) || 0;
    const qField = this.fields.find(f => f.id === 'quality');
    const cField = this.fields.find(f => f.id === 'coats');
    const qOpt   = qField.options.find(o => o.value === values.quality) || qField.options[0];
    const cOpt   = cField.options.find(o => o.value === values.coats)   || cField.options[1];
    return area * qOpt.price * cOpt.multiplier;
  }
};
