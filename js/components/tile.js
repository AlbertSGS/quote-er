const COMP_TILE = {
  id: 'tile',
  name: 'Tile Work',             name_zh: '瓷砖工程',
  icon: '🔲',
  tagline: 'Floor, wall & backsplash',
  tagline_zh: '地面、墙面与挡板',
  fields: [
    {
      id: 'area',
      label: 'Tile Area',        label_zh: '瓷砖面积',
      type: 'number',
      unit: 'sq ft',
      placeholder: '0',
      min: 0
    },
    {
      id: 'type',
      label: 'Tile Type',        label_zh: '瓷砖类型',
      type: 'select',
      options: [
        { label: 'Ceramic',       label_zh: '陶瓷砖',    value: 'ceramic',   price: 5,  priceLabel: '$5 / sq ft' },
        { label: 'Porcelain',     label_zh: '瓷质砖',    value: 'porcelain', price: 8,  priceLabel: '$8 / sq ft' },
        { label: 'Natural Stone', label_zh: '天然石材',  value: 'stone',     price: 12, priceLabel: '$12 / sq ft' },
        { label: 'Glass Mosaic',  label_zh: '玻璃马赛克', value: 'glass',    price: 15, priceLabel: '$15 / sq ft' },
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
