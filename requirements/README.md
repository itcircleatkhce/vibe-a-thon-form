# Vibe-a-thon Documentation

This directory contains the VitePress documentation for the Vibe-a-thon workshop setup guide.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
cd requirements
npm install
# or
yarn install
```

### Development
```bash
npm run docs:dev
# or
yarn docs:dev
```

The documentation will be available at `http://localhost:5173`

### Build for Production
```bash
npm run docs:build
# or
yarn docs:build
```

### Preview Production Build
```bash
npm run docs:preview
# or
yarn docs:preview
```

## 📁 Structure

```
requirements/
├── .vitepress/          # VitePress configuration
│   ├── config.mts       # Site configuration
│   └── theme/           # Custom theme
│       ├── index.js     # Theme entry
│       └── style.css    # Global styles
├── setup/               # Setup guides
│   ├── vscode.md
│   ├── git-github.md
│   ├── postman.md
│   └── ...
├── assets/              # Static assets
├── public/              # Public files
├── index.md             # Home page
├── setup-overview.md    # Setup overview
├── quick-reference.md   # Quick reference
└── troubleshooting.md   # Troubleshooting guide
```

## 🎨 Theme Customization

The documentation uses a custom Vibe-a-thon theme with:
- **Brand Colors**: #A7372D (primary), #FF914D (secondary)
- **Background**: #F6EBD7 (cream)
- **Typography**: NT Brick Sans for headings, Inter for body
- **Components**: Custom cards, buttons, and layouts

All styling is handled in `.vitepress/theme/style.css` with CSS custom properties for consistency.

## 📝 Writing Documentation

### Frontmatter
Each page should include:
```yaml
---
outline: deep
---
```

### Styling Guidelines
- Use semantic HTML structure
- Follow the established color palette
- Include hover effects for interactive elements
- Ensure responsive design
- Test across different browsers

### Custom Components
The theme includes custom styling for:
- Download cards
- Setup cards  
- Tool grids
- Code blocks
- Navigation elements

## 🛠️ Development

### Adding New Pages
1. Create a new `.md` file
2. Add frontmatter with `outline: deep`
3. Update `.vitepress/config.mts` sidebar configuration
4. Follow the established styling patterns

### Theme Updates
- Modify `.vitepress/theme/style.css` for global styles
- Update `.vitepress/config.mts` for configuration changes
- Test changes across all pages

## 📧 Support

Questions about the documentation?
- Email: itcirclekhec@gmail.com
- Issues: [GitHub Issues](https://github.com/itcircleatkhce/vibe-a-thon-form/issues)

---

Made with ❤️ and lots of ☕ for the Vibe-a-thon Community