---
sidebar_position: 1
slug: /troubleshooting/common-issues
---
# Masalah Umum

Halaman ini merangkum beberapa kendala teknis yang mungkin Anda temui dan solusi praktis untuk mengatasinya.

## 1. Gagal Sinkronisasi Data (Offline Sync)
**Gejala**: Data yang baru saja diubah tidak muncul saat dibuka di perangkat lain atau setelah aplikasi di-restart.
**Solusi**:
- Pastikan aplikasi tetap terbuka beberapa saat setelah koneksi internet kembali terdeteksi untuk memberi waktu proses sinkronisasi.
- Cek tab **Network** di browser (Developer Tools) untuk memastikan tidak ada error 403 atau 401 saat aplikasi mencoba melakukan *push* data ke Supabase.
- Jika sinkronisasi tetap gagal, lakukan *refresh* halaman (pastikan data sudah tersimpan di *local storage* browser Anda).

## 2. Koneksi Database Gagal (GitHub Actions)
**Gejala**: Error `psql: error: could not connect to server: Connection timed out` saat backup otomatis.
**Solusi**: 
- Pastikan Anda menggunakan **Transaction Pooler** (Port 6543) dan bukan koneksi langsung (5432).
- Cek apakah `SUPABASE_DB_URL` di GitHub Secrets sudah benar dan menggunakan format URI yang tepat.

## 3. Gambar Tidak Muncul (Cloudflare R2)
**Gejala**: Gambar di Notes atau Drawings pecah atau tidak tampil.
**Solusi**:
- Pastikan API Token di Cloudflare memiliki izin "Edit" atau "Admin" untuk bucket tersebut.
- Cek apakah `R2_ACCOUNT_ID` dan `R2_BUCKET_NAME` di file `.env` sudah sesuai.
- Pastikan **CORS** di dashboard Cloudflare R2 sudah diizinkan untuk domain resmi aplikasi Anda.

## 4. Perubahan .env Tidak Terdeteksi
**Gejala**: Fitur baru tetap menggunakan konfigurasi lama meskipun file `.env` sudah diubah.
**Solusi**:
- Jika Anda menjalankan aplikasi menggunakan Docker, Anda harus melakukan *rebuild* image atau merestart kontainer agar variabel lingkungan yang baru dimuat ke dalam sistem.
