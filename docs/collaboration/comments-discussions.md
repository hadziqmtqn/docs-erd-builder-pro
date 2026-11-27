---
sidebar_position: 1
slug: /collaboration/comments-discussions
---
# Komentar & Diskusi

Anggota Team dapat membahas file langsung di ERD Builder Pro. Ada dua jenis percakapan:

| Jenis | Untuk | Menempel ke |
| :--- | :--- | :--- |
| **Komentar** | Masukan pada bagian tertentu | Tabel atau relasi ERD, simbol Flowchart, atau blok Notes |
| **Diskusi** | Pertanyaan dan keputusan desain yang lebih umum | File, atau seluruh Project |

:::info Khusus Team Workspace
Komentar dan diskusi hanya tersedia untuk file di Project Team. Personal Workspace, Desktop, dan CLI tidak memilikinya. Di Cloud, fitur ini juga mengikuti paket Team.
:::

## Panel Discussions

Tombol **Discussions** berada di header file, di sebelah kiri **Actions**. Badge pada tombol menghitung diskusi dan komentar yang belum dibaca di file itu.

Panel memiliki dua tab:
- **Discussions**, dengan cakupan **This File** atau **All Project**.
- **Comments**, berisi semua komentar pada file.

## Memulai Diskusi

1. Buka panel **Discussions**.
2. Klik **+** (**Start a discussion**).
3. Tulis pertanyaan atau keputusan desain, lalu klik **Start discussion**.

## Memberi Komentar

| File | Cara |
| :--- | :--- |
| **ERD** | Klik kanan tabel atau relasi, lalu pilih **Comment**. Menu tabel juga berisi **Comment**. |
| **Flowchart** | Klik kanan simbol, lalu pilih **Comment**. |
| **Notes** | Arahkan kursor ke sebuah blok, lalu klik **Comment** yang muncul di sampingnya. |
| **Drawings** | Komentar tidak tersedia; gunakan tab Discussions. |

Tulis komentar di kotak *Add a comment…*, lalu klik **Send comment**. Penanda komentar muncul pada objek yang dikomentari.

## Membalas dan Menyelesaikan

- Balas di kotak *Reply…*, lalu klik **Send reply**.
- Klik **Resolve** (atau **Resolve Thread** di popover komentar) bila pembahasan selesai. Thread yang sudah selesai harus dibuka lagi dengan **Reopen** sebelum bisa dibalas.
- Anda dapat mengedit pesan sendiri. Pesan tunggal hanya bisa dihapus di tab Discussions.
- **Delete Thread** hanya untuk pembuat thread.

Pesan berupa teks biasa dengan panjang maksimal 4.000 karakter. Mention `@nama` belum tersedia.

## Siapa yang Bisa Ikut

| Peran | Membaca | Menulis, membalas, resolve |
| :--- | :---: | :---: |
| Creator, Manager, Editor, Commenter | ✅ | ✅ |
| Viewer | ✅ | — |

Viewer melihat pemberitahuan *You can read this thread but not reply to it.* Lihat [Akses Project](../workspace/project-access.md).

## Notifikasi

Balasan diskusi dan komentar baru dikirim sebagai notifikasi kepada pengguna yang terlibat, yaitu pembuat file dan peserta thread. Klik notifikasi untuk membuka file langsung pada thread atau komentar tersebut. Lihat [Notifikasi](./notifications.md).
