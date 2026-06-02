---
sidebar_position: 1
slug: /cloud-storage/r2-config
---
# R2 Configuration

ERD Builder Pro uses Cloudflare R2 for S3-compatible object storage. It is used to store image assets in the **Notes** module and files from **Automatic Backup**.

## Preparation Steps
1. Log in to the **Cloudflare** dashboard.
2. Go to the **R2** menu and click **Create Bucket**.
3. Name your bucket (e.g., `erd-builder-pro-storage`).

## Obtaining API Credentials
To connect the application, you need an API Token:
1. Click **Manage R2 API Tokens** in the right sidebar of the R2 dashboard.
2. Click **Create API Token**.
3. Select the **Object Read & Write** (or **Edit**) permission for the bucket you created.
4. Click **Create Token** and immediately save the following values:
   - **Access Key ID**
   - **Secret Access Key**

## Enabling Public Access (`R2_PUBLIC_URL`)
For the images you upload to appear in the application, your bucket must be publicly accessible via a URL:
1. In your bucket dashboard, open the **Settings** tab.
2. Look for the **Public Access** section.
3. Choose one of the methods:
   - **Custom Domain**: Connect your subdomain (e.g., `assets.yourdomain.com`). This is the recommended method.
   - **R2.dev Subdomain**: Click **Allow** to enable the free subdomain from Cloudflare. This is sufficient for testing purposes.
4. Copy the generated URL and use it as the value for `R2_PUBLIC_URL`.

## Configuration in the Application
Enter these values into the `.env` file:

```env
R2_ACCOUNT_ID=get_from_r2_dashboard
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=your_bucket_name
R2_PUBLIC_URL=https://your-subdomain.r2.dev or https://assets.yourdomain.com
```

## Additional Security: CORS Configuration
To prevent your image assets from being requested or used by unauthorized websites, you must configure **CORS (Cross-Origin Resource Sharing)**:

1. Open your R2 bucket dashboard, then go to the **Settings** tab.
2. Find the **CORS Policy** section and click **Add CORS Policy**.
3. Enter the following JSON configuration (adjust the domain):

```json
[
  {
    "AllowedOrigins": [
      "https://erd.bekenweb.com",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["GET"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

4. Click **Save**.

*With this configuration, your images will only appear if accessed through your official domain or during local development (localhost).*

> [!IMPORTANT]
> Make sure `R2_PUBLIC_URL` ends **without** a trailing slash `/`.