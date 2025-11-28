---
outline: deep
---

# Quick Reference Guide

Your handy cheat sheet for all workshop tools! Bookmark this page for quick access to essential shortcuts, commands, and links during the workshop.

## Essential Tool Links

<div class="tools-quick-access">
  <div class="tool-link-card">
    <div class="tool-info">
      <h4>VS Code</h4>
      <a href="https://code.visualstudio.com/" target="_blank">code.visualstudio.com</a>
    </div>
  </div>

  <div class="tool-link-card">
    <div class="tool-info">
      <h4>GitHub</h4>
      <a href="https://github.com/" target="_blank">github.com</a>
    </div>
  </div>

  <div class="tool-link-card">
    <div class="tool-info">
      <h4>Postman</h4>
      <a href="https://www.postman.com/" target="_blank">postman.com</a>
    </div>
  </div>

  <div class="tool-link-card">
    <div class="tool-info">
      <h4>Supabase</h4>
      <a href="https://supabase.com/" target="_blank">supabase.com</a>
    </div>
  </div>

  <div class="tool-link-card">
    <div class="tool-info">
      <h4>Figma</h4>
      <a href="https://www.figma.com/" target="_blank">figma.com</a>
    </div>
  </div>

  <div class="tool-link-card">
    <div class="tool-info">
      <h4>Canva</h4>
      <a href="https://www.canva.com/" target="_blank">canva.com</a>
    </div>
  </div>

  <div class="tool-link-card">
    <div class="tool-info">
      <h4>Notion</h4>
      <a href="https://www.notion.so/" target="_blank">notion.so</a>
    </div>
  </div>
</div>

## VS Code Keyboard Shortcuts

<div class="shortcuts-section">

### Essential Navigation
<div class="shortcut-grid">
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>P</kbd>
    <span>Quick Open (find files)</span>
  </div>
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>
    <span>Command Palette</span>
  </div>
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>`</kbd>
    <span>Toggle Terminal</span>
  </div>
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd>
    <span>File Explorer</span>
  </div>
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>
    <span>Extensions</span>
  </div>
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>G</kbd>
    <span>Source Control (Git)</span>
  </div>
</div>

### Code Editing
<div class="shortcut-grid">
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>D</kbd>
    <span>Select word/next match</span>
  </div>
  <div class="shortcut-item">
    <kbd>Alt</kbd> + <kbd>↑/↓</kbd>
    <span>Move line up/down</span>
  </div>
  <div class="shortcut-item">
    <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>↓</kbd>
    <span>Duplicate line</span>
  </div>
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>/</kbd>
    <span>Toggle comment</span>
  </div>
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd>
    <span>Delete line</span>
  </div>
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>Enter</kbd>
    <span>Insert line below</span>
  </div>
</div>

</div>

## Git Commands Cheat Sheet

<div class="git-commands">

### Basic Workflow
```bash
git status                    # Check repository status
git add .                     # Stage all changes
git add filename.js           # Stage specific file
git commit -m "Description"   # Commit changes
git push                      # Push to remote repository
git pull                      # Pull latest changes
```

### Branching
```bash
git branch                    # List branches
git branch new-feature        # Create new branch
git checkout new-feature      # Switch to branch
git checkout -b new-feature   # Create and switch to branch
git merge new-feature         # Merge branch
git branch -d new-feature     # Delete branch
```

### Useful Commands
```bash
git log                       # View commit history
git log --oneline            # Compact commit history
git diff                     # Show unstaged changes
git reset HEAD filename.js   # Unstage file
git checkout -- filename.js  # Discard changes
```

</div>

## HTML Boilerplate

Quick starter template for web projects:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vibe-a-thon Project</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #F6EBD7;
            color: #2C2C2C;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .btn {
            background: #A7372D;
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
        }
        
        .btn:hover {
            background: #802B24;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Vibe-a-thon! 🚀</h1>
        <p>Your project starts here...</p>
        <button class="btn">Get Started</button>
    </div>
</body>
</html>
```

## Supabase Quick Setup

Essential JavaScript code snippets:

### Client Setup
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)
```

### Common Operations
```javascript
// Fetch data
const { data, error } = await supabase
  .from('your_table')
  .select('*')

// Insert data
const { data, error } = await supabase
  .from('your_table')
  .insert({ name: 'John', email: 'john@example.com' })

// Update data
const { data, error } = await supabase
  .from('your_table')
  .update({ name: 'Jane' })
  .eq('id', 1)

// Delete data
const { data, error } = await supabase
  .from('your_table')
  .delete()
  .eq('id', 1)
```

## Figma Keyboard Shortcuts

<div class="figma-shortcuts">

### Essential Tools
<div class="shortcut-grid">
  <div class="shortcut-item">
    <kbd>V</kbd>
    <span>Selection tool</span>
  </div>
  <div class="shortcut-item">
    <kbd>F</kbd>
    <span>Frame tool</span>
  </div>
  <div class="shortcut-item">
    <kbd>R</kbd>
    <span>Rectangle</span>
  </div>
  <div class="shortcut-item">
    <kbd>O</kbd>
    <span>Ellipse</span>
  </div>
  <div class="shortcut-item">
    <kbd>T</kbd>
    <span>Text tool</span>
  </div>
  <div class="shortcut-item">
    <kbd>P</kbd>
    <span>Pen tool</span>
  </div>
</div>

### Navigation & View
<div class="shortcut-grid">
  <div class="shortcut-item">
    <kbd>Space</kbd> + <kbd>Drag</kbd>
    <span>Pan canvas</span>
  </div>
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>+/-</kbd>
    <span>Zoom in/out</span>
  </div>
  <div class="shortcut-item">
    <kbd>Shift</kbd> + <kbd>1</kbd>
    <span>Fit to screen</span>
  </div>
  <div class="shortcut-item">
    <kbd>Shift</kbd> + <kbd>2</kbd>
    <span>Zoom to selection</span>
  </div>
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>D</kbd>
    <span>Duplicate</span>
  </div>
  <div class="shortcut-item">
    <kbd>Ctrl</kbd> + <kbd>G</kbd>
    <span>Group selection</span>
  </div>
</div>

</div>

## Postman Quick Reference

### Request Types
- **GET** - Retrieve data
- **POST** - Create new data
- **PUT** - Update existing data
- **DELETE** - Remove data
- **PATCH** - Partial update

### Environment Variables
Use `{{variable_name}}` to reference environment variables:
```
GET {{base_url}}/api/users
Authorization: Bearer {{auth_token}}
```

### Tests & Scripts
```javascript
// Test status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test response time
pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

// Parse JSON response
const jsonData = pm.response.json();
pm.test("Has user data", function () {
    pm.expect(jsonData).to.have.property('user');
});
```

## Notion Quick Commands

Type these commands to quickly add content:

<div class="notion-commands">
  <div class="command-grid">
    <div class="command-item">
      <code>/h1</code>
      <span>Large heading</span>
    </div>
    <div class="command-item">
      <code>/h2</code>
      <span>Medium heading</span>
    </div>
    <div class="command-item">
      <code>/h3</code>
      <span>Small heading</span>
    </div>
    <div class="command-item">
      <code>/todo</code>
      <span>To-do list</span>
    </div>
    <div class="command-item">
      <code>/bullet</code>
      <span>Bulleted list</span>
    </div>
    <div class="command-item">
      <code>/number</code>
      <span>Numbered list</span>
    </div>
    <div class="command-item">
      <code>/code</code>
      <span>Code block</span>
    </div>
    <div class="command-item">
      <code>/callout</code>
      <span>Highlighted note</span>
    </div>
    <div class="command-item">
      <code>/table</code>
      <span>Database table</span>
    </div>
  </div>
</div>

## Workshop Support

<div class="support-info">
  <div class="support-card">
    <h4>Need Help During Workshop?</h4>
    <p>Don't hesitate to ask mentors or fellow participants!</p>
    <ul>
      <li>Raise your hand for immediate help</li>
      <li>Use workshop chat/Discord</li>
      <li>Pair with a partner for debugging</li>
    </ul>
  </div>

  <div class="support-card">
    <h4>Useful Resources</h4>
    <ul>
      <li><a href="https://developer.mozilla.org/en-US/" target="_blank">MDN Web Docs</a></li>
      <li><a href="https://stackoverflow.com/" target="_blank">Stack Overflow</a></li>
      <li><a href="https://www.w3schools.com/" target="_blank">W3Schools</a></li>
      <li><a href="https://github.com/" target="_blank">GitHub Docs</a></li>
    </ul>
  </div>
</div>

## Mobile App Links

Don't forget to install mobile apps for on-the-go access:

<div class="mobile-apps">
  <div class="app-link">
    <strong>GitHub Mobile</strong>
    <div class="app-buttons">
      <a href="https://apps.apple.com/app/github/id1477376905" target="_blank">iOS</a>
      <a href="https://play.google.com/store/apps/details?id=com.github.android" target="_blank">Android</a>
    </div>
  </div>

  <div class="app-link">
    <strong>Figma Mobile</strong>
    <div class="app-buttons">
      <a href="https://apps.apple.com/app/figma/id1152747299" target="_blank">iOS</a>
      <a href="https://play.google.com/store/apps/details?id=com.figma.mirror" target="_blank">Android</a>
    </div>
  </div>

  <div class="app-link">
    <strong>Notion Mobile</strong>
    <div class="app-buttons">
      <a href="https://apps.apple.com/app/notion-notes-docs-tasks/id1232780281" target="_blank">iOS</a>
      <a href="https://play.google.com/store/apps/details?id=notion.id" target="_blank">Android</a>
    </div>
  </div>
</div>

## You're All Set!

This quick reference should help you navigate the workshop smoothly. Remember:

- **Bookmark this page** for easy access during coding
- **Practice the shortcuts** to boost productivity  
- **Don't be afraid to experiment** - that's how you learn!
- **Ask for help** when you need it - everyone's here to learn together

<div class="final-encouragement">
  <h3>Ready to Build Something Amazing?</h3>
  <p>You've got all the tools, knowledge, and support you need. Time to create something incredible at Vibe-a-thon!</p>
</div>

<style>
.tools-quick-access {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.tool-link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba;
  border: 2px solid rgba(167, 55, 45, 0.15);
  border-radius: 1rem;
  padding: 1rem;
  transition: all 0.3s ease;
}

.tool-link-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(167, 55, 45, 0.2);
  border-color: #A7372D;
}

.tool-icon {
  font-size: 2rem;
  min-width: 2.5rem;
  text-align: center;
}

.tool-info h4 {
  margin: 0 0 0.25rem 0;
  color: #A7372D;
  font-size: 1rem;
}

.tool-info a {
  color: #666;
  text-decoration: none;
  font-size: 0.85rem;
}

.tool-info a:hover {
  color: #FF914D;
  text-decoration: underline;
}

.shortcuts-section {
  margin: 2rem 0;
}

.shortcuts-section h3 {
  color: #A7372D;
  margin: 1.5rem 0 1rem 0;
  font-size: 1.1rem;
}

.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.shortcut-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(167, 55, 45, 0.05);
  border: 1px solid rgba(167, 55, 45, 0.1);
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 0.9rem;
}

.shortcut-item kbd {
  background: #A7372D;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.8rem;
  font-weight: bold;
}

.shortcut-item span {
  color: #666;
  flex: 1;
}

.git-commands {
  background: rgba(167, 55, 45, 0.05);
  border: 1px solid rgba(167, 55, 45, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 2rem 0;
}

.git-commands h3 {
  color: #A7372D;
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.git-commands pre {
  margin: 1rem 0;
}

.git-commands code {
  font-size: 0.85rem;
  line-height: 1.5;
}

.figma-shortcuts {
  margin: 2rem 0;
}

.figma-shortcuts h3 {
  color: #A7372D;
  margin: 1.5rem 0 1rem 0;
  font-size: 1.1rem;
}

.notion-commands {
  margin: 2rem 0;
}

.command-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.command-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(167, 55, 45, 0.05);
  border: 1px solid rgba(167, 55, 45, 0.1);
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.command-item code {
  background: #A7372D;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.8rem;
  font-weight: bold;
  min-width: 3rem;
  text-align: center;
}

.command-item span {
  color: #666;
  font-size: 0.9rem;
}

.support-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.support-card {
  background: rgba(167, 55, 45, 0.1);
  border: 2px solid rgba(167, 55, 45, 0.3);
  border-radius: 1rem;
  padding: 1.5rem;
}

.support-card h4 {
  color: #A7372D;
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.support-card p {
  margin: 0 0 1rem 0;
  color: #666;
  line-height: 1.5;
}

.support-card ul {
  margin: 0;
  padding-left: 1rem;
}

.support-card li {
  margin-bottom: 0.5rem;
  color: #555;
  font-size: 0.9rem;
}

.support-card a {
  color: #A7372D;
  text-decoration: none;
}

.support-card a:hover {
  color: #FF914D;
  text-decoration: underline;
}

.mobile-apps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.app-link {
  background: rgba(167, 55, 45, 0.05);
  border: 1px solid rgba(167, 55, 45, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
}

.app-link strong {
  display: block;
  color: #A7372D;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.app-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.app-buttons a {
  background: #A7372D;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.app-buttons a:hover {
  background: #FF914D;
  transform: translateY(-1px);
}

.final-encouragement {
  background: linear-gradient(135deg, rgba(167, 55, 45, 0.1) 0%, rgba(255, 145, 77, 0.1) 100%);
  border: 2px solid rgba(167, 55, 45, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  margin: 3rem 0;
}

.final-encouragement h3 {
  color: #A7372D;
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
}

.final-encouragement p {
  color: #666;
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.5;
}

/* Force light theme for all code blocks */
pre {
  background: #f8fafc !important;
  border: 1px solid rgba(167, 55, 45, 0.15) !important;
  border-radius: 0.5rem !important;
  padding: 1rem !important;
  overflow-x: auto !important;
}

code {
  background: #f1f5f9 !important;
  color: #2d3748 !important;
  padding: 0.2rem 0.4rem !important;
  border-radius: 0.25rem !important;
  font-family: 'Courier New', Monaco, monospace !important;
}

/* Override for code inside pre blocks */
pre code {
  background: transparent !important;
  padding: 0 !important;
  border-radius: 0 !important;
}

/* Force light theme in dark mode */
.dark pre {
  background: #f8fafc !important;
  border: 1px solid rgba(167, 55, 45, 0.25) !important;
}

.dark code {
  background: #f1f5f9 !important;
  color: #2d3748 !important;
}

.dark pre code {
  background: transparent !important;
  color: #2d3748 !important;
}

/* Syntax highlighting overrides for light theme */
.dark pre code[class*="language-"],
.dark code[class*="language-"],
pre code[class*="language-"],
code[class*="language-"] {
  background: transparent !important;
  color: #2d3748 !important;
}

/* Page-specific styling - global theme handled by VitePress */
</style>