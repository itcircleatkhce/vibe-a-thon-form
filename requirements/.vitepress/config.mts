import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vibe-a-thon",
  description: "Complete setup guide for Vibe-a-thon workshop participants. Get your development environment ready!",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    // Search configuration
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: 'Search Documentation',
            buttonAriaLabel: 'Search Documentation'
          },
          modal: {
            displayDetails: 'Display detailed list',
            resetButtonTitle: 'Clear search query',
            backButtonTitle: 'Close search',
            noResultsText: 'No results for',
            footer: {
              selectText: 'to select',
              selectKeyAriaLabel: 'enter',
              navigateText: 'to navigate',
              navigateUpKeyAriaLabel: 'up arrow',
              navigateDownKeyAriaLabel: 'down arrow',
              closeText: 'to close',
              closeKeyAriaLabel: 'escape'
            }
          }
        }
      }
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Setup Guide', link: '/setup-overview' },
      { text: 'Quick Reference', link: '/quick-reference' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Workshop Overview', link: '/' },
          { text: 'Setup Overview', link: '/setup-overview' }
        ]
      },
      {
        text: 'Development Environment',
        items: [
          { text: 'Visual Studio Code', link: '/setup/vscode' },
          { text: 'Git & GitHub', link: '/setup/git-github' },
          { text: 'VS Code Extensions', link: '/setup/vscode-extensions' }
        ]
      },
      {
        text: 'Development Tools',
        items: [
          { text: 'Postman', link: '/setup/postman' },
          { text: 'Supabase', link: '/setup/supabase' }
        ]
      },
      {
        text: 'Design & Organization',
        items: [
          { text: 'Figma', link: '/setup/figma' },
          { text: 'Canva', link: '/setup/canva' },
          { text: 'Notion', link: '/setup/notion' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Quick Reference', link: '/quick-reference' },
          { text: 'Troubleshooting', link: '/troubleshooting' }
        ]
      }
    ],

    socialLinks: [],

    editLink: {
      pattern: 'https://github.com/itcircleatkhce/vibe-a-thon-form/edit/main/requirements/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Made with vibes for the Vibe-a-thon Community',
      copyright: 'Questions? Contact us at <a href="mailto:itcirclekhec@gmail.com">itcirclekhec@gmail.com</a> | <a href="https://github.com/itcircleatkhce/vibe-a-thon-form/issues" target="_blank">Report Issues</a>'
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    }
  },

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#A7372D' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', rel: 'stylesheet' }]
  ]
})
