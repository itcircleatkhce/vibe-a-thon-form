---
outline: deep
---

# Visual Studio Code Setup

Visual Studio Code (VS Code) is your primary development environment for the workshop. It's a free, powerful code editor that will be your best friend throughout the coding journey!

## Why VS Code?

- **Free and Open Source** - No licensing costs
- **Extensive Extensions** - Thousands of plugins to enhance functionality  
- **Integrated Terminal** - Run commands without leaving the editor
- **Git Integration** - Built-in version control
- **IntelliSense** - Smart code completion and error detection
- **Cross-Platform** - Works on Windows, macOS, and Linux

## Download & Installation

### Step 1: Download VS Code

<div class="download-section">
  <div class="download-card">
    <div class="download-info">
      <h3>Windows</h3>
      <p>Windows 10/11 (64-bit)</p>
      <a href="https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user" class="download-btn">Download for Windows</a>
    </div>
  </div>

  <div class="download-card">
    <div class="download-info">
      <h3>macOS</h3>
      <p>macOS 10.14 or later</p>
      <a href="https://code.visualstudio.com/sha/download?build=stable&os=darwin-universal" class="download-btn">Download for Mac</a>
    </div>
  </div>

  <div class="download-card">
    <div class="download-info">
      <h3>Linux</h3>
      <p>Ubuntu, Debian, RHEL, etc.</p>
      <a href="https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64" class="download-btn">Download .deb</a>
      <a href="https://code.visualstudio.com/sha/download?build=stable&os=linux-rpm-x64" class="download-btn secondary">Download .rpm</a>
    </div>
  </div>
</div>

::: tip Alternative Download
You can also visit [code.visualstudio.com](https://code.visualstudio.com/) and click the big download button - it will automatically detect your operating system!
:::

### Step 2: Installation Process

#### Windows Installation
1. **Run the installer** - Double-click the downloaded `.exe` file
2. **Accept the license** - Read and accept the license agreement
3. **Choose installation location** - Default location is usually fine
4. **Select additional tasks:**
   -  **Add "Open with Code" action to Windows Explorer file context menu**
   -  **Add "Open with Code" action to Windows Explorer directory context menu**
   -  **Register Code as an editor for supported file types**
   -  **Add to PATH** (important for terminal usage)
5. **Install** - Click Install and wait for completion
6. **Launch** - Check "Launch Visual Studio Code" and click Finish

#### macOS Installation
1. **Open the downloaded file** - Double-click `VSCode-darwin-universal.zip`
2. **Drag to Applications** - Drag `Visual Studio Code.app` to your Applications folder
3. **Launch from Applications** - Open VS Code from your Applications folder
4. **Allow security permissions** if prompted

#### Linux Installation (Ubuntu/Debian)
```bash
# For .deb package
sudo dpkg -i code_*.deb
sudo apt-get install -f  # Fix any dependency issues

# Alternative: Using snap
sudo snap install --classic code
```

## Initial Configuration

### Step 1: First Launch Setup

When you first open VS Code, you might see:

1. **Welcome Tab** - Feel free to explore or close it
2. **Color Theme** - Choose your preferred theme (we recommend "Dark+ (default dark)" or "GitHub Dark")
3. **File Icon Theme** - Select "Seti (Visual Studio Code)" for better file recognition

### Step 2: Essential Settings

Open settings with `Ctrl+,` (Windows/Linux) or `Cmd+,` (macOS) and configure:

```json
{
    "editor.fontSize": 14,
    "editor.fontFamily": "'Cascadia Code', 'Fira Code', Consolas, monospace",
    "editor.tabSize": 2,
    "editor.insertSpaces": true,
    "editor.wordWrap": "on",
    "files.autoSave": "afterDelay",
    "files.autoSaveDelay": 1000,
    "terminal.integrated.fontSize": 13
}
```

::: details How to Apply These Settings
1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type "Preferences: Open Settings (JSON)"
3. Add the settings above to your `settings.json` file
4. Save the file
:::

## Verification Steps

Let's make sure VS Code is working correctly:

### 1. Create a Test File
1. Press `Ctrl+N` (Windows/Linux) or `Cmd+N` (macOS) to create a new file
2. Type some sample code:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Hello Vibe-a-thon!</title>
   </head>
   <body>
       <h1>Welcome to the Workshop!</h1>
   </body>
   </html>
   ```
3. Save as `test.html` (Ctrl+S or Cmd+S)

### 2. Test Integrated Terminal
1. Press `Ctrl+`` (backtick) or go to Terminal → New Terminal
2. Type `node --version` (if you have Node.js) or `python --version`
3. The terminal should display version information

### 3. Test File Explorer
1. Press `Ctrl+Shift+E` (Windows/Linux) or `Cmd+Shift+E` (macOS)
2. You should see the File Explorer sidebar
3. Your `test.html` file should be visible

## Common Issues & Solutions

<div class="troubleshoot-section">

### Issue: "Code command not found in terminal"
**Solution:** Reinstall VS Code and make sure "Add to PATH" is checked, or:
- **Windows:** Add VS Code to PATH manually
- **macOS:** Press `Cmd+Shift+P`, type "Shell Command: Install 'code' command in PATH"
- **Linux:** Usually works by default with package installation

### Issue: VS Code won't start
**Solution:** 
1. Check if you have enough RAM (minimum 4GB available)
2. Try running as administrator (Windows) or with sudo (Linux)
3. Check antivirus software isn't blocking it

### Issue: Extensions won't install
**Solution:**
1. Check your internet connection
2. Restart VS Code
3. Clear extension cache: Press `Ctrl+Shift+P` → "Developer: Reload Window"

</div>

## Success!

Great job! VS Code is now ready for the workshop. You should have:

-  VS Code installed and running
-  Basic settings configured
-  Terminal working
-  File operations working

## What's Next?

Now that VS Code is set up, let's get version control ready:

<div class="next-step">
  <a href="/setup/git-github" class="next-button">
    <span class="next-content">
      <strong>Next: Git & GitHub</strong>
      <small>Set up version control and collaboration</small>
    </span>
    <span class="next-arrow">→</span>
  </a>
</div>

<style>
.download-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.download-card {
  background: #EFE8DE;
  color: #2C2C2C;
  border: 2px solid rgba(167, 55, 45, 0.15);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.download-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(167, 55, 45, 0.2);
  border-color: #A7372D;
}

.download-info h3 {
  margin: 0 0 0.5rem 0;
  color: #A7372D;
  font-weight: 600;
}

.download-info p {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
}

.download-btn {
  display: inline-block !important;
  background: linear-gradient(135deg, #A7372D 0%, #FF914D 100%) !important;
  color: white !important;
  padding: 12px 24px !important;
  border-radius: 50px !important;
  text-decoration: none !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  margin: 0.25rem !important;
  border: none !important;
  position: relative !important;
  overflow: hidden !important;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  box-shadow: 
    0 8px 25px rgba(167, 55, 45, 0.3),
    0 4px 12px rgba(255, 145, 77, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
  letter-spacing: 0.3px !important;
  z-index: 1 !important;
}

.download-btn::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: -100% !important;
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent) !important;
  transition: left 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  z-index: -1 !important;
  pointer-events: none !important;
}

.download-btn:hover {
  background: linear-gradient(135deg, #8B2E24 0%, #d97706 100%) !important;
  color: white !important;
  transform: translateY(-3px) scale(1.02) !important;
  box-shadow: 
    0 15px 35px rgba(167, 55, 45, 0.4),
    0 8px 25px rgba(255, 145, 77, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
  letter-spacing: 0.5px !important;
}

.download-btn:hover::before {
  left: 100%;
}

.download-btn:active {
  transform: translateY(-1px) scale(0.98);
  transition: all 0.1s ease;
}

.download-btn.secondary {
  background: rgba(255, 255, 255, 0.98) !important;
  border: 2px solid #A7372D !important;
  color: #A7372D !important;
  font-weight: 600 !important;
  z-index: 1 !important;
  text-shadow: none !important;
}

.download-btn.secondary,
.download-btn.secondary * {
  color: #A7372D !important;
}

.download-btn.secondary:hover {
  background: linear-gradient(135deg, #A7372D 0%, #FF914D 50%, #ff6b35 100%) !important;
  border-color: #A7372D !important;
  color: white !important;
  background: linear-gradient(135deg, #FF914D, #A7372D) !important;
  border-color: #A7372D !important;
  transform: translateY(-3px) scale(1.02) !important;
  box-shadow: 
    0 15px 35px rgba(255, 145, 77, 0.4),
    0 8px 25px rgba(167, 55, 45, 0.3) !important;
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
  display: flex !important;
  align-items: center !important;
  padding: 1.5rem !important;
  background: linear-gradient(135deg, #A7372D 0%, #FF914D 50%, #ff6b35 100%) !important;
  color: white !important;
  border-radius: 1rem !important;
  text-decoration: none !important;
  gap: 1rem !important;
  position: relative !important;
  overflow: hidden !important;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  box-shadow: 
    0 12px 32px rgba(167, 55, 45, 0.3),
    0 6px 16px rgba(255, 145, 77, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
  border: none !important;
  font-weight: 600 !important;
  z-index: 1 !important;
}

.next-button::before {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: -100% !important;
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent) !important;
  transition: left 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  z-index: -1 !important;
  pointer-events: none !important;
}

.next-button:hover {
  transform: translateY(-4px) scale(1.02) !important;
  background: linear-gradient(135deg, #8B2E24 0%, #d97706 50%, #ea580c 100%) !important;
  box-shadow: 
    0 20px 40px rgba(167, 55, 45, 0.4),
    0 10px 30px rgba(255, 145, 77, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
  color: white !important;
}

.next-button:hover::before {
  left: 100% !important;
}

.next-button:active {
  transform: translateY(-2px) scale(0.98) !important;
  transition: all 0.1s ease !important;
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
  display: block !important;
  font-size: 1.2rem !important;
  margin-bottom: 0.25rem !important;
  color: white !important;
  font-weight: 700 !important;
  letter-spacing: 0.3px !important;
}

.next-content small {
  opacity: 0.95 !important;
  font-size: 0.9rem !important;
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500 !important;
}

.next-arrow {
  font-size: 1.8rem !important;
  font-weight: bold !important;
  color: white !important;
  transition: transform 0.3s ease !important;
}

.next-button:hover .next-arrow {
  transform: translateX(4px) !important;
}
</style>