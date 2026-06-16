const COMP_TRIM = {
  id: 'trim',
  name: 'Trim & Molding',        name_zh: '装饰线条',
  icon: '📐',
  tagline: 'Baseboards, crown & casings',
  tagline_zh: '踢脚线、冠线与门框',
  fields: [
    {
      id: 'length',
      label: 'Total Length',     label_zh: '总长度',
      type: 'number',
      unit: 'lin ft',
      placeholder: '0',
      min: 0
    },
    {
      id: 'grade',
      label: 'Grade',            label_zh: '等级',
      type: 'select',
      options: [
        { label: 'Basic',     label_zh: '基础款', value: 'basic',  price: 3, priceLabel: '$3 / lin ft' },
        { label: 'Mid-Grade', label_zh: '中档款', value: 'mid',    price: 5, priceLabel: '$5 / lin ft' },
        { label: 'Custom',    label_zh: '定制款', value: 'custom', price: 8, priceLabel: '$8 / lin ft' },
      ]
    }
  ],
  calculate(values) {
    const length = parseFloat(values.length) || 0;
    const field  = this.fields.find(f => f.id === 'grade');
    const opt    = field.options.find(o => o.value === values.grade) || field.options[0];
    return length * opt.price;
  }
};
