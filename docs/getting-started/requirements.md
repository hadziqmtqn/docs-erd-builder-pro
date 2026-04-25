---
sidebar_position: 2
slug: /getting-started/requirements
---
# Persyaratan Sistem

Sebelum menginstal ERD Builder Pro, pastikan sistem Anda memenuhi persyaratan berikut.

## Perangkat Lunak & Lingkungan
- **Node.js**: Versi 20.x atau lebih baru.
- **npm**: Versi 9.x atau lebih baru.
- **Git**: Diperlukan untuk melakukan *clone* repositori dari GitHub.
- **Web Browser**: Versi terbaru dari Chrome, Firefox, Safari, atau Edge (mendukung fitur CSS modern dan Canvas).
- **Terminal/CLI**: Familiar dengan penggunaan Command Prompt, PowerShell, atau Bash.

## Akun Layanan Cloud
Untuk menjalankan fitur penuh (termasuk penyimpanan gambar dan backup otomatis), Anda memerlukan:

1. **Supabase**: 
   - Akun gratis/berbayar.
   - Proyek baru untuk mendapatkan `URL` dan `API Keys`.
2. **Cloudflare R2**:
   - Akun Cloudflare dengan R2 diaktifkan.
   - Bucket khusus untuk penyimpanan aset.
3. **GitHub**:
   - Akun GitHub untuk integrasi backup otomatis via GitHub Actions.

## Koneksi Internet
Meskipun aplikasi ini mendukung fitur **Offline First**, koneksi internet tetap diperlukan untuk:
- Mengunduh dependensi saat proses instalasi.
- Menghubungkan aplikasi ke layanan Supabase (Auth & Database).
- Mengunggah aset gambar ke Cloudflare R2.
- Sinkronisasi data antar perangkat.
