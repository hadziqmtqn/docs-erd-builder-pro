---
sidebar_position: 3
slug: /security-backup/disaster-recovery
---
# Disaster Recovery

Halaman ini menjelaskan langkah-langkah yang harus diambil jika terjadi kegagalan sistem total atau kehilangan data pada database utama Supabase.

## Lokasi File Cadangan (Emergency Access)
Jika dashboard ERD Builder Pro tidak dapat diakses, Anda tetap dapat mengambil file database Anda secara manual:
1. Login ke dashboard **Cloudflare**.
2. Masuk ke menu **R2** dan pilih bucket yang Anda gunakan (misal: `erd-builder-storage`).
3. Cari folder induk **`erd-builder-pro/`**, lalu buka sub-folder **`backups/`**.
4. Di dalam folder tersebut, Anda akan menemukan file dengan format nama `backup_[ID]_[TIMESTAMP].sql.gz`.
5. Unduh file terbaru ke komputer Anda.

## Langkah Pemulihan (Restore)
Setelah Anda memiliki file `.sql.gz`, ikuti langkah ini untuk memulihkan database:

### 1. Ekstrak File
Ekstrak file tersebut hingga Anda mendapatkan file mentah `.sql`. Anda bisa menggunakan aplikasi seperti WinRAR, 7-Zip, atau perintah terminal:
```bash
gunzip backup_file_name.sql.gz
```

### 2. Impor ke Supabase
Anda dapat mengimpor kembali data tersebut melalui **SQL Editor** di Supabase:
1. Buka file `.sql` dengan editor teks (Notepad++, VS Code, dll).
2. Salin seluruh isi kodenya.
3. Di dashboard Supabase, buka **SQL Editor** dan buat **New Query**.
4. Tempelkan kode dan klik **Run**.

> [!CAUTION]
> **Peringatan**: Proses restore ini akan menimpa data yang ada. Pastikan Anda melakukan backup snapshot terakhir sebelum mencoba melakukan pemulihan penuh.

## Strategi Pencegahan
- Lakukan uji coba download file backup dari folder **`backups/`** secara berkala untuk memastikan integrasi R2 berjalan lancar.
- Simpan salinan variabel environment (`.env`) Anda di tempat yang aman (seperti password manager), karena tanpa kunci tersebut, Anda tidak bisa mengakses folder backup di R2.
