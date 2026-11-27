---
sidebar_position: 2
slug: /troubleshooting/faq
---
# Frequently Asked Questions (FAQ)

Answers to frequently asked questions about using and configuring ERD Builder Pro.

### What is the difference between Cloud, Self-host, Desktop, and CLI?
Cloud is managed by the ERD Builder Pro team and uses an ERDBPro SaaS account. Self-host is installed on your server with PostgreSQL. Desktop and CLI run on your computer with SQLite for a single user. See [Usage Options](../getting-started/intro.md#pilihan-penggunaan).

### Can Desktop use PostgreSQL?
Not as the application database; Desktop and CLI always use SQLite. However, you can open other PostgreSQL, MySQL, or SQLite databases through the [DB Client](../core-features/db-client.md).

### How does the app work when the connection is lost?
Notes saves drafts in the browser (IndexedDB) before sending them to the server, so your latest typing is not lost right away. While the connection is lost, some menus such as Search, Trash, Version History, and Share are disabled.

### Are the images I upload publicly accessible?
Not directly. Images are stored in a private bucket and displayed through signed URLs that are valid for 15 minutes and regenerated each time the document is opened. For this reason, `R2_PUBLIC_URL` must be left empty. See [R2 Configuration](../cloud-storage/r2-config.md).

### What does the "Experimental" label mean?
Features labeled Experimental, such as Notes Import and Export, already work but are still in development. Results may not be perfect yet. Make a backup before using them heavily.

### Can I use a light theme (Light Mode)?
Yes. Open **Settings → Appearance**, then choose **Light**, **Dark**, or **System**.

### Why does the Team menu not appear?
Teams exist only in Cloud and in Self-host with pure PostgreSQL. On Self-host, Teams require a Self-host Commercial license. Desktop and CLI do not have Teams.

### Where can I see the app's change history?
See the **[Changelog](../changelog.mdx)** page, which pulls release notes from GitHub, or **Settings → What's New** in the app.

### What if I forget my password on Self-host?
Run the following script from the project folder (or with `docker exec` in the container):

```bash
npm run reset-password -- --email your-email@example.com --password newpassword123
```

The script finds the user by email, hashes the new password with `scrypt` (the same as normal login), then updates the database. No restart is needed.

### What if I forget my password on an older Supabase deployment?
Reset the password or manage accounts in the **Supabase → Authentication → Users** dashboard.

### Why is the `admin@local.dev` / `admin123` login invalid on Self-host?
That combination is only an internal Desktop/CLI credential. Self-host rejects it so that a shared deployment does not run with a default password. On an empty database, use the **Create administrator account** page to create the SuperAdmin.

### Why does the administrator registration page appear again?
That page appears when the database has no SuperAdmin yet. Make sure the app uses the same `DATABASE_URL` as the database you prepared.

### What happens if `ERD_ENCRYPTION_KEY` is lost or changed?
Stored AI API keys (and DB Client credentials on Desktop/CLI) cannot be decrypted. Restore the same key from your secret manager or environment backup. Do not create a new key for an existing database unless you are ready to save all credentials again.
