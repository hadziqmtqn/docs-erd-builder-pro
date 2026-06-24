---
sidebar_position: 1
slug: /troubleshooting/common-issues
---
# Common Issues

This page summarizes several technical issues you may encounter and practical solutions to resolve them.

## 1. Data Sync Failure (Offline Sync)
**Symptoms**: Recently changed data does not appear when opened on another device or after the app is restarted.
**Solutions**:
- Ensure the app stays open for a while after an internet connection is detected to allow synchronization time.
- Check the **Network** tab in the browser (Developer Tools) to ensure there are no 403 or 401 errors when the app attempts to push data to Supabase.
- If synchronization still fails, refresh the page (make sure the data is saved in your browser's local storage).

## 2. Database Connection Failure (GitHub Actions)
**Symptoms**: Error `psql: error: could not connect to server: Connection timed out` during automatic backup.
**Solutions**: 
- Make sure you are using the **Transaction Pooler** (Port 6543) and not the direct connection (5432).
- Check if `SUPABASE_DB_URL` in GitHub Secrets is correct and uses the proper URI format.

## 3. Images Not Appearing (Cloudflare R2)
**Symptoms**: Images in Notes or Drawings are broken or not displayed.
**Solutions**:
- Ensure the API Token in Cloudflare has "Edit" or "Admin" permission for the bucket.
- Check if `R2_ACCOUNT_ID` and `R2_BUCKET_NAME` in the `.env` file are correct.
- Ensure **CORS** in the Cloudflare R2 dashboard is allowed for your app's official domain.

## 4. AI Not Responding Issue
**Symptoms**: Chat AI stops in the middle or displays a connection error message.
**Solutions**:
- Check the **API Key** in Settings > AI Configuration. Make sure the key is still active and has sufficient quota.
- If using **Custom/OpenAI Compatible**, make sure the **Base URL** is correct and includes `/v1` at the end (e.g., `http://localhost:20128/v1`).
- Check the terminal logs (if running locally) or the Network tab in the browser for error details from the API provider.

## 5. SQL Parsing Error
**Symptoms**: The entered SQL does not convert to a diagram or an error occurs during parsing.
**Solutions**:
- Make sure the SQL syntax uses the **PostgreSQL** dialect (the main supported dialect).
- Check for unsupported special characters or overly complex syntax. Try parsing table by table if the SQL file is too large.

## 6. Docker Issue (Deployment)
**Symptoms**: Docker container is not accessible on port 3000.
**Solutions**:
- Make sure port 3000 is not already in use by another application on the host machine.
- Check container logs with the `docker logs erd-app` command for startup error messages.
- Ensure the `.env` file is included when running the container (`--env-file .env`).

## 8. 403 Forbidden Error When Managing Model Catalog

**Symptoms**: A 403 Forbidden error appears when creating or editing data in **Settings > Model Catalog**.

**Cause**: Your Supabase account is missing the `is_super_admin` flag in user metadata. The application checks this flag to grant access to the Model Catalog feature.

**Solution**:
1. Open your Supabase Dashboard.
2. Navigate to **SQL Editor**.
3. Create a new query and run the following command, adjusting the email to match your admin account:

```sql
UPDATE auth.users
    SET raw_app_meta_data = raw_app_meta_data || '{"is_super_admin": true}'::jsonb
    WHERE email = 'admin@example.com';
```

   Replace `admin@example.com` with your actual admin account email.

4. After running the query, **logout** and **login again** to the ERD Builder Pro application.

> **Note**: This issue is specific to **Supabase (PostgreSQL)** mode. Local PostgreSQL and Desktop (SQLite) modes are not affected because all local accounts are automatically admin.

## 7. Canvas Feels Heavy/Laggy After Generate
**Symptoms**: After you click the action button below the AI response in the Chat Panel (such as *Replace All*, *Append*, *Create or Update ERD from SQL*, or *Create or Update Flowchart*) for the first time, moving tables or symbols on the canvas feels heavy or "janky".

**Cause**: This is a technical limitation with the initial canvas state synchronization when receiving a large amount of new data from AI.

**Solutions**:
- Simply **Reload/Refresh your browser page** once. After refreshing, the canvas will return to being smooth and normal.