---
sidebar_position: 3
slug: /getting-started/installation
---
# Instalasi Lokal

Ikuti langkah-langkah berikut untuk menjalankan ERD Builder Pro di mesin lokal Anda.

## 1. Clone Repositori
```bash
git clone https://github.com/hadziqmtqn/erd-builder-pro.git
cd erd-builder-pro
```

## 2. Instal Dependensi
Anda perlu menginstal dependensi untuk frontend dan backend.
```bash
npm install
```

## 3. Konfigurasi Environment
Salin file `.env.example` menjadi `.env` dan isi dengan kredensial Anda.
```bash
cp .env.example .env
```
*Detail pengisian variabel environment dapat dilihat pada [Environment Variables](../configuration/env-variables.md).*

> [!TIP]
> Secara default, server backend berjalan pada port `3000`. Jika Anda perlu menggunakan port berbeda (terutama di lingkungan produksi), Anda dapat mengaturnya melalui variabel `PORT` di file `.env`.

## 3a. Setup Database
Siapkan database sesuai mode yang Anda pilih. ERD Builder Pro mendukung tiga mode database — lihat [Setup Database](../configuration/database-setup) untuk perbandingan lengkap.

### Opsi A: Supabase PostgreSQL
1. Buka dashboard Supabase → **SQL Editor**.
2. Jalankan isi file `supabase_schema.sql` dari root proyek.
3. Konfigurasi `DATABASE_URL`, `SUPABASE_URL`, dan `SUPABASE_SERVICE_ROLE_KEY` di `.env`.

### Opsi B: Local PostgreSQL
```bash
# Buat database
createdb erd_builder_pro

# Generate client Local PostgreSQL, push schema & seed data non-auth
npm run db:generate:pg:local
npm run db:push:pg:local
npm run db:seed:pg:local
```

Atur juga `ERD_ENCRYPTION_KEY` di `.env` dengan nilai acak minimal 32 karakter. Seed Local PostgreSQL tidak membuat akun default; buat super admin melalui halaman **Create administrator account** saat pertama kali membuka aplikasi.

## 4. Menjalankan Aplikasi
Jalankan perintah berikut untuk memulai server pengembangan — sesuaikan dengan mode database Anda:

**Supabase:**
```bash
npm run dev
```

**Local PostgreSQL:**
```bash
npm run dev:pg:local
```

Aplikasi akan tersedia di `http://localhost:3000`.
