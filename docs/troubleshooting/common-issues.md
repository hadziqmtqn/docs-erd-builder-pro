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

## 4. Masalah AI Tidak Merespon
**Gejala**: Chat AI berhenti di tengah jalan atau menampilkan pesan error koneksi.
**Solusi**:
- Cek **API Key** di menu Settings > AI Configuration. Pastikan key masih aktif dan memiliki kuota yang cukup.
- Jika menggunakan **Custom/OpenAI Compatible**, pastikan **Base URL** sudah benar dan menyertakan `/v1` di akhir (contoh: `http://localhost:20128/v1`).
- Periksa log di terminal (jika menjalankan di lokal) atau cek tab Network di browser untuk melihat detail error dari API provider.

## 5. Error Parsing SQL
**Gejala**: SQL yang dimasukkan tidak berubah menjadi diagram atau terjadi error saat parsing.
**Solusi**:
- Pastikan syntax SQL menggunakan dialek **PostgreSQL** (dialek utama yang didukung).
- Periksa apakah ada karakter khusus yang tidak didukung atau syntax yang terlalu kompleks. Cobalah untuk mem-parse tabel per tabel jika file SQL terlalu besar.

## 6. Masalah Docker (Deployment)
**Gejala**: Kontainer Docker tidak bisa diakses di port 3000.
**Solusi**:
- Pastikan port 3000 tidak digunakan oleh aplikasi lain di komputer host.
- Periksa log kontainer dengan perintah `docker logs erd-app` untuk melihat pesan error saat startup.
- Pastikan file `.env` sudah disertakan saat menjalankan kontainer (`--env-file .env`).

## 8. Error 403 Forbidden saat Mengelola Model Catalog

**Gejala**: Muncul error 403 Forbidden saat membuat atau mengedit data di menu **Settings > Model Catalog**.

**Penyebab**: Akun Supabase Anda tidak memiliki flag `is_super_admin` di metadata pengguna. Aplikasi memeriksa flag ini untuk memberikan akses ke fitur Model Catalog.

**Solusi**:
1. Buka Dashboard Supabase Anda.
2. Masuk ke menu **SQL Editor**.
3. Buat query baru dan jalankan perintah berikut, sesuaikan email dengan akun admin yang Anda gunakan:

```sql
UPDATE auth.users
    SET raw_app_meta_data = raw_app_meta_data || '{"is_super_admin": true}'::jsonb
    WHERE email = 'admin@example.com';
```

   Ganti `admin@example.com` dengan email akun admin yang Anda gunakan.

4. Setelah menjalankan query, **logout** dan **login kembali** ke aplikasi ERD Builder Pro.

> **Catatan**: Masalah ini khusus untuk mode **Supabase (PostgreSQL)**. Mode Local PostgreSQL dan Desktop (SQLite) tidak terpengaruh karena semua akun lokal otomatis menjadi admin.

## 9. Lupa Password di Mode Self-Hosted (Local PostgreSQL / Docker)

**Gejala**: Tidak bisa login ke ERD Builder Pro yang di-deploy secara self-hosted dengan mode Local PostgreSQL atau Docker.

**Penyebab**: Mode self-hosted menggunakan autentikasi lokal, bukan Supabase. Tidak ada fitur "Lupa Password" di UI.

**Solusi**:
1. Buka terminal di server atau direktori proyek ERD Builder Pro.
2. Jalankan perintah berikut, sesuaikan email dan password:

```bash
npm run reset-password -- --email admin@local.dev --password passwordbaru123
```

3. Script akan mencari user, meng-hash password, dan memperbarui database.
4. Tidak perlu restart aplikasi — user bisa langsung login dengan password baru.

> **Catatan**: Solusi ini khusus untuk mode **Local PostgreSQL** dan **Docker**. Mode Supabase menggunakan dashboard Supabase untuk reset password. Mode Desktop (SQLite/Tauri) menggunakan kredensial default `admin@local.dev` / `admin123`.

## 10. Canvas Terasa Berat/Lag Setelah Generate
**Gejala**: Setelah Anda menekan tombol aksi di bawah balasan AI pada Chat Panel (seperti tombol *Replace All*, *Append*, *Create or Update ERD from SQL*, atau *Create or Update Flowchart*) untuk pertama kalinya, pergerakan tabel atau simbol di canvas terasa berat atau "patah-patah".

**Penyebab**: Ini adalah kendala teknis pada sinkronisasi state awal canvas saat menerima data baru dalam jumlah besar dari AI.

**Solusi**:
- Cukup lakukan **Reload/Refresh halaman browser** Anda satu kali. Setelah di-refresh, canvas akan kembali lancar dan normal.
