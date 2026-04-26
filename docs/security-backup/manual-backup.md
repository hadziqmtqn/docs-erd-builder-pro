---
sidebar_position: 1
slug: /security-backup/manual-backup
---
# Backup Manual

ERD Builder Pro menyediakan antarmuka **Database Backup** yang intuitif untuk melakukan pencadangan data secara instan dan mengelola riwayat backup Anda.

## Cara Membuat Backup Baru
1. Klik pada **User Profile** (ikon profil di pojok kiri bawah) dan pilih menu **Database Backup**.
2. Klik tombol **"+ Create Backup"** di pojok kanan atas.
3. Sistem akan mulai memproses pencadangan database Anda.

## Memahami Status Backup
Daftar backup akan menampilkan status real-time untuk setiap proses:
- **Processing**: Sistem sedang melakukan *dumping* database dan mengunggahnya ke Cloudflare R2. Anda tidak bisa mengunduh file selama status ini aktif.
- **Completed**: Backup telah berhasil dibuat dan disimpan di cloud storage Anda.

## Manajemen File Backup
Pada tabel riwayat backup, Anda dapat melakukan beberapa aksi:
- **Download**: Klik ikon unduh pada kolom **Action** untuk menyimpan file `.sql.gz` ke komputer lokal Anda.
- **Refresh**: Gunakan tombol *refresh* (ikon putar) di sebelah kanan atas tabel untuk memperbarui status backup terbaru.
- **Identitas**: Setiap backup diberi nama otomatis berdasarkan stempel waktu (contoh: `Backup_20260425_1837`) untuk memudahkan pelacakan.

> [!IMPORTANT]
> Fitur ini bergantung sepenuhnya pada koneksi ke **Cloudflare R2**. Pastikan variabel `R2_ACCESS_KEY_ID` dan `R2_SECRET_ACCESS_KEY` sudah terkonfigurasi dengan benar di server agar proses unggah tidak gagal (status tertahan di Processing).
