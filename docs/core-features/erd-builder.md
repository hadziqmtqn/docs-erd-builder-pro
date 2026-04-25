---
sidebar_position: 1
slug: /core-features/erd-builder
---
# ERD Builder

ERD Builder adalah fitur inti yang memungkinkan Anda merancang skema database secara visual dengan antarmuka *drag-and-drop*.

## <span id="create-table"></span>Cara Membuat Tabel
1. Klik tombol **"Add Table"** pada toolbar.
2. Masukkan nama tabel (contoh: `users`).
3. Klik ikon **"+"** pada tabel untuk menambahkan kolom baru.

## <span id="configure-columns"></span>Mengatur Kolom
Setiap kolom mendukung berbagai properti:
- **Primary Key (PK)**: Identitas unik baris.
- **Data Type**: Pilih tipe data seperti `uuid`, `varchar`, `integer`, dll.
- **Constraints**: Seperti `not null`, `unique`, atau `default value`.

## <span id="create-relationships"></span>Membuat Relasi
Untuk membuat relasi antar tabel (Foreign Key):
1. Arahkan kursor ke handle (titik putih) di samping kolom.
2. Klik dan tarik garis ke kolom di tabel tujuan.
3. Anda dapat mengatur tipe relasi (*one-to-one*, *one-to-many*) melalui garis konektor tersebut.
