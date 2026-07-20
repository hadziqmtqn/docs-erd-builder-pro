---
sidebar_position: 1
slug: /core-features/erd-builder
---
# ERD Builder

![ERD Toolbar](/img/docs/erd-toolbar.png)

ERD Builder adalah fitur inti yang memungkinkan Anda merancang skema database secara visual dengan antarmuka *drag-and-drop*.

## Cara Membuat Tabel
1. Klik tombol **"Add Table"** pada toolbar.
2. Masukkan nama tabel (contoh: `users`).
3. Klik ikon **"+"** pada tabel untuk menambahkan kolom baru.

## Mengatur Kolom
Setiap kolom mendukung berbagai properti:
- **Primary Key (PK)**: Identitas unik baris.
- **Data Type**: Pilih tipe data yang sesuai dengan kebutuhan database Anda.
- **Constraints**: Seperti `not null`, `unique`, atau `default value`.

### Tipe Data yang Didukung
ERD Builder Pro mendukung berbagai tipe data standar MySQL dan PostgreSQL. Tabel di bawah ini menunjukkan kategori tipe data beserta dukungan sistem databasenya:

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
| **Identitas & Spesial** | `BIT`, `ENUM`, `JSON`, `ULID` | MySQL / PostgreSQL |
| | `UUID`, `JSONB` | PostgreSQL |
| **Network & Search** | `INET`, `CIDR`, `MACADDR`, `MACADDR8`, `TSVECTOR`, `TSQUERY` | PostgreSQL |

## Membuat Relasi
Untuk membuat relasi antar tabel (Foreign Key):
1. Arahkan kursor ke handle (titik putih) di samping kolom.
2. Klik dan tarik garis ke kolom di tabel tujuan.
3. Anda dapat mengatur tipe relasi (*one-to-one*, *one-to-many*) melalui garis konektor tersebut.

## Auto Layout
Jika diagram Anda mulai terlihat berantakan atau tabel saling tumpang tindih, Anda dapat menggunakan fitur **Auto Layout**:
1. Klik ikon **"Auto Layout"** (ikon grid/susunan) pada toolbar.
2. Sistem akan secara otomatis menghitung posisi optimal setiap tabel berdasarkan relasi yang ada untuk meminimalisir garis yang saling silang (*edge crossing*).

## Editing dengan DBML

Selain menggunakan antarmuka visual drag-and-drop, Anda juga dapat mendefinisikan skema database menggunakan **DBML** (*Database Markup Language*) — bahasa markup teks yang ringkas.

1. Klik tombol **DBML Editor** (ikon `</>`) pada toolbar di pojok kanan atas canvas.
2. Panel editor muncul di sisi kanan — ketik sintaks DBML dan diagram akan diperbarui secara otomatis.
3. Perubahan bersifat **dua arah**: edit di canvas memperbarui teks DBML, dan sebaliknya.

Contoh:
```dbml
Table users {
  id integer [pk, increment]
  name varchar [not null]
  email varchar [unique]
}

Ref: posts.user_id > users.id
```

> [!NOTE]
> Lihat halaman [DBML Editor](/core-features/dbml-editor) untuk panduan lengkap sintaks DBML, autocomplete, dan fitur editor lainnya.

## Export Diagram (Eksperimental)
> [!CAUTION]
> Fitur ekspor diagram ke dalam format gambar (PNG/SVG) atau PDF saat ini masih dalam tahap **Eksperimental**. Anda mungkin menemui sedikit perbedaan visual pada file hasil ekspor dibanding tampilan di editor.

Untuk mengekspor diagram, klik ikon **Download** pada toolbar editor.
