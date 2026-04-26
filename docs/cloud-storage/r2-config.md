---
sidebar_position: 1
slug: /cloud-storage/r2-config
---
# Konfigurasi R2

ERD Builder Pro menggunakan Cloudflare R2 untuk penyimpanan objek yang kompatibel dengan S3. Ini digunakan untuk menyimpan aset gambar pada modul **Notes** dan file hasil **Backup Otomatis**.

## Langkah-langkah Persiapan
1. Login ke dashboard **Cloudflare**.
2. Masuk ke menu **R2** dan klik **Create Bucket**.
3. Beri nama bucket Anda (contoh: `erd-builder-pro-storage`).

## Mendapatkan Kredensial API
Untuk menghubungkan aplikasi, Anda memerlukan API Token:
1. Klik **Manage R2 API Tokens** di sidebar kanan dashboard R2.
2. Klik **Create API Token**.
3. Pilih izin **Object Read & Write** (atau **Edit**) untuk bucket yang telah dibuat.
4. Klik **Create Token** dan segera simpan nilai berikut:
   - **Access Key ID**
   - **Secret Access Key**

## Mengaktifkan Akses Publik (`R2_PUBLIC_URL`)
Agar gambar yang Anda unggah dapat tampil di aplikasi, bucket Anda harus bisa diakses secara publik melalui URL:
1. Di dashboard bucket Anda, buka tab **Settings**.
2. Cari bagian **Public Access**.
3. Pilih salah satu metode:
   - **Custom Domain**: Hubungkan subdomain Anda (misal: `assets.domainanda.com`). Ini adalah cara yang paling direkomendasikan.
   - **R2.dev Subdomain**: Klik **Allow** untuk mengaktifkan subdomain gratis dari Cloudflare. Ini cukup untuk keperluan testing.
4. Salin URL yang dihasilkan dan gunakan sebagai nilai `R2_PUBLIC_URL`.

## Konfigurasi ke Aplikasi
Masukkan nilai-nilai tersebut ke dalam file `.env`:

```env
R2_ACCOUNT_ID=dapatkan_dari_dashboard_r2
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=nama_bucket_anda
R2_PUBLIC_URL=https://subdomain-anda.r2.dev atau https://assets.domain.com
```

## Keamanan Tambahan: Konfigurasi CORS
Untuk mencegah aset gambar Anda dipanggil atau digunakan oleh website lain yang tidak sah, Anda wajib mengatur **CORS (Cross-Origin Resource Sharing)**:

1. Buka dashboard bucket R2 Anda, lalu buka tab **Settings**.
2. Cari bagian **CORS Policy** dan klik **Add CORS Policy**.
3. Masukkan konfigurasi JSON berikut (sesuaikan domainnya):

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

4. Klik **Save**. 

*Dengan konfigurasi ini, gambar Anda hanya akan muncul jika dibuka melalui domain resmi Anda atau saat pengembangan di lokal (localhost).*

> [!IMPORTANT]
> Pastikan `R2_PUBLIC_URL` diakhiri **tanpa** tanda slash `/` di bagian belakang.
