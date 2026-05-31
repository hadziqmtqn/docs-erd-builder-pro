---
sidebar_position: 2
slug: /core-features/sql-generator
---
# SQL Generator

Setelah selesai merancang ERD, Anda dapat mengekspor rancangan tersebut ke berbagai format skema database dan kode pemrograman menggunakan fitur **Export All**.

## Format Ekspor yang Tersedia

ERD Builder Pro mendukung berbagai generator:

### Schema (SQL)
- **PostgreSQL**: Skema SQL standar dengan `CREATE TABLE` dan `ALTER TABLE` untuk Foreign Key.
- **MySQL**: Skema SQL yang kompatibel dengan MySQL dengan penanganan FK yang sesuai.

### Backend Framework
- **Laravel Migration**: File migrasi PHP untuk framework Laravel (download sebagai `.zip`).
- **Laravel Model**: File model PHP untuk Eloquent ORM (download sebagai `.zip`).

### Type Safety
- **TypeScript Interface**: Interface TypeScript untuk type-safe development (download sebagai `.zip`).
- **Prisma Schema**: Schema untuk proyek Node.js/TypeScript dengan Prisma ORM (download sebagai `.zip`).
- **Zod Schema**: Schema untuk validasi data di sisi aplikasi (download sebagai `.zip`).

### Visual
- **PDF**: Export seluruh canvas ERD sebagai dokumen PDF.
- **SVG**: Export seluruh canvas ERD sebagai gambar SVG.

:::tip Exporter Batch
Format non-SQL (Laravel, TypeScript, Prisma, Zod) menghasilkan satu file per tabel yang dibungkus dalam arsip `.zip`. Sementara itu, MySQL dan PostgreSQL menghasilkan satu file `.sql` tunggal yang siap dieksekusi.
:::

## Cara Mengekspor

1. Klik tombol **"Export All"** di pojok kanan atas pada view ERD.
2. Pilih format yang diinginkan dari tab yang tersedia.
3. Untuk format SQL (MySQL/PostgreSQL), Anda bisa menyalin kode atau mengunduh file.
4. Untuk format lainnya, klik **"Download .zip"** untuk mengunduh arsip berisi semua file.

### Fitur Tambahan

- **Preview Kode**: Semua format schema ditampilkan menggunakan CodeMirror dengan syntax highlighting.
- **Copy to Clipboard**: Hanya tersedia untuk format SQL tunggal (MySQL/PostgreSQL).
- **Experimental Badge**: Tab PDF dan SVG ditandai sebagai "Experimental" karena merupakan fitur visual baru.
