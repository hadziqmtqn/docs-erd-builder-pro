---
sidebar_position: 2
slug: /collaboration/notifications
---
# Notifikasi

Pusat notifikasi mengumpulkan aktivitas Team yang perlu Anda ketahui dalam satu tempat.

:::info Ketersediaan
Notifikasi tersedia di Cloud dan Self-host (PostgreSQL). Desktop, CLI, Guest, dan halaman link publik tidak menampilkannya.
:::

## Membuka Notifikasi

Klik **Notifications** di sidebar, di bawah Dashboard. Pada layar sempit, ikon lonceng berada di header.

Panel menampilkan:
- jumlah **N unread**, atau *You're all caught up* bila semua sudah dibaca;
- tombol **Mark all as read**;
- tab **All** dan **This workspace**.

Notifikasi dikelompokkan per workspace, lalu per Project. Beberapa balasan di thread yang sama digabung menjadi satu item dengan jumlahnya, misalnya *(3)*.

## Jenis Notifikasi

| Aktivitas | Siapa yang menerima |
| :--- | :--- |
| Balasan diskusi dan komentar baru | Pembuat file dan peserta thread |
| File dipindahkan ke Trash, dipulihkan, atau dipindah ke Project lain | Pengelola Project: pembuat Project, Manager Team, dan Editor |
| Akses Project diberikan atau peran diubah | Anggota yang aksesnya berubah |
| Ditambahkan ke Team atau dikeluarkan dari Team | Anggota tersebut |

Notifikasi tidak dikirim ke seluruh Team, hanya ke pengguna yang terlibat.

## Membuka Item Notifikasi

Klik item untuk menandainya sudah dibaca dan membuka tujuannya: file beserta thread atau komentarnya, halaman Project, atau halaman Team. Bila item berasal dari workspace lain, aplikasi berpindah workspace lebih dulu. Akses selalu diperiksa ulang; item dari Team yang tidak lagi bisa Anda buka ditandai *&lt;Team&gt; · no longer available*.

Item tanpa tujuan yang bisa dibuka memiliki tombol **Mark as read**.

## Pembaruan dan Retensi

- Notifikasi baru masuk secara langsung saat aplikasi terbuka, dan daftar dimuat ulang saat jendela kembali aktif. Panel memuat 30 notifikasi terbaru.
- Notifikasi yang sudah dibaca dihapus setelah 90 hari, dan semua notifikasi setelah 180 hari. Administrator Self-host dapat mengubahnya lewat `NOTIFICATION_READ_RETENTION_DAYS` dan `NOTIFICATION_RETENTION_DAYS`.
- Self-host menyimpan notifikasinya sendiri dan tidak mengirim notifikasi, nama file, atau isi pesan ke ERDBPro SaaS.

## Badge di Tombol Discussions

Badge pada tombol **Discussions** hanya menghitung diskusi dan komentar yang belum dibaca di file yang sedang terbuka. Aktivitas di file lain muncul di pusat notifikasi.
