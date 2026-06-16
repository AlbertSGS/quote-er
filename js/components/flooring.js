const COMP_FLOORING = {
  id: 'flooring',
  name: 'Flooring',              name_zh: '地板',
  icon: '🪵',
  tagline: 'Hardwood, laminate, vinyl & more',
  tagline_zh: '实木、复合板、乙烯基地板等',
  fields: [
    {
      id: 'area',
      label: 'Total Area',       label_zh: '总面积',
      type: 'number',
      unit: 'sq ft',
      placeholder: '0',
      min: 0
    },
    {
      id: 'material',
      label: 'Material',         label_zh: '材料',
      type: 'select',
      options: [
        { label: 'Carpet',              label_zh: '地毯',             value: 'carpet',     price: 3,   priceLabel: '$3 / sq ft' },
        { label: 'Vinyl Plank (LVP)',   label_zh: '乙烯基地板 (LVP)', value: 'lvp',        price: 3.5, priceLabel: '$3.50 / sq ft' },
        { label: 'Laminate',            label_zh: '复合地板',         value: 'laminate',   price: 4,   priceLabel: '$4 / sq ft' },
        { label: 'Tile',                label_zh: '瓷砖',             value: 'tile',       price: 6,   priceLabel: '$6 / sq ft' },
        { label: 'Engineered Hardwood', label_zh: '工程木地板',       value: 'engineered', price: 6,   priceLabel: '$6 / sq ft' },
        { label: 'Hardwood',            label_zh: '实木地板',         value: 'hardwood',   price: 8,   priceLabel: '$8 / sq ft' },
      ]
    }
  ],
  calculate(values) {
    const area  = parseFloat(values.area) || 0;
    const field = this.fields.find(f => f.id === 'material');
    const opt   = field.options.find(o => o.value === values.material) || field.options[0];
    return area * opt.price;
  }
};
