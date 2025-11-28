---
outline: deep
---

# Runtime API Examples

This page demonstrates usage of some of the runtime APIs provided by VitePress for the Vibe-a-thon documentation.

## The `useData()` API

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>

## Site Data

The site data contains global configuration and metadata:

```js
// Example of accessing site data
const { site } = useData()

console.log(site.value.title) // "Vibe-a-thon"
console.log(site.value.description) // Site description
console.log(site.value.base) // Base URL
console.log(site.value.lang) // Site language
```

### Current Site Data
<pre>{{ site }}</pre>

## Page Data

Page data contains information about the current page:

```js
// Example of accessing page data
const { page } = useData()

console.log(page.value.title) // Page title
console.log(page.value.filePath) // Relative file path
console.log(page.value.relativePath) // Relative path from source root
console.log(page.value.lastUpdated) // Last updated timestamp
```

## Theme Data

Theme data contains theme-specific configuration:

```js
// Example of accessing theme data
const { theme } = useData()

console.log(theme.value.nav) // Navigation config
console.log(theme.value.sidebar) // Sidebar config
console.log(theme.value.socialLinks) // Social links
```

## Frontmatter Data

Frontmatter contains page-specific metadata from the YAML front matter:

```js
// Example of accessing frontmatter data
const { frontmatter } = useData()

console.log(frontmatter.value.title) // Page title from frontmatter
console.log(frontmatter.value.description) // Page description
console.log(frontmatter.value.layout) // Layout type
```

### Current Page Frontmatter
<pre>{{ frontmatter }}</pre>

## Router API

VitePress provides router functionality similar to Vue Router:

```js
import { useRouter, useRoute } from 'vitepress'

// Get router instance
const router = useRouter()

// Get current route
const route = useRoute()

// Navigate programmatically
router.go('/some-path')
```

## Dynamic Imports

You can dynamically import components or data:

```vue
<script setup>
// Dynamic component import
const MyComponent = defineAsyncComponent(() => import('./MyComponent.vue'))

// Dynamic data import
const data = await import('./data.json')
</script>
```

## Client-Side Navigation

For client-side navigation without full page reload:

```js
import { inBrowser } from 'vitepress'

if (inBrowser) {
  // Client-side only code
  console.log('This runs only in the browser')
}
```

## Custom Components in Markdown

You can use Vue components directly in markdown:

```vue
<script setup>
const name = 'Vibe-a-thon'
const tools = ['VS Code', 'Git', 'Postman', 'Supabase']
</script>

<div class="custom-component">
  <h3>Welcome to {{ name }}!</h3>
  <p>Essential tools:</p>
  <ul>
    <li v-for="tool in tools" :key="tool">{{ tool }}</li>
  </ul>
</div>
```

<div class="custom-component">
  <h3>Welcome to Vibe-a-thon!</h3>
  <p>Essential tools:</p>
  <ul>
    <li>VS Code</li>
    <li>Git</li>
    <li>Postman</li>
    <li>Supabase</li>
  </ul>
</div>

## Environment Variables

Access build-time environment variables:

```js
// vitepress exposes import.meta.env
console.log(import.meta.env.NODE_ENV) // 'development' or 'production'
console.log(import.meta.env.BASE_URL) // Base URL

// Custom environment variables (prefixed with VITE_)
console.log(import.meta.env.VITE_API_URL)
```

## Build-time Data Loading

Load data at build time using data files:

```js
// data/team.data.js
export default {
  load() {
    return [
      { name: 'Alice', role: 'Developer' },
      { name: 'Bob', role: 'Designer' }
    ]
  }
}
```

```vue
<script setup>
import { data } from './team.data.js'
</script>

<div v-for="member in data" :key="member.name">
  <h4>{{ member.name }}</h4>
  <p>{{ member.role }}</p>
</div>
```

## Content API

Access and manipulate page content:

```js
import { createContentLoader } from 'vitepress'

// Load all markdown files
export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
      .map((page) => ({
        title: page.frontmatter.title,
        url: page.url,
        excerpt: page.excerpt
      }))
  }
})
```

## SSG Helpers

Server-side generation helpers:

```js
import { defineLoader } from 'vitepress'

export interface Post {
  title: string
  href: string
  date: {
    time: number
    string: string
  }
  excerpt: string | undefined
}

declare const data: Post[]
export { data }

export default defineLoader({
  watch: ['./posts/*.md'],
  async load(watchedFiles) {
    // Custom data loading logic
    return watchedFiles.map(file => ({
      // Transform file data
    }))
  }
})
```

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).

<style>
/* Page-specific styling - global theme handled by VitePress */
pre {
  background: rgba(44, 44, 44, 0.95) !important;
  border-radius: 0.75rem;
  border: 1px solid rgba(167, 55, 45, 0.2);
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.custom-component {
  background: rgba(167, 55, 45, 0.05);
  border: 2px solid rgba(167, 55, 45, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 1rem 0;
}

.custom-component h3 {
  color: #A7372D;
  margin-top: 0;
}

.custom-component ul {
  margin: 0.5rem 0 0 1rem;
}

.custom-component li {
  color: #555;
  margin-bottom: 0.25rem;
}

/* Code block styling */
.vp-doc div[class*="language-"] {
  margin: 1.5rem 0;
}

/* JSON/Data display */
.vp-doc pre:not([class*="language-"]) {
  font-size: 0.8rem;
  line-height: 1.4;
  color: #555;
  background: rgba(167, 55, 45, 0.05) !important;
  border: 1px solid rgba(167, 55, 45, 0.15) !important;
  max-height: 300px;
  overflow-y: auto;
}
</style>