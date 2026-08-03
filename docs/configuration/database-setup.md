---
sidebar_position: 2
slug: /configuration/database-setup
---
# Setup Database

ERD Builder Pro mendukung **tiga mode database**. Pilih salah satu sesuai kebutuhan Anda.

| Aspek | Supabase PostgreSQL | Local PostgreSQL | Desktop (SQLite) |
|:---|:---|:---|:---|
| **Cocok untuk** | Production / Cloud | Development / Self-hosted | Aplikasi Desktop / Tauri |
| **Autentikasi** | Supabase Auth (JWT) | Lokal (email + password) | Lokal (email + password) |
| **ID Type** | `BigInt` | `Int` | `Int` |
| **Env vars tambahan** | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ERD_ENCRYPTION_KEY` | `ERD_ENCRYPTION_KEY` | — |
| **Setup schema** | SQL Editor di Dashboard Supabase | `npm run db:push:pg:local` | `npm run db:push:sqlite` |
| **Seed data** | — (via SQL Editor) | `npm run db:seed:pg:local` | `npm run db:seed:sqlite` |
| **Generate client** | `npm run db:generate:pg` | `npm run db:generate:pg:local` | `npm run db:generate:sqlite` |
| **Jalankan** | `npm run dev` | `npm run dev:pg:local` | `npm run dev:desktop` |

---

## Arsitektur Prisma 7 + Driver Adapter

Semua mode menggunakan **Prisma 7** dengan *driver-adapter pattern*. Prisma 7 tidak lagi mendukung `datasource.url` atau *legacy query engine* — setiap koneksi **harus** dibuat dengan adapter yang sesuai:

| Mode | Adapter | Package |
|:---|:---|:---|
| PostgreSQL | `PrismaPg` | `@prisma/adapter-pg` |
| SQLite | `PrismaBetterSqlite3` | `@prisma/adapter-better-sqlite3` |

Pemilihan adapter terjadi otomatis saat *runtime* berdasarkan `DATABASE_URL`:

- Jika `DATABASE_URL` diawali `file:` atau berakhiran `.db` → mode **SQLite**
- Jika `DATABASE_URL` diawali `postgresql://` dan **tanpa** `SUPABASE_URL` → mode **Local PostgreSQL**
- Jika `DATABASE_URL` diawali `postgresql://` **dengan** `SUPABASE_URL` → mode **Supabase**

Terdapat tiga *schema file* Prisma yang digunakan tergantung mode:

| File Prisma | Mode | ID Type | Auth |
|:---|:---|:---|:---|
| `schema.prisma` | Supabase | `BigInt` | Supabase Auth |
| `schema.pg.prisma` | Local PostgreSQL | `Int` | Lokal |
| `schema.sqlite.prisma` | Desktop SQLite | `Int` | Lokal |

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
5. Pastikan semua tabel (seperti `projects`, `diagrams`, dll) berhasil dibuat.

### 3. Generate Prisma Client
```bash
npm run db:generate:pg
```
Perintah ini menggenerate Prisma Client menggunakan schema `schema.prisma` (varian Supabase).

### 4. Konfigurasi Autentikasi (Privat)
Agar aplikasi Anda tetap privat dan tidak bisa digunakan oleh orang lain:
1. Buka menu **Authentication > Settings**.
2. Di bagian **Sign Up**, matikan (uncheck) opsi **Allow new users to sign up**.
3. Simpan perubahan. *Sekarang orang asing tidak bisa mendaftar secara mandiri.*

### 5. Mendaftarkan Akun Anda
Setelah registrasi publik dimatikan, Anda harus membuat akun Anda sendiri secara manual:
1. Buka menu **Authentication > Users**.
2. Klik tombol **Add User** dan pilih **Create new user**.
3. Masukkan **Email** dan **Password** yang ingin Anda gunakan.
4. (Opsional) Matikan opsi "Auto-confirm user" jika Anda ingin memverifikasi email, atau biarkan menyala untuk login instan.
5. Klik **Create User**. Gunakan akun ini untuk login ke aplikasi ERD Builder Pro Anda.

### 6. Mengambil API Keys
Buka menu **Settings > API** untuk mengambil variabel yang diperlukan di file `.env`:
- **Project URL**: Masukkan ke `SUPABASE_URL` dan `VITE_SUPABASE_URL`.
- **anon public**: Masukkan ke `VITE_SUPABASE_ANON_KEY`.
- **service_role**: Masukkan ke `SUPABASE_SERVICE_ROLE_KEY`.

> [!CAUTION]
> Jangan pernah membagikan `service_role` key Anda kepada siapa pun atau memasukkannya ke dalam kode frontend (tanpa prefix `VITE_`).

### 7. Konfigurasi `.env`
```env
DATABASE_URL="postgresql://user:pass@host:6543/db?pgbouncer=true&connection_limit=10"
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 8. Jalankan Aplikasi
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

### 3. Generate Prisma Client
```bash
npm run db:generate:pg:local
```
Perintah ini menggunakan schema `schema.pg.prisma` (varian Local PostgreSQL). Jangan gunakan `npm run db:generate:pg`, karena perintah tersebut memilih schema Supabase.

### 4. Push Schema
```bash
npm run db:push:pg:local
```
Perintah ini akan membuat semua tabel yang diperlukan di database lokal Anda.

> Prisma 7 menggunakan `db push` untuk menyinkronkan schema tanpa file migrasi. Gunakan `db:migrate:pg:local` jika Anda membutuhkan riwayat migrasi.

### 5. Seed Data
```bash
npm run db:seed:pg:local
```
Output:
```
Seeding database...
  - Self-host admin user skipped; use the one-time setup screen
  ✓ AI Providers: OpenAI, Gemini, OpenAI Compatible
  ✓ OpenAI models: GPT-4o, GPT-4o Mini, GPT-4 Turbo
  ✓ Gemini models: Gemini 1.5 Pro, Gemini 1.5 Flash
  ✓ OpenAI Compatible models: DeepSeek V4 Flash
  ✓ Default system prompt: Simple & Direct

✅ Seed complete
```

Seed Local PostgreSQL tidak membuat kredensial default. Setelah database kosong, buka aplikasi dan gunakan halaman **Create administrator account** untuk membuat super admin pertama.

> Jangan gunakan `admin@local.dev` / `admin123` pada self-host. Kombinasi tersebut adalah kredensial bootstrap Desktop/CLI dan ditolak oleh login self-host.

> Seed script menggunakan Prisma 7 adapter pattern yang sama. Pastikan `DATABASE_URL` di `.env` mengarah ke database lokal Anda dan `ERD_ENCRYPTION_KEY` sudah diatur.

### 6. Jalankan Aplikasi
```bash
npm run dev:pg:local
```
Aplikasi akan tersedia di `http://localhost:3000`.

> Mode Local PostgreSQL menggunakan autentikasi lokal (email + password) dengan Prisma Session, bukan Supabase Auth. Super admin dibuat melalui setup awal.

---

## Opsi C: Desktop / Tauri (SQLite)

Mode ini menggunakan SQLite sebagai database lokal untuk aplikasi desktop berbasis Tauri.

### 1. Generate Prisma Client untuk SQLite
```bash
npm run db:generate:sqlite
```
Menggunakan schema `schema.sqlite.prisma` dengan adapter `@prisma/adapter-better-sqlite3`.

### 2. Push Schema ke SQLite
```bash
npm run db:push:sqlite
```
Perintah ini membuat file `data.db` dan membuat 19 tabel:
```
ai_chat_messages, ai_chat_sessions, ai_models, ai_providers, ai_system_prompts,
backups, columns, diagrams, drawings, entities, entity_changes, flowcharts,
notes, projects, relationships, sessions, user_ai_configs, user_ai_rules, users
```

### 3. Seed Data
```bash
npm run db:seed:sqlite
```
Output:
```
Seeding SQLite database...
  ✓ Admin user: admin@local.dev
  ✓ AI Providers: OpenAI, Gemini, OpenAI Compatible
  ✓ OpenAI models: GPT-4o, GPT-4o Mini, GPT-4 Turbo
  ✓ Gemini models: Gemini 1.5 Pro, Gemini 1.5 Flash
  ✓ OpenAI Compatible models: DeepSeek V4 Flash
  ✓ Default system prompt: Simple & Direct

✅ Seed complete
```

Seed Desktop/SQLite mempertahankan akun bootstrap internal `admin@local.dev` untuk kompatibilitas data lokal. Aplikasi Desktop/CLI menggunakan auto-login; kredensial bootstrap ini bukan kredensial untuk self-host dan tidak boleh dipakai dalam deployment bersama.

### 4. Verifikasi
```bash
sqlite3 data.db ".tables"
# 19 tables listed

sqlite3 data.db "SELECT email FROM users;"
# admin@local.dev
```

### 5. Jalankan Aplikasi
```bash
# Mode API + Vite (tanpa shell Tauri)
npm run dev:desktop

# Mode Tauri penuh (perlu Rust toolchain)
npm run dev:tauri:servers   # API :3099 + Vite :3098
npm run dev:tauri           # membuka jendela Tauri
```

> `dev:desktop` menggunakan `DATABASE_URL=file:./data.db` dan me-*override* nilai di `.env`, sehingga kedua mode (Supabase PG di `.env` dan SQLite di script) bisa berjalan berdampingan.

### 6. Login Bootstrap
Desktop/CLI melakukan auto-login melalui server lokal tanpa halaman login. File kunci enkripsi lokal dibuat di dekat database bila `ERD_ENCRYPTION_KEY` dan `ERD_ENCRYPTION_KEY_FILE` tidak diatur.

---

## Referensi Cepat Script

| Command | Tujuan | Schema | `DATABASE_URL` |
|:---|:---|:---|:---|
| `npm run db:generate:sqlite` | Generate Prisma Client | `schema.sqlite.prisma` | — |
| `npm run db:push:sqlite` | Buat tabel SQLite | `schema.sqlite.prisma` | `file:./data.db` |
| `npm run db:seed:sqlite` | Seed data SQLite | (via `seed.sqlite.ts`) | `file:./data.db` |
| `npm run db:generate:pg` | Generate Prisma Client Supabase | `schema.prisma` | — |
| `npm run db:generate:pg:local` | Generate Prisma Client Local PG | `schema.pg.prisma` | — |
| `npm run db:push:pg:local` | Buat tabel Local PG | `schema.pg.prisma` | (dari `.env`) |
| `npm run db:seed:pg:local` | Seed Local PG | (via `seed.sqlite.ts`) | (dari `.env`) |
| `npm run dev` | Jalankan mode Supabase | `schema.prisma` | (dari `.env`) |
| `npm run dev:pg:local` | Jalankan mode Local PG | `schema.pg.prisma` | (dari `.env`) |
| `npm run dev:desktop` | Jalankan mode Desktop | `schema.sqlite.prisma` | `file:./data.db` |

---

## Perbedaan Lintas Mode

| Aspek | Supabase | Local PostgreSQL / Desktop |
|:---|:---|:---|
| **Tipe ID** | `BigInt` (via `toProjectId()`) | `Number` / `Int` |
| **Status Admin** | Dikelola via Supabase Auth | Super admin dibuat melalui setup awal |
| **Auth** | Supabase Auth (JWT) | Prisma Session (lokal) |
| **Kolom `uid`** | `@default(uuid())` di Prisma | Harus diisi manual via `randomUUID()` (SQLite) |

---

## Masalah Umum

### `PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions`
Prisma 7 membutuhkan opsi `adapter` — `new PrismaClient()` tanpa argumen akan gagal. Pastikan aplikasi menggunakan *driver adapter* yang sesuai.

### Schema mismatch saat seed
Script seed bisa gagal jika `DATABASE_URL` mengarah ke database yang salah. Pastikan:
- **SQLite**: `DATABASE_URL=file:./data.db`
- **Local PG**: `DATABASE_URL` di `.env` mengarah ke database lokal

### File `prisma/data.db` stale
File `prisma/data.db` kadang terbentuk secara tidak sengaja. Untuk mode desktop, gunakan `./data.db` (root proyek) dan hapus `prisma/data.db`.
