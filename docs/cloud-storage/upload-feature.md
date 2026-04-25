---
sidebar_position: 2
slug: /cloud-storage/upload-feature
---
# Fitur Upload Gambar

Penyimpanan gambar dalam dokumentasi sangat penting untuk memberikan konteks visual pada proyek Anda.

## Cara Mengunggah Gambar
Di dalam editor **Notes** atau **Drawings**:
1. Gunakan tombol "Upload Image" atau cukup tarik-dan-lepas (*drag-and-drop*) gambar ke area editor.
2. Aplikasi akan mengunggah file tersebut secara langsung ke Cloudflare R2.
3. Setelah berhasil, gambar akan muncul di dalam dokumen.

## Keamanan & Ketersediaan
- **Private Access**: Gambar diakses melalui URL yang dihasilkan secara aman dari backend.
- **Optimasi**: Disarankan menggunakan format WebP atau PNG yang dikompresi untuk menjaga kecepatan pemuatan halaman dokumen.

## Menghapus Gambar
Jika sebuah Note atau Drawing dihapus secara permanen dari **Trash**, aplikasi juga akan mencoba membersihkan aset gambar terkait dari bucket R2 untuk menghemat ruang penyimpanan.
