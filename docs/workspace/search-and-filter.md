---
sidebar_position: 4
slug: /workspace/search-and-filter
---
# Pencarian & Filter

Gunakan **Search** untuk menemukan Project dan file dengan cepat di workspace yang sedang aktif.

## Membuka Search

- Klik **Search** di sidebar, atau
- tekan `⌘K` (macOS) / `Ctrl+K` (Windows dan Linux).

Dialog pencarian terbuka dengan kolom *Search files and projects*. Tekan `Esc` untuk menutupnya. Search dinonaktifkan saat koneksi ke server terputus.

## Cara Kerja

- Ketik minimal 2 karakter (maksimal 100).
- Pencarian mencocokkan **nama Project dan judul file**, bukan isi dokumen.
- Hasil diurutkan dari yang terbaru, maksimal 5 per jenis dan 20 secara total.
- File di Trash tidak ikut dicari.

## Filter Jenis

Pilih **Filter** untuk mempersempit hasil:

- **All**
- **Projects**
- **ERD Builder**
- **DB Client** (Desktop/CLI)
- **Notes**
- **Flowcharts**
- **Drawings**

## Cakupan

| Workspace | Yang dicari |
| :--- | :--- |
| **Personal** | File dan Project pribadi Anda |
| **Team** | Semua file di Project milik Team tersebut |
| **Desktop dan CLI** | Semua file lokal Anda |

Untuk mencari di workspace lain, pindah workspace lebih dulu lewat pemilih di sidebar.

## Tips
- Tidak perlu mengetik nama lengkap. `user` akan menemukan `users_table`, `user_flowchart`, dan Project `User_Module`.
- Pilih filter **Notes** lalu ketik kata kunci untuk mencari dokumentasi tanpa tercampur diagram.
