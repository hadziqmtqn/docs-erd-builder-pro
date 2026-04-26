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
