// .vitepress/theme/index.js
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Add scroll handler for navbar transparency
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const navbar = document.querySelector('.VPNavBar')
        if (navbar) {
          if (window.scrollY > 50) {
            navbar.classList.add('scrolled')
          } else {
            navbar.classList.remove('scrolled')
          }
        }
      }

      window.addEventListener('scroll', handleScroll)
      
      // Initial check
      setTimeout(handleScroll, 100)
    }
  }
}