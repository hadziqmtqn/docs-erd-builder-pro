---
sidebar_position: 3
slug: /workspace/project-access
---
# Akses Project (Peran)

Di Team Workspace, setiap anggota memiliki peran per Project yang menentukan apa yang boleh ia lakukan. Personal Workspace tidak memakai peran karena semua isinya milik Anda.

## Daftar Peran

| Peran | Siapa | Bawaan |
| :--- | :--- | :--- |
| **Creator** | Pembuat Project | Akses penuh |
| **Manager** | Manager Team | Selalu akses penuh, tidak bisa dibatasi |
| **Editor** | Staff yang diberi akses edit | — |
| **Commenter** | Staff | Peran bawaan Staff |
| **Viewer** | Staff yang hanya boleh membaca | — |

## Hak Akses

| Aksi | Creator | Manager | Editor | Commenter | Viewer |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Membaca file | ✅ | ✅ | ✅ | ✅ | ✅ |
| Mengubah isi file | ✅ | ✅ | ✅ | — | — |
| Komentar, diskusi, resolve thread | ✅ | ✅ | ✅ | ✅ | — |
| Membuat file baru di Project | ✅ | ✅ | ✅ | ✅ | — |
| Mengatur akses Project | ✅ | ✅ | — | — | — |
| Mengganti nama atau menghapus Project | ✅ | — | — | — | — |

### Pemilik File

Pembuat sebuah file selalu memiliki akses penuh ke file itu, apa pun perannya. Hanya pembuat file yang dapat:
- memindahkan file ke Trash dan memulihkannya;
- membagikan file dengan [link publik](../collaboration/public-share.md);
- memulihkan versi dari [Version History](../collaboration/version-history.md);
- memindahkan file ke Project lain.

Manager tidak dapat melakukan aksi ini pada file milik orang lain.

Pengecualian: bila Manager membatasi pembuat Project menjadi Commenter atau Viewer, batas itu juga berlaku untuk file yang ia buat di Project tersebut. Mengembalikan perannya menjadi Editor mengembalikan haknya atas file sendiri.

## Mengatur Peran

1. Di sidebar **Projects**, klik **⋯** pada Project, lalu pilih **Manage access**. Menu ini hanya tampil di Team Workspace untuk pembuat Project dan Manager.
2. Di dialog **Project access**, pilih peran untuk setiap anggota: **Editor** (*Can change the files.*), **Commenter** (*Can read and comment. Default.*), atau **Viewer** (*Can read only.*).
3. Perubahan langsung tersimpan dan muncul pesan *&lt;nama&gt; is now &lt;peran&gt;.*

Hanya Manager yang dapat mengubah peran pembuat Project. Peran Manager Team tidak dapat diubah.

## Tampilan Baca Saja

Anggota tanpa hak edit melihat pemberitahuan **View only** atau **Comment only** di atas file. Pada Notes dan Drawings tersedia tombol **Duplicate to edit** untuk membuat salinan yang bisa Anda edit.

Bila peran Anda berubah saat file sedang terbuka, muncul pesan *Your access to this Project changed.*
