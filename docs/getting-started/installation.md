---
sidebar_position: 3
slug: /getting-started/installation
---
# Instalasi dari Source

Halaman ini menjelaskan cara menjalankan ERD Builder Pro dari source code dengan PostgreSQL, misalnya untuk pengembangan atau mencoba Self-host di mesin sendiri. Untuk server produksi, gunakan [Docker](./deployment.md). Untuk pemakaian pribadi tanpa server, gunakan [aplikasi Desktop](./desktop-app.md) atau [CLI](./cli.md).

## 1. Clone Repositori
```bash
git clone https://github.com/hadziqmtqn/erd-builder-pro.git
cd erd-builder-pro
```

## 2. Instal Dependensi
```bash
npm install
```
Gunakan Node.js 22. Setelah instalasi, npm otomatis membuat Prisma Client untuk PostgreSQL.

## 3. Siapkan Database PostgreSQL
Buat database kosong:
```bash
createdb erd_builder_pro
```

## 4. Konfigurasi Environment
Salin `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Isi minimal dua variabel berikut:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/erd_builder_pro"
ERD_ENCRYPTION_KEY="hasil-dari-openssl-rand-hex-32"
```

- `DATABASE_URL` harus diawali `postgresql://`. Awalan lain seperti `postgres://` tidak dikenali sebagai PostgreSQL murni.
- Biarkan semua variabel `SUPABASE_*` dan `VITE_SUPABASE_*` kosong. Mengisi salah satunya memindahkan server ke mode Supabase (legacy).
- Buat `ERD_ENCRYPTION_KEY` dengan `openssl rand -hex 32` dan simpan nilainya. Kunci ini mengenkripsi API key AI yang disimpan di database.

Daftar lengkap variabel ada di [Environment Variables](../configuration/env-variables.md).

## 5. Jalankan Aplikasi
```bash
npm run dev:pg:local
```

Perintah ini membuat tabel di database (`prisma db push`), menyiapkan Prisma Client, lalu menjalankan server pengembangan. Aplikasi tersedia di `http://localhost:3000`. Port bisa diubah lewat `PORT` di `.env`.

Data awal provider dan model AI dibuat otomatis saat server mulai, jadi tidak perlu menjalankan seed.

## 6. Buat Akun Administrator
Saat database masih kosong, aplikasi menampilkan halaman **Create administrator account**. Akun yang dibuat di sini menjadi **SuperAdmin** instance: ia mengelola lisensi, Team, pengguna, konfigurasi AI, dan backup.

:::caution
Tidak ada akun bawaan untuk Self-host. Kombinasi `admin@local.dev` / `admin123` hanya dipakai internal oleh Desktop dan CLI, dan ditolak oleh login Self-host.
:::

## Menjalankan untuk Produksi
Untuk server produksi, gunakan image Docker resmi. Jika tetap ingin menjalankan dari source:

```bash
npm run build
npm start
```

`npm start` menjalankan server dengan `NODE_ENV=production` dan menyajikan hasil build dari folder `dist`. Pastikan tabel database sudah dibuat, misalnya dengan `npm run db:push:pg:local`.

## Mode Supabase (Legacy)
Mode Supabase hanya untuk deployment lama yang sudah memakainya. Instalasi baru sebaiknya memakai PostgreSQL. Lihat [Setup Database](../configuration/database-setup.md#opsi-b-supabase-legacy).
