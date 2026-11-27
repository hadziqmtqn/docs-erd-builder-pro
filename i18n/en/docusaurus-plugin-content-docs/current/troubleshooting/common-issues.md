---
sidebar_position: 1
slug: /troubleshooting/common-issues
---
# Common Issues

This page summarizes frequently encountered technical problems and their solutions.

## 1. "Create administrator account" Page Appears Again or `admin@local.dev` Login Is Rejected

**Cause**: `admin@local.dev` / `admin123` is an internal Desktop/CLI credential and is deliberately rejected on Self-host. Self-host does not create a default account; the SuperAdmin is created through the **Create administrator account** page.

**Solution**:
- Create an account with a new email and password through the **Create administrator account** page.
- Make sure the server and the seed command use the same `DATABASE_URL`.
- Make sure `ERD_ENCRYPTION_KEY` stays the same across restarts and deployments.

## 2. Forgot Password on Self-host

There is no "Forgot Password" feature in the Self-host interface. Run the following script from the project folder:

```bash
npm run reset-password -- --email your-email@example.com --password newpassword123
```

For Docker:

```bash
docker exec -it erd-builder-pro npm run reset-password -- --email your-email@example.com --password newpassword123
```

The password must be at least 6 characters. The script supports pure PostgreSQL and SQLite and does not require a restart. Supabase mode uses the Supabase dashboard to reset passwords. Desktop and CLI do not use passwords.

## 3. AI API Key Cannot Be Decrypted

**Symptom**: AI shows an error that the stored API key cannot be decrypted, or DB Client connections on Desktop/CLI fail after moving to another computer.

**Cause**: `ERD_ENCRYPTION_KEY` is missing or changed, or the `.erd-encryption-key` file on Desktop/CLI was left behind.

**Solution**:
- Restore the same `ERD_ENCRYPTION_KEY` value from your secret manager or `.env` backup.
- For Desktop/CLI, make sure the `.erd-encryption-key` file next to the database is still there, or set `ERD_ENCRYPTION_KEY_FILE`.
- If the old key cannot be recovered, save the API key again in **Settings → AI Configuration**.

## 4. Image Upload Fails

| Message | Cause and solution |
| :--- | :--- |
| *Storage is not configured. Please add storage configuration in Settings.* | Storage is not configured. Fill in the `R2_*` variables on the server, or **Settings → Storage** on Desktop/CLI. See [R2 Configuration](../cloud-storage/r2-config.md). |
| *Private document assets require storage without a public URL.* | `R2_PUBLIC_URL` (or **Public URL** in Settings → Storage) is set. Clear it, then restart the server. |
| *File type is not allowed. Use JPEG, PNG, WebP or SVG.* | The image format is not supported. |
| *The image is still larger than 1 MB after compression...* | Crop the image or use a smaller image. |
| *A document can hold up to 15 images and 2 MB of images...* | The per-document image limit has been reached. Delete other images in that document. |
| *This workspace has used its storage limit...* | (Cloud) The storage quota is full. See [Cloud Quota](../cloud-storage/cloud-quota.md). |

## 5. AI Does Not Respond

- Make sure a provider is configured and enabled in **Settings → AI Configuration**. On Self-host, this menu is visible only to the SuperAdmin.
- Save the configuration first, then click **Test Connection**; that button tests the API key that is already saved.
- For **OpenAI Compatible**, make sure the Base URL is correct. Many providers require the `/v1` suffix.
- Endpoints on a private network or localhost (for example Ollama) are blocked unless the server uses `AI_ALLOW_PRIVATE_BASE_URL=true`.
- In Cloud, the AI Assistant requires a Team plan that includes AI and has credits remaining.
- Check the server log or the browser's Network tab for error messages from the provider.

## 6. Import SQL Fails

**Symptom**: *No valid CREATE TABLE statements found.* or *Failed to parse SQL. Check your syntax.*

**Solution**:
- Use PostgreSQL or MySQL syntax, and end each statement with a semicolon (`;`).
- Make sure the SQL contains at least one `CREATE TABLE`. SQL that contains only `ALTER TABLE` cannot be imported.
- If a large file fails to process, import it in parts.

See [Import SQL](../core-features/import-sql.md). SQL text pasted into the DBML editor is not converted; use Import SQL.

## 7. "This file was changed by someone else"

Another Team member saved the same file. Your changes were not sent, so nothing was overwritten. Click **Load latest** to load the latest version; your local changes are saved as a recovery copy in the browser. See [Live Sync](../collaboration/live-sync.md).

## 8. Docker Container Is Not Accessible

- Make sure port `3000` on the host is not used by another application.
- Check the logs with `docker logs erd-builder-pro`.
- Make sure `.env` is included (`--env-file .env`) and `DATABASE_URL` is reachable from the container.
- The container waits up to 30 seconds for PostgreSQL at startup. Make sure the database is already running.

## 9. License State Cannot Be Written

Check `ERDBPRO_LICENSE_STATE_FILE` and the persistent volume. See [Persistent License State](../getting-started/deployment.md#persistent-license-state-paid-self-host).

## 10. Team Menu Does Not Appear

- Teams are available only in pure PostgreSQL mode: `DATABASE_URL` starts with `postgresql://` and no Supabase variables are set.
- On Self-host, Teams require an active Commercial license. Without a license, **Add Team** shows the **Unlock Teams** dialog.
- Desktop and CLI do not have Teams.

## 11. 403 Error When Managing AI Models (Supabase Legacy)

**Symptom**: 403 Forbidden when creating or editing data in **Settings → AI Configuration → AI Models** on a Supabase deployment.

**Cause**: The Supabase account does not have the `is_super_admin` flag or the `admin` role in its user metadata.

**Solution**:
1. Open the **SQL Editor** in the Supabase dashboard.
2. Run the following query with your admin email:

```sql
UPDATE auth.users
    SET raw_app_meta_data = raw_app_meta_data || '{"is_super_admin": true}'::jsonb
    WHERE email = 'admin@example.com';
```

3. Log out, then log in again.

## 12. Menus Cannot Be Clicked While Offline

When the connection to the server is lost, **Search**, **Trash**, **Version History**, and **Share** are disabled until the connection returns.
