---
outline: deep
---

# Workshop Setup Overview

Welcome to the Vibe-a-thon setup guide! This comprehensive guide will walk you through installing and configuring all the essential tools you'll need for our workshop.

## What You'll Need

Our workshop covers full-stack development, so we'll be using a variety of tools. Here's what we'll set up in the optimal order:

### Development Environment (Essential)
1. **[Visual Studio Code](/setup/vscode)** - Your main code editor
2. **[Git & GitHub](/setup/git-github)** - Version control and collaboration
3. **[VS Code Extensions](/setup/vscode-extensions)** - GitLens, GitHub Copilot, and more

### Development Tools
4. **[Postman](/setup/postman)** - API testing and development
5. **[Supabase](/setup/supabase)** - Database and backend services

### Design & Organization Tools
6. **[Figma](/setup/figma)** - Design collaboration and prototyping
7. **[Canva](/setup/canva)** - Presentations and marketing materials
8. **[Notion](/setup/notion)** - Project organization and documentation

## Time Estimate

- **Total setup time:** 30-45 minutes
- **Per tool:** 3-8 minutes each
- **Verification:** 5 minutes

::: tip Pro Tip
Follow the setup order as listed above! Some tools work better when installed in this sequence, and you'll have a smoother experience.
:::

## System Requirements

### Minimum Requirements
- **OS:** Windows 10/11, macOS 10.14+, or Linux Ubuntu 18.04+
- **RAM:** 8GB (16GB recommended)
- **Storage:** 5GB free space
- **Internet:** Stable broadband connection

### Recommended Setup
- **RAM:** 16GB or more
- **Storage:** SSD with 10GB+ free space
- **Display:** 1920x1080 or higher resolution

## Workshop Benefits

After completing this setup, you'll be ready to:

- **Code efficiently** with VS Code and extensions
- **Collaborate seamlessly** using Git and GitHub
- **Test APIs** professionally with Postman
- **Manage databases** using Supabase
- **Design interfaces** collaboratively in Figma
- **Create presentations** quickly with Canva
- **Organize projects** effectively in Notion

## Getting Started

Ready to begin? Let's start with the most important tool:

<div class="setup-cards">
  <a href="/setup/vscode" class="setup-card primary">
    <div class="card-content">
      <h3>Start Here: VS Code</h3>
      <p>Set up your development environment</p>
    </div>
    <div class="card-arrow">→</div>
  </a>
</div>

::: info Need Help?
If you run into any issues during setup, check our [Troubleshooting](/troubleshooting) guide or reach out to the workshop organizers!
:::

<style>
.setup-cards {
  margin: 2rem 0;
}

.setup-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: rgba(167, 55, 45, 0.05);
  border: 2px solid rgba(167, 55, 45, 0.2);
  border-radius: 1rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  gap: 1rem;
}

.setup-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(167, 55, 45, 0.15);
  border-color: #A7372D;
}

.setup-card.primary {
  background: linear-gradient(135deg, rgba(167, 55, 45, 0.1) 0%, rgba(255, 145, 77, 0.1) 100%);
}

.card-content {
  flex: 1;
}

.card-content h3 {
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  color: #A7372D;
}

.card-content p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.card-arrow {
  font-size: 1.5rem;
  color: #A7372D;
  font-weight: bold;
}
</style>