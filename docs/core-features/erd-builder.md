---
sidebar_position: 1
slug: /core-features/erd-builder
---
# ERD Builder

ERD Builder adalah fitur inti untuk merancang skema database secara visual dengan *drag-and-drop*. Skema yang sama bisa diedit lewat [DBML](./dbml-editor.md), diisi dari [Import SQL](./import-sql.md), lalu diexport ke SQL dan kode lewat [Export Schema & Kode](./sql-generator.md).

## Toolbar

Toolbar mengambang berada di kiri atas canvas (vertikal di desktop, horizontal di layar kecil):

| Tombol | Fungsi |
| :--- | :--- |
| **Explorer** (`⇧⌘F` / `Ctrl+Shift+F`) | Panel daftar tabel dan relasi, lengkap dengan pencarian. |
| **Add Table** | Menambah tabel baru di tengah layar. |
| **Import SQL** | Membuat atau memperbarui tabel dari SQL. Lihat [Import SQL](./import-sql.md). |
| **DBML** | Membuka editor DBML di bagian bawah canvas. Lihat [DBML Editor](./dbml-editor.md). |
| **Repository** | Desktop dan CLI: membandingkan ERD dengan skema di repositori Git. Lihat [Git Repository](./git-repository.md). |
| **Auto Layout** | Menata ulang posisi tabel. |
| **Undo** (`⌘Z` / `Ctrl+Z`) dan **Redo** (`⇧⌘Z` / `Ctrl+Y`) | Membatalkan atau mengulang perubahan. |

Kontrol zoom dan *fit view* ada di kiri bawah canvas. Pengguna dengan akses baca saja tidak melihat tombol yang mengubah diagram.

## Membuat Tabel

1. Klik **Add Table**. Tabel bernama `NewTable` (atau `NewTable_1`, `NewTable_2`, dan seterusnya) muncul dengan satu kolom `id` bertipe `INT` sebagai primary key.
2. Klik dua kali tabel untuk membuka editor tabel. Editor memiliki tab **Properties**, **Schema** (kode tabel dalam berbagai format), dan **DBML** (baca saja).
3. Tekan `Esc` untuk menutup editor tabel.

Menu tabel berisi **Edit**, **Duplicate**, **Comment** (khusus Team), dan **Delete Table**. Klik kanan tabel juga menampilkan **Delete**.

## Mengatur Kolom
Setiap kolom mendukung properti berikut:
- **Primary Key (PK)**: identitas unik baris.
- **Data Type**: tipe data sesuai database Anda.
- **Constraints**: `not null`, `unique`, dan nilai `default`.

### Tipe Data yang Didukung

| Kategori | Tipe Data | Database |
| :--- | :--- | :--- |
| **Numeric** | `INT`, `BIGINT`, `SMALLINT`, `TINYINT`, `MEDIUMINT`, `DECIMAL`, `NUMERIC`, `FLOAT`, `DOUBLE`, `REAL` | MySQL / PostgreSQL |
| | `INTEGER`, `SERIAL`, `BIGSERIAL`, `SMALLSERIAL`, `MONEY` | PostgreSQL |
| **String** | `VARCHAR`, `CHAR`, `TEXT` | MySQL / PostgreSQL |
| | `TINYTEXT`, `MEDIUMTEXT`, `LONGTEXT` | MySQL |
| **Date & Time** | `DATE`, `TIME`, `DATETIME`, `TIMESTAMP`, `YEAR` | MySQL / PostgreSQL |
| | `TIMESTAMPTZ`, `TIMETZ`, `INTERVAL` | PostgreSQL |
| **Boolean** | `BOOLEAN` | MySQL / PostgreSQL |
| **Binary/Blob** | `BINARY`, `VARBINARY`, `BLOB`, `TINYBLOB`, `MEDIUMBLOB`, `LONGBLOB` | MySQL |
| | `BYTEA` | PostgreSQL |
| **Identitas & Spesial** | `BIT`, `ENUM`, `JSON` | MySQL / PostgreSQL |
| | `UUID`, `ULID`, `JSONB` | PostgreSQL |
| **Network & Search** | `INET`, `CIDR`, `MACADDR`, `MACADDR8`, `TSVECTOR`, `TSQUERY` | PostgreSQL |

## Membuat Relasi

1. Arahkan kursor ke salah satu titik sambung (*handle*) di sisi kolom. Setiap kolom memiliki empat handle.
2. Tarik garis ke kolom di tabel tujuan. Relasi baru berlabel `1:N`.
3. Klik garis relasi, atau ikon ✎ di Explorer, untuk mengatur **Relationship Cardinality** (`1:1`, `1:N`, `N:M`) dan **Foreign Key Actions** (*On delete* dan *On update*).

Aplikasi menolak relasi bila:
- tipe kedua kolom berbeda (**Type Mismatch**);
- relasi yang sama sudah ada (**Relation already exists**);
- kolom foreign key sudah terhubung ke primary key lain (**FK already related**).

## Explorer

Panel **Explorer** berisi tab **Tables** dan **Relationships**, masing-masing dengan kotak pencarian. Klik item untuk memilihnya di canvas.

## Auto Layout

Klik **Auto Layout** untuk menata tabel dari kiri ke kanan: tabel yang dirujuk berada di kiri dan tabel yang merujuk di kanan. Kelompok tabel yang tidak saling terhubung ditumpuk terpisah. Hasilnya tersimpan dan bisa dibatalkan dengan **Undo**.

## Editing dengan DBML

Klik **DBML** di toolbar untuk membuka editor teks di bagian bawah canvas. Perubahan berlaku dua arah: edit di canvas memperbarui DBML, dan DBML yang valid memperbarui canvas.

```dbml
Table users {
  id integer [pk, increment]
  name varchar [not null]
  email varchar [unique]
}

Ref: posts.user_id > users.id
```

Panduan lengkap ada di [DBML Editor](./dbml-editor.md).

## Kolaborasi dan Riwayat

- Di Team Workspace, anggota dapat memberi komentar pada tabel dan relasi. Lihat [Komentar & Diskusi](../collaboration/comments-discussions.md).
- Setiap perubahan yang tersimpan dapat dilihat dan dipulihkan dari [Version History](../collaboration/version-history.md).

## Export Diagram

Buka menu **Actions** (⋯) di header, lalu **Export All**:
- **Export Schemas** untuk SQL dan kode. Lihat [Export Schema & Kode](./sql-generator.md).
- **Download SVG** untuk gambar diagram sesuai tema yang sedang dipakai.
