---
sidebar_position: 2
slug: /cloud-storage/upload-feature
---
# Fitur Unggah Gambar

ERD Builder Pro memungkinkan Anda untuk menyematkan gambar langsung ke dalam dokumen **Notes** atau **Drawings**. Semua aset ini disimpan secara terpusat di Cloudflare R2 untuk performa maksimal.

## Struktur Penyimpanan di R2
Untuk memudahkan manajemen aset, sistem secara otomatis mengorganisir file ke dalam direktori berikut di dalam bucket Anda:

- **`erd-builder-pro/notes/`**: Berisi semua gambar yang Anda unggah melalui editor teks (Tiptap).
- **`erd-builder-pro/drawings/`**: Berisi aset gambar yang digunakan pada kanvas Excalidraw atau Flowchart.
- **`erd-builder-pro/backups/`**: Berisi file database hasil pencadangan otomatis dan manual.
- **`erd-builder-pro/general/`**: Folder penampungan untuk aset yang tidak dikategorikan secara spesifik.

## Cara Mengunggah Gambar
### Pada Modul Notes
1. Buka file **Notes**.
2. Anda bisa langsung melakukan **Copy-Paste** gambar dari clipboard atau **Drag & Drop** file gambar ke dalam editor.
3. Gambar akan otomatis diunggah ke R2 dan ditampilkan di dokumen.

### Pada Modul Drawings
1. Klik ikon **Image** pada toolbar Excalidraw.
2. Pilih file dari komputer Anda.
3. Gambar akan diunggah dan dapat Anda posisikan secara bebas di kanvas.

## Manajemen Kapasitas
Setiap kali Anda menghapus gambar dari editor (Notes), sistem juga akan berusaha menghapus file fisiknya dari bucket R2 (melalui mekanisme *cleanup*). Namun, kami menyarankan Anda untuk memantau folder `erd-builder-pro/` secara berkala melalui dashboard Cloudflare untuk memastikan tidak ada file sampah (*orphaned files*) yang tertinggal.

> [!TIP]
> Nama file diubah secara otomatis menjadi format stempel waktu acak (contoh: `1714000000-123456789.png`) untuk menghindari bentrokan nama file (*naming conflict*).
