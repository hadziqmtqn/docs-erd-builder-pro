---
sidebar_position: 4
slug: /core-features/sql-generator
---
# Export Schema & Kode

Setelah merancang ERD, Anda dapat mengekspor seluruh skema ke SQL dan kode framework, atau mengunduh diagram sebagai SVG.

## Membuka Export

1. Buka diagram ERD.
2. Klik menu **Actions** (⋯) di header, lalu **Export All**.
3. Pilih **Export Schemas** untuk SQL dan kode, atau **Download SVG** untuk gambar.

Dialog **Export All** menampilkan jumlah tabel dan relasi, lalu tab format.

## Format yang Tersedia

| Kategori | Format | Hasil unduhan |
| :--- | :--- | :--- |
| **SQL** | MySQL, PostgreSQL | Satu file `<diagram>_schema.sql` |
| **Laravel** | Migration, Model | Arsip `.zip` |
| **Goravel** | Model, Migration | Arsip `.zip` |
| **TypeScript** | Interface, Zod | Arsip `.zip` |
| **Prisma** | Schema | Satu file `<diagram>_schema.prisma` |

- **SQL** berisi satu `CREATE TABLE` per tabel, diikuti `ALTER TABLE … ADD CONSTRAINT … FOREIGN KEY` untuk relasi.
- **Prisma** berisi seluruh model dalam satu file, lengkap dengan blok `generator client` dan `datasource db` (PostgreSQL).
- Isi arsip `.zip`:
  - Laravel: `migrations/<timestamp>_create_<tabel>_table.php` dan `models/<Class>.php`.
  - Goravel: `models/<Struct>.go` dan `migrations/create_<tabel>_table.go`.
  - TypeScript: `<Class>.ts`; Zod: `<Class>Schema.ts`.

## Mengunduh dan Menyalin

- Format satu file memakai tombol **Download**; format arsip memakai **Download .zip**.
- Tombol **Copy** tersedia untuk format satu file (SQL dan Prisma).
- Pratinjau kode memakai syntax highlighting.

## Export per Tabel

Editor tabel (klik dua kali tabel) memiliki tab **Schema** dengan format yang sama untuk satu tabel. Gunakan **Download** atau **Copy** di tab itu.

## Export Gambar (SVG)

**Download SVG** mengunduh tabel dan relasi sebagai `<diagram>.svg` sesuai tema terang atau gelap yang sedang aktif. Export PNG dan PDF tidak tersedia untuk ERD.
