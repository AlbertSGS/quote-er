# Quote-er — Renovation Price Calculator

A browser-only renovation quote calculator for generating PDF estimates. No build tools, no framework — plain HTML, CSS, and JavaScript.

## Features

- **Bilingual UI** — English and Chinese (中文)
- **Interior components** — Flooring, Interior Paint, Stairs, Bathroom, Tile, Kitchen, Drywall, Trim, Garbage Disposal
- **Exterior components** — Exterior Paint, Deck & Patio, Siding, Roofing, Windows & Doors *(coming soon)*
- **Bathroom sub-manager** — multi-bathroom support with labour grid and materials catalog
- **PDF quote generation** — via pdfMake CDN, includes client profile, company branding, and line-item breakdown
- **Company profile** — logo upload, company/designer contact info, saved to localStorage
- **Persistent state** — all inputs auto-saved to localStorage on every change

## Usage

Open `index.html` directly in a browser — no server required.

Or visit the GitHub Pages deployment.

## Project Structure

```
index.html              # Single page, loads all scripts in order
css/style.css           # All styles
js/
  strings.js            # i18n UI strings (EN/ZH)
  data.js               # Assembles COMPONENTS registry from component files
  core.js               # State object, localStorage, i18n helpers, calc functions
  render.js             # DOM rendering: grid, config cards, summary sidebar
  quote.js              # PDF generation (pdfMake)
  app.js                # Action handlers, initializes state and first render
  components/           # One file per component
    bathroom.js
    drywall.js
    flooring.js
    kitchen.js
    paint.js
    stairs.js
    tile.js
    trim.js
    garbage_disposal.js
    exterior.js
assets/                 # Static assets (logo, icons)
```

## Adding a Component

1. Create `js/components/your_component.js` defining a `COMP_YOUR_COMPONENT` object.
2. Add a `<script>` tag in `index.html` before `data.js`.
3. Register the component in the `COMPONENTS` object in `data.js`.

A standard component has the shape:

```js
const COMP_EXAMPLE = {
  id: 'example',
  name: 'Example',
  name_zh: '示例',
  icon: '🔧',
  tagline: 'Short description',
  tagline_zh: '简短描述',
  fields: [
    { id: 'area', label: 'Area (sq ft)', type: 'number' },
    // ...
  ],
  calculate(values) {
    // return { labour, materials, total, ... }
  }
};
```

## License

MIT
