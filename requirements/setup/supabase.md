---
outline: deep
---

# Supabase Setup

Supabase is an open-source Firebase alternative that provides a complete backend solution. It's perfect for our workshop because it offers database, authentication, real-time subscriptions, and API generation - all in one platform!

## Why Supabase?

- **PostgreSQL Database** - Powerful, standards-compliant SQL database
- **Auto-generated APIs** - RESTful and GraphQL APIs created automatically
- **Real-time** - Live data synchronization across clients
- **Authentication** - Built-in user management with multiple providers
- **Row Level Security** - Fine-grained access control
- **Edge Functions** - Serverless functions for custom logic
- **Free Tier** - Generous limits for development and small projects

## Create Your Supabase Account

### Step 1: Sign Up

<div class="signup-section">
  <div class="signup-card">
    <div class="signup-content">
      <h3>Join Supabase</h3>
      <p>Create your free account and get started with modern backend development</p>
      <a href="https://supabase.com/dashboard/sign-up" class="signup-btn">Sign Up for Supabase</a>
      <div class="auth-options">
        <p class="auth-note">Sign up using:</p>
        <div class="auth-methods">
          <span class="auth-method">GitHub (Recommended)</span>
          <span class="auth-method">Email</span>
        </div>
      </div>
    </div>
  </div>
</div>

### Step 2: Account Setup Process

1. **Choose Sign-up Method:**
   - **GitHub (Recommended)** - Use your workshop GitHub account
   - **Email** - Use the same email as your other accounts

2. **Complete Profile:**
   - Verify your email if using email signup
   - Accept terms of service
   - Complete any required verification steps

3. **Dashboard Welcome:**
   - You'll be redirected to the Supabase dashboard
   - Take a moment to explore the interface
   - You might see a welcome tour - feel free to take it!

## Create Your First Project

### Step 1: New Project Setup

<div class="project-setup">
  <div class="step-card">
    <div class="step-number">1</div>
    <div class="step-content">
      <h4>Create Project</h4>
      <p>Click "New Project" in your dashboard</p>
    </div>
  </div>
  
  <div class="step-card">
    <div class="step-number">2</div>
    <div class="step-content">
      <h4>Choose Organization</h4>
      <p>Select your personal organization or create a new one</p>
    </div>
  </div>
  
  <div class="step-card">
    <div class="step-number">3</div>
    <div class="step-content">
      <h4>Project Details</h4>
      <p>Configure your project settings</p>
    </div>
  </div>
</div>

### Step 2: Project Configuration

Fill in your project details:

- **Name:** `vibe-a-thon-workshop`
- **Database Password:** Choose a strong password (save it securely!)
- **Region:** Choose the closest region to you:
  - 🇺🇸 **US East (N. Virginia)** - `us-east-1`
  - 🇺🇸 **US West (Oregon)** - `us-west-1`  
  - 🇪🇺 **Europe (Frankfurt)** - `eu-central-1`
  - 🇸🇬 **Asia Pacific (Singapore)** - `ap-southeast-1`
- **Pricing Plan:** Free (perfect for workshop and learning)

### Step 3: Project Creation

1. **Click "Create new project"**
2. **Wait for setup** - This takes 1-2 minutes
3. **Project ready** - You'll see the project dashboard

::: tip 💡 Save Your Credentials
Supabase will show you important credentials during setup. Save these securely:
- Project URL
- API Keys (anon/public and service_role)
- Database password
:::

## 🔧 Exploring the Supabase Dashboard

### Key Dashboard Sections

<div class="dashboard-guide">
  <div class="dashboard-section">
    <h4>Home</h4>
    <ul>
      <li>Project overview and quick stats</li>
      <li>Recent activity and logs</li>
      <li>Quick access to documentation</li>
    </ul>
  </div>

  <div class="dashboard-section">
    <h4>Table Editor</h4>
    <ul>
      <li>Visual database table management</li>
      <li>Create, edit, and delete tables</li>
      <li>Add/modify columns and constraints</li>
      <li>Insert and edit data directly</li>
    </ul>
  </div>

  <div class="dashboard-section">
    <h4>Authentication</h4>
    <ul>
      <li>User management and analytics</li>
      <li>Configure authentication providers</li>
      <li>Set up email templates</li>
      <li>Manage user policies</li>
    </ul>
  </div>

  <div class="dashboard-section">
    <h4>API</h4>
    <ul>
      <li>Auto-generated API documentation</li>
      <li>Test API endpoints</li>
      <li>View and copy code examples</li>
      <li>Manage API keys</li>
    </ul>
  </div>
</div>

## Create Your First Database Table

Let's create a simple table to test everything works:

### Step 1: Open Table Editor
1. **Click "Table Editor"** in the left sidebar
2. **Click "Create a new table"**

### Step 2: Table Configuration
- **Name:** `workshop_participants`
- **Description:** `Workshop participant information`
- **Enable Row Level Security (RLS):**  (recommended)

### Step 3: Add Columns
Create these columns:

| Column Name | Type | Default | Constraints |
|-------------|------|---------|-------------|
| `id` | `bigint` | Auto-generated | Primary Key |
| `name` | `text` | | Not Null |
| `email` | `text` | | Not Null, Unique |
| `skill_level` | `text` | `'beginner'` | |
| `created_at` | `timestamptz` | `now()` | |

### Step 4: Create Table
Click "Save" to create your table!

## Test Your Setup

### Step 1: Insert Sample Data
1. **Go to your new table** in Table Editor
2. **Click "Insert row"**
3. **Add sample data:**
   - Name: `Alex Workshop`
   - Email: `alex@workshop.dev`
   - Skill Level: `intermediate`
4. **Save**

### Step 2: Test API Access
1. **Go to API section** in sidebar
2. **Find your table** in the documentation
3. **Try the "Read all rows" example:**

```bash
curl 'https://your-project-id.supabase.co/rest/v1/workshop_participants' \
-H "apikey: your-anon-key" \
-H "Authorization: Bearer your-anon-key"
```

### Step 3: Test in Browser
Visit the API URL directly in your browser:
```
https://your-project-id.supabase.co/rest/v1/workshop_participants?apikey=your-anon-key
```

You should see your data in JSON format!

## Understanding Supabase Keys

<div class="keys-guide">
  <div class="key-card safe">
    <div class="key-header">
      <h4>Anon/Public Key</h4>
    </div>
    <div class="key-content">
      <p><strong>Safe for client-side use</strong></p>
      <ul>
        <li>Use in frontend applications</li>
        <li>Respects Row Level Security</li>
        <li>Limited permissions by design</li>
        <li>Can be exposed in public code</li>
      </ul>
    </div>
  </div>

  <div class="key-card danger">
    <div class="key-header">
      <h4>Service Role Key</h4>
    </div>
    <div class="key-content">
      <p><strong>Server-side only! Never expose!</strong></p>
      <ul>
        <li>Full database access</li>
        <li>Bypasses Row Level Security</li>
        <li>Use in backend/serverless functions</li>
        <li>Keep secret like a password!</li>
      </ul>
    </div>
  </div>
</div>

## Setting Up Row Level Security (RLS)

RLS is Supabase's security feature that controls data access at the row level:

### Step 1: Enable RLS (if not already enabled)
1. **Go to Table Editor**
2. **Select your table**
3. **Click the shield icon** next to table name
4. **Toggle "Enable RLS"**

### Step 2: Create Policies
1. **Click "Add Policy"**
2. **Choose policy type:**
   - **Select** - Who can read data
   - **Insert** - Who can add data
   - **Update** - Who can modify data
   - **Delete** - Who can remove data

### Example Policy - Allow Public Read:
```sql
-- Allow anyone to read workshop participants
CREATE POLICY "Allow public read access"
ON workshop_participants FOR SELECT
TO anon
USING (true);
```

## Integrating with Your Projects

### JavaScript/TypeScript (Recommended)

#### Install Supabase Client
```bash
npm install @supabase/supabase-js
```

#### Basic Setup
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseKey = 'your-anon-key'
const supabase = createClient(supabaseUrl, supabaseKey)

// Fetch data
const { data, error } = await supabase
  .from('workshop_participants')
  .select('*')

// Insert data
const { data, error } = await supabase
  .from('workshop_participants')
  .insert({ name: 'New Participant', email: 'new@example.com' })
```

### Other Languages

Supabase provides client libraries for:
- **Python** - `supabase-py`
- **Dart/Flutter** - `supabase_flutter`
- **C#** - `supabase-csharp`
- **Swift** - `supabase-swift`
- **Kotlin** - `supabase-kt`

## Verification Checklist

Ensure everything is working:

-  **Supabase account created and verified**
-  **Workshop project created successfully**
-  **Database credentials saved securely**
-  **First table created with sample data**
-  **API endpoints tested and working**
-  **Row Level Security configured**
-  **Ready to integrate with frontend projects**

## Common Issues & Solutions

<div class="troubleshoot-section">

### Issue: Can't access API endpoints
**Solution:**
1. Check if RLS is enabled and you have proper policies
2. Verify you're using the correct project URL and API key
3. Make sure your table has data to return
4. Check network connectivity

### Issue: "relation does not exist" error
**Solution:**
1. Verify table name spelling (case-sensitive)
2. Make sure table was created successfully
3. Check if you're using the correct database/project

### Issue: Authentication errors
**Solution:**
1. Verify API key is correct and not expired
2. Check if you're using anon key (not service role) for client-side
3. Ensure RLS policies allow your operation

### Issue: Project creation fails
**Solution:**
1. Try a different region
2. Check if your organization has available projects
3. Verify your account is properly verified
4. Contact Supabase support if persistent

</div>

## Success!

Excellent! Supabase is now ready for backend development. You should have:

-  Supabase account and project set up
-  Database with tables and sample data
-  API endpoints tested and working
-  Security policies configured
-  Ready for integration with frontend frameworks

## What's Next?

Time to set up design collaboration tools with Figma:

<div class="next-step">
  <a href="/setup/figma" class="next-button">
    <span class="next-content">
      <strong>Next: Figma Setup</strong>
      <small>Design collaboration and prototyping platform</small>
    </span>
    <span class="next-arrow">→</span>
  </a>
</div>

<style>
.signup-section {
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
  max-width: 450px;
  transition: all 0.3s ease;
}

.signup-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(43, 154, 154, 0.25);
}

.signup-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
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
  margin-bottom: 1rem;
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
  box-shadow: 0 20px 40px rgba(43, 154, 154, 0.4), 0 10px 20px rgba(167, 55, 45, 0.3);
}

.signup-btn:hover::before {
  left: 100%;
}

.auth-options {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(43, 154, 154, 0.2);
}

.auth-note {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #888;
}

.auth-methods {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.auth-method {
  background: rgba(43, 154, 154, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  color: #A7372D;
}

.project-setup {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.step-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(142, 217, 210, 0.1);
  border: 2px solid rgba(142, 217, 210, 0.3);
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  transition: all 0.3s ease;
}

.step-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(142, 217, 210, 0.2);
}

.step-number {
  background: #A7372D;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 0.25rem 0;
  color: #A7372D;
  font-size: 1rem;
}

.step-content p {
  margin: 0;
  color: #666;
  font-size: 0.85rem;
}

.dashboard-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.dashboard-section {
  background: rgba(43, 154, 154, 0.05);
  border-left: 4px solid #A7372D;
  padding: 1rem 1.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

.dashboard-section h4 {
  margin: 0 0 1rem 0;
  color: #A7372D;
  font-size: 1rem;
}

.dashboard-section ul {
  margin: 0;
  padding-left: 1rem;
}

.dashboard-section li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

.keys-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.key-card {
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.key-card.safe {
  background: rgba(43, 154, 154, 0.05);
  border: 2px solid rgba(43, 154, 154, 0.2);
}

.key-card.danger {
  background: rgba(167, 55, 45, 0.05);
  border: 2px solid rgba(167, 55, 45, 0.2);
}

.key-card:hover {
  transform: translateY(-2px);
}

.key-card.safe:hover {
  box-shadow: 0 4px 15px rgba(43, 154, 154, 0.2);
}

.key-card.danger:hover {
  box-shadow: 0 4px 15px rgba(167, 55, 45, 0.2);
}

.key-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.key-icon {
  font-size: 1.5rem;
}

.key-header h4 {
  margin: 0;
  font-size: 1.1rem;
}

.key-card.safe .key-header h4 {
  color: #A7372D;
}

.key-card.danger .key-header h4 {
  color: #A7372D;
}

.key-content p {
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.key-card.safe .key-content p {
  color: #A7372D;
}

.key-card.danger .key-content p {
  color: #A7372D;
}

.key-content ul {
  margin: 0;
  padding-left: 1rem;
}

.key-content li {
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
  box-shadow: 0 20px 40px rgba(43, 154, 154, 0.4), 0 10px 20px rgba(167, 55, 45, 0.3);
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