---
outline: deep
---

# VS Code Extensions Setup

Extensions are what make VS Code truly powerful! They add features like advanced Git integration, AI-powered code completion, and much more. Let's install the essential ones for our workshop.

## Why These Extensions?

- **GitLens** - Supercharges Git with blame annotations, commit history, and more
- **GitHub Copilot** - AI pair programmer that suggests code as you type
- **Prettier** - Automatic code formatting
- **Auto Rename Tag** - Updates matching HTML/XML tags automatically
- **Thunder Client** - Test APIs directly in VS Code
- **Live Server** - Local development server with live reload

## Installing Extensions

### Method 1: VS Code Extensions View (Recommended)

1. **Open Extensions View** - Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS)
2. **Search for extension** - Type the extension name in the search box
3. **Install** - Click the "Install" button
4. **Reload if needed** - Some extensions require reloading VS Code

### Method 2: Command Palette
1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type "Extensions: Install Extensions"
3. Search and install

## Essential Extensions for Workshop

<div class="extensions-grid">

### 1. GitLens — Git supercharged
<div class="extension-card primary">
  <div class="extension-header">
    <div class="extension-info">
      <h4>GitLens</h4>
      <p class="extension-id">eamodio.gitlens</p>
    </div>
  </div>
  <div class="extension-description">
    <p>Supercharge Git in VS Code with blame annotations, code lens, status bar integration and more!</p>
    <div class="extension-actions">
      <button onclick="installExtension('eamodio.gitlens')" class="install-btn">Install GitLens</button>
      <a href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens" target="_blank" class="web-link">View in Marketplace</a>
    </div>
  </div>
</div>

### 2. GitHub Copilot
<div class="extension-card primary">
  <div class="extension-header">
    <div class="extension-info">
      <h4>GitHub Copilot</h4>
      <p class="extension-id">GitHub.copilot</p>
    </div>
  </div>
  <div class="extension-description">
    <p>Your AI pair programmer. Get code suggestions as you type!</p>
    <div class="extension-actions">
      <button onclick="installExtension('GitHub.copilot')" class="install-btn">Install Copilot</button>
      <a href="https://marketplace.visualstudio.com/items?itemName=GitHub.copilot" target="_blank" class="web-link">View in Marketplace</a>
    </div>
    <div class="extension-note">
      <p><strong>Note:</strong> Requires GitHub account and may need subscription for some users</p>
    </div>
  </div>
</div>

### 3. Prettier - Code formatter
<div class="extension-card">
  <div class="extension-header">
    <div class="extension-info">
      <h4>Prettier</h4>
      <p class="extension-id">esbenp.prettier-vscode</p>
    </div>
  </div>
  <div class="extension-description">
    <p>Automatically format your code to maintain consistency across the team.</p>
    <div class="extension-actions">
      <button onclick="installExtension('esbenp.prettier-vscode')" class="install-btn">Install Prettier</button>
      <a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank" class="web-link">View in Marketplace</a>
    </div>
  </div>
</div>

### 4. Auto Rename Tag
<div class="extension-card">
  <div class="extension-header">
    <div class="extension-info">
      <h4>Auto Rename Tag</h4>
      <p class="extension-id">formulahendry.auto-rename-tag</p>
    </div>
  </div>
  <div class="extension-description">
    <p>Automatically rename paired HTML/XML tags when you change one.</p>
    <div class="extension-actions">
      <button onclick="installExtension('formulahendry.auto-rename-tag')" class="install-btn">Install Auto Rename Tag</button>
      <a href="https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag" target="_blank" class="web-link">View in Marketplace</a>
    </div>
  </div>
</div>

### 5. Thunder Client
<div class="extension-card">
  <div class="extension-header">
    <div class="extension-info">
      <h4>Thunder Client</h4>
      <p class="extension-id">rangav.vscode-thunder-client</p>
    </div>
  </div>
  <div class="extension-description">
    <p>Lightweight REST API client for VS Code - like Postman but integrated!</p>
    <div class="extension-actions">
      <button onclick="installExtension('rangav.vscode-thunder-client')" class="install-btn">Install Thunder Client</button>
      <a href="https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client" target="_blank" class="web-link">View in Marketplace</a>
    </div>
  </div>
</div>

### 6. Live Server
<div class="extension-card">
  <div class="extension-header">
    <div class="extension-info">
      <h4>Live Server</h4>
      <p class="extension-id">ritwickdey.LiveServer</p>
    </div>
  </div>
  <div class="extension-description">
    <p>Launch a local development server with live reload for static pages.</p>
    <div class="extension-actions">
      <button onclick="installExtension('ritwickdey.LiveServer')" class="install-btn">Install Live Server</button>
      <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank" class="web-link">View in Marketplace</a>
    </div>
  </div>
</div>

</div>

## Bonus Extensions (Optional)

<div class="bonus-extensions">
  <h3>Themes & Aesthetics</h3>
  <ul>
    <li><strong>Material Theme</strong> (zhuangtongfa.Material-theme) - Beautiful color themes</li>
    <li><strong>Material Icon Theme</strong> (PKief.material-icon-theme) - Better file icons</li>
    <li><strong>Bracket Pair Colorizer</strong> (Built into VS Code now!) - Colorful brackets</li>
  </ul>

  <h3>Productivity Boosters</h3>
  <ul>
    <li><strong>Path Intellisense</strong> (christian-kohler.path-intellisense) - Autocomplete file paths</li>
    <li><strong>Bookmarks</strong> (alefragnani.Bookmarks) - Mark important lines</li>
    <li><strong>TODO Highlight</strong> (wayou.vscode-todo-highlight) - Highlight TODO comments</li>
  </ul>
</div>

## 🔧 Configuring Extensions

### GitLens Configuration
After installing GitLens, it works out of the box! You'll see:
- Git blame information in the editor
- File history in the sidebar
- Enhanced status bar with Git info

### GitHub Copilot Setup
1. **Sign in** - You'll be prompted to sign in with your GitHub account
2. **Accept terms** - Review and accept the terms
3. **Start coding** - Begin typing code and see AI suggestions appear!

::: tip Getting Copilot for Free
Students and open-source contributors can get GitHub Copilot for free! Apply at [education.github.com](https://education.github.com/) with your student email.
:::

### Prettier Configuration
Add this to your VS Code settings (`Ctrl+,` then search for "format"):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true
}
```

## Verification Steps

Let's make sure everything is working:

### 1. Check Installed Extensions
1. Press `Ctrl+Shift+X` to open Extensions view
2. Look for all installed extensions in the "Installed" section
3. Make sure they show as "Enabled"

### 2. Test GitLens
1. Open any file in a Git repository
2. You should see Git blame information on each line
3. Look for the GitLens icon in the sidebar

### 3. Test GitHub Copilot
1. Create a new JavaScript file
2. Start typing: `function calculateTotal(`
3. Copilot should suggest the rest of the function
4. Press Tab to accept suggestions

### 4. Test Prettier
1. Write some messy JavaScript:
   ```javascript
   const   data={name:"John",age:30,city:  "New York"}
   ```
2. Save the file (`Ctrl+S`)
3. Prettier should automatically format it nicely

### 5. Test Live Server
1. Create an HTML file with some content
2. Right-click in the editor
3. Look for "Open with Live Server" option
4. Your default browser should open with the page

## Common Issues & Solutions

<div class="troubleshoot-section">

### Issue: Extensions won't install
**Solution:**
1. Check internet connection
2. Restart VS Code
3. Try installing from the VS Code marketplace website
4. Clear VS Code cache: `Ctrl+Shift+P` → "Developer: Reload Window"

### Issue: GitHub Copilot not working
**Solution:**
1. Make sure you're signed in to GitHub
2. Check if your account has Copilot access
3. Restart VS Code after signing in
4. Try `Ctrl+Shift+P` → "GitHub Copilot: Sign in"

### Issue: Prettier not formatting on save
**Solution:**
1. Check that Prettier is set as default formatter
2. Ensure "Format on Save" is enabled in settings
3. Make sure the file type is supported by Prettier

### Issue: GitLens features not showing
**Solution:**
1. Make sure you're in a Git repository
2. Check GitLens settings: `Ctrl+Shift+P` → "GitLens: Open Settings"
3. Try refreshing the Git repository status

</div>

## Success!

Fantastic! Your VS Code is now supercharged with essential extensions. You should have:

-  GitLens for enhanced Git integration
-  GitHub Copilot for AI assistance
-  Prettier for automatic code formatting
-  Auto Rename Tag for HTML editing
-  Thunder Client for API testing
-  Live Server for development hosting

## What's Next?

Now let's set up Postman for comprehensive API testing:

<div class="next-step">
  <a href="/setup/postman" class="next-button">
    <span class="next-content">
      <strong>Next: Postman Setup</strong>
      <small>Professional API testing and development</small>
    </span>
    <span class="next-arrow">→</span>
  </a>
</div>

<script>
function installExtension(extensionId) {
  // This would work if running inside VS Code
  try {
    vscode.postMessage({
      command: 'installExtension',
      extensionId: extensionId
    });
  } catch (error) {
    // Fallback for when not in VS Code
    window.open(`vscode:extension/${extensionId}`, '_blank');
  }
}
</script>

<style>
.extensions-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
}

.extension-card {
  background: #EFE8DE;
  border: 2px solid rgba(167, 55, 45, 0.15);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.extension-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(167, 55, 45, 0.2);
  border-color: #A7372D;
}

.extension-card.primary {
  border-color: #A7372D;
  background: linear-gradient(135deg, rgba(167, 55, 45, 0.1) 0%, rgba(255, 145, 77, 0.1) 100%);
}

.extension-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.extension-icon {
  font-size: 2rem;
  min-width: 3rem;
  text-align: center;
}

.extension-info h4 {
  margin: 0;
  color: #A7372D;
  font-size: 1.2rem;
  font-weight: 600;
}

.extension-id {
  font-family: 'Courier New', monospace;
  color: #666;
  font-size: 0.85rem;
  margin: 0.25rem 0 0 0;
}

.extension-description p {
  margin: 0 0 1rem 0;
  color: #444;
  line-height: 1.5;
}

.extension-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
}

.install-btn {
  background: linear-gradient(135deg, #A7372D 0%, #FF914D 50%, #ff6b35 100%);
  color: white !important;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.install-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  z-index: -1;
  transition: left 0.6s ease;
}

.install-btn:hover {
  transform: scale(1.02) translateY(-3px);
  box-shadow: 0 15px 35px rgba(167, 55, 45, 0.4), 0 8px 15px rgba(255, 145, 77, 0.3);
}

.install-btn:hover::before {
  left: 100%;
}

.web-link {
  color: #A7372D;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.web-link:hover {
  text-decoration: underline;
}

.extension-note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(167, 55, 45, 0.05);
  border-left: 3px solid #A7372D;
  border-radius: 0 0.5rem 0.5rem 0;
}

.extension-note p {
  margin: 0;
  font-size: 0.9rem;
  color: #A7372D;
}

.bonus-extensions {
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(142, 217, 210, 0.05);
  border: 1px solid rgba(142, 217, 210, 0.2);
  border-radius: 1rem;
}

.bonus-extensions h3 {
  color: #A7372D;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.bonus-extensions ul {
  margin: 0 0 1.5rem 0;
}

.bonus-extensions li {
  margin-bottom: 0.5rem;
}

.troubleshoot-section {
  background: rgba(167, 55, 45, 0.05);
  border-left: 4px solid #A7372D;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 0.5rem 0.5rem 0;
}

.troubleshoot-section h3 {
  color: #A7372D;
  margin-top: 1rem;
  font-size: 1rem;
}

.troubleshoot-section h3:first-child {
  margin-top: 0;
}

.next-step {
  margin: 2rem 0;
}

.next-button {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #A7372D 0%, #FF914D 50%, #ff6b35 100%);
  color: white !important;
  border-radius: 50px;
  text-decoration: none;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.next-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  z-index: -1;
  transition: left 0.6s ease;
}

.next-button:hover {
  transform: scale(1.02) translateY(-3px);
  box-shadow: 0 20px 40px rgba(167, 55, 45, 0.4), 0 10px 20px rgba(255, 145, 77, 0.3);
}

.next-button:hover::before {
  left: 100%;
}

.next-button:hover .next-arrow {
  transform: translateX(5px);
}

.next-icon {
  font-size: 2rem;
  min-width: 3rem;
  text-align: center;
}

.next-content {
  flex: 1;
}

.next-content strong {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.next-content small {
  opacity: 0.9;
  font-size: 0.9rem;
}

.next-arrow {
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.3s ease;
}
</style>