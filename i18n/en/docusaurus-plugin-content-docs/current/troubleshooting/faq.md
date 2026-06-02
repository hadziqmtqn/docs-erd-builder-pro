---
sidebar_position: 2
slug: /troubleshooting/faq
---
# Frequently Asked Questions (FAQ)

Below are answers to the most frequently asked questions regarding the use and configuration of ERD Builder Pro.

### Why should I use Port 6543 for Backup?
GitHub Actions runs in an environment that only supports **IPv4**. Since the latest Supabase database often uses **IPv6**, direct connections through the default port `5432` will fail. Port `6543` is the **Transaction Pooler** which provides a stable IPv4 path for the backup process.

### How does this application work when Offline?
ERD Builder Pro is designed with an **Offline-First** approach. 
- All changes you make are saved first to **IndexedDB** in your browser.
- When an internet connection is available, the system will automatically attempt to sync that local data to the Supabase (Cloud) database.

### Is it safe to use a Public Bucket in Cloudflare R2?
Although the bucket is set to *Public*, your data remains safe because:
1. **Random File Names**: Each image is given a unique UUID name that is impossible to guess.
2. **CORS Policy**: You can restrict images to only load from your application's official domain.
3. **No Indexing**: As long as the image links are not shared on public sites, search engines like Google will not be able to find them.

### What does the "Experimental" label on some features mean?
Features labeled Experimental (such as Import Notes or Export PDF) are features that are functional but still in active development. You may encounter minor visual issues or small bugs. We recommend always backing up your database before trying these features extensively.

### Can I change the theme color (Dark/Light Mode)?
ERD Builder Pro is currently optimized for **Dark Mode** to provide a focused and elegant design experience. Support for Light Mode is on our development roadmap.

### Where can I see the application change log?
You can view the list of new features, bug fixes, and version updates directly through the **[Changelog](/changelog)** menu, which is directly linked to our GitHub releases.

### What if I forget my Supabase password?
Since authentication uses Supabase, you can reset your password or manage user accounts through the dashboard **Supabase > Authentication > Users**.