---
sidebar_position: 3
slug: /security-backup/disaster-recovery
---
# Restore & Pemulihan

Halaman ini menjelaskan cara memulihkan database dari backup, baik dari dalam aplikasi maupun secara manual bila aplikasi tidak bisa dibuka.

## Restore dari Aplikasi

Tersedia di Self-host (PostgreSQL, khusus SuperAdmin), Desktop, dan CLI.

1. Buka **Settings → Database Backup**, tab **Histories**.
2. Klik **Restore** pada backup berstatus **Completed** yang file lokalnya masih ada.
3. Baca dialog **Restore database from this backup?**: seluruh database akan diganti dengan isi backup, dan data saat ini hilang.
4. Ketik nama backup untuk konfirmasi, lalu klik **Restore Database**.

Proses restore berjalan dalam beberapa tahap: **Creating safety backup**, **Decompressing backup**, **Replacing database**, dan **Cleaning up**. Sebelum database diganti, aplikasi membuat backup pengaman `PreRestore_…` dari data saat ini. Setelah selesai muncul *Database restored successfully.* dengan tombol **Reload**.

- Anda mungkin perlu login ulang, dan perubahan yang belum disimpan di tab lain akan hilang.
- Bila restore gagal, pesan error menyebutkan nama backup `PreRestore_…` yang menyimpan data sebelum restore.
- Mode Supabase lama tidak mendukung restore dari aplikasi.

## Import Database (Desktop dan CLI)

Tombol **Import Database** di halaman Database Backup memulihkan database dari file di komputer Anda: `.db`, `.sqlite`, `.sqlite3`, `.sql`, atau `.sql.gz`, maksimal 50 MB. Backup pengaman juga dibuat lebih dulu.

## Pemulihan Manual

Gunakan cara ini bila aplikasi tidak bisa dibuka.

### 1. Ambil File Backup
- Dari folder backup lokal (`~/ERD Builder Pro`, atau folder yang Anda pilih di Desktop), atau
- dari bucket storage di `backups/<id>.sql.gz` bila storage dikonfigurasi.

### 2. Ekstrak File
```bash
gunzip backup_file_name.sql.gz
```

### 3a. PostgreSQL (Self-host)
Pulihkan ke database **kosong**, lalu arahkan aplikasi ke database tersebut:
```bash
createdb erd_builder_pro_restore
psql "postgresql://user:password@host:5432/erd_builder_pro_restore" -v ON_ERROR_STOP=1 -f backup_file_name.sql
```
Ganti `DATABASE_URL` ke database hasil restore, lalu jalankan ulang server.

### 3b. SQLite (Desktop dan CLI)
File hasil ekstrak adalah database SQLite. Tutup aplikasi lebih dulu, simpan salinan `data.db` yang lama, lalu ganti `data.db` dengan file hasil ekstrak. Lokasi `data.db` ada di [Aplikasi Desktop](../getting-started/desktop-app.md#lokasi-data) dan [CLI](../getting-started/cli.md#lokasi-data).

:::caution
Restore menimpa data yang ada. Buat backup terbaru lebih dulu sebelum memulihkan.
:::

## Yang Perlu Disimpan Terpisah

Backup database tidak mencakup:
- **Kunci enkripsi** (`ERD_ENCRYPTION_KEY` atau file `.erd-encryption-key`). Tanpa kunci yang sama, API key AI dan kredensial DB Client yang tersimpan tidak dapat didekripsi.
- **Gambar** di bucket storage.
- **State lisensi** Self-host Commercial (`license-state.json` dan `installation-identity.json`). Lihat [Persistent License State](../getting-started/deployment.md#persistent-license-state-paid-self-host).

## Strategi Pencegahan
- Aktifkan [Auto Backup](./auto-backup.md) dan simpan salinan di luar server.
- Uji pemulihan secara berkala di lingkungan terpisah.
- Simpan file `.env` dan kunci enkripsi di password manager atau secret manager.
