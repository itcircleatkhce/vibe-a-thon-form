---
outline: deep
---

# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress for the Vibe-a-thon documentation.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## Code Groups

You can create tabbed code blocks for different languages or implementations:

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::

## Line Highlighting in Code Blocks

```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```

## Focus in Code Blocks

```js
export default {
  data() {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```

## Colored Diffs in Code Blocks

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## Errors and Warnings in Code Blocks

```js
export default {
  data () {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning' // [!code warning]
    }
  }
}
```

## Line Numbers

```ts{1}
// line-numbers is disabled by default
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// line-numbers is enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

## Import Code Snippets

You can import code snippets from files:

<!-- <<< @/filepath -->

## Math Equations

When you need to display math, VitePress supports LaTeX through MathJax:

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are 
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

## Tables

| Tool | Purpose | Link |
|------|---------|------|
| VS Code | Code Editor | [Download](https://code.visualstudio.com/) |
| Git | Version Control | [Download](https://git-scm.com/) |
| Postman | API Testing | [Download](https://www.postman.com/) |
| Supabase | Backend Service | [Visit](https://supabase.com/) |
| Figma | Design Tool | [Visit](https://www.figma.com/) |

## Emojis

:tada: :100: :rocket: :fire: :sparkles: :thumbsup: :clap: :heart:

You can use emojis in your documentation! 

## Badge Component

<Badge type="info" text="default" />
<Badge type="tip" text="^1.9.0" />
<Badge type="warning" text="beta" />
<Badge type="danger" text="caution" />

## Team Page Example

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
      The development of Vibe-a-thon is guided by an international
      team, some of whom have chosen to be featured below.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="[
      {
        avatar: 'https://github.com/yyx990803.png',
        name: 'Evan You',
        title: 'Creator',
        links: [
          { icon: 'github', link: 'https://github.com/yyx990803' },
          { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
        ]
      },
    ]"
  />
</VPTeamPage>

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).

<style>
/* Page-specific styling - global theme handled by VitePress */
.custom-container {
  margin: 1rem 0;
}

/* Custom badge styling */
.vp-badge {
  margin: 0.25rem;
}

/* Table styling enhancement */
.vp-doc table {
  font-size: 0.9rem;
}

.vp-doc th {
  font-weight: 600;
  text-align: left;
}
</style>