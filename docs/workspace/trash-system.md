---
sidebar_position: 5
slug: /workspace/trash-system
---
# Trash & Data Recovery

ERD Builder Pro memakai **soft delete**: file atau Project yang dihapus dipindahkan ke **Trash** lebih dulu, sehingga masih bisa dipulihkan.

## Membuka Trash

Klik menu profil di kiri bawah sidebar, lalu pilih **Trash**. Halaman **Trash Bin** memiliki tab **Projects**, **ERD**, **DB Client** (Desktop/CLI), **Notes**, **Drawings**, dan **Flowcharts**.

Trash menampilkan isi workspace yang sedang aktif, termasuk item yang dihapus anggota lain di Team Workspace. Menu Trash dinonaktifkan saat koneksi ke server terputus.

## Memulihkan (Restore)

1. Buka tab jenis file.
2. Klik **Restore** pada item yang ingin dipulihkan.

File kembali ke Project asalnya dengan isi yang sama seperti sebelum dihapus.

- Hanya pembuat item yang dapat memulihkan atau menghapusnya. Item milik orang lain menampilkan **Creator only**.
- File tidak bisa dipulihkan selama Project-nya masih di Trash. Pulihkan Project lebih dulu.
- Memulihkan Project juga memulihkan file di dalamnya. Pemulihan Project hanya bisa dilakukan pembuatnya, dan hanya bila semua file di dalamnya juga dibuat olehnya.

## Menghapus Permanen

1. Klik **Delete** pada item.
2. Konfirmasi dengan **Permanently Delete**.

Penghapusan permanen **tidak dapat dibatalkan**. Record file, seluruh isinya, dan [Version History](../collaboration/version-history.md)-nya ikut terhapus.

### Empty Trash (Cloud)

Di Cloud, tombol **Empty Trash** menghapus permanen semua item yang **Anda buat** di workspace aktif. Item buatan anggota lain tetap ada.

## Penghapusan Otomatis

| Cara | Perilaku |
| :--- | :--- |
| **Cloud** | Item di Trash dihapus permanen setelah **30 hari**. Halaman Trash menampilkan peringatan dan tanggal penghapusan setiap item (*Deleted permanently on …*). |
| **Self-host** | Tidak ada penghapusan otomatis, kecuali administrator mengatur `TRASH_RETENTION_DAYS`. Lihat [Environment Variables](../configuration/env-variables.md#retensi-data-opsional). |
| **Desktop dan CLI** | Tidak ada penghapusan otomatis. |

## Gambar di Storage

Gambar yang dipakai Notes atau Drawings tidak langsung hilang dari storage:
- **Cloud dan Self-host**: gambar yang tidak lagi dipakai ditandai oleh pembersihan harian, lalu dihapus dari bucket setelah 30 hari. Lihat [Library](../cloud-storage/library.md).
- **Desktop dan CLI**: gambar dihapus dari storage saat file dihapus permanen.

:::caution
Periksa isi Trash secara berkala sebelum menghapus permanen. Di Cloud, pulihkan file sebelum 30 hari bila masih diperlukan.
:::
