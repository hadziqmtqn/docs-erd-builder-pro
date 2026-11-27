---
sidebar_position: 4
slug: /collaboration/version-history
---
# Version History

**Version History** menyimpan versi-versi lama sebuah file sehingga Anda bisa melihat perubahan dan memulihkan keadaan sebelumnya. Tersedia untuk Notes, ERD, Flowchart, dan Drawing di semua cara penggunaan.

## Membuka Version History

Buka file, lalu pilih **Actions → Version History**. Menu ini dinonaktifkan saat offline atau saat file sedang disimpan, dan tidak tersedia untuk Guest maupun link publik.

Panel **Version History** menampilkan hingga 100 versi, masing-masing dengan waktu dan *Changed by &lt;nama&gt;*. Label **Safety** menandai versi pengaman yang dibuat sebelum pemulihan, dan **Restored** menandai versi hasil pemulihan.

- **ERD** dan **Notes**: pilih versi untuk melihat pratinjaunya di editor.
- **Flowchart**: menampilkan jumlah simbol (*Nodes*) dan koneksi (*Connections*).
- **Drawing**: menampilkan jumlah elemen (*Elements*) dan file gambar (*Files*).

Bila belum ada versi, panel menampilkan *No saved versions yet. A version is created after document changes.*

## Kapan Versi Dibuat

- Saat perubahan berhasil disimpan, paling sering sekali setiap 5 menit per file. Penyimpanan tanpa perubahan tidak membuat versi baru.
- Aplikasi menyimpan 100 versi otomatis terbaru per file.
- Perubahan lewat MCP selalu dicatat.
- Sebelum pemulihan, versi saat ini disimpan sebagai versi **Safety**.

## Memulihkan Versi

1. Pilih versi, lalu klik **Restore**.
2. Di dialog **Restore this version?**, klik **Restore version**.

Versi saat ini disimpan lebih dulu sebagai versi pengaman, lalu muncul pesan *Version restored. The previous state was saved as a safety revision.* Bila file berubah saat panel terbuka, pemulihan ditolak dengan pesan *Document changed while history was open*; buka ulang panel lalu coba lagi.

Di Team Workspace, hanya pembuat file yang dapat memulihkan versi. Anggota lain dapat membaca riwayatnya.

## Retensi

| Cara | Retensi |
| :--- | :--- |
| **Cloud** | Versi yang lebih tua dari 30 hari dihapus. |
| **Self-host** | Tidak dihapus berdasarkan umur, kecuali administrator mengatur `REVISION_RETENTION_DAYS`. |
| **Desktop dan CLI** | Tidak dihapus berdasarkan umur. |

Menghapus file secara permanen dari Trash juga menghapus seluruh Version History-nya.
