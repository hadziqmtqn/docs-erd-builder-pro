---
sidebar_position: 1
slug: /troubleshooting/common-issues
---
# Masalah Umum

Berikut adalah beberapa masalah teknis yang sering ditemui dan cara mengatasinya.

## 1. Koneksi Database Gagal (GitHub Actions)
**Gejala**: Error `psql: error: could not connect to server: Connection timed out` saat backup otomatis.
**Solusi**: 
- Pastikan Anda menggunakan **Transaction Pooler** (Port 6543) dan bukan koneksi langsung (5432).
- Cek apakah `SUPABASE_DB_URL` di GitHub Secrets sudah benar dan menggunakan format URI yang tepat.

## 2. Gambar Tidak Muncul (Cloudflare R2)
**Gejala**: Gambar di Notes atau Drawings pecah atau tidak tampil.
**Solusi**:
- Pastikan API Token di Cloudflare memiliki izin "Edit" atau "Admin" untuk bucket tersebut.
- Cek apakah `R2_ACCOUNT_ID` dan `R2_BUCKET_NAME` di file `.env` sudah sesuai.
- Pastikan CORS di dashboard Cloudflare R2 sudah diizinkan untuk domain aplikasi Anda.

## 3. Error Build Docusaurus
**Gejala**: Muncul pesan `Could not parse expression with acorn` saat menjalankan `npm run build`.
**Solusi**:
- Hindari penggunaan kurung kurawal `{}` di dalam Markdown kecuali untuk fitur spesifik Docusaurus.
- Jika ingin menggunakan ID manual pada judul, gunakan tag HTML `<span id="id"></span>` yang lebih stabil.

## 4. Perubahan .env Tidak Terdeteksi
**Gejala**: Fitur baru tetap menggunakan konfigurasi lama.
**Solusi**:
- Jika menggunakan Docker, Anda harus melakukan *rebuild* image atau merestart kontainer agar variabel baru dimuat.
- Di lokal, restart server pengembangan (`npm run dev`).
