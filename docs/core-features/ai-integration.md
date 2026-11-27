---
sidebar_position: 8
slug: /core-features/ai-integration
---

# AI Assistant

AI Assistant membantu membuat dan menjelaskan isi ERD, Notes, Flowchart, dan DB Client. Hasil dari AI selalu bisa ditinjau sebelum diterapkan ke dokumen Anda.

:::warning
Fitur AI masih dalam **pengembangan aktif**. Kualitas jawaban sangat bergantung pada model yang dipilih.
:::

## Membuka AI Assistant

Klik tombol **AI Assistant** di header, atau tekan `⌘J` / `Ctrl+J`.

- Tersedia di view ERD, Notes, Flowchart, dan DB Client (Desktop/CLI).
- Tidak tersedia di Drawings, di halaman link publik, dan pada dokumen yang tidak bisa Anda edit.
- Provider dan model diatur di [AI Configuration](../configuration/ai-setup.md). Di Cloud, AI tersedia bila paket Team Anda mencakup AI Assistant dan kreditnya masih ada.

## Tools

Menu **Tools** di kotak input berisi preset instruksi untuk tugas tertentu. Tool berlaku untuk satu pesan, lalu kembali ke **No tool**. Klik tool yang aktif untuk mematikannya.

| View | Tools |
| :--- | :--- |
| **ERD** (*ERD tools*) | Generate DBML, Edit Columns, Explain Table, Suggest Indexes, Seed Data |
| **Notes** (*Tools*) | Summarize, Improve Grammar, Generate Docs |
| **Flowchart** (*Flowchart tools*) | Generate Flowchart, Explain Flow, Generate Pseudocode, Insert Symbol, Import from Description |
| **DB Client** (*DB Client tools*) | Explain Table, Analyze Query, Generate Query, Suggest Indexes, Find Schema Issues |

## Plan Mode

Pil **Plan** membuat AI mewawancarai Anda satu pertanyaan demi satu pertanyaan, lalu menyusun dokumen perencanaan berisi skema DBML. Lihat [Plan Mode](./ai-plan-mode.md).

## Merujuk File Lain (@mention)

Ketik `@` atau klik **Reference a file** untuk menambahkan isi file lain sebagai konteks.

- Hanya untuk file yang berada di Project.
- Pilihan berisi Notes, ERD, dan Flowchart dari Project yang sama. Drawings tidak bisa dirujuk.
- Setiap file yang dirujuk dipotong maksimal 2.000 karakter. Rujukan ERD menyertakan daftar tabel dan DBML.

Contoh: `@Skema Database buatkan flowchart untuk alur login`.

## Mengirim Pilihan ke AI

- **Notes**: pilih teks, lalu klik **Send to AI** di bubble menu.
- **ERD**: tabel yang dipilih di canvas muncul sebagai **Active Selection** di atas kotak input.

## Tombol pada Balasan AI

Arahkan kursor ke balasan AI untuk memunculkan tombol aksi:

| Tombol | Kapan muncul |
| :--- | :--- |
| **Replace All** / **Append** | Di view ERD dan Flowchart, bila balasan berisi DBML/SQL atau JSON flowchart. |
| **Save as Note** | Selalu. |
| **Create or update ERD from this DBML schema** | Di luar view ERD, bila balasan berisi skema. |
| **Create or update Flowchart** | Di luar view Flowchart, bila balasan berisi flowchart. |
| **Copy message** | Selalu. |

Pesan Anda sendiri memiliki **Copy message**. Bila pesan Anda adalah pesan terakhir di percakapan, pesan itu juga memiliki **Resend**.

## Menerapkan Hasil AI

- **ERD**: **Append** membuka **Review Changes** yang menandai perubahan di canvas. Pilih **Merge Selected** untuk menerapkan bagian yang dipilih atau **Reject All** untuk membatalkan.
- **Flowchart**: **Replace All** dan **Append** membuka **Preview Flowchart Changes** yang membandingkan *Current canvas* dengan *After applying AI*. Replace dapat dibatasi ke satu grup simbol.
- **Notes**: gunakan **Save as Note**. Di halaman Note, pilihannya **Create New**, **Replace All**, atau **Append**, dengan pratinjau sebelum dan sesudah. Di halaman lain, pilihannya **Create New** atau **Update Existing**.
- Dari view lain, dialog **Create ERD from DBML** dan **Flowchart from AI** membuat file baru atau memperbarui file yang ada.

## Riwayat Percakapan

- **New Chat** memulai percakapan baru. Daftar percakapan bisa dicari lewat **Search conversations...**.
- Percakapan dibagikan untuk seluruh Project (atau per file bila file tidak berada di Project).
- Hanya pembuat percakapan yang bisa mengirim pesan di dalamnya. Anggota lain melihat *This conversation is read-only. Only its creator can send messages.*

## Aturan dan Prompt

Atur gaya dan batasan jawaban AI lewat **Settings → AI Rules** dan **Settings → System Prompts**. Lihat [Settings](../configuration/settings.md#ai-rules).
