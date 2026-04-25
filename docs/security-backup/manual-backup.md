---
sidebar_position: 1
slug: /security-backup/manual-backup
---
# Backup Manual

Anda dapat melakukan backup database secara instan kapan pun diperlukan melalui dashboard ERD Builder Pro.

## Cara Melakukan Backup
1. Buka halaman **Settings** atau **System Settings** di dashboard.
2. Klik tombol **"Run Backup Now"**.
3. Sistem akan melakukan *dumping* database PostgreSQL dan mengompresnya menjadi file `.sql.gz`.
4. File tersebut akan diunggah secara otomatis ke bucket Cloudflare R2 yang telah Anda konfigurasi.

> [!IMPORTANT]
> Fitur ini membutuhkan konfigurasi variabel **Cloudflare R2** yang benar pada file `.env`. Lihat panduan lengkapnya di halaman **[Konfigurasi Environment](/configuration/env-variables)**.

## Kapan Harus Melakukan Backup Manual?
- Sebelum melakukan perubahan besar pada skema database.
- Sebelum melakukan update versi aplikasi.
- Saat Anda ingin mengambil snapshot data terkini untuk keperluan pengembangan lokal.
