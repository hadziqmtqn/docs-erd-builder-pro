---
sidebar_position: 2
slug: /configuration/supabase-setup
---
# Konfigurasi Supabase

ERD Builder Pro menggunakan Supabase sebagai database PostgreSQL dan sistem autentikasi. Ikuti langkah berikut untuk menyiapkan proyek Supabase Anda.

## 1. Membuat Proyek Baru
1. Masuk ke [Supabase Dashboard](https://database.new).
2. Buat proyek baru, pilih **Region** terdekat, dan simpan **Database Password** Anda dengan aman.

## 2. Inisialisasi Database (Schema)
Anda perlu membuat tabel-tabel yang diperlukan secara manual menggunakan SQL Editor:
1. Buka file `supabase_schema.sql` yang ada di root direktori aplikasi ERD Builder Pro.
2. Salin seluruh isi file tersebut.
3. Di dashboard Supabase, buka menu **SQL Editor**.
4. Klik **New Query**, tempelkan kode yang sudah disalin, lalu klik **Run**.
5. Pastikan semua tabel (seperti `projects`, `files`, dll) berhasil dibuat.

## 3. Konfigurasi Autentikasi (Privat)
Agar aplikasi Anda tetap privat dan tidak bisa digunakan oleh orang lain:
1. Buka menu **Authentication > Settings**.
2. Di bagian **Sign Up**, matikan (uncheck) opsi **Allow new users to sign up**.
3. Simpan perubahan. *Sekarang orang asing tidak bisa mendaftar secara mandiri.*

## 4. Mendaftarkan Akun Anda
Setelah registrasi publik dimatikan, Anda harus membuat akun Anda sendiri secara manual:
1. Buka menu **Authentication > Users**.
2. Klik tombol **Add User** dan pilih **Create new user**.
3. Masukkan **Email** dan **Password** yang ingin Anda gunakan.
4. (Opsional) Matikan opsi "Auto-confirm user" jika Anda ingin memverifikasi email, atau biarkan menyala untuk login instan.
5. Klik **Create User**. Gunakan akun ini untuk login ke aplikasi ERD Builder Pro Anda.

## 5. Mengambil API Keys
Buka menu **Settings > API** untuk mengambil variabel yang diperlukan di file `.env`:
- **Project URL**: Masukkan ke `SUPABASE_URL` dan `VITE_SUPABASE_URL`.
- **anon public**: Masukkan ke `VITE_SUPABASE_ANON_KEY`.
- **service_role**: Masukkan ke `SUPABASE_SERVICE_ROLE_KEY`.

> [!CAUTION]
> Jangan pernah membagikan `service_role` key Anda kepada siapa pun atau memasukkannya ke dalam kode frontend (tanpa prefix `VITE_`).
