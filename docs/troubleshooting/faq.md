---
sidebar_position: 2
slug: /troubleshooting/faq
---
# Frequently Asked Questions (FAQ)

Berikut adalah jawaban atas pertanyaan yang paling sering diajukan mengenai penggunaan dan konfigurasi ERD Builder Pro.

### Mengapa saya harus menggunakan Port 6543 untuk Backup?
GitHub Actions dijalankan di lingkungan yang hanya mendukung **IPv4**. Karena database Supabase versi terbaru seringkali menggunakan **IPv6**, koneksi langsung melalui port default `5432` akan gagal. Port `6543` adalah **Transaction Pooler** yang menyediakan jalur IPv4 stabil untuk proses backup.

### Bagaimana aplikasi ini bekerja saat Offline?
ERD Builder Pro dirancang dengan pendekatan **Offline-First**. 
- Semua perubahan yang Anda buat disimpan terlebih dahulu ke **IndexedDB** di dalam browser Anda.
- Saat koneksi internet tersedia, sistem akan secara otomatis mencoba mensinkronkan data lokal tersebut ke database Supabase (Cloud).

### Apakah aman menggunakan Public Bucket di Cloudflare R2?
Meskipun bucket disetel ke *Public*, data Anda tetap aman karena:
1. **Nama File Acak**: Setiap gambar diberi nama UUID unik yang mustahil ditebak.
2. **CORS Policy**: Anda dapat membatasi agar gambar hanya bisa dimuat dari domain resmi aplikasi Anda.
3. **Tanpa Indexing**: Selama link gambar tidak disebar di situs publik, mesin pencari seperti Google tidak akan bisa menemukannya.

### Apa maksud label "Eksperimental" pada beberapa fitur?
Fitur dengan label Eksperimental (seperti Import Notes atau Export PDF) adalah fitur yang sudah berfungsi namun masih dalam tahap pengembangan aktif. Anda mungkin akan menemui sedikit masalah visual atau bug kecil. Kami menyarankan untuk selalu melakukan backup database sebelum mencoba fitur-fitur ini secara intensif.

### Bisakah saya mengganti warna tema (Dark/Light Mode)?
ERD Builder Pro saat ini dioptimalkan untuk **Dark Mode** guna memberikan pengalaman perancangan yang fokus dan elegan. Dukungan tema terang (Light Mode) sedang dalam peta jalan pengembangan kami.

### Di mana saya bisa melihat riwayat perubahan aplikasi?
Anda dapat melihat daftar fitur baru, perbaikan bug, dan pembaruan versi secara langsung melalui menu **[Changelog](/changelog)** yang terhubung langsung dengan rilis GitHub kami.

### Bagaimana jika saya lupa password Supabase?
Karena autentikasi menggunakan Supabase, Anda dapat mereset password atau mengelola akun pengguna melalui dashboard **Supabase > Authentication > Users**.

### Bagaimana jika saya lupa password di mode self-hosted (Local PostgreSQL / Docker)?
Untuk mode self-hosted yang menggunakan autentikasi lokal (bukan Supabase), gunakan script CLI berikut dari direktori proyek:

```bash
npm run reset-password -- --email email-admin-anda@example.com --password passwordbaru123
```

Script ini akan:
- Mencari user berdasarkan email
- Meng-hash password baru dengan algoritma `scrypt` (sama seperti login normal)
- Memperbarui password di database

Tidak perlu restart aplikasi. User bisa langsung login dengan password baru.

### Mengapa login `admin@local.dev` / `admin123` tidak valid di self-host?
Kombinasi tersebut hanya kredensial bootstrap untuk Desktop/CLI. Self-host Local PostgreSQL menolaknya agar deployment bersama tidak berjalan dengan password default. Setelah database kosong, gunakan halaman **Create administrator account** untuk membuat akun super admin dengan email dan password baru.

### Mengapa halaman registrasi super admin muncul lagi?
Halaman tersebut muncul jika database belum memiliki super admin yang dikonfigurasi atau masih berisi akun bootstrap. Pastikan registrasi menggunakan email/password baru dan aplikasi memakai `DATABASE_URL` yang sama dengan database yang Anda seed. `/api/auth-config` membaca status setup langsung dari database.

### Apa yang terjadi jika `ERD_ENCRYPTION_KEY` hilang atau berubah?
Password DB Connect dan API key AI yang tersimpan tidak dapat didekripsi. Pulihkan kunci yang sama dari secret manager atau backup environment. Jangan membuat kunci baru untuk database lama kecuali Anda siap menyimpan ulang seluruh kredensial terenkripsi.
