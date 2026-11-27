---
sidebar_position: 3
slug: /cloud-storage/library
---
# Library

**Library** menampilkan semua gambar yang diunggah ke workspace aktif oleh seluruh anggotanya, sehingga Anda bisa melihat gambar mana yang memakan storage dan membersihkan yang tidak terpakai.

## Membuka Library

- **Cloud**: klik **Library** di sidebar, atau buka **Settings → Usage → Open Library**.
- **Self-host (PostgreSQL)**: belum ada menu di sidebar; buka alamat `/library` di aplikasi Anda.
- Desktop, CLI, dan Supabase tidak memiliki Library.

## Isi dan Kontrol

- **Filter**: **All files** atau **Unused only**.
- **Urutan**: **Largest first** atau **Newest first**.
- **Refresh** memuat ulang daftar.
- 50 gambar per halaman.

Label **Unused** muncul pada gambar yang tidak lagi dipakai dokumen mana pun. Label ini diperbarui oleh pembersihan harian, jadi gambar yang baru saja dilepas dari dokumen mungkin belum langsung bertanda Unused.

## Menghapus Gambar

1. Klik **Delete** pada gambar.
2. Konfirmasi di dialog **Delete from Library?**

Gambar yang dihapus langsung berhenti dihitung dalam storage dan diberi label **Deleted · removed &lt;tanggal&gt;**. Gambar baru benar-benar dihapus setelah 30 hari; sampai saat itu Anda bisa mengklik **Undo**. Undo memeriksa ulang sisa kuota storage.

- Gambar yang masih dipakai tidak bisa dihapus: *This image is still used by: &lt;judul&gt;. Remove it from those documents first.*
- Hanya pengunggah gambar atau Manager Team yang dapat menghapusnya (*Uploader or Manager only*).
- **Delete unused (N)** menghapus semua gambar Unused di halaman yang sedang tampil. Tombol ini tersedia untuk Manager Team, dan untuk semua pengguna di Personal Workspace.

Lihat juga [Kuota Cloud](./cloud-quota.md).
