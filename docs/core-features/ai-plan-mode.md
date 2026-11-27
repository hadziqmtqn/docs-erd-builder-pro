---
sidebar_position: 9
slug: /core-features/ai-plan-mode
---
# Plan Mode

**Plan mode** membantu merencanakan aplikasi sebelum Anda menggambar ERD. AI tidak langsung menulis jawaban panjang, melainkan bertanya satu per satu tentang kebutuhan Anda, lalu menyusun dokumen perencanaan (PRD) dalam Markdown yang berisi blok skema DBML.

## Mengaktifkan Plan Mode

1. Buka [AI Assistant](./ai-integration.md) dari header atau dengan `⌘J` / `Ctrl+J`.
2. Klik pil **Plan** di kotak input. Plan mode tetap aktif sampai Anda mengkliknya lagi.
3. Ceritakan aplikasi yang ingin Anda buat, lalu kirim.

Plan mode tersedia di semua view yang memiliki AI Assistant dan tidak memerlukan isi file.

## Wawancara Plan

AI menampilkan kartu **Plan interview** berisi satu pertanyaan, misalnya tentang cakupan fitur, stack, penyimpanan data, autentikasi, hak akses (RBAC), dan deployment.

- Pilih salah satu opsi. Opsi yang disarankan AI diberi label **Recommended**.
- Pilih **Other answer** untuk menulis jawaban sendiri.
- **Skip** melewati pertanyaan, **Continue** mengirim jawaban.
- Kartu yang diciutkan menampilkan **Open Plan interview · N questions**; klik untuk membukanya lagi.
- Bila permintaan ke AI terputus, kartu menampilkan **Resume** untuk melanjutkan wawancara.

Kotak input chat disembunyikan selama kartu wawancara tampil.

## Hasil

Setelah pertanyaan selesai, AI menulis PRD dalam Markdown beserta blok DBML. Dari balasan itu Anda bisa:

- **Save as Note** untuk menyimpan PRD sebagai Note.
- **Create or update ERD from this DBML schema** untuk membuat ERD dari skema, atau **Append** bila Anda sedang berada di view ERD.

Selalu tinjau skema yang dihasilkan sebelum menerapkannya.
