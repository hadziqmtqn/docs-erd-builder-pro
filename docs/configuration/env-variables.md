---
sidebar_position: 1
slug: /configuration/env-variables
---
# Konfigurasi Environment Variables

Aplikasi ini membutuhkan beberapa variabel lingkungan (environment variables) agar semua fitur berjalan dengan lancar. Variabel ini harus dimasukkan ke dalam file `.env` di lokal atau diatur sebagai *Secrets* di platform deployment (Vercel/GitHub).

## Frontend Config (Vite)
Variabel ini digunakan oleh sisi client (browser) dan wajib menggunakan prefix `VITE_`.
- `VITE_SUPABASE_URL`: URL API proyek Supabase Anda.
- `VITE_SUPABASE_ANON_KEY`: Kunci anonim untuk akses frontend.
- `VITE_ENABLE_GUEST_MODE`: (Opsional) Set ke `true` untuk mengizinkan penggunaan tanpa login.

## Backend Config
Variabel ini hanya digunakan oleh sisi server (Express/Vercel Functions).
- `SUPABASE_URL`: URL API proyek Supabase Anda.
- `SUPABASE_SERVICE_ROLE_KEY`: Kunci peran layanan untuk operasi administratif.
- `PORT`: (Opsional) Port untuk server backend (default: 3000).

## Storage (Cloudflare R2)
- `R2_ACCOUNT_ID`: ID akun Cloudflare Anda.
- `R2_ACCESS_KEY_ID`: Access Key dari API Token R2.
- `R2_SECRET_ACCESS_KEY`: Secret Key dari API Token R2.
- `R2_BUCKET_NAME`: Nama bucket yang digunakan.
- `R2_PUBLIC_URL`: URL publik atau domain kustom untuk mengakses file (CDN).

## Backup (GitHub Actions)
Variabel khusus yang diperlukan untuk menjalankan skrip backup otomatis di GitHub.
- `SUPABASE_DB_URL`: URL koneksi langsung (URI) ke database PostgreSQL.
- (Membutuhkan variabel **Cloudflare R2** di atas untuk penyimpanan hasil backup).

*Penjelasan detail cara mendapatkan URL backup dapat dilihat di [Modul Backup](/docs/security-backup/auto-backup).*
