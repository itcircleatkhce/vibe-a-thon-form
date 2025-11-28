---
outline: deep
---

# Git & GitHub Setup

Git is the industry-standard version control system, and GitHub is where we'll collaborate on code. Think of Git as your coding time machine - it tracks every change and lets you go back in time if needed!

## Why Git & GitHub?

- **Version Control** - Track every change in your code
- **Collaboration** - Work on projects with team members
- **Backup** - Your code is safely stored in the cloud
- **Portfolio** - Showcase your projects to employers
- **Open Source** - Contribute to amazing projects worldwide

## Installing Git

### Step 1: Download Git

<div class="download-section">
  <div class="download-card">
    <div class="download-info">
      <h3>Windows</h3>
      <p>Git for Windows (includes Git Bash)</p>
      <a href="https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe" class="download-btn">Download Git for Windows</a>
    </div>
  </div>

  <div class="download-card">
    <div class="download-info">
      <h3>macOS</h3>
      <p>Git via Homebrew or installer</p>
      <a href="https://git-scm.com/download/mac" class="download-btn">Download for Mac</a>
    </div>
  </div>

  <div class="download-card">
    <div class="download-info">
      <h3>Linux</h3>
      <p>Install via package manager</p>
      <div class="linux-commands">
        <code>sudo apt install git</code>
        <code>sudo yum install git</code>
      </div>
    </div>
  </div>
</div>

### Step 2: Git Installation

#### Windows Installation
1. **Run the installer** - Double-click the downloaded `.exe` file
2. **License Agreement** - Click "Next" to accept
3. **Installation Location** - Keep default path
4. **Select Components** - Keep all default selections
5. **Start Menu Folder** - Keep default "Git"
6. **Default Editor** - Choose "Use Visual Studio Code as Git's default editor"
7. **PATH Environment** - Select "Git from the command line and also from 3rd-party software"
8. **HTTPS Transport** - Keep "Use the OpenSSL library"
9. **Line Ending Conversions** - Keep "Checkout Windows-style, commit Unix-style line endings"
10. **Terminal Emulator** - Choose "Use Windows' default console window"
11. **Git Pull Behavior** - Keep "Default (fast-forward or merge)"
12. **Credential Manager** - Keep "Git Credential Manager"
13. **Extra Options** - Keep defaults
14. **Install** - Click Install and wait

#### macOS Installation
```bash
# Option 1: Using Homebrew (recommended)
brew install git

# Option 2: Download installer from git-scm.com
# Follow the installation wizard
```

#### Linux Installation
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install git

# CentOS/RHEL
sudo yum install git

# Fedora
sudo dnf install git
```

## Git Configuration

After installing Git, you need to configure it with your information:

### Step 1: Open Terminal/Command Prompt
- **Windows:** Open Git Bash or PowerShell
- **macOS/Linux:** Open Terminal

### Step 2: Set Your Identity
```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Configure VS Code as Default Editor
```bash
git config --global core.editor "code --wait"
```

### Step 4: Set Default Branch Name
```bash
git config --global init.defaultBranch main
```

## Creating Your GitHub Account

### Step 1: Sign Up for GitHub

<div class="github-signup">
  <div class="signup-card">
    <div class="signup-content">
      <h3>Join GitHub</h3>
      <p>Create your free account to start collaborating</p>
      <a href="https://github.com/join" class="signup-btn">Sign Up for GitHub</a>
    </div>
  </div>
</div>

### Step 2: GitHub Registration Process
1. **Visit GitHub.com** - Click "Sign up" 
2. **Enter Details:**
   - Username (choose wisely - this becomes part of your professional profile!)
   - Email address (use the same one you configured in Git)
   - Password (make it strong!)
3. **Verify Account** - Complete the puzzle verification
4. **Choose Plan** - Select "Free" (perfect for the workshop)
5. **Personalize Experience** - Answer the optional questions or skip
6. **Verify Email** - Check your email and click the verification link

### Step 3: GitHub Profile Setup
1. **Upload Profile Picture** - Click on your avatar → Settings → Profile
2. **Add Bio** - Write a brief description about yourself
3. **Add Location** - Where you're based
4. **Add Website/Portfolio** - If you have one

::: tip Pro Tip for Username
Choose a professional username! Many employers look at GitHub profiles, so `codingmaster2025` is better than `partygirl123`. You can use your real name, initials, or a combination.
:::

## Setting Up SSH Keys (Recommended)

SSH keys provide secure, password-free authentication with GitHub.

### Step 1: Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

When prompted:
- Press Enter for default file location
- Enter a secure passphrase (or press Enter for no passphrase)

### Step 2: Add SSH Key to SSH Agent

#### Windows (Git Bash)
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

#### macOS
```bash
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

#### Linux
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Step 3: Add SSH Key to GitHub
1. **Copy your public key:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   Copy the entire output

2. **Add to GitHub:**
   - Go to GitHub.com → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Title: "Workshop Laptop" (or your computer name)
   - Key: Paste the copied public key
   - Click "Add SSH key"

### Step 4: Test SSH Connection
```bash
ssh -T git@github.com
```

You should see: "Hi username! You've successfully authenticated..."

## Verification Steps

Let's test everything works correctly:

### 1. Check Git Installation
```bash
git --version
```
Should show Git version 2.40+ 

### 2. Check Configuration
```bash
git config --list
```
Verify your name, email, and editor are set correctly

### 3. Create Test Repository
1. **On GitHub:**
   - Click "+" → "New repository"
   - Name: `vibe-a-thon-test`
   - Description: "Testing Git setup for workshop"
   - Make it Public
   - Check "Add a README file"
   - Click "Create repository"

2. **Clone to Your Computer:**
   ```bash
   git clone git@github.com:yourusername/vibe-a-thon-test.git
   ```

3. **Make a Change:**
   ```bash
   cd vibe-a-thon-test
   echo "Hello from the workshop! 🚀" >> README.md
   git add README.md
   git commit -m "Add workshop greeting"
   git push origin main
   ```

4. **Verify on GitHub:** Refresh your repository page and see the change!

## Common Issues & Solutions

<div class="troubleshoot-section">

### Issue: "git: command not found"
**Solution:** 
- **Windows:** Restart your terminal or computer after Git installation
- **macOS/Linux:** Make sure Git is in your PATH, try installing via package manager

### Issue: SSH connection fails
**Solution:**
1. Check if SSH key is added: `ssh-add -l`
2. Regenerate SSH key if needed
3. Make sure you copied the PUBLIC key (.pub file) to GitHub
4. Try using HTTPS instead of SSH for now

### Issue: Permission denied on git push
**Solution:**
1. Check if you're the repository owner or collaborator
2. Verify SSH key is properly set up
3. Try using personal access token instead of password

### Issue: "Author identity unknown"
**Solution:** Run the git config commands again:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

</div>

## Success!

Excellent! You now have Git and GitHub set up. You should have:

-  Git installed and configured
-  GitHub account created
-  SSH keys set up (recommended)
-  Test repository created and updated
-  Basic Git workflow working

## What's Next?

Time to supercharge VS Code with essential extensions:

<div class="next-step">
  <a href="/setup/vscode-extensions" class="next-button">
    <span class="next-content">
      <strong>Next: VS Code Extensions</strong>
      <small>Install GitLens, Copilot, and other essential tools</small>
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
  display: inline-block;
  background: linear-gradient(135deg, #A7372D 0%, #FF914D 50%, #ff6b35 100%);
  color: white !important;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  margin: 0.25rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.download-btn::before {
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

.download-btn:hover {
  transform: scale(1.02) translateY(-3px);
  box-shadow: 0 15px 35px rgba(167, 55, 45, 0.4), 0 8px 15px rgba(255, 145, 77, 0.3);
}

.download-btn:hover::before {
  left: 100%;
}

.linux-commands {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.linux-commands code {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
}

.github-signup {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.signup-card {
  background: #EFE8DE;
  border: 2px solid rgba(167, 55, 45, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  transition: all 0.3s ease;
}

.signup-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(167, 55, 45, 0.25);
}

.signup-content h3 {
  margin: 0 0 0.5rem 0;
  color: #A7372D;
  font-size: 1.5rem;
}

.signup-content p {
  margin: 0 0 1.5rem 0;
  color: #666;
}

.signup-btn {
  display: inline-block;
  background: linear-gradient(135deg, #A7372D 0%, #FF914D 50%, #ff6b35 100%);
  color: white !important;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.signup-btn::before {
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

.signup-btn:hover {
  transform: scale(1.02) translateY(-3px);
  box-shadow: 0 20px 40px rgba(167, 55, 45, 0.4), 0 10px 20px rgba(255, 145, 77, 0.3);
}

.signup-btn:hover::before {
  left: 100%;
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