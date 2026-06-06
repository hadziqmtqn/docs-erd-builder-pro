---
sidebar_position: 2
slug: /configuration/supabase-setup
---
# Setup Database

ERD Builder Pro mendukung **dua mode database PostgreSQL**. Pilih salah satu sesuai kebutuhan Anda.

| Aspek | Supabase PostgreSQL | Local PostgreSQL |
|:---|:---|:---|
| **Cocok untuk** | Production / Cloud | Development / Self-hosted |
| **Autentikasi** | Supabase Auth (JWT) | Lokal (email + password) |
| **ID Type** | `BigInt` | `Int` |
| **Env vars tambahan** | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | — |
| **Setup schema** | SQL Editor di Dashboard Supabase | `npm run db:push:pg:local` |
| **Seed data** | — (via SQL Editor) | `npm run db:seed:pg:local` |
| **Jalankan** | `npm run dev` | `npm run dev:pg:local` |

---

## Opsi A: Supabase PostgreSQL (Production)

### 1. Membuat Proyek Baru
1. Masuk ke [Supabase Dashboard](https://database.new).
2. Buat proyek baru, pilih **Region** terdekat, dan simpan **Database Password** Anda dengan aman.

### 2. Inisialisasi Database (Schema)
Anda perlu membuat tabel-tabel yang diperlukan secara manual menggunakan SQL Editor:
1. Buka file `supabase_schema.sql` yang ada di root direktori aplikasi ERD Builder Pro.
2. Salin seluruh isi file tersebut.
3. Di dashboard Supabase, buka menu **SQL Editor**.
4. Klik **New Query**, tempelkan kode yang sudah disalin, lalu klik **Run**.
5. Pastikan semua tabel (seperti `projects`, `files`, dll) berhasil dibuat.

### 3. Konfigurasi Autentikasi (Privat)
Agar aplikasi Anda tetap privat dan tidak bisa digunakan oleh orang lain:
1. Buka menu **Authentication > Settings**.
2. Di bagian **Sign Up**, matikan (uncheck) opsi **Allow new users to sign up**.
3. Simpan perubahan. *Sekarang orang asing tidak bisa mendaftar secara mandiri.*

### 4. Mendaftarkan Akun Anda
Setelah registrasi publik dimatikan, Anda harus membuat akun Anda sendiri secara manual:
1. Buka menu **Authentication > Users**.
2. Klik tombol **Add User** dan pilih **Create new user**.
3. Masukkan **Email** dan **Password** yang ingin Anda gunakan.
4. (Opsional) Matikan opsi "Auto-confirm user" jika Anda ingin memverifikasi email, atau biarkan menyala untuk login instan.
5. Klik **Create User**. Gunakan akun ini untuk login ke aplikasi ERD Builder Pro Anda.

### 5. Mengambil API Keys
Buka menu **Settings > API** untuk mengambil variabel yang diperlukan di file `.env`:
- **Project URL**: Masukkan ke `SUPABASE_URL` dan `VITE_SUPABASE_URL`.
- **anon public**: Masukkan ke `VITE_SUPABASE_ANON_KEY`.
- **service_role**: Masukkan ke `SUPABASE_SERVICE_ROLE_KEY`.

> [!CAUTION]
> Jangan pernah membagikan `service_role` key Anda kepada siapa pun atau memasukkannya ke dalam kode frontend (tanpa prefix `VITE_`).

### 6. Konfigurasi `.env`
```env
DATABASE_URL="postgresql://user:pass@host:6543/db?pgbouncer=true&connection_limit=10"
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 7. Jalankan Aplikasi
```bash
npm run dev
```

---

## Opsi B: Local PostgreSQL (Development / Self-hosted)

### 1. Install & Siapkan PostgreSQL
Pastikan PostgreSQL sudah terinstal di mesin Anda. Buat database baru:
```bash
createdb erd_builder_pro
```

### 2. Konfigurasi `.env`
Di file `.env`, atur `DATABASE_URL` dan **hapus atau komentari** variabel `SUPABASE_URL`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/erd_builder_pro"
# SUPABASE_URL=   ← tidak perlu untuk mode ini
# SUPABASE_SERVICE_ROLE_KEY=   ← tidak perlu
```
Aplikasi akan otomatis mendeteksi mode Local PostgreSQL selama `SUPABASE_URL` tidak diisi.

### 3. Push Schema
```bash
npm run db:push:pg:local
```
Perintah ini akan membuat semua tabel yang diperlukan (19 tabel) di database lokal Anda.

### 4. Seed Data
```bash
npm run db:seed:pg:local
```
Output:
```
Seeding database...
  ✓ Admin user: admin@local.dev
  ✓ AI Providers: OpenAI, Gemini, OpenAI Compatible
  ✓ Default system prompt: Simple & Direct

✅ Seed complete
```

**Default credentials**:
- Email: `admin@local.dev` (override dengan `ADMIN_EMAIL`)
- Password: `admin123` (override dengan `ADMIN_PASSWORD`)

### 5. Jalankan Aplikasi
```bash
npm run dev:pg:local
```
Aplikasi akan tersedia di `http://localhost:3000`.

> [!NOTE]
> Mode Local PostgreSQL menggunakan autentikasi lokal (email + password) dengan Prisma Session, bukan Supabase Auth. Semua akun lokal otomatis menjadi admin.
