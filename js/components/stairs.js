const COMP_STAIRS = {
  id: 'stairs',
  name: 'Stairs',                name_zh: '楼梯',
  icon: '🪜',
  tagline: 'Treads, risers & railing',
  tagline_zh: '踏板、立板与栏杆',
  fields: [
    {
      id: 'steps',
      label: 'Number of Steps',  label_zh: '踏步数量',
      type: 'number',
      unit: 'steps',
      placeholder: '0',
      min: 0
    },
    {
      id: 'material',
      label: 'Tread Material',   label_zh: '踏面材料',
      type: 'select',
      options: [
        { label: 'Carpet',      label_zh: '地毯',       value: 'carpet',   price: 35, priceLabel: '$35 / step' },
        { label: 'Vinyl / LVP', label_zh: '乙烯基地板', value: 'vinyl',    price: 45, priceLabel: '$45 / step' },
        { label: 'Tile',        label_zh: '瓷砖',       value: 'tile',     price: 65, priceLabel: '$65 / step' },
        { label: 'Hardwood',    label_zh: '实木',       value: 'hardwood', price: 75, priceLabel: '$75 / step' },
      ]
    },
    {
      id: 'railing',
      label: 'Railing',          label_zh: '栏杆',
      type: 'select',
      options: [
        { label: 'No Railing',      label_zh: '无栏杆',   value: 'none',    price: 0,  priceLabel: 'not included' },
        { label: 'Basic Railing',   label_zh: '基础栏杆', value: 'basic',   price: 40, priceLabel: '+$40 / step' },
        { label: 'Premium Railing', label_zh: '高级栏杆', value: 'premium', price: 80, priceLabel: '+$80 / step' },
      ]
    }
  ],
  calculate(values) {
    const steps  = parseFloat(values.steps) || 0;
    const mField = this.fields.find(f => f.id === 'material');
    const rField = this.fields.find(f => f.id === 'railing');
    const mOpt   = mField.options.find(o => o.value === values.material) || mField.options[0];
    const rOpt   = rField.options.find(o => o.value === values.railing)  || rField.options[0];
    return steps * (mOpt.price + rOpt.price);
  }
};
