---
sidebar_position: 1
slug: /cloud-storage/r2-config
---
# Konfigurasi R2

ERD Builder Pro memakai Cloudflare R2 (storage kompatibel S3) untuk menyimpan gambar di **Notes** dan **Drawings**. Bila Cloudflare R2 dikonfigurasi, salinan file **Database Backup** juga dikirim ke bucket yang sama.

Gambar disimpan di bucket **privat** dan ditampilkan lewat signed URL berumur pendek. Bucket tidak perlu, dan tidak boleh, dibuka untuk publik.

## 1. Buat Bucket
1. Login ke dashboard **Cloudflare**.
2. Buka menu **R2**, lalu klik **Create Bucket**.
3. Beri nama bucket, misalnya `erd-builder-pro-storage`. Biarkan akses publik nonaktif.

## 2. Buat API Token
1. Klik **Manage R2 API Tokens** di dashboard R2.
2. Klik **Create API Token**.
3. Pilih izin **Object Read & Write** untuk bucket tersebut.
4. Klik **Create Token**, lalu simpan **Access Key ID** dan **Secret Access Key**.

## 3. Isi Environment Server

```env
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=erd-builder-pro-storage
```

`R2_ACCOUNT_ID` boleh berupa ID akun saja atau endpoint `https://<account-id>.r2.cloudflarestorage.com`. Restart server setelah mengubah variabel.

:::warning Jangan isi `R2_PUBLIC_URL`
Gambar Notes dan Drawings selalu diperlakukan sebagai aset privat. Bila `R2_PUBLIC_URL` diisi, setiap unggahan ditolak dengan pesan *Private document assets require storage without a public URL.* Kosongkan variabel ini.
:::

## Desktop dan CLI

Di Desktop dan CLI, Anda bisa mengisi storage dari **Settings → Storage** tanpa file environment, dengan pilihan **Cloudflare R2** atau **S3-Compatible**. Klik **Test Connection**, lalu **Save Configuration**. Kolom **Public URL (optional)** juga harus dikosongkan.

## Cara Gambar Ditampilkan

- Saat diunggah, server menyimpan gambar di bucket dan dokumen menyimpan alamat internal `/api/serve/...`.
- Setiap kali dokumen dibuka, termasuk lewat link publik, server membuat signed URL baru yang berlaku 15 menit.
- Unggahan dan tampilan gambar tidak memerlukan aturan CORS di bucket.

:::tip CORS untuk export Notes
Export Notes ke PDF atau Word mengambil gambar langsung dari bucket di browser. Bila gambar tidak ikut di hasil export, tambahkan aturan CORS `GET` untuk domain aplikasi Anda di **Settings → CORS Policy** bucket:

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

## Tanpa Storage

Tanpa konfigurasi storage, unggahan gambar ditolak dengan pesan *Storage is not configured. Please add storage configuration in Settings.* Tidak ada penyimpanan cadangan di disk server. Gambar Drawings di aplikasi Desktop tetap bisa dipakai karena disimpan di dalam file Drawing.
