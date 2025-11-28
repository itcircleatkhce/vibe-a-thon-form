---
outline: deep
---

# 🛠️ Troubleshooting Guide

Having issues with your setup? Don't worry! This comprehensive troubleshooting guide will help you solve common problems and get back to coding quickly.

## 🚨 General Troubleshooting Steps

Before diving into specific issues, try these universal fixes:

<div class="general-fixes">
  <div class="fix-card">
    <div class="fix-icon">🔄</div>
    <div class="fix-content">
      <h4>Restart & Refresh</h4>
      <ul>
        <li>Restart your application</li>
        <li>Refresh your browser</li>
        <li>Restart your computer</li>
        <li>Clear browser cache</li>
      </ul>
    </div>
  </div>

  <div class="fix-card">
    <div class="fix-icon">🌐</div>
    <div class="fix-content">
      <h4>Check Internet</h4>
      <ul>
        <li>Verify stable connection</li>
        <li>Try different network</li>
        <li>Disable VPN temporarily</li>
        <li>Test with different browser</li>
      </ul>
    </div>
  </div>

  <div class="fix-card">
    <div class="fix-icon">🔐</div>
    <div class="fix-content">
      <h4>Permissions & Security</h4>
      <ul>
        <li>Run as administrator</li>
        <li>Check antivirus blocking</li>
        <li>Disable firewall temporarily</li>
        <li>Allow app in security settings</li>
      </ul>
    </div>
  </div>
</div>

## 💻 VS Code Issues

<div class="troubleshoot-section">

### Issue: VS Code won't start or crashes
**Symptoms:** Application doesn't open or closes immediately

**Solutions:**
1. **Check system requirements:** Ensure you have enough RAM (4GB+)
2. **Run as administrator** (Windows) or with sudo (Linux)
3. **Reset VS Code settings:**
   ```bash
   # Windows
   %APPDATA%\Code\User\settings.json
   
   # macOS
   ~/Library/Application Support/Code/User/settings.json
   
   # Linux
   ~/.config/Code/User/settings.json
   ```
4. **Reinstall VS Code** - Download fresh copy from official website
5. **Check for conflicting software** - Some antivirus programs interfere

### Issue: Extensions won't install
**Symptoms:** Extension installation fails or gets stuck

**Solutions:**
1. **Check internet connection** and try again
2. **Clear extension cache:**
   - Press `Ctrl+Shift+P` → "Developer: Reload Window"
3. **Install manually:**
   - Download `.vsix` file from marketplace
   - Use "Install from VSIX" option
4. **Check proxy settings** if behind corporate firewall
5. **Try different extension marketplace mirror**

### Issue: IntelliSense not working
**Symptoms:** No code completion or error detection

**Solutions:**
1. **Check file association** - Make sure file has correct extension
2. **Install language extensions** - TypeScript, Python, etc.
3. **Restart TypeScript server:**
   - `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
4. **Check workspace trust** - VS Code may restrict features in untrusted workspaces
5. **Verify project structure** - Make sure package.json or tsconfig.json exists

### Issue: Terminal not working
**Symptoms:** Integrated terminal won't open or shows errors

**Solutions:**
1. **Reset terminal settings:**
   ```json
   {
     "terminal.integrated.shell.windows": "powershell.exe"
   }
   ```
2. **Check terminal executable path**
3. **Try different shell** - CMD, PowerShell, Git Bash
4. **Run VS Code as administrator**
5. **Disable terminal extensions** temporarily

</div>

## 🐙 Git & GitHub Issues

<div class="troubleshoot-section">

### Issue: "git: command not found"
**Symptoms:** Git commands not recognized in terminal

**Solutions:**
1. **Verify Git installation:**
   ```bash
   git --version
   ```
2. **Add Git to PATH (Windows):**
   - Find Git installation folder (usually `C:\Program Files\Git\bin`)
   - Add to system PATH environment variable
3. **Restart terminal/computer** after installation
4. **Use Git Bash** if regular terminal doesn't work
5. **Reinstall Git** with "Git from command line" option enabled

### Issue: SSH authentication fails
**Symptoms:** "Permission denied (publickey)" error

**Solutions:**
1. **Check SSH key exists:**
   ```bash
   ls -la ~/.ssh/
   ```
2. **Generate new SSH key if needed:**
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```
3. **Add SSH key to agent:**
   ```bash
   ssh-add ~/.ssh/id_ed25519
   ```
4. **Verify key on GitHub** - Check SSH keys in GitHub settings
5. **Test SSH connection:**
   ```bash
   ssh -T git@github.com
   ```
6. **Use HTTPS instead** if SSH keeps failing

### Issue: Push/pull operations fail
**Symptoms:** "failed to push" or authentication errors

**Solutions:**
1. **Check remote URL:**
   ```bash
   git remote -v
   ```
2. **Update remote to HTTPS:**
   ```bash
   git remote set-url origin https://github.com/username/repo.git
   ```
3. **Use Personal Access Token** instead of password
4. **Check repository permissions** - Make sure you have access
5. **Pull latest changes first:**
   ```bash
   git pull origin main
   ```

### Issue: Merge conflicts
**Symptoms:** Git shows conflict markers in files

**Solutions:**
1. **Open conflicted files** and look for conflict markers:
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Other changes
   >>>>>>> branch-name
   ```
2. **Resolve conflicts manually** - Choose which code to keep
3. **Stage resolved files:**
   ```bash
   git add resolved-file.js
   ```
4. **Complete merge:**
   ```bash
   git commit -m "Resolve merge conflicts"
   ```
5. **Use VS Code merge editor** for visual resolution

</div>

## 📮 Postman Issues

<div class="troubleshoot-section">

### Issue: Postman won't start
**Symptoms:** Application doesn't launch or crashes

**Solutions:**
1. **Run as administrator** (Windows)
2. **Check system requirements** - 4GB RAM minimum
3. **Clear Postman cache:**
   - Windows: `%APPDATA%\Postman`
   - macOS: `~/Library/Application Support/Postman`
   - Linux: `~/.config/Postman`
4. **Disable antivirus temporarily**
5. **Try web version** at web.postman.co
6. **Reinstall from official website**

### Issue: "Could not send request" error
**Symptoms:** Requests fail to send or timeout

**Solutions:**
1. **Check internet connection**
2. **Verify URL format** - Include http:// or https://
3. **Disable proxy** in Postman settings
4. **Turn off SSL verification** for development:
   - Settings → General → SSL certificate verification OFF
5. **Check firewall/antivirus** blocking requests
6. **Try different request (like httpbin.org/get)**

### Issue: Environment variables not working
**Symptoms:** {{variable}} not being replaced

**Solutions:**
1. **Select correct environment** from dropdown
2. **Check variable name spelling** (case-sensitive)
3. **Use double curly braces:** `{{variable_name}}`
4. **Verify variable scope** - environment vs global
5. **Check variable value** in environment settings
6. **Refresh environment** or restart Postman

### Issue: Can't save requests or collections
**Symptoms:** Save button doesn't work or grayed out

**Solutions:**
1. **Sign in to Postman account**
2. **Check internet connection**
3. **Create workspace first** if none exists
4. **Check account permissions** for team workspaces
5. **Try saving locally** then sync later
6. **Clear Postman cache** and restart

</div>

## 🗄️ Supabase Issues

<div class="troubleshoot-section">

### Issue: "Failed to create project"
**Symptoms:** Project creation gets stuck or fails

**Solutions:**
1. **Try different region** for project location
2. **Check organization limits** - Free tier has project limits
3. **Verify email confirmation** - Check for verification email
4. **Wait and retry** - Supabase may be experiencing high load
5. **Use different browser** or incognito mode
6. **Contact Supabase support** if persistent

### Issue: API requests return 401/403 errors
**Symptoms:** "Invalid API key" or permission denied

**Solutions:**
1. **Verify API key** - Copy from project settings
2. **Use correct key type:**
   - `anon` key for client-side
   - `service_role` key for server-side only
3. **Check Row Level Security (RLS)** policies:
   ```sql
   -- Enable RLS
   ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
   
   -- Create policy for public access
   CREATE POLICY "Allow public read" ON your_table
   FOR SELECT TO anon USING (true);
   ```
4. **Verify project URL** format
5. **Check request headers** include apikey

### Issue: Database queries fail
**Symptoms:** "relation does not exist" or syntax errors

**Solutions:**
1. **Check table name spelling** (case-sensitive)
2. **Verify table exists** in Table Editor
3. **Check column names** match exactly
4. **Use proper schema** (usually `public`)
5. **Test query in SQL Editor** first:
   ```sql
   SELECT * FROM your_table LIMIT 5;
   ```
6. **Check RLS policies** aren't blocking access

### Issue: Real-time subscriptions not working
**Symptoms:** No real-time updates received

**Solutions:**
1. **Enable realtime** for your table:
   ```sql
   ALTER PUBLICATION supabase_realtime ADD TABLE your_table;
   ```
2. **Check subscription syntax:**
   ```javascript
   const subscription = supabase
     .from('your_table')
     .on('*', payload => {
       console.log('Change received!', payload)
     })
     .subscribe()
   ```
3. **Verify network connection** supports WebSockets
4. **Check browser console** for errors
5. **Try without VPN/proxy**

</div>

## 🎨 Figma Issues

<div class="troubleshoot-section">

### Issue: Figma web app won't load
**Symptoms:** Blank screen or infinite loading

**Solutions:**
1. **Check internet connection** and speed
2. **Try different browser** (Chrome recommended)
3. **Disable browser extensions** temporarily
4. **Clear browser cache and cookies**
5. **Use incognito/private mode**
6. **Check Figma status** at status.figma.com
7. **Try desktop app** as alternative

### Issue: Can't edit shared files
**Symptoms:** "View only" mode or can't make changes

**Solutions:**
1. **Check permissions** - Ask owner for edit access
2. **Verify correct account** - Make sure you're logged in with right email
3. **Accept invitation** - Check email for sharing invitation
4. **Refresh file** or reload browser
5. **Check file ownership** - May need to duplicate to edit
6. **Contact file owner** to adjust permissions

### Issue: Fonts not loading or missing
**Symptoms:** Text shows with wrong font or default font

**Solutions:**
1. **Install missing fonts** on your computer
2. **Use web-safe fonts** for collaboration
3. **Check font licensing** - Some fonts require subscription
4. **Use Figma font suggestions** when prompted
5. **Enable font access** in browser settings
6. **Try desktop app** for better font support

### Issue: Images won't upload
**Symptoms:** Upload fails or images don't appear

**Solutions:**
1. **Check file size** - Keep under 25MB
2. **Use supported formats** - JPG, PNG, SVG, GIF
3. **Check internet speed** - Large files need good connection
4. **Try smaller images** or compress first
5. **Clear browser cache**
6. **Use drag-and-drop** instead of file picker

</div>

## 🎭 Canva Issues

<div class="troubleshoot-section">

### Issue: Templates won't load
**Symptoms:** Template previews show as blank or loading indefinitely

**Solutions:**
1. **Check internet connection** stability
2. **Clear browser cache** and cookies
3. **Try different browser** or incognito mode
4. **Disable ad blockers** temporarily
5. **Check Canva status** - May be experiencing outages
6. **Refresh page** or restart browser
7. **Try mobile app** as alternative

### Issue: Images upload slowly or fail
**Symptoms:** Upload progress stalls or images don't appear

**Solutions:**
1. **Check file size** - Reduce to under 25MB
2. **Use supported formats** - JPG, PNG, SVG recommended
3. **Compress images** before uploading
4. **Check internet upload speed**
5. **Upload one image at a time**
6. **Try different image** to test if file-specific issue
7. **Use stock photos** from Canva library temporarily

### Issue: Can't share designs
**Symptoms:** Share button doesn't work or others can't access

**Solutions:**
1. **Check sharing permissions** settings
2. **Copy share link manually** from address bar
3. **Verify recipient email addresses**
4. **Try different sharing method** (link vs email)
5. **Check if design is published** vs draft
6. **Make design public** if appropriate
7. **Use "Anyone with link" permission**

### Issue: Canva Pro features not working
**Symptoms:** Premium templates or features are locked

**Solutions:**
1. **Verify subscription status** in account settings
2. **Check payment method** if subscription lapsed
3. **Clear browser cookies** and re-login
4. **Contact Canva support** for billing issues
5. **Use free alternatives** from basic templates
6. **Check team subscription** if part of organization

</div>

## 📝 Notion Issues

<div class="troubleshoot-section">

### Issue: Pages load slowly or timeout
**Symptoms:** Content takes long time to load or doesn't load

**Solutions:**
1. **Check internet connection** speed and stability
2. **Reduce page size** - Break large pages into smaller ones
3. **Remove large images** or compress them
4. **Try desktop app** instead of web version
5. **Clear browser cache** and restart
6. **Close unused browser tabs**
7. **Check Notion status** page for outages

### Issue: Can't create or edit content
**Symptoms:** Pages are read-only or editing doesn't work

**Solutions:**
1. **Check page permissions** - Make sure you have edit access
2. **Verify workspace access** - You may need invitation
3. **Refresh page** or restart browser
4. **Check account status** - Free accounts have limits
5. **Try different browser** or incognito mode
6. **Log out and back in** to refresh session
7. **Contact page owner** for permissions

### Issue: Sharing not working
**Symptoms:** Others can't access shared pages

**Solutions:**
1. **Check sharing settings** - Public vs private
2. **Copy share link correctly** - Use "Share" button
3. **Verify permissions** - View vs edit access
4. **Check recipient account** - They may need Notion account
5. **Make page public** if appropriate
6. **Share parent page** if child pages aren't accessible
7. **Use "Anyone with link" permission**

### Issue: Mobile app won't sync
**Symptoms:** Changes don't appear across devices

**Solutions:**
1. **Check internet connection** on mobile device
2. **Force close app** and reopen
3. **Log out and back in** to mobile app
4. **Update app** to latest version
5. **Clear app cache** (Android) or reinstall (iOS)
6. **Check storage space** on device
7. **Try web version** on mobile browser

</div>

## 🔧 Hardware & System Issues

<div class="troubleshoot-section">

### Issue: Computer running slowly
**Symptoms:** Applications lag, slow response times

**Solutions:**
1. **Check RAM usage** - Close unnecessary programs
2. **Free up disk space** - Delete temporary files
3. **Update operating system** and drivers
4. **Scan for malware** with antivirus
5. **Restart computer** to clear memory
6. **Close browser tabs** that consume resources
7. **Consider upgrading hardware** if persistently slow

### Issue: Network/Internet problems
**Symptoms:** Slow or intermittent connectivity

**Solutions:**
1. **Test connection speed** at speedtest.net
2. **Restart router/modem** by unplugging for 30 seconds
3. **Connect via ethernet** instead of WiFi
4. **Try different network** (mobile hotspot)
5. **Check with ISP** for service issues
6. **Update network drivers**
7. **Disable VPN** if causing issues

### Issue: Display/resolution problems
**Symptoms:** Text too small, elements not visible

**Solutions:**
1. **Adjust display scaling** in system settings
2. **Change browser zoom** (Ctrl + +/-)
3. **Update graphics drivers**
4. **Use different monitor** if external display issues
5. **Check application settings** for UI scaling
6. **Restart in safe mode** to test drivers
7. **Reset display settings** to default

</div>

## 📞 Getting Help

<div class="help-section">

### 🆘 During the Workshop
- **Raise your hand** for immediate mentor assistance
- **Ask fellow participants** - often someone has solved the same issue
- **Use workshop chat/Discord** for quick questions
- **Check with organizers** for technical difficulties

### 🌐 Online Resources
<div class="resources-grid">
  <div class="resource-card">
    <h4>Stack Overflow</h4>
    <p>Programming Q&A community</p>
    <a href="https://stackoverflow.com/" target="_blank">Visit Site</a>
  </div>
  
  <div class="resource-card">
    <h4>GitHub Issues</h4>
    <p>Report bugs in open source projects</p>
    <a href="https://github.com/issues" target="_blank">Search Issues</a>
  </div>
  
  <div class="resource-card">
    <h4>MDN Web Docs</h4>
    <p>Web development documentation</p>
    <a href="https://developer.mozilla.org/" target="_blank">Visit Docs</a>
  </div>
  
  <div class="resource-card">
    <h4>Reddit Communities</h4>
    <p>r/webdev, r/programming, etc.</p>
    <a href="https://reddit.com/r/webdev" target="_blank">Join Community</a>
  </div>
</div>

### 📧 Official Support
- **VS Code:** [GitHub Issues](https://github.com/microsoft/vscode/issues)
- **GitHub:** [Support Portal](https://support.github.com/)
- **Postman:** [Help Center](https://www.postman.com/support/)
- **Supabase:** [Support](https://supabase.com/support)
- **Figma:** [Help Center](https://help.figma.com/)
- **Canva:** [Help Center](https://www.canva.com/help/)
- **Notion:** [Help Center](https://www.notion.so/help)

</div>

## 🎯 Prevention Tips

<div class="prevention-tips">
  <div class="tip-card">
    <div class="tip-icon">💾</div>
    <div class="tip-content">
      <h4>Save Your Work Frequently</h4>
      <p>Use Git commits, auto-save features, and backup important files regularly.</p>
    </div>
  </div>

  <div class="tip-card">
    <div class="tip-icon">🔄</div>
    <div class="tip-content">
      <h4>Keep Everything Updated</h4>
      <p>Regularly update your tools, operating system, and browser for best performance.</p>
    </div>
  </div>

  <div class="tip-card">
    <div class="tip-icon">📋</div>
    <div class="tip-content">
      <h4>Document Your Setup</h4>
      <p>Keep notes on configurations, passwords, and customizations for easy recovery.</p>
    </div>
  </div>

  <div class="tip-card">
    <div class="tip-icon">🧪</div>
    <div class="tip-content">
      <h4>Test Early and Often</h4>
      <p>Regularly test your tools and connections to catch issues before they become critical.</p>
    </div>
  </div>
</div>

## 🎉 Still Stuck?

Don't worry! Every developer faces technical challenges. Here's what to remember:

<div class="final-encouragement">
  <h3>🤝 You're Not Alone</h3>
  <p>The development community is incredibly supportive. Don't hesitate to ask for help - we've all been there, and people love to help fellow developers succeed!</p>
  
  <div class="encouragement-actions">
    <div class="action-item">
      <strong>🔍 Search First</strong>
      <span>Chances are someone else had the same issue</span>
    </div>
    <div class="action-item">
      <strong>📝 Describe Clearly</strong>
      <span>Include error messages, steps taken, and system info</span>
    </div>
    <div class="action-item">
      <strong>🎯 Try Simple Solutions</strong>
      <span>Often a restart or refresh fixes the issue</span>
    </div>
    <div class="action-item">
      <strong>💪 Keep Learning</strong>
      <span>Every problem solved makes you a better developer</span>
    </div>
  </div>
</div>

<style>
.general-fixes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.fix-card {
  background: rgba(167, 55, 45, 0.05);
  border: 2px solid rgba(167, 55, 45, 0.15);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.fix-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(167, 55, 45, 0.2);
  border-color: #A7372D;
}

.fix-icon {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.fix-content h4 {
  margin: 0 0 1rem 0;
  color: #A7372D;
  font-weight: 600;
  text-align: center;
}

.fix-content ul {
  margin: 0;
  padding-left: 1rem;
}

.fix-content li {
  margin-bottom: 0.5rem;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.4;
}

.troubleshoot-section {
  background: rgba(167, 55, 45, 0.05);
  border-left: 4px solid #A7372D;
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 1.5rem;
  margin: 2rem 0;
}

.troubleshoot-section h3 {
  color: #A7372D;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.troubleshoot-section h3:not(:first-child) {
  margin-top: 2rem;
}

.troubleshoot-section h4 {
  color: #A7372D;
  margin: 1.5rem 0 0.5rem 0;
  font-size: 1rem;
}

.troubleshoot-section h4:first-child {
  margin-top: 0;
}

.troubleshoot-section p {
  margin: 0.5rem 0;
  color: #666;
  font-style: italic;
}

.troubleshoot-section ol,
.troubleshoot-section ul {
  margin: 0.5rem 0 1.5rem 1rem;
}

.troubleshoot-section li {
  margin-bottom: 0.5rem;
  color: #555;
  line-height: 1.4;
}

.troubleshoot-section pre {
  background: rgba(44, 44, 44, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem 0;
  overflow-x: auto;
}

.troubleshoot-section code {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
}

.help-section {
  background: rgba(255, 145, 77, 0.1);
  border: 2px solid rgba(255, 145, 77, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  margin: 3rem 0;
}

.help-section h3 {
  color: #A7372D;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.help-section h3:not(:first-child) {
  margin-top: 2rem;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.resource-card {
  background: white;
  border: 2px solid rgba(167, 55, 45, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
}

.resource-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(167, 55, 45, 0.15);
  border-color: #A7372D;
}

.resource-card h4 {
  margin: 0 0 0.5rem 0;
  color: #A7372D;
  font-size: 0.9rem;
}

.resource-card p {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.8rem;
}

.resource-card a {
  background: #A7372D;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.resource-card a:hover {
  background: #802B24;
  transform: translateY(-1px);
}

.prevention-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.tip-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(167, 55, 45, 0.05);
  border: 1px solid rgba(167, 55, 45, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
}

.tip-icon {
  font-size: 2rem;
  min-width: 3rem;
  text-align: center;
}

.tip-content h4 {
  margin: 0 0 0.5rem 0;
  color: #A7372D;
  font-size: 0.9rem;
}

.tip-content p {
  margin: 0;
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
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
  margin: 0 0 2rem 0;
  font-size: 1rem;
  line-height: 1.5;
}

.encouragement-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.75rem;
}

.action-item strong {
  color: #A7372D;
  font-size: 0.9rem;
}

.action-item span {
  color: #666;
  font-size: 0.8rem;
  text-align: center;
}
</style>