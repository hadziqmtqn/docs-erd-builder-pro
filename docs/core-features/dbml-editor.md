---
sidebar_position: 2
slug: /core-features/dbml-editor
---

# DBML Editor

ERD Builder Pro menyertakan editor **DBML** (*Database Markup Language*) untuk mendefinisikan skema dengan teks. Editor ini tersinkron dua arah dengan canvas ERD.

## Apa itu DBML?

[DBML](https://dbml.dbdiagram.io/) adalah bahasa markup terbuka untuk mendefinisikan struktur database secara deklaratif. Berbeda dengan SQL yang berfokus pada eksekusi perintah, DBML dirancang agar mudah **dibaca dan ditulis manusia**.

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

## Membuka Editor DBML

1. Buka diagram ERD.
2. Klik tombol **DBML** (ikon database) di toolbar canvas, tepat setelah **Import SQL**.
3. Editor muncul sebagai *drawer* di bagian bawah canvas dengan judul **DBML Editor**.

- Tinggi drawer bawaan 48% layar. Tarik tepi atasnya untuk mengubah tinggi antara 20% dan 85%, atau gunakan `↑`/`↓` pada pegangan drawer.
- Membuka editor DBML menutup Explorer dan editor tabel, begitu pula sebaliknya.
- Draft yang belum diterapkan tetap ada saat drawer ditutup lalu dibuka lagi.
- Tombol DBML tidak tampil untuk pengguna dengan akses baca saja dan di ERD milik DB Client.

## Sinkronisasi Dua Arah

- **DBML → canvas**: diterapkan 1,5 detik setelah Anda berhenti mengetik, hanya bila kurung kurawal seimbang, teks memuat `Table`, dan DBML valid. DBML yang tidak valid tidak pernah diterapkan.
- **Canvas → DBML**: teks dibuat ulang 0,8 detik setelah ada perubahan struktur. Menggeser posisi tabel tidak mengubah teks.

:::caution DBML menggantikan skema
Saat DBML diterapkan, tabel yang tidak ada di DBML **dihapus dari canvas**. Tabel yang namanya cocok (tanpa membedakan huruf besar-kecil) tetap mempertahankan posisi, warna, dan status collapse-nya. Setiap penerapan dapat dibatalkan dengan **Undo**.
:::

## Sintaks yang Didukung

### Table & Kolom

```dbml
Table products {
  id integer [pk]
  name varchar [not null]
  price decimal
  description text
  is_active boolean [default: true]
}
```

Pengaturan kolom di dalam `[]`:

| Pengaturan | Deskripsi | Contoh |
| :--- | :--- | :--- |
| `pk` | Primary Key | `[pk]` |
| `not null` | Tidak boleh kosong | `[not null]` |
| `unique` | Nilai unik | `[unique]` |
| `increment` | Auto-increment | `[increment]` |
| `default` | Nilai default | `[default: 'active']` |
| `note` | Keterangan kolom | `[note: 'User display name']` |
| `ref` | Relasi inline | `[ref: > users.id]` |

### Relasi (Ref)

```dbml
Ref: orders.customer_id > customers.id
Ref: order_items.order_id > orders.id
Ref: profiles.user_id - users.id  // one-to-one
```

| Operator | Arti |
| :--- | :--- |
| `>` | Many-to-one (FK → PK) |
| `<` | One-to-many (PK → FK) |
| `-` | One-to-one |

### Enum

```dbml
Enum priority {
  low
  medium
  high
  critical
}

Table tasks {
  id integer [pk]
  priority priority
}
```

DBML yang dihasilkan AI kadang memakai enum inline seperti `role enum('admin', 'editor', 'viewer')`. Editor mengubahnya menjadi blok `Enum` terpisah saat diproses.

### TableGroup, Note, dan Indexes

```dbml
TableGroup user_management {
  users
  profiles
}

Table products {
  id integer [pk]
  name varchar
  Note: 'Katalog produk'
  indexes {
    (name) [unique]
  }
}
```

## Fitur Editor

### Autocomplete

Daftar saran berisi maksimal 8 item. Gunakan `↑`/`↓` untuk memilih, `Enter` atau `Tab` untuk menerima, dan `Esc` untuk menutup.

| Konteks | Saran |
| :--- | :--- |
| Awal baris | `Table`, `Ref`, `Enum`, `TableGroup`, `Note`, `Indexes` |
| Tipe kolom | Tipe data seperti `varchar`, `integer`, `timestamp` |
| Di dalam `[...]` | `pk`, `unique`, `not null`, `note`, `default`, `increment`, `ref`, `headerColor` |
| Referensi | Nama tabel dan kolom |

### Validasi

Editor memeriksa tipe data, relasi, enum, dan error sintaks sekitar 0,5 detik setelah Anda berhenti mengetik, lalu menandai baris yang bermasalah.

### Navigasi

- `⌘F` / `Ctrl+F` membuka pencarian di dalam editor.
- Blok dapat dilipat (*fold*) lewat gutter.
- Menaruh kursor di baris `Table nama_tabel {` memilih tabel tersebut di canvas.

### Referensi Sintaks

Klik tombol bantuan di header drawer untuk membuka **DBML Reference**: contoh sintaks dan beberapa tips.

## Mengimpor dari SQL

Editor DBML hanya membaca DBML. SQL yang ditempel ke editor tidak dikonversi dan akan ditandai sebagai error. Untuk membuat tabel dari `CREATE TABLE`, gunakan [Import SQL](./import-sql.md).

## Menyalin DBML

Drawer DBML tidak memiliki tombol copy; pilih teks lalu salin seperti biasa. Untuk satu tabel, tab **DBML** di editor tabel menyediakan tombol **Copy**.

## Integrasi AI

AI Assistant dapat menghasilkan skema DBML dari deskripsi Anda. Di view ERD, gunakan tombol **Append** pada balasan AI untuk meninjau perubahan sebelum digabungkan. Di view lain, gunakan **Create or update ERD from this DBML schema**. Lihat [AI Integration](./ai-integration.md).

## Persistensi Data

- Teks DBML disimpan di database bersama diagram (`dbml_source`).
- Saat diagram dibuka lagi, teks DBML terakhir dipulihkan. Bila belum ada, DBML dibuat dari canvas.

## Yang Dibuat Ulang dari Canvas

Saat canvas berubah, editor membuat ulang teks DBML:

| Elemen | Dibuat ulang dari canvas |
| :--- | :---: |
| `Table`, kolom, `pk`, `not null`, `unique`, `default`, `note` kolom | ✅ |
| `Note` tabel dan `indexes` | ✅ |
| `Ref` | ✅ |
| `Enum` yang dipakai kolom | ✅ |
| Blok `Enum` lain, `TableGroup`, dan `Note` di luar tabel | Dipertahankan dari teks sebelumnya |

## Keterbatasan

- **Blok `Project`** DBML tidak didukung.
- **SQL sebagai perantara**: DBML diproses melalui SQL dialek PostgreSQL, jadi tipe khusus MySQL tertentu bisa tidak dikenali.
- **Jeda sinkronisasi**: perubahan dari editor ke canvas menunggu sekitar 1,5 detik.
