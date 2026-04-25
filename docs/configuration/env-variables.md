---
sidebar_position: 1
slug: /configuration/env-variables
---
# Konfigurasi Environment Variables

Aplikasi ini membutuhkan beberapa variabel lingkungan (environment variables) agar semua fitur berjalan dengan lancar. Variabel ini harus dimasukkan ke dalam file `.env` di lokal atau diatur sebagai *Secrets* di platform deployment (Vercel/GitHub).

## Core (Supabase)
Variabel ini digunakan untuk autentikasi dan database utama.
- `SUPABASE_URL`: URL API proyek Supabase Anda.
- `SUPABASE_ANON_KEY`: Kunci anonim untuk akses frontend.
- `SUPABASE_SERVICE_ROLE_KEY`: Kunci peran layanan (hanya untuk sisi server).

## Storage (Cloudflare R2)
Variabel ini wajib diisi agar fitur unggah gambar dan backup manual berfungsi.
- `R2_ACCOUNT_ID`: ID akun Cloudflare Anda.
- `R2_ACCESS_KEY_ID`: Access Key dari API Token R2.
- `R2_SECRET_ACCESS_KEY`: Secret Key dari API Token R2.
- `R2_BUCKET_NAME`: Nama bucket yang digunakan.

## Backup (GitHub Actions)
Variabel khusus yang diperlukan untuk menjalankan skrip backup otomatis.
- `SUPABASE_DB_URL`: URL koneksi langsung ke database PostgreSQL (untuk `pg_dump`).
- (Membutuhkan variabel **Cloudflare R2** di atas untuk penyimpanan hasil backup).

*Penjelasan detail cara mendapatkan URL ini dapat dilihat di [Modul Backup](/docs/security-backup/auto-backup).*
