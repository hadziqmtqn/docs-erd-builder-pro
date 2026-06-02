---
sidebar_position: 2
slug: /getting-started/requirements
---
# System Requirements

Before installing ERD Builder Pro, ensure your system meets the following requirements.

## Software & Environment
- **Node.js**: Version 20.x or later.
- **npm**: Version 9.x or later.
- **Git**: Required for cloning the repository from GitHub.
- **Web Browser**: Latest version of Chrome, Firefox, Safari, or Edge (supports modern CSS and Canvas features).
- **Terminal/CLI**: Familiarity with Command Prompt, PowerShell, or Bash.

## Cloud Service Accounts
To run full features (including image storage and automatic backups), you will need:

1. **Supabase**: 
   - Free or paid account.
   - New project to obtain `URL` and `API Keys`.
2. **Cloudflare R2**:
   - Cloudflare account with R2 enabled.
   - Dedicated bucket for asset storage.
3. **GitHub**:
   - GitHub account for automatic backup integration via GitHub Actions.

## Internet Connection
Although this application supports **Offline First** features, an internet connection is still required to:
- Download dependencies during installation.
- Connect the application to Supabase services (Auth & Database).
- Upload image assets to Cloudflare R2.
- Synchronize data across devices.