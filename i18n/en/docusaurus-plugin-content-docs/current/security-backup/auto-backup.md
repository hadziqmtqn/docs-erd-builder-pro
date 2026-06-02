---
sidebar_position: 2
slug: /security-backup/auto-backup
---
# Auto Backup (GitHub Actions)

ERD Builder Pro uses **GitHub Actions** to run database backup routines automatically and reliably. This feature ensures your data is always safe even if a system failure occurs on the main server.

## Backup Workflow

The backup system works through the following flow:

1. **Trigger**: The workflow is executed based on a schedule (every day at 00:00 UTC), manual trigger from the application dashboard, or manually from the Actions tab on GitHub.
2. **Preparation**: GitHub Actions runner installs **PostgreSQL Client v17**.
3. **Execution**: The database is dumped using the `pg_dump` command and compressed into `.sql.gz`.
4. **Storage**: The file is uploaded to **Cloudflare R2** via the S3 protocol.
5. **Finalization**: The workflow sends a status update to the Supabase database to update the backup history in the application dashboard.

## Important Configuration (Prerequisites)

For the workflow to run successfully, several technical requirements must be met:

### 1. Use Supabase Pooler (Port 6543)

> [!IMPORTANT]
> GitHub Actions runs on runners that currently **do not support IPv6**. Since new projects on Supabase often only support IPv6 for direct connections (port 5432), you **MUST** use the **Transaction Pooler** (Port 6543) in the `SUPABASE_DB_URL` variable.

**Correct URL format:**
`postgresql://postgres.xxxxx:[PASSWORD]@aws-0-xxxx.pooler.supabase.com:6543/postgres?pgbouncer=true`

### 2. Setup GitHub Secrets

Make sure all the following variables have been registered in **Settings > Secrets and variables > Actions** of your GitHub repository:
- `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL` (Use Port 6543)
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`

## How to Run Manually via GitHub

If you want to ensure the backup system works without waiting for the automatic schedule:
1. Open your repository on GitHub.
2. Click the **Actions** tab.
3. Select the **Database Auto Backup Routine** workflow on the left side.
4. Click the **Run workflow** button.

## Troubleshooting

If the backup status in the application dashboard is stuck at **Processing**:
1. Check the **Actions** tab on GitHub to see the error log.
2. Make sure `SUPABASE_DB_URL` is using port 6543.
3. Make sure the R2 API Token has *Read & Write* permissions (not just Read).