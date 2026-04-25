---
sidebar_position: 3
slug: /security-backup/disaster-recovery
---
# Disaster Recovery

Jika terjadi kegagalan sistem atau kehilangan data, Anda dapat memulihkan database menggunakan file backup yang tersimpan di R2.

## 1. Unduh File Backup
1. Masuk ke dashboard **Cloudflare R2**.
2. Pilih bucket backup Anda.
3. Unduh file `.sql.gz` terbaru berdasarkan stempel waktu (*timestamp*) pada nama filenya.

## 2. Ekstrak File
Gunakan perintah terminal atau aplikasi unzip untuk mengekstrak file SQL:
```bash
gunzip backup-file-name.sql.gz
```

## 3. Restore ke Database
Gunakan perintah `psql` untuk mengunggah kembali data ke Supabase (atau database target):
```bash
psql -h db.supabase.co -U postgres -d postgres -f backup-file-name.sql
```
*Ganti parameter sesuai dengan kredensial database Anda.*

## Verifikasi
Setelah proses selesai, buka kembali aplikasi ERD Builder Pro dan pastikan seluruh proyek serta file Anda telah muncul kembali dengan benar.
