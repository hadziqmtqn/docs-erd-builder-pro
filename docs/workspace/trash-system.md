---
sidebar_position: 2
slug: /workspace/trash-system
---
# Trash & Data Recovery

Keamanan data Anda adalah prioritas kami. ERD Builder Pro menggunakan sistem **Soft Delete**, yang berarti file yang Anda hapus tidak akan langsung hilang selamanya, melainkan dipindahkan ke area penampungan sementara.

## Mengenal Soft Delete
Saat Anda mengklik ikon hapus pada file apa pun (ERD, Flowchart, Note, atau Drawing):
- File tersebut akan ditandai sebagai `deleted`.
- File akan disembunyikan dari sidebar proyek aktif agar tidak mengganggu fokus Anda.
- Semua data dan relasi di dalam file tersebut tetap utuh dan aman di folder **Trash**.

> [!WARNING]
> **Penghapusan Proyek/Workspace**: Jika Anda menghapus sebuah **Proyek** atau **Workspace**, maka seluruh file (ERD, Flowchart, Note, dan Drawing) yang ada di dalamnya akan ikut terhapus secara otomatis. Pastikan Anda telah memindahkan file-file penting ke proyek lain sebelum melakukan penghapusan level proyek.

## Memulihkan File (Restore)
Jika Anda salah menghapus file atau membutuhkan kembali dokumen lama:
1. Klik menu **Trash** di bagian bawah sidebar utama.
2. Cari file yang ingin dipulihkan.
3. Klik tombol **Restore**.
4. **Hasil**: File akan otomatis kembali ke proyek asalnya dengan seluruh isi data yang sama persis seperti sebelum dihapus.

## Penghapusan Permanen
Penghapusan permanen adalah tindakan yang **tidak dapat dibatalkan**. Gunakan fitur ini hanya jika Anda sudah yakin tidak membutuhkan data tersebut lagi.

1. Buka menu **Trash**.
2. Klik tombol **Delete Permanently** pada file yang dipilih.

### Apa yang Terjadi Saat Hapus Permanen?
- **Database**: Record file dan seluruh kontennya (tabel ERD, isi catatan, dll) akan dihapus total dari database Supabase.
- **Storage (R2)**: Jika file tersebut adalah **Notes** yang berisi gambar, sistem juga akan mencoba menghapus aset gambar tersebut dari bucket **Cloudflare R2** Anda untuk membersihkan ruang penyimpanan.

> [!CAUTION]
> Kami sangat menyarankan untuk memeriksa kembali isi folder Trash secara berkala sebelum melakukan pembersihan permanen.
