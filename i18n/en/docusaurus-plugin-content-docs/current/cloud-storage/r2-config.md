---
sidebar_position: 1
slug: /cloud-storage/r2-config
---
# R2 Configuration

ERD Builder Pro uses Cloudflare R2 (S3-compatible storage) to store images in **Notes** and **Drawings**. When Cloudflare R2 is configured, copies of **Database Backup** files are also sent to the same bucket.

Images are stored in a **private** bucket and displayed through short-lived signed URLs. The bucket does not need to be, and must not be, open to the public.

## 1. Create a Bucket
1. Log in to the **Cloudflare** dashboard.
2. Open the **R2** menu, then click **Create Bucket**.
3. Name the bucket, for example `erd-builder-pro-storage`. Leave public access disabled.

## 2. Create an API Token
1. Click **Manage R2 API Tokens** in the R2 dashboard.
2. Click **Create API Token**.
3. Select the **Object Read & Write** permission for that bucket.
4. Click **Create Token**, then save the **Access Key ID** and **Secret Access Key**.

## 3. Set the Server Environment

```env
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=erd-builder-pro-storage
```

`R2_ACCOUNT_ID` can be the account ID alone or the endpoint `https://<account-id>.r2.cloudflarestorage.com`. Restart the server after changing the variables.

:::warning Do not set `R2_PUBLIC_URL`
Notes and Drawings images are always treated as private assets. If `R2_PUBLIC_URL` is set, every upload is rejected with the message *Private document assets require storage without a public URL.* Leave this variable empty.
:::

## Desktop and CLI

In Desktop and CLI, you can set up storage from **Settings → Storage** without an environment file, by choosing **Cloudflare R2** or **S3-Compatible**. Click **Test Connection**, then **Save Configuration**. The **Public URL (optional)** field must also be left empty.

## How Images Are Displayed

- On upload, the server stores the image in the bucket, and the document stores the internal address `/api/serve/...`.
- Each time the document is opened, including through a public link, the server creates a new signed URL that is valid for 15 minutes.
- Uploading and displaying images does not require CORS rules on the bucket.

:::tip CORS for Notes export
Exporting Notes to PDF or Word fetches images directly from the bucket in the browser. If images are missing from the exported file, add a `GET` CORS rule for your app's domain in the bucket's **Settings → CORS Policy**:

```json
[
  {
    "AllowedOrigins": ["https://erd.example.com"],
    "AllowedMethods": ["GET"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3000
  }
]
```
:::

## Without Storage

Without a storage configuration, image uploads are rejected with the message *Storage is not configured. Please add storage configuration in Settings.* There is no fallback storage on the server disk. Drawings images in the Desktop app can still be used because they are stored inside the Drawing file.
