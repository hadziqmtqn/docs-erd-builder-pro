---
sidebar_position: 2
slug: /troubleshooting/faq
---
# FAQ

Pertanyaan yang sering diajukan mengenai penggunaan ERD Builder Pro.

### Apakah saya bisa menggunakan database selain PostgreSQL?
ERD Builder Pro dirancang khusus untuk ekosistem **PostgreSQL** (melalui Supabase). Namun, fitur SQL Generator mendukung ekspor skema ke MySQL dan SQLite untuk keperluan pengembangan di platform lain.

### Bagaimana cara memperbarui aplikasi ke versi terbaru?
1. Lakukan `git pull` dari repositori utama.
2. Jalankan `npm install` untuk memperbarui dependensi.
3. Restart server atau rebuild Docker image Anda.

### Apakah ada batasan jumlah proyek yang bisa dibuat?
Secara teknis tidak ada batasan jumlah proyek. Batasan hanya bergantung pada kuota penyimpanan database Supabase dan kapasitas penyimpanan Cloudflare R2 Anda.

### Bisakah saya melakukan self-host Supabase?
Ya, Anda bisa menghubungkan ERD Builder Pro ke instance Supabase yang di-host sendiri (self-hosted). Pastikan URL API dan DB URL yang Anda masukkan di `.env` dapat diakses oleh server aplikasi.

### Apakah data saya aman?
Data Anda disimpan di infrastruktur Supabase (PostgreSQL) dan Cloudflare (R2) milik Anda sendiri. Aplikasi ini tidak mengirimkan data desain database Anda ke server pihak ketiga mana pun.
