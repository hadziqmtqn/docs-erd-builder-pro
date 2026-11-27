---
sidebar_position: 2
slug: /troubleshooting/faq
---
# Frequently Asked Questions (FAQ)

Jawaban atas pertanyaan yang sering diajukan tentang penggunaan dan konfigurasi ERD Builder Pro.

### Apa beda Cloud, Self-host, Desktop, dan CLI?
Cloud dikelola oleh tim ERD Builder Pro dan memakai akun ERDBPro SaaS. Self-host dipasang di server Anda dengan PostgreSQL. Desktop dan CLI berjalan di komputer Anda dengan SQLite untuk satu pengguna. Lihat [Pilihan Penggunaan](../getting-started/intro.md#pilihan-penggunaan).

### Apakah Desktop bisa memakai PostgreSQL?
Tidak sebagai database aplikasi; Desktop dan CLI selalu memakai SQLite. Namun Anda bisa membuka database PostgreSQL, MySQL, atau SQLite lain lewat [DB Client](../core-features/db-client.md).

### Bagaimana aplikasi bekerja saat koneksi terputus?
Notes menyimpan draft di browser (IndexedDB) sebelum dikirim ke server, sehingga ketikan terakhir tidak langsung hilang. Selama koneksi terputus, beberapa menu seperti Search, Trash, Version History, dan Share dinonaktifkan.

### Apakah gambar yang saya unggah bisa diakses publik?
Tidak secara langsung. Gambar disimpan di bucket privat dan ditampilkan melalui signed URL yang berlaku 15 menit, dibuat ulang setiap kali dokumen dibuka. Karena itu `R2_PUBLIC_URL` harus dikosongkan. Lihat [Konfigurasi R2](../cloud-storage/r2-config.md).

### Apa maksud label "Experimental"?
Fitur berlabel Experimental, seperti Import dan Export Notes, sudah berfungsi tetapi masih dikembangkan. Hasilnya bisa belum sempurna. Buat backup sebelum memakainya secara intensif.

### Bisakah saya memakai tema terang (Light Mode)?
Bisa. Buka **Settings → Appearance** lalu pilih **Light**, **Dark**, atau **System**.

### Mengapa menu Team tidak muncul?
Team hanya ada di Cloud dan Self-host dengan PostgreSQL murni. Di Self-host, Team memerlukan lisensi Self-host Commercial. Desktop dan CLI tidak memiliki Team.

### Di mana saya bisa melihat riwayat perubahan aplikasi?
Lihat halaman **[Changelog](../changelog.mdx)** yang mengambil catatan rilis dari GitHub, atau **Settings → What's New** di aplikasi.

### Bagaimana jika saya lupa password di Self-host?
Jalankan script berikut dari folder proyek (atau dengan `docker exec` di container):

```bash
npm run reset-password -- --email email-anda@example.com --password passwordbaru123
```

Script ini mencari pengguna berdasarkan email, meng-hash password baru dengan `scrypt` (sama seperti login normal), lalu memperbarui database. Tidak perlu restart.

### Bagaimana jika saya lupa password di deployment Supabase lama?
Reset password atau kelola akun melalui dashboard **Supabase → Authentication → Users**.

### Mengapa login `admin@local.dev` / `admin123` tidak valid di Self-host?
Kombinasi tersebut hanya kredensial internal Desktop/CLI. Self-host menolaknya agar deployment bersama tidak berjalan dengan password bawaan. Pada database kosong, gunakan halaman **Create administrator account** untuk membuat SuperAdmin.

### Mengapa halaman registrasi administrator muncul lagi?
Halaman tersebut muncul jika database belum memiliki SuperAdmin. Pastikan aplikasi memakai `DATABASE_URL` yang sama dengan database yang Anda siapkan.

### Apa yang terjadi jika `ERD_ENCRYPTION_KEY` hilang atau berubah?
API key AI yang tersimpan (dan kredensial DB Client di Desktop/CLI) tidak dapat didekripsi. Pulihkan kunci yang sama dari secret manager atau backup environment. Jangan membuat kunci baru untuk database lama kecuali Anda siap menyimpan ulang semua kredensial.
