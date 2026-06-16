const COMP_GARBAGE_DISPOSAL = {
  id: 'garbageDisposal',
  name: 'Garbage Disposal',   name_zh: '垃圾处理',
  icon: '🗑️',
  tagline: 'Supply & installation',
  tagline_zh: '供应与安装',
  fields: [
    {
      id: 'disposalCost',
      label: 'Total Cost',    label_zh: '总费用',
      type: 'number',
      unit: '$',
      placeholder: '500',
      min: 0
    }
  ],
  calculate(values) {
    return parseFloat(values.disposalCost) || 500;
  }
};
