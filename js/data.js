// Component definitions and preset pricing.
// All prices are supply + labour estimates in USD.
// Update prices here — no changes needed elsewhere.
// Add _zh properties to translate any label into Chinese.

// Bathroom line-item list. Add/reorder here to update the "Add item" menu.
// defaultPrice = 0 means contractor fills it in per job.
const BATHROOM_ITEMS = [
  // Structural / substrate
  { id: 'misc-materials',  label: 'Miscellaneous Materials (e.g. cement)',  label_zh: '辅料 如水泥',              unit: 'lot',    defaultPrice: 0 },
  { id: 'cement-board',    label: 'Cement Board (3×5)',                     label_zh: '水泥板（3x5）',            unit: 'sheet',  defaultPrice: 0 },
  { id: 'drywall-moist',   label: 'Moisture-Resistant Drywall (4×8)',       label_zh: '防水drywall（4x8）',       unit: 'sheet',  defaultPrice: 0 },
  { id: 'drywall-std',     label: 'Drywall (4×8 / 32 sq ft)',               label_zh: 'drywall（32sqft 4x8）',    unit: 'sheet',  defaultPrice: 0 },
  { id: 'structural-mod',  label: 'Structural Modification (Custom)',        label_zh: '结构改造-个例',            unit: 'lot',    defaultPrice: 0 },

  // Finishes
  { id: 'paint',           label: 'Paint',                                  label_zh: '油漆',                    unit: 'lot',    defaultPrice: 0 },
  { id: 'tile-std',        label: 'Tile — Standard (1×2, 2×2)',             label_zh: '瓷砖 标准1*2 2*2',         unit: 'sq ft',  defaultPrice: 0 },
  { id: 'tile-premium',    label: 'Tile — Premium (2×4, 3×3)',              label_zh: '瓷砖 高端 2*4、3*3',       unit: 'sq ft',  defaultPrice: 0 },
  { id: 'tile-custom',     label: 'Tile — Custom Case',                     label_zh: '瓷砖 个例',               unit: 'lot',    defaultPrice: 0 },
  { id: 'water-barrier',   label: 'Water Barrier Strip',                    label_zh: '挡水条',                  unit: 'unit',   defaultPrice: 0 },

  // Plumbing & mechanical
  { id: 'plumbing-mod',    label: 'Plumbing Modification',                  label_zh: '水路改造',                unit: 'lot',    defaultPrice: 0 },
  { id: 'electrical-mod',  label: 'Electrical Modification',                label_zh: '电路改造',                unit: 'lot',    defaultPrice: 0 },
  { id: 'fresh-air',       label: 'Fresh Air System Installation',          label_zh: '新风系统改造',             unit: 'unit',   defaultPrice: 0 },
  { id: 'exhaust-fan',     label: 'New Exhaust Fan',                        label_zh: '全新换气扇排风',           unit: 'unit',   defaultPrice: 0 },

  // Toilet
  { id: 'toilet-std',      label: 'Toilet — Standard',                     label_zh: '马桶 标准',               unit: 'unit',   defaultPrice: 0 },
  { id: 'toilet-smart',    label: 'Toilet — Smart',                        label_zh: '马桶 智能',               unit: 'unit',   defaultPrice: 0 },

  // Vanity
  { id: 'vanity-24-30',    label: 'Vanity — Standard 24–30"',              label_zh: '洗手台 标准 24-30',        unit: 'unit',   defaultPrice: 0 },
  { id: 'vanity-32-42',    label: 'Vanity — Standard 32–42"',              label_zh: '洗手台 标准 32-42',        unit: 'unit',   defaultPrice: 0 },
  { id: 'vanity-45-60',    label: 'Vanity — Standard 45–60"',              label_zh: '洗手台 标准 45-60',        unit: 'unit',   defaultPrice: 0 },
  { id: 'vanity-70plus',   label: 'Vanity — Standard 70"+',                label_zh: '洗手台 标准 70+',          unit: 'unit',   defaultPrice: 0 },
  { id: 'vanity-custom',   label: 'Vanity — Custom',                       label_zh: '洗手台 定制',              unit: 'unit',   defaultPrice: 0 },
  { id: 'vanity-case',     label: 'Vanity — Custom Case',                  label_zh: '洗手台 个例',              unit: 'lot',    defaultPrice: 0 },

  // Faucets
  { id: 'faucet-vanity-std',  label: 'Vanity Faucet — Standard',           label_zh: '洗手台水龙头-标配',        unit: 'unit',   defaultPrice: 0 },
  { id: 'faucet-vanity-bg',   label: 'Vanity Faucet — Black Gold',         label_zh: '洗手台水龙头-黑金',        unit: 'unit',   defaultPrice: 0 },
  { id: 'faucet-shower-std',  label: 'Shower Faucet — Standard',           label_zh: '洗澡水龙头-标准',          unit: 'unit',   defaultPrice: 0 },
  { id: 'faucet-shower-bg',   label: 'Shower Faucet — Black Gold',         label_zh: '洗澡水龙头-黑金',          unit: 'unit',   defaultPrice: 0 },
  { id: 'faucet-tub',         label: 'Bathtub Faucet',                     label_zh: '浴缸水龙头',              unit: 'unit',   defaultPrice: 0 },

  // Shower / glass
  { id: 'door-single-glass',  label: 'Single-Panel Glass Door',            label_zh: '单板玻璃门',              unit: 'unit',   defaultPrice: 0 },
  { id: 'door-l-glass',       label: 'L-Shaped Glass Door',                label_zh: 'L玻璃门',                 unit: 'unit',   defaultPrice: 0 },
  { id: 'door-hardware-bg',   label: 'Glass Door Hardware — Black Gold',   label_zh: '玻璃门五金 黑金',          unit: 'set',    defaultPrice: 0 },

  // Bathtub
  { id: 'tub-dropin',     label: 'Bathtub — Drop-In',                      label_zh: '浴缸 嵌入式',             unit: 'unit',   defaultPrice: 0 },
  { id: 'tub-freestand',  label: 'Bathtub — Freestanding',                 label_zh: '浴缸 独立',               unit: 'unit',   defaultPrice: 0 },
  { id: 'tub-custom',     label: 'Bathtub — Custom Case',                  label_zh: '浴缸 个例',               unit: 'lot',    defaultPrice: 0 },

  // Lighting
  { id: 'pot-lights',     label: 'Pot Lights',                             label_zh: '射灯',                    unit: 'unit',   defaultPrice: 0 },
  { id: 'mirror-light',   label: 'Vanity Light (mirror front)',            label_zh: '镜前灯',                  unit: 'unit',   defaultPrice: 0 },

  // Mirrors & accessories
  { id: 'mirror-std',         label: 'Mirror',                             label_zh: '镜子',                    unit: 'unit',   defaultPrice: 0 },
  { id: 'mirror-led',         label: 'LED Mirror',                         label_zh: 'LED镜子',                 unit: 'unit',   defaultPrice: 0 },
  { id: 'bath-accessories',   label: 'Bathroom Accessories Set',           label_zh: '卫浴挂件',                unit: 'set',    defaultPrice: 0 },
];

const COMPONENTS = {
  interior: [
    {
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
            { label: 'Carpet',               label_zh: '地毯',          value: 'carpet',     price: 3,   priceLabel: '$3 / sq ft' },
            { label: 'Vinyl Plank (LVP)',     label_zh: '乙烯基地板 (LVP)', value: 'lvp',     price: 3.5, priceLabel: '$3.50 / sq ft' },
            { label: 'Laminate',             label_zh: '复合地板',        value: 'laminate',  price: 4,   priceLabel: '$4 / sq ft' },
            { label: 'Tile',                 label_zh: '瓷砖',            value: 'tile',      price: 6,   priceLabel: '$6 / sq ft' },
            { label: 'Engineered Hardwood',  label_zh: '工程木地板',      value: 'engineered', price: 6,  priceLabel: '$6 / sq ft' },
            { label: 'Hardwood',             label_zh: '实木地板',        value: 'hardwood',  price: 8,   priceLabel: '$8 / sq ft' },
          ]
        }
      ],
      calculate(values) {
        const area = parseFloat(values.area) || 0;
        const field = this.fields.find(f => f.id === 'material');
        const opt = field.options.find(o => o.value === values.material) || field.options[0];
        return area * opt.price;
      }
    },

    {
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
            { label: 'Standard',  label_zh: '标准', value: 'standard',  price: 1.5, priceLabel: '$1.50 / sq ft' },
            { label: 'Premium',   label_zh: '高级', value: 'premium',   price: 2.5, priceLabel: '$2.50 / sq ft' },
            { label: 'Luxury',    label_zh: '豪华', value: 'luxury',    price: 3.5, priceLabel: '$3.50 / sq ft' },
          ]
        },
        {
          id: 'coats',
          label: 'Coats',            label_zh: '涂层数',
          type: 'select',
          default: '2',
          options: [
            { label: '1 Coat',   label_zh: '1遍', value: '1', multiplier: 1.0, priceLabel: '× 1.0' },
            { label: '2 Coats',  label_zh: '2遍', value: '2', multiplier: 1.6, priceLabel: '× 1.6' },
          ]
        }
      ],
      calculate(values) {
        const area = parseFloat(values.area) || 0;
        const qField = this.fields.find(f => f.id === 'quality');
        const cField = this.fields.find(f => f.id === 'coats');
        const qOpt = qField.options.find(o => o.value === values.quality) || qField.options[0];
        const cOpt = cField.options.find(o => o.value === values.coats) || cField.options[1];
        return area * qOpt.price * cOpt.multiplier;
      }
    },

    {
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
        const steps = parseFloat(values.steps) || 0;
        const mField = this.fields.find(f => f.id === 'material');
        const rField = this.fields.find(f => f.id === 'railing');
        const mOpt = mField.options.find(o => o.value === values.material) || mField.options[0];
        const rOpt = rField.options.find(o => o.value === values.railing) || rField.options[0];
        return steps * (mOpt.price + rOpt.price);
      }
    },

    {
      id: 'bathroom',
      name: 'Bathroom',              name_zh: '浴室',
      icon: '🚿',
      tagline: 'Labour + materials, per bathroom',
      tagline_zh: '人工 + 材料，按浴室计算',
      customType: 'bathroom',
      fields: [],
      calculate() { return 0; }
    },

    {
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
            { label: 'Ceramic',       label_zh: '陶瓷砖',   value: 'ceramic',   price: 5,  priceLabel: '$5 / sq ft' },
            { label: 'Porcelain',     label_zh: '瓷质砖',   value: 'porcelain', price: 8,  priceLabel: '$8 / sq ft' },
            { label: 'Natural Stone', label_zh: '天然石材', value: 'stone',     price: 12, priceLabel: '$12 / sq ft' },
            { label: 'Glass Mosaic',  label_zh: '玻璃马赛克', value: 'glass',   price: 15, priceLabel: '$15 / sq ft' },
          ]
        }
      ],
      calculate(values) {
        const area = parseFloat(values.area) || 0;
        const field = this.fields.find(f => f.id === 'type');
        const opt = field.options.find(o => o.value === values.type) || field.options[0];
        return area * opt.price;
      }
    },

    {
      id: 'kitchen',
      name: 'Kitchen',               name_zh: '厨房',
      icon: '🍳',
      tagline: 'Countertops & backsplash',
      tagline_zh: '台面与挡板',
      fields: [
        {
          id: 'counterLength',
          label: 'Counter Length',   label_zh: '台面长度',
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
            { label: 'Laminate',      label_zh: '复合板台面',   value: 'laminate', price: 20, priceLabel: '$20 / lin ft' },
            { label: 'Butcher Block', label_zh: '木砧板台面',   value: 'butcher',  price: 40, priceLabel: '$40 / lin ft' },
            { label: 'Granite',       label_zh: '花岗岩台面',   value: 'granite',  price: 60, priceLabel: '$60 / lin ft' },
            { label: 'Quartz',        label_zh: '石英石台面',   value: 'quartz',   price: 70, priceLabel: '$70 / lin ft' },
            { label: 'Marble',        label_zh: '大理石台面',   value: 'marble',   price: 80, priceLabel: '$80 / lin ft' },
          ]
        },
        {
          id: 'backsplashArea',
          label: 'Backsplash Area',  label_zh: '挡板面积',
          type: 'number',
          unit: 'sq ft',
          placeholder: '0',
          min: 0
        },
        {
          id: 'backsplashType',
          label: 'Backsplash Tile',  label_zh: '挡板瓷砖',
          type: 'select',
          options: [
            { label: 'Ceramic',       label_zh: '陶瓷砖',   value: 'ceramic',  price: 5,  priceLabel: '$5 / sq ft' },
            { label: 'Subway Tile',   label_zh: '地铁砖',   value: 'subway',   price: 7,  priceLabel: '$7 / sq ft' },
            { label: 'Natural Stone', label_zh: '天然石材', value: 'stone',    price: 12, priceLabel: '$12 / sq ft' },
            { label: 'Glass Tile',    label_zh: '玻璃砖',   value: 'glass',    price: 14, priceLabel: '$14 / sq ft' },
          ]
        }
      ],
      calculate(values) {
        const counterLen = parseFloat(values.counterLength) || 0;
        const bsArea = parseFloat(values.backsplashArea) || 0;
        const cField = this.fields.find(f => f.id === 'counterMaterial');
        const bField = this.fields.find(f => f.id === 'backsplashType');
        const cOpt = cField.options.find(o => o.value === values.counterMaterial) || cField.options[0];
        const bOpt = bField.options.find(o => o.value === values.backsplashType) || bField.options[0];
        return (counterLen * cOpt.price) + (bsArea * bOpt.price);
      }
    },

    {
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
            { label: 'Skim Coat (existing walls)',      label_zh: '刮腻子（现有墙面）',    value: 'skim',    price: 1.5, priceLabel: '$1.50 / sq ft' },
            { label: 'New Drywall (supply & install)',  label_zh: '新干墙（供料及安装）',  value: 'new',     price: 2.5, priceLabel: '$2.50 / sq ft' },
            { label: 'Ceiling Drywall',                label_zh: '天花板干墙',            value: 'ceiling', price: 3.0, priceLabel: '$3 / sq ft' },
          ]
        }
      ],
      calculate(values) {
        const area = parseFloat(values.area) || 0;
        const field = this.fields.find(f => f.id === 'type');
        const opt = field.options.find(o => o.value === values.type) || field.options[0];
        return area * opt.price;
      }
    },

    {
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
            { label: 'Basic',      label_zh: '基础款', value: 'basic',  price: 3, priceLabel: '$3 / lin ft' },
            { label: 'Mid-Grade',  label_zh: '中档款', value: 'mid',    price: 5, priceLabel: '$5 / lin ft' },
            { label: 'Custom',     label_zh: '定制款', value: 'custom', price: 8, priceLabel: '$8 / lin ft' },
          ]
        }
      ],
      calculate(values) {
        const length = parseFloat(values.length) || 0;
        const field = this.fields.find(f => f.id === 'grade');
        const opt = field.options.find(o => o.value === values.grade) || field.options[0];
        return length * opt.price;
      }
    },
  ],

  exterior: [
    { id: 'ext-paint',   name: 'Exterior Paint',    name_zh: '外墙油漆',   icon: '🏠', tagline: 'Siding, trim & shutters',          tagline_zh: '墙身、线条与百叶',      comingSoon: true, fields: [], calculate() { return 0; } },
    { id: 'ext-deck',    name: 'Deck & Patio',      name_zh: '露台与天井', icon: '🌿', tagline: 'Wood, composite & concrete',       tagline_zh: '木材、复合板与混凝土',    comingSoon: true, fields: [], calculate() { return 0; } },
    { id: 'ext-siding',  name: 'Siding',            name_zh: '外墙板',     icon: '🧱', tagline: 'Vinyl, fiber cement & wood',       tagline_zh: '乙烯基、纤维水泥与木材', comingSoon: true, fields: [], calculate() { return 0; } },
    { id: 'ext-roofing', name: 'Roofing',           name_zh: '屋顶',       icon: '🏗️', tagline: 'Shingles, metal & flat roof',     tagline_zh: '沥青瓦、金属与平屋顶',   comingSoon: true, fields: [], calculate() { return 0; } },
    { id: 'ext-windows', name: 'Windows & Doors',   name_zh: '窗户与门',   icon: '🪟', tagline: 'Replacement & new installation',   tagline_zh: '更换与新安装',           comingSoon: true, fields: [], calculate() { return 0; } },
  ]
};
