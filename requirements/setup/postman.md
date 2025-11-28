---
outline: deep
---

# Postman Setup

Postman is the world's leading API development platform. It's essential for testing, debugging, and documenting APIs during our workshop projects. Think of it as your Swiss Army knife for API development!

## Why Postman?

- **API Testing** - Send requests and analyze responses easily
- **Environment Management** - Switch between development, staging, and production
- **Collections** - Organize and share API requests with your team
- **Documentation** - Auto-generate API documentation
- **Collaboration** - Share workspaces with team members
- **Testing & Automation** - Write tests and run automated API workflows

## Download & Installation

### Step 1: Choose Your Version

<div class="download-section">
  <div class="download-card primary">
    <div class="download-info">
      <h3>Desktop App (Recommended)</h3>
      <p>Full-featured application with offline access</p>
      <div class="platform-downloads">
        <a href="https://dl.pstmn.io/download/latest/win64" class="download-btn">Windows (64-bit)</a>
        <a href="https://dl.pstmn.io/download/latest/osx_64" class="download-btn">macOS</a>
        <a href="https://dl.pstmn.io/download/latest/linux64" class="download-btn">Linux (64-bit)</a>
      </div>
    </div>
  </div>

  <div class="download-card">
    <div class="download-info">
      <h3>Web Version</h3>
      <p>Access Postman directly in your browser</p>
      <a href="https://web.postman.co/" class="download-btn secondary">Open Postman Web</a>
      <p class="note">Requires account login and internet connection</p>
    </div>
  </div>
</div>

::: tip Desktop vs Web
For the workshop, we recommend the **Desktop App** because:
- Works offline
- Better performance
- Full feature set
- Can intercept local requests
:::

### Step 2: Installation Process

#### Windows Installation
1. **Download** - Click the Windows download link above
2. **Run installer** - Double-click `Postman-win64-Setup.exe`
3. **Installation** - The installer will automatically download and install Postman
4. **Launch** - Postman will start automatically after installation

#### macOS Installation
1. **Download** - Click the macOS download link above
2. **Mount the disk image** - Double-click the downloaded `.dmg` file
3. **Install** - Drag Postman to your Applications folder
4. **Launch** - Open Postman from Applications
5. **Security** - Allow the app if macOS asks for permission

#### Linux Installation
```bash
# Download and extract
wget https://dl.pstmn.io/download/latest/linux64 -O postman-linux-x64.tar.gz
tar -xzf postman-linux-x64.tar.gz

# Move to /opt (optional)
sudo mv Postman /opt/

# Create desktop entry
cat > ~/.local/share/applications/postman.desktop << EOL
[Desktop Entry]
Type=Application
Name=Postman
Icon=/opt/Postman/app/resources/app/assets/icon.png
Exec="/opt/Postman/Postman"
Comment=Postman API Development Environment
Categories=Development;
EOL
```

## Initial Setup & Account Creation

### Step 1: Create Postman Account

When you first launch Postman, you'll see the welcome screen:

<div class="setup-flow">
  <div class="setup-card">
    <div class="setup-content">
      <h4>1. Sign Up</h4>
      <p>Create your free Postman account</p>
      <ul>
        <li>Click "Create Account"</li>
        <li>Use your email (same as GitHub recommended)</li>
        <li>Choose a strong password</li>
        <li>Verify your email</li>
      </ul>
    </div>
  </div>

  <div class="setup-card">
    <div class="setup-content">
      <h4>2. Complete Profile</h4>
      <p>Set up your developer profile</p>
      <ul>
        <li>Add your name and role</li>
        <li>Select "Student" or "Developer"</li>
        <li>Choose your experience level</li>
        <li>Skip team setup for now</li>
      </ul>
    </div>
  </div>

  <div class="setup-card">
    <div class="setup-content">
      <h4>3. Explore Interface</h4>
      <p>Get familiar with Postman</p>
      <ul>
        <li>Take the optional tour</li>
        <li>Create your first workspace</li>
        <li>Explore the dashboard</li>
      </ul>
    </div>
  </div>
</div>

### Step 2: Create Workshop Workspace

1. **Click "Workspaces"** in the top navigation
2. **Select "Create Workspace"**
3. **Workspace Details:**
   - Name: `Vibe-a-thon Workshop`
   - Description: `API development for workshop projects`
   - Visibility: Personal (you can share later)
4. **Create Workspace**

## Postman Basics & Interface

### Main Interface Components

<div class="interface-guide">
  <div class="interface-section">
    <h4>Request Builder</h4>
    <ul>
      <li><strong>HTTP Method:</strong> GET, POST, PUT, DELETE, etc.</li>
      <li><strong>URL Field:</strong> Enter your API endpoint</li>
      <li><strong>Parameters:</strong> Query parameters, path variables</li>
      <li><strong>Headers:</strong> HTTP headers (Content-Type, Authorization, etc.)</li>
      <li><strong>Body:</strong> Request payload (JSON, form data, etc.)</li>
    </ul>
  </div>

  <div class="interface-section">
    <h4>Collections</h4>
    <ul>
      <li><strong>Organize requests</strong> by project or feature</li>
      <li><strong>Share with team</strong> members easily</li>
      <li><strong>Run collections</strong> as automated tests</li>
      <li><strong>Generate documentation</strong> automatically</li>
    </ul>
  </div>

  <div class="interface-section">
    <h4>Environments</h4>
    <ul>
      <li><strong>Variables:</strong> Store URLs, API keys, tokens</li>
      <li><strong>Multiple environments:</strong> Dev, staging, production</li>
      <li><strong>Easy switching:</strong> Change entire environment with one click</li>
    </ul>
  </div>
</div>

## Your First API Test

Let's create your first API request to verify everything works:

### Step 1: Create a Simple GET Request

1. **Click "New"** → **"HTTP Request"**
2. **Set method** to `GET`
3. **Enter URL:** `https://jsonplaceholder.typicode.com/posts/1`
4. **Click "Send"**

You should see a response like:
```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit..."
}
```

### Step 2: Save Request to Collection

1. **Click "Save"** (next to Send button)
2. **Request name:** `Get Post by ID`
3. **Create new collection:** `Workshop API Tests`
4. **Save**

### Step 3: Create Environment Variables

1. **Click the gear icon** in top right
2. **Select "Manage Environments"**
3. **Click "Add"**
4. **Environment name:** `Workshop`
5. **Add variables:**
   - Variable: `base_url`
   - Initial Value: `https://jsonplaceholder.typicode.com`
   - Current Value: `https://jsonplaceholder.typicode.com`
6. **Save**

### Step 4: Use Environment Variables

1. **Select "Workshop" environment** from dropdown
2. **Edit your request URL** to: `{{base_url}}/posts/1`
3. **Send** - should work the same!

## Essential Postman Features for Workshop

### 1. Testing & Assertions
Add tests in the "Tests" tab:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has title", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('title');
});
```

### 2. Pre-request Scripts
Set up data or authentication before requests:
```javascript
// Generate timestamp
pm.globals.set("timestamp", new Date().toISOString());

// Set authentication header
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get("api_token")
});
```

### 3. Mock Servers
Create mock APIs for frontend development:
1. **Right-click collection** → **"Mock Collection"**
2. **Set up examples** in your requests
3. **Use mock URL** for development

## Verification Checklist

Let's ensure everything is working properly:

-  **Postman installed and running**
-  **Account created and verified**
-  **Workshop workspace created**
-  **First API request successful**
-  **Collection created and saved**
-  **Environment variables working**
-  **Basic tests written**

## Common Issues & Solutions

<div class="troubleshoot-section">

### Issue: Postman won't start
**Solution:**
1. **Windows:** Run as Administrator
2. **macOS:** Check Security & Privacy settings
3. **Linux:** Ensure you have required permissions
4. Try restarting your computer

### Issue: "Could not send request" error
**Solution:**
1. Check your internet connection
2. Disable VPN temporarily
3. Check proxy settings in Postman
4. Try a different URL (like `https://httpbin.org/get`)

### Issue: Can't save requests
**Solution:**
1. Make sure you're logged into your Postman account
2. Check if you have workspace permissions
3. Try creating a new collection first

### Issue: Environment variables not working
**Solution:**
1. Make sure environment is selected in dropdown
2. Check variable names match exactly (case-sensitive)
3. Use `{{variable_name}}` syntax with double curly braces

</div>

## Success!

Perfect! Postman is now ready for API development. You should have:

-  Postman installed and configured
-  Account created with workshop workspace
-  First API request completed successfully
-  Collection and environment set up
-  Basic testing knowledge

## What's Next?

Time to set up Supabase for our database and backend needs:

<div class="next-step">
  <a href="/setup/supabase" class="next-button">
    <span class="next-content">
      <strong>Next: Supabase Setup</strong>
      <small>Database and backend-as-a-service platform</small>
    </span>
    <span class="next-arrow">→</span>
  </a>
</div>

<style>
.download-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
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

.download-card.primary {
  border-color: #A7372D;
  background: linear-gradient(135deg, rgba(167, 55, 45, 0.1) 0%, rgba(255, 145, 77, 0.1) 100%);
}

.download-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
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

.platform-downloads {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  font-size: 0.9rem;
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
}

.note {
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.5rem;
  font-style: italic;
}

.setup-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.setup-card {
  background: rgba(142, 217, 210, 0.1);
  border: 2px solid rgba(142, 217, 210, 0.3);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.setup-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(142, 217, 210, 0.2);
}

.setup-icon {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
}

.setup-content h4 {
  margin: 0 0 0.5rem 0;
  color: #A7372D;
  font-size: 1.1rem;
}

.setup-content p {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
}

.setup-content ul {
  margin: 0;
  padding-left: 1rem;
}

.setup-content li {
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  color: #555;
}

.interface-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.interface-section {
  background: rgba(43, 154, 154, 0.05);
  border-left: 4px solid #A7372D;
  padding: 1rem 1.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

.interface-section h4 {
  margin: 0 0 1rem 0;
  color: #A7372D;
  font-size: 1rem;
}

.interface-section ul {
  margin: 0;
  padding-left: 1rem;
}

.interface-section li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
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