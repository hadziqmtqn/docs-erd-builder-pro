---
sidebar_position: 1
slug: /cloud-storage/r2-config
---
# Konfigurasi R2

ERD Builder Pro menggunakan Cloudflare R2 untuk penyimpanan objek yang kompatibel dengan S3, memastikan aset gambar dan file backup Anda tersimpan dengan aman dan murah.

## Langkah-langkah Persiapan
1. Login ke dashboard **Cloudflare**.
2. Masuk ke menu **R2** dan klik **Create Bucket**.
3. Beri nama bucket Anda (contoh: `erd-builder-assets`).

## Mendapatkan Kredensial
Untuk menghubungkan aplikasi, Anda memerlukan:
- **Account ID**: Dapat ditemukan di halaman utama dashboard R2.
- **Access Key ID & Secret Access Key**: 
  - Klik "Manage R2 API Tokens".
  - Klik "Create API Token".
  - Pilih izin "Edit" untuk bucket yang telah dibuat.
  - Simpan kredensial yang muncul (Secret Key hanya akan muncul sekali).

## Konfigurasi ke Aplikasi
Masukkan nilai-nilai tersebut ke dalam file `.env`:
```env
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_ACCOUNT_ID=your_account_id
R2_BUCKET_NAME=your_bucket_name
```
