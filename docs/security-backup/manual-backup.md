---
sidebar_position: 1
slug: /security-backup/manual-backup
---
# Database Backup

**Database Backup** membuat salinan seluruh database dari dalam aplikasi, lalu mengelola riwayatnya.

:::info Ketersediaan
- **Self-host (PostgreSQL)**: hanya SuperAdmin.
- **Desktop dan CLI**: tersedia untuk pengguna lokal.
- **Cloud**: tidak tersedia. Backup Cloud dikelola di infrastruktur oleh tim ERD Builder Pro.
:::

## Membuka Database Backup

Buka menu profil di kiri bawah sidebar, pilih **Settings**, lalu tab **Database Backup** di grup **More**. Halaman ini memiliki tab **Histories** dan **Settings**.

## Membuat Backup

1. Klik **Create Backup**.
2. Muncul pesan *Backup process started in the background*. Status backup berubah dari **Processing** menjadi **Completed**.

Nama backup dibuat otomatis, misalnya `Backup_20261127_1430`. Backup otomatis bernama `AutoBackup_…`, dan backup pengaman sebelum restore bernama `PreRestore_…`.

## Status dan Kolom

Tabel riwayat menampilkan **Backup Name**, **Size**, **Status**, **Destinations**, **Date**, dan **Action**.

| Status | Arti |
| :--- | :--- |
| **Processing** | Backup sedang dibuat. |
| **Creating safety backup** | Backup pengaman sedang dibuat sebelum restore. |
| **Completed** | Backup selesai dan siap dipakai. |
| **Failed** | Backup gagal. |

Kolom **Destinations** menampilkan **Local** (file di komputer/server) dan **Cloud** bila salinan juga terkirim ke storage.

## Isi File Backup

- Satu file terkompresi `.sql.gz` berisi seluruh database:
  - **PostgreSQL**: dump SQL dari `pg_dump`.
  - **SQLite** (Desktop/CLI): salinan file database SQLite yang dikompres, meski berakhiran `.sql.gz`.
- **Tidak termasuk**: gambar di storage dan file kunci enkripsi `.erd-encryption-key`. Simpan `ERD_ENCRYPTION_KEY` atau file kunci secara terpisah.

## Lokasi Penyimpanan

| Sistem | Folder bawaan |
| :--- | :--- |
| macOS dan Linux | `~/ERD Builder Pro` |
| Windows | `~\Documents\ERD Builder Pro` |

- **Desktop**: folder dapat diganti dari panel **Storage location** (**Change**, **Browse**, **Save**, **Reset**).
- **Self-host dan CLI**: file disimpan di folder home milik user yang menjalankan server.
- **Docker**: folder home berada di dalam container (`/root/ERD Builder Pro`) dan hilang saat container dibuat ulang. Lihat [Backup di Docker](../getting-started/deployment.md#backup-di-docker).

Bila storage (Cloudflare R2 atau S3-compatible) dikonfigurasi, setiap backup juga disalin ke bucket di `backups/<id>.sql.gz`. Bila salinan gagal terkirim, file lokal tetap ada.

## Mengunduh Backup

- **Web dan CLI**: klik ikon **Download backup** untuk mengunduh file `.sql.gz`.
- **Desktop**: klik **Show in folder** untuk membuka lokasi file.

Simpan salinan backup di tempat lain, misalnya penyimpanan offsite, agar tetap aman bila server rusak.

## Lanjutan

- Jadwalkan backup otomatis di [Auto Backup](./auto-backup.md).
- Pulihkan database dari backup di [Restore & Pemulihan](./disaster-recovery.md).
