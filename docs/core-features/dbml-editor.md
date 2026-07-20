---
sidebar_position: 6
slug: /core-features/dbml-editor
---

# DBML Editor

ERD Builder Pro menyertakan editor **DBML** (*Database Markup Language*) bawaan yang memungkinkan Anda mendefinisikan skema database menggunakan sintaks teks yang ringkas — dan secara otomatis mensinkronkannya dengan diagram visual secara *real-time*.

## Apa itu DBML?

[DBML](https://dbml.org) (*Database Markup Language*) adalah bahasa markup terbuka yang dirancang untuk mendefinisikan struktur database secara deklaratif. Berbeda dengan SQL yang berfokus pada eksekusi perintah, DBML dirancang untuk **dibaca dan ditulis oleh manusia**.

### Contoh Sintaks DBML

```dbml
Table users {
  id integer [pk, increment]
  username varchar [not null]
  email varchar [unique]
  created_at timestamp
}

Table posts {
  id integer [pk, increment]
  user_id integer [ref: > users.id]
  title varchar
  body text
  published_at timestamp
}

Enum status {
  draft
  published
  archived
}

Ref: posts.user_id > users.id
```

## Cara Mengakses Editor DBML

1. Buka halaman **ERD Builder**.
2. Klik tombol **DBML Editor** pada toolbar (ikon `</>`) di pojok kanan atas canvas.
3. Panel editor akan muncul di sisi kanan layar.
4. Ketik atau edit sintaks DBML — diagram akan diperbarui secara otomatis.

> [!NOTE]
> Diagram ERD dan editor DBML bersifat **dua arah** (*two-way sync*). Perubahan pada canvas akan memperbarui teks DBML, dan sebaliknya.

## Sintaks yang Didukung

### Table & Kolom

Definisikan tabel dengan blok `Table` dan daftar kolom di dalamnya:

```dbml
Table products {
  id integer [pk]
  name varchar [not null]
  price decimal
  description text
  is_active boolean [default: true]
}
```

**Pengaturan kolom** (*column settings*) yang didukung dalam tanda kurung siku `[]`:

| Pengaturan | Deskripsi | Contoh |
| :--- | :--- | :--- |
| `pk` | Primary Key | `[pk]` |
| `not null` | Tidak boleh kosong | `[not null]` |
| `unique` | Nilai unik | `[unique]` |
| `increment` | Auto-increment | `[increment]` |
| `default` | Nilai default | `[default: 'active']` |
| `note` | Keterangan kolom | `[note: 'User display name']` |

### Relasi (Ref)

Definisikan relasi antar tabel menggunakan blok `Ref`:

```dbml
Ref: orders.customer_id > customers.id
Ref: order_items.order_id > orders.id
Ref: profiles.user_id - users.id  // one-to-one
```

**Operator relasi:**

| Operator | Arti |
| :--- | :--- |
| `>` | One-to-many (FK → PK) |
| `<` | Many-to-one (PK → FK) |
| `-` | One-to-one |

### Enum

Definisikan tipe enumerasi sebagai blok terpisah:

```dbml
Enum priority {
  low
  medium
  high
  critical
}
```

Kemudian gunakan nama enum sebagai tipe kolom:

```dbml
Table tasks {
  id integer [pk]
  priority priority  // menggunakan tipe enum 'priority'
}
```

### Inline Enum (AI-Generated)

DBML yang dihasilkan oleh AI mungkin menggunakan sintaks enum inline:

```dbml
Table users {
  role enum('admin', 'editor', 'viewer')
}
```

Editor akan secara otomatis mengekstrak enum ini ke dalam blok `Enum` terpisah saat diproses.

### TableGroup

Kelompokkan tabel terkait secara visual:

```dbml
TableGroup user_management {
  users
  profiles
  settings
}
```

### Note & Indexes

```dbml
// Note pada tabel
Table orders {
  id integer [pk]
  total decimal [note: 'Total amount including tax']
}

// Indexes
Table products {
  id integer [pk]
  name varchar
  indexes {
    (name) [index]
    (price) [index]
  }
}
```

## Fitur Editor

### Autocomplete

Editor DBML menyediakan **autocomplete** otomatis saat mengetik:

| Konteks | Saran yang Muncul |
| :--- | :--- |
| Awal baris | `Table`, `Ref`, `Enum`, `TableGroup`, `Note`, `Indexes` |
| Dalam blok `Table` | Tipe data kolom (`varchar`, `integer`, `timestamp`, dll.) |
| Dalam tanda kurung `[...]` | Pengaturan kolom (`pk`, `not null`, `unique`, dll.) |
| Setelah `Table.` | Nama kolom tabel tersebut |
| Di blok `Ref` | Nama tabel dan kolom |

### Linting & Validasi

Editor secara otomatis memvalidasi sintaks DBML Anda:

- **Tipe data tidak valid**: Garis bawah merah jika menggunakan tipe data yang tidak dikenal.
- **Referensi relasi**: Memeriksa apakah tabel dan kolom dalam blok `Ref` benar-benar ada.
- **Keseimbangan kurung**: Error ditampilkan jika blok `Table` tidak ditutup dengan benar.

### Navigasi Kursor

Posisikan kursor pada baris `Table nama_tabel {` — canvas akan otomatis memilih dan menampilkan tabel tersebut.

### Dialog Bantuan

Klik tombol bantuan (`?`) di panel editor untuk melihat referensi sintaks DBML lengkap.

## Cara Menggunakan DBML

### Membuat Diagram dari DBML

1. Buka editor DBML.
2. Ketik definisi tabel, relasi, dan enum.
3. Diagram akan diperbarui secara otomatis (dengan jeda ~1.5 detik).
4. Posisi tabel akan dipertahankan jika sudah ada di canvas.

### Mengimpor dari SQL

Anda juga bisa menempelkan SQL `CREATE TABLE` ke editor DBML — sistem akan mengonversinya secara otomatis. Gunakan panel **SQL** atau **DBML** sesuai format sumber data Anda.

### Menyalin ke Clipboard

Klik ikon **copy** di panel DBML untuk menyalin seluruh teks DBML ke clipboard — siap ditempel ke file `.dbml` atau dibagikan ke tim.

### Integrasi AI

AI Assistant dapat menghasilkan skema DBML berdasarkan deskripsi Anda. Ketika AI membalas dengan blok DBML, klik tombol **Database** untuk langsung menerapkan skema ke diagram.

```
AI: "Buatkan skema database untuk sistem e-commerce..."
→ AI menghasilkan blok DBML
→ Klik tombol "Database" pada balasan AI
→ Diagram ERD diperbarui
```

## Persistensi Data

- Teks DBML disimpan di database bersama diagram (`dbml_source`).
- Setiap perubahan pada editor disimpan secara otomatis (*debounced* 800ms).
- Saat Anda kembali ke diagram yang sama, teks DBML terakhir akan dipulihkan.

## Element yang Dipertahankan (Roundtrip)

Beberapa elemen DBML yang tidak dihasilkan oleh editor tetap **dipertahankan** saat sinkronisasi dua arah:

| Element | Dipertahankan | Dihasilkan |
| :--- | :---: | :---: |
| `Table` + Kolom | ✅ | ✅ |
| `Ref` | ✅ | ✅ |
| `Enum` (blok terpisah) | ✅ | ✅ |
| `TableGroup` | ✅ | ❌ |
| `Note` | ✅ | ❌ |
| `Indexes` | ✅ | ❌ |
| `headerColor` | ✅ | ❌ |
| `default` values | ✅ | ❌ |

> [!NOTE]
> "Dipertahankan" berarti elemen tersebut akan tetap ada di teks DBML meskipun tidak dihasilkan ulang dari canvas. Ini memungkinkan Anda menambahkan `Note`, `TableGroup`, atau `Indexes` secara manual dan tidak akan hilang saat canvas diperbarui.

## Keterbatasan

- **Tipe data**: Hanya tipe data PostgreSQL yang didukung. Tipe khusus MySQL tertentu mungkin tidak dikenali.
- **`Project` block**: Blok `Project` DBML tidak didukung.
- **Default & Unique**: Nilai `default` dan `unique` dipertahankan saat impor, tetapi tidak dihasilkan ulang saat canvas diperbarui.
- **Jeda sinkronisasi**: Perubahan dari editor ke canvas membutuhkan waktu ~1.5 detik (debounce) sebelum diterapkan.
- **SQL sebagai perantara**: DBML diproses melalui SQL sebagai format perantara. Semua konversi mengikuti dialect PostgreSQL.
