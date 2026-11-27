---
sidebar_position: 1
slug: /workspace/personal-team-workspace
---
# Personal & Team Workspace

Setiap akun memiliki satu **Personal Workspace** pribadi. Bila tersedia, akun juga bisa menjadi anggota satu atau beberapa **Team Workspace** untuk bekerja bersama.

| Workspace | Isi | Siapa yang melihat |
| :--- | :--- | :--- |
| **Personal** | Project dan file milik Anda sendiri | Hanya Anda |
| **Team** | Project dan file milik Team | Semua anggota aktif Team, sesuai [peran Project](./project-access.md) |

## Ketersediaan

| Cara | Team Workspace |
| :--- | :--- |
| **Cloud** | Ya. Team dibuat dan dikelola di ERDBPro SaaS, dengan Trial atau langganan Cloud per Team. |
| **Self-host (PostgreSQL)** | Ya, setelah SuperAdmin mengaktifkan lisensi Self-host Commercial. |
| **Self-host Supabase (legacy)** | Tidak. |
| **Desktop dan CLI** | Tidak. Hanya Personal. |

## Berpindah Workspace

Pemilih workspace berada di bagian atas sidebar, di bawah tulisan **ERD Builder Pro**.

1. Klik nama workspace aktif.
2. Pilih **Personal** di grup **Workspace**, atau salah satu Team di grup **Teams**.

Perubahan yang belum tersimpan disimpan lebih dulu, lalu muncul **Loading workspace…**. Pilihan workspace terakhir diingat di browser. Bila belum ada Team, pemilih ini hanya menampilkan nama workspace.

Ikon roda gigi (**Manage team**) muncul di samping Team yang Anda kelola.

## Peran Team

| Peran | Hak |
| :--- | :--- |
| **Manager** | Mengelola Team dan anggotanya, serta memiliki akses penuh ke semua Project Team. |
| **Staff** | Bekerja di Project Team sesuai peran Project yang diberikan. |

Peran per Project (Creator, Manager, Editor, Commenter, Viewer) dijelaskan di [Akses Project](./project-access.md).

## Team di Self-host

### Mengaktifkan Team
Team memerlukan lisensi Self-host Commercial yang aktif di **Settings → Application License**. Tanpa lisensi, SuperAdmin yang mengklik **Add Team** melihat dialog **Unlock Teams** dengan pilihan **Buy license** dan **Activate key**.

### Membuat Team
Hanya SuperAdmin yang dapat membuat Team.

1. Buka pemilih workspace, lalu klik **Add Team**.
2. Isi **Team name**, lalu klik **Add Team**.

Bila jumlah Team sudah mencapai batas lisensi, muncul pesan **Team limit reached**.

### Mengelola Anggota
Manager Team dan SuperAdmin mengelola anggota dari halaman Team (ikon **Manage team**, atau menu sidebar **Instance Administration → Team** untuk SuperAdmin).

1. Klik **Add member**.
2. Isi **Email**, lalu pilih peran **Manager** atau **Staff** (bawaan Staff).
3. Bila pengguna belum punya akun, centang **Create a new account** dan isi **Temporary password**.

Menu setiap anggota berisi **Deactivate member**, **Reactivate member**, dan **Ban member** (khusus SuperAdmin).

Aturan yang berlaku:
- SuperAdmin tidak dapat menjadi anggota Team.
- Setiap Team harus memiliki minimal satu Manager.
- Manager tidak dapat menonaktifkan keanggotaannya sendiri.
- Anggota aktif yang sama di beberapa Team dihitung satu kali dalam kuota member lisensi.

Pengguna yang semua Team-nya tidak dapat dipakai, misalnya karena lisensi tidak aktif, ditolak saat login dengan pesan seperti *Your Team license is not active. Contact the SuperAdmin.*

## Team di Cloud

- Team adalah Organization bertipe Team di ERDBPro SaaS. Membuat Team, mengundang dan menghapus anggota, mengubah peran, serta mengatur langganan dilakukan di SaaS.
- Ikon **Manage team** dan halaman Team di Cloud mengarah ke ERDBPro SaaS (**Open ERDBPro SaaS**). Menu sidebar **Manage account & billing** membuka akun Anda di SaaS.
- Owner dan Manager di SaaS menjadi **Manager** di Cloud; Staff menjadi **Staff**.
- Bila Trial atau langganan sebuah Team berakhir, akses ke Team itu ditutup tetapi datanya tetap disimpan. Personal Workspace dan Team lain tidak terpengaruh.
