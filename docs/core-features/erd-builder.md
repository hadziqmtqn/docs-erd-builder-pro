---
sidebar_position: 1
slug: /core-features/erd-builder
---
# ERD Builder

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
| **Identitas & Spesial** | `BIT`, `ENUM`, `JSON` | MySQL / PostgreSQL |
| | `UUID`, `JSONB` | PostgreSQL |
| **Network & Search** | `INET`, `CIDR`, `MACADDR`, `MACADDR8`, `TSVECTOR`, `TSQUERY` | PostgreSQL |

## Membuat Relasi
Untuk membuat relasi antar tabel (Foreign Key):
1. Arahkan kursor ke handle (titik putih) di samping kolom.
2. Klik dan tarik garis ke kolom di tabel tujuan.
3. Anda dapat mengatur tipe relasi (*one-to-one*, *one-to-many*) melalui garis konektor tersebut.

## Export Diagram (Eksperimental)
> [!CAUTION]
> Fitur ekspor diagram ke dalam format gambar (PNG/SVG) atau PDF saat ini masih dalam tahap **Eksperimental**. Anda mungkin menemui sedikit perbedaan visual pada file hasil ekspor dibanding tampilan di editor.

Untuk mengekspor diagram, klik ikon **Download** pada toolbar editor.
