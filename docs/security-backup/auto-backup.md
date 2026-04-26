---
sidebar_position: 2
slug: /security-backup/auto-backup
---
# Auto Backup (GitHub Actions)

ERD Builder Pro menggunakan **GitHub Actions** untuk menjalankan rutinitas backup database secara otomatis dan andal. Fitur ini memastikan data Anda selalu aman bahkan jika terjadi kegagalan sistem pada server utama.

## Alur Kerja Backup
Sistem backup bekerja melalui alur berikut:
1.  **Pemicu (Trigger)**: Workflow dijalankan berdasarkan jadwal (setiap jam 00:00 UTC), pemicu manual dari dashboard aplikasi, atau manual dari tab Actions di GitHub.
2.  **Persiapan**: Runner GitHub Actions menginstal **PostgreSQL Client v17**.
3.  **Eksekusi**: Database di-dump menggunakan perintah `pg_dump` dan dikompres menjadi `.sql.gz`.
4.  **Penyimpanan**: File diunggah ke **Cloudflare R2** melalui protokol S3.
5.  **Finalisasi**: Workflow mengirimkan pembaruan status ke database Supabase untuk memperbarui riwayat backup di dashboard aplikasi.

## Konfigurasi Penting (Syarat Wajib)
Agar workflow berhasil dijalankan, ada beberapa persyaratan teknis yang harus dipenuhi:

### 1. Gunakan Supabase Pooler (Port 6543)
> [!IMPORTANT]
> GitHub Actions dijalankan pada runner yang saat ini **tidak mendukung IPv6**. Karena proyek baru di Supabase seringkali hanya mendukung IPv6 untuk koneksi langsung (port 5432), Anda **WAJIB** menggunakan **Transaction Pooler** (Port 6543) pada variabel `SUPABASE_DB_URL`.

**Format URL yang benar:**
`postgresql://postgres.xxxxx:[PASSWORD]@aws-0-xxxx.pooler.supabase.com:6543/postgres?pgbouncer=true`

### 2. Setup GitHub Secrets
Pastikan semua variabel berikut telah didaftarkan di **Settings > Secrets and variables > Actions** pada repositori GitHub Anda:
- `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL` (Gunakan Port 6543)
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`

## Cara Menjalankan Secara Manual via GitHub
Jika Anda ingin memastikan sistem backup berfungsi tanpa harus menunggu jadwal otomatis:
1. Buka repositori Anda di GitHub.
2. Klik tab **Actions**.
3. Pilih workflow **Database Auto Backup Routine** di sisi kiri.
4. Klik tombol **Run workflow**.

## Troubleshooting
Jika status backup di dashboard aplikasi tertahan di **Processing**:
1. Periksa tab **Actions** di GitHub untuk melihat log error.
2. Pastikan `SUPABASE_DB_URL` sudah menggunakan port 6543.
3. Pastikan API Token R2 memiliki izin *Read & Write* (bukan hanya Read).
