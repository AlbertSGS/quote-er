const COMP_KITCHEN = {
  id: 'kitchen',
  name: 'Kitchen',               name_zh: '厨房',
  icon: '🍳',
  tagline: 'Countertops & backsplash',
  tagline_zh: '台面与挡板',
  fields: [
    {
      id: 'counterLength',
      label: 'Counter Length',      label_zh: '台面长度',
      type: 'number',
      unit: 'lin ft',
      placeholder: '0',
      min: 0
    },
    {
      id: 'counterMaterial',
      label: 'Countertop Material', label_zh: '台面材料',
      type: 'select',
      options: [
        { label: 'Laminate',      label_zh: '复合板台面', value: 'laminate', price: 20, priceLabel: '$20 / lin ft' },
        { label: 'Butcher Block', label_zh: '木砧板台面', value: 'butcher',  price: 40, priceLabel: '$40 / lin ft' },
        { label: 'Granite',       label_zh: '花岗岩台面', value: 'granite',  price: 60, priceLabel: '$60 / lin ft' },
        { label: 'Quartz',        label_zh: '石英石台面', value: 'quartz',   price: 70, priceLabel: '$70 / lin ft' },
        { label: 'Marble',        label_zh: '大理石台面', value: 'marble',   price: 80, priceLabel: '$80 / lin ft' },
      ]
    },
    {
      id: 'backsplashArea',
      label: 'Backsplash Area',     label_zh: '挡板面积',
      type: 'number',
      unit: 'sq ft',
      placeholder: '0',
      min: 0
    },
    {
      id: 'backsplashType',
      label: 'Backsplash Tile',     label_zh: '挡板瓷砖',
      type: 'select',
      options: [
        { label: 'Ceramic',       label_zh: '陶瓷砖',  value: 'ceramic', price: 5,  priceLabel: '$5 / sq ft' },
        { label: 'Subway Tile',   label_zh: '地铁砖',  value: 'subway',  price: 7,  priceLabel: '$7 / sq ft' },
        { label: 'Natural Stone', label_zh: '天然石材', value: 'stone',   price: 12, priceLabel: '$12 / sq ft' },
        { label: 'Glass Tile',    label_zh: '玻璃砖',  value: 'glass',   price: 14, priceLabel: '$14 / sq ft' },
      ]
    }
  ],
  calculate(values) {
    const counterLen = parseFloat(values.counterLength)   || 0;
    const bsArea     = parseFloat(values.backsplashArea)  || 0;
    const cField     = this.fields.find(f => f.id === 'counterMaterial');
    const bField     = this.fields.find(f => f.id === 'backsplashType');
    const cOpt       = cField.options.find(o => o.value === values.counterMaterial) || cField.options[0];
    const bOpt       = bField.options.find(o => o.value === values.backsplashType)  || bField.options[0];
    return (counterLen * cOpt.price) + (bsArea * bOpt.price);
  }
};
