---
sidebar_position: 5
slug: /collaboration/public-share
---
# Link Publik

**Share** membuat link baca saja yang bisa dibuka siapa pun tanpa akun. Tersedia untuk Notes, ERD, Drawing, dan Flowchart.

## Membuat Link

1. Buka file, lalu pilih **Actions → Share**. Menu ini hanya tampil untuk pembuat file yang memiliki hak edit, dan dinonaktifkan saat offline.
2. Di dialog **Share "&lt;judul&gt;"**, centang **Public Access** (*Enable sharing via public link*).
3. Salin **Public Link** dengan tombol copy.
4. Opsional:
   - **Access Token (Optional)**: klik **Generate** agar pengunjung harus memasukkan token sebelum membuka dokumen.
   - **Duration (Days)**: jumlah hari link berlaku. Kosongkan untuk berlaku selamanya.
5. Klik **Save Changes**.

Format link: `<alamat-aplikasi>/view/<diagram|note|drawing|flowchart>/<id>`.

File yang dibagikan menampilkan badge **Public** di header, dan menu **Actions** berisi **Copy Public Link**.

## Yang Dilihat Pengunjung

- Dokumen dalam mode baca saja, tanpa login dan tanpa sidebar.
- Menu **Actions** hanya berisi **Copy Public Link**.
- Bila link memakai token, muncul halaman **Access Denied** dengan kolom *Enter access token...* dan tombol **Unlock Document**.
- Bila sharing dimatikan, pengunjung melihat *This document is private*. Bila masa berlaku habis, *This share link has expired*.

Gambar di dokumen ditampilkan lewat signed URL yang dibuat ulang setiap kali halaman dibuka.

## Menghentikan Sharing

Buka **Actions → Share**, hapus centang **Public Access**, lalu **Save Changes**. Token dan masa berlaku ikut dihapus. Link dibentuk dari ID file, jadi bila sharing diaktifkan lagi, alamat link-nya tetap sama.

## Catatan

- Di Team Workspace, hanya pembuat file yang dapat membagikannya.
- Link dari Desktop dan CLI memakai alamat lokal komputer Anda (`localhost`), sehingga hanya bisa dibuka dari komputer itu sendiri. Untuk berbagi dengan orang lain, gunakan Cloud atau Self-host.
