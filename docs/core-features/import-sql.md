---
sidebar_position: 3
slug: /core-features/import-sql
---
# Import SQL

**Import SQL** membuat tabel di ERD dari perintah `CREATE TABLE` (*reverse engineering*). Fitur ini cocok untuk memvisualkan database yang sudah ada.

## Cara Mengimpor

1. Buka diagram ERD, lalu klik **Import SQL** di toolbar canvas.
2. Di dialog **Import SQL (Reverse Engineering)**, tempel SQL di **SQL Schema Editor**, atau klik **Upload .sql File**.
3. Klik **Import SQL**. Tombol menampilkan **Parsing...** selama SQL diproses.

Sintaks yang didukung adalah **PostgreSQL** dan **MySQL**. Akhiri setiap statement dengan titik koma (`;`).

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  title VARCHAR(200)
);
```

## Bagaimana Hasilnya Digabungkan

Import SQL **menambah dan memperbarui**, tidak pernah menghapus tabel atau kolom yang sudah ada.

- **Tabel dengan nama yang sama dan kolom berbeda**: muncul langkah tinjauan yang menampilkan kolom baru, kolom yang berubah, dan **New Tables**. Klik **Apply Changes** untuk menerapkan atau **Cancel** untuk membatalkan.
- **Tidak ada perbedaan kolom**: tabel langsung ditambahkan. Bila nama tabel sudah dipakai, tabel baru diberi nama `<nama>_imported_N`. Mengimpor SQL yang sama dua kali akan menggandakan tabel.
- **Foreign key** berubah menjadi relasi di canvas.

Setelah selesai, muncul pesan *Success! N table(s) updated, M table(s) added.* Import dapat dibatalkan dengan **Undo**.

## Batasan dan Pesan Error

| Pesan | Arti |
| :--- | :--- |
| *Invalid file format. Please upload a .sql file.* | Hanya file `.sql` yang diterima. |
| *No valid CREATE TABLE statements found.* | SQL tidak memuat `CREATE TABLE`. SQL yang hanya berisi `ALTER TABLE` tidak dapat diimpor. |
| *Failed to parse SQL. Check your syntax.* | Sintaks tidak dapat dibaca. Periksa dialek dan titik koma, atau impor per bagian. |

Tombol **Import SQL** tidak tampil bagi pengguna dengan akses baca saja.

## Alternatif

- Untuk menulis skema dengan teks, gunakan [DBML Editor](./dbml-editor.md). SQL yang ditempel ke editor DBML tidak dikonversi.
- Di Desktop dan CLI, [DB Client](./db-client.md) dapat membaca skema langsung dari database dan mengimpornya ke ERD.
- Di Desktop dan CLI, panel [Git Repository](./git-repository.md) membaca skema dari migrasi Laravel, file `.dbml`, atau file `.sql` di repositori.
