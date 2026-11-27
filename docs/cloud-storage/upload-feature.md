---
sidebar_position: 2
slug: /cloud-storage/upload-feature
---
# Unggah Gambar

Gambar dapat disisipkan ke **Notes** dan **Drawings**. Gambar disimpan di storage yang dikonfigurasi (Cloudflare R2, atau S3-compatible di Desktop/CLI).

## Cara Mengunggah

### Notes
Tempel gambar dari clipboard, seret file ke editor, atau pilih **Image** di Slash Menu (`/`).

### Drawings
Gunakan alat gambar (*image*) di toolbar Excalidraw, lalu pilih file dari komputer.

Di aplikasi Desktop, gambar Drawings disimpan langsung di dalam file Drawing dan tidak diunggah ke storage.

## Format dan Ukuran

| Aturan | Batas |
| :--- | :--- |
| Format | JPEG, PNG, WebP, SVG (diperiksa dari isi file) |
| Ukuran file awal | Maksimal 5 MB. Browser mengompres gambar hingga maksimal 1 MB dengan lebar maksimal 1280 px. |
| Ukuran setelah kompresi | Maksimal 1 MB (SVG tidak dikompres, maksimal 1 MB) |
| Per dokumen | Maksimal 15 gambar dengan total 2 MB (dapat diubah administrator lewat `DOCUMENT_IMAGE_LIMIT` dan `DOCUMENT_IMAGE_BYTES`) |

Pesan error yang mungkin muncul:
- *File type is not allowed. Use JPEG, PNG, WebP or SVG.*
- *The image is larger than 5 MB.*
- *The image is still larger than 1 MB after compression. Crop it or use a smaller image.*
- *A document can hold up to 15 images and 2 MB of images. Remove an image or use a smaller one.*

## Struktur Penyimpanan

Nama file dibuat otomatis dari stempel waktu dan angka acak, misalnya `1714000000000-123456789.png`, agar tidak bentrok.

| Cara | Lokasi di bucket |
| :--- | :--- |
| **Cloud** | `erd-builder-pro/team/<id-organization>/<fitur>/<file>` |
| **Self-host**, Team | `erd-builder-pro/team/<id-team>/<fitur>/<file>` |
| **Self-host**, Personal | `erd-builder-pro/user/<id-user>/<fitur>/<file>` |
| **Desktop, CLI, Supabase** | `erd-builder-pro/<fitur>/<file>` |

`<fitur>` bernilai `notes` atau `drawings`. Salinan Database Backup disimpan di `backups/`.

## Pembersihan Gambar

**Cloud dan Self-host (PostgreSQL):**
- Pembersihan harian menandai gambar yang tidak lagi dipakai dokumen mana pun.
- Gambar yang sudah ditandai dihapus dari bucket setelah 30 hari.
- Gambar yang masih dipakai dokumen tidak bisa dihapus (*This file is still used by a document.*).

Daftar gambar di workspace dapat dilihat dan dibersihkan lewat [Library](./library.md).

**Desktop dan CLI:** gambar dihapus dari storage saat Note atau Drawing dihapus permanen dari Trash.
