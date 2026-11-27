---
sidebar_position: 3
slug: /collaboration/live-sync
---
# Live Sync & Load Latest

Saat beberapa anggota Team membuka file yang sama, ERD Builder Pro memberi tahu bila ada orang lain yang menyimpan perubahan. Penyuntingan bersamaan secara real-time (*co-editing*) belum tersedia; aplikasi mencegah perubahan saling menimpa.

## Saat Orang Lain Menyimpan

Selama file terbuka di editor, aplikasi memantau penyimpanan oleh pengguna lain:

- **Pengguna baca saja** (Commenter, Viewer): tampilan diperbarui otomatis.
- **Pengguna yang bisa mengedit**: muncul pemberitahuan *Someone else saved this file* dengan tombol **Load latest**. Pemberitahuan tetap tampil sampai ditutup.

Klik **Load latest** untuk memuat versi terbaru. Perubahan Anda yang belum tersimpan disimpan sebagai salinan pemulihan di browser sebelum file dimuat ulang.

## Saat Terjadi Konflik

Setiap penyimpanan membawa versi file yang menjadi dasarnya. Bila file sudah diubah orang lain sejak Anda membukanya, penyimpanan Anda ditolak dan tidak ada yang tertimpa. Muncul pemberitahuan *This file was changed by someone else* dengan penjelasan *Your unsaved changes were not sent so nothing is overwritten.* Klik **Load latest** untuk melanjutkan dari versi terbaru.

Khusus Notes, bila perbedaannya hanya penanda komentar yang ditambahkan orang lain, perubahan digabung otomatis.

## Perubahan Akses

Bila peran Anda di Project berubah saat file terbuka, muncul pesan *Your access to this Project changed.* dan tampilan menyesuaikan hak akses yang baru.

## Ketersediaan

Live sync berjalan di Cloud dan Self-host saat file dibuka di editor. Di Cloud, daftar file workspace juga diperbarui otomatis saat anggota lain membuat atau mengubah file. Link publik tidak ikut live sync.

Untuk melihat atau memulihkan versi sebelumnya, gunakan [Version History](./version-history.md).
