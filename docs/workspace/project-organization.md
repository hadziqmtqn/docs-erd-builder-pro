---
sidebar_position: 2
slug: /workspace/project-organization
---
# Organisasi Proyek

Dokumentasi di ERD Builder Pro dikelompokkan dalam **Project** agar tetap terstruktur dan mudah ditemukan.

## Hierarki

1. **Workspace**: Personal Workspace atau Team Workspace yang sedang aktif. Lihat [Personal & Team Workspace](./personal-team-workspace.md).
2. **Project**: wadah untuk satu aplikasi, modul, atau klien.
3. **File**: dokumen di dalam Project.

## Jenis File

Satu Project dapat berisi berbagai jenis file:

- **ERD**: rancangan skema database.
- **Notes**: dokumentasi teks, aturan bisnis, atau catatan API.
- **Flowcharts**: alur logika dan proses bisnis.
- **Drawings**: kanvas bebas berbasis Excalidraw.
- **DB Client** (Desktop/CLI): koneksi ke database yang sudah berjalan.

Satu Project boleh memiliki banyak file dari setiap jenis, misalnya 3 ERD untuk modul berbeda dan 5 Notes.

## Membuat Project

- Di sidebar **Projects**, klik **+** (**New Project**), isi **Project name**, lalu klik **Create**.
- Atau saat membuat file baru: klik **+** di samping pilihan Project, isi nama, lalu **Add project**.

Project dibuat di workspace yang sedang aktif. Di Team Workspace, setiap anggota dapat membuat Project. Nama **Uncategorized** dicadangkan sistem.

Setiap file baru harus berada di sebuah Project. File lama tanpa Project ditampilkan di bagian **Unassigned**.

## Memindahkan File

1. Buka file, lalu pilih **Actions → Edit** (atau **Edit** pada baris file di halaman Project).
2. Pilih **Project** tujuan, lalu klik **Save Changes**.

Hanya pembuat file yang dapat memindahkannya, dan tujuan harus berada di workspace yang sama.

## Menghapus Project

1. Di sidebar, klik **⋯** pada baris Project, lalu **Delete**.
2. Konfirmasi di dialog. Project beserta semua file di dalamnya dipindahkan ke **Trash**.

- Hanya pembuat Project yang dapat mengganti nama atau menghapusnya. Anggota lain melihat *Only the creator can rename or delete*.
- Project yang berisi file buatan anggota lain tidak dapat dihapus oleh pembuat Project.
- Memulihkan Project dari Trash juga memulihkan file-filenya. Lihat [Trash & Data Recovery](./trash-system.md).

:::caution
Menghapus Project memindahkan **semua** file di dalamnya ke Trash. Di Cloud, isi Trash dihapus permanen setelah 30 hari.
:::

## Tips
- Gunakan nama Project yang deskriptif, misalnya `Backend-CRM-V2`.
- Gunakan [Search](./search-and-filter.md) (`⌘K` / `Ctrl+K`) untuk menemukan file dengan cepat.
