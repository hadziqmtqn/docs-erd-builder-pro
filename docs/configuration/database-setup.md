---
sidebar_position: 2
slug: /configuration/database-setup
---
# Setup Database

ERD Builder Pro mendukung tiga mode database. Untuk Self-host baru, gunakan **PostgreSQL murni**.

| Aspek | PostgreSQL murni | Supabase (legacy) | SQLite |
|:---|:---|:---|:---|
| **Dipakai oleh** | Self-host dan Cloud | Deployment lama yang sudah memakai Supabase | Desktop dan CLI |
| **Autentikasi** | Akun lokal (email + password); Cloud memakai SSO | Supabase Auth | Login otomatis satu pengguna |
| **Team Workspace** | Ya (Self-host dengan lisensi Commercial) | Tidak | Tidak |
| **Notifikasi** | Ya | Tidak | Tidak |
| **Env tambahan** | `ERD_ENCRYPTION_KEY` | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ERD_ENCRYPTION_KEY` | Tidak ada |
| **Membuat tabel** | `npm run db:push:pg:local` | `sql/supabase/schema.sql` di SQL Editor | Otomatis |
| **Generate client** | `npm run db:generate:pg:local` | `npm run db:generate:supabase` | `npm run db:generate:sqlite` |
| **Menjalankan dari source** | `npm run dev:pg:local` | `npm run dev` | `npm run dev:desktop` |

---

## Arsitektur Prisma 7 + Driver Adapter

Semua mode menggunakan **Prisma 7** dengan *driver-adapter pattern*. Setiap koneksi dibuat dengan adapter yang sesuai:

| Mode | Adapter | Package |
|:---|:---|:---|
| PostgreSQL | `PrismaPg` | `@prisma/adapter-pg` |
| SQLite | `PrismaBetterSqlite3` | `@prisma/adapter-better-sqlite3` |

Server memilih mode saat *runtime*:

- `DATABASE_URL` kosong, diawali `file:`, atau berakhiran `.db` → **SQLite**.
- `DATABASE_URL` diawali `postgresql://` tanpa `SUPABASE_URL` dan `VITE_SUPABASE_URL` → **PostgreSQL murni**.
- URL database lain, atau `SUPABASE_URL`/`VITE_SUPABASE_URL` diisi → **Supabase**.

Ada tiga file skema Prisma:

| File Prisma | Mode | Jumlah tabel |
|:---|:---|:---|
| `prisma/schema.pg.prisma` | PostgreSQL murni | 44 |
| `prisma/schema.prisma` | Supabase | 30 tabel aplikasi + tabel `auth` Supabase |
| `prisma/schema.sqlite.prisma` | SQLite | 47 |

Variabel `DB_VARIANT` (`pg`, `supabase`, atau `sqlite`) hanya memilih file skema dan folder migrasi untuk perintah Prisma CLI. Server tetap memilih mode dari `DATABASE_URL`. Struktur tabel lengkap ada di [Database Schema](../database-schema.mdx).

---

## Opsi A: PostgreSQL Murni (Disarankan)

### 1. Siapkan Database
```bash
createdb erd_builder_pro
```

### 2. Konfigurasi `.env`
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/erd_builder_pro"
ERD_ENCRYPTION_KEY="hasil-dari-openssl-rand-hex-32"
```
Biarkan semua variabel `SUPABASE_*` dan `VITE_SUPABASE_*` kosong.

### 3. Buat Tabel dan Jalankan
```bash
npm run dev:pg:local
```
Perintah ini menjalankan `db:push:pg:local` (membuat atau menyelaraskan tabel), `db:generate:pg:local`, lalu server pengembangan di `http://localhost:3000`.

Provider dan model AI bawaan dibuat otomatis saat server mulai. `npm run db:seed:pg:local` tetap tersedia, tetapi tidak membuat akun apa pun.

Gunakan `npm run db:migrate:pg:local` (`prisma migrate dev`) bila Anda membutuhkan riwayat migrasi.

### 4. Buat Akun Administrator
Buka aplikasi. Pada database kosong muncul halaman **Create administrator account** untuk membuat SuperAdmin pertama.

:::caution
Jangan gunakan `admin@local.dev` / `admin123` pada Self-host. Kombinasi tersebut hanya kredensial internal Desktop/CLI dan ditolak oleh login Self-host.
:::

Di Docker, entrypoint image sudah membuat database dan tabel secara otomatis. Lihat [Deployment](../getting-started/deployment.md#yang-dilakukan-container-saat-start).

---

## Opsi B: Supabase (Legacy) {/* #opsi-b-supabase-legacy */}

Mode ini hanya untuk deployment yang sudah memakai Supabase sebelumnya. Mode Supabase tidak mendukung Team Workspace dan notifikasi. Instalasi baru sebaiknya memakai PostgreSQL murni.

### Skema
- Tabel dasar: jalankan isi `sql/supabase/schema.sql` di **SQL Editor** Supabase.
- Tabel yang ditambahkan setelahnya, seperti komentar dan diskusi, ada di folder `prisma/migrations` (varian Supabase).

### Prisma Client
```bash
npm run db:generate:supabase
```
`npm install` juga menjalankan perintah ini secara otomatis.

### Konfigurasi `.env`
```env
DATABASE_URL="postgresql://user:pass@host:6543/db?pgbouncer=true&connection_limit=10"
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ERD_ENCRYPTION_KEY="hasil-dari-openssl-rand-hex-32"
```

Bila `pgbouncer=true` dan `connection_limit` tidak ada di URL, server menambahkannya.

### Akun Pengguna
Supabase Auth mengelola akun. Agar aplikasi tidak bisa dipakai orang lain, matikan **Allow new users to sign up** di **Authentication → Settings**, lalu buat akun lewat **Authentication → Users → Add User**.

### Menjalankan
```bash
npm run dev
```

---

## Opsi C: SQLite (Desktop dan CLI)

Aplikasi Desktop dan CLI membuat serta memperbarui database SQLite secara otomatis. Anda tidak perlu menjalankan perintah apa pun. Database SQLite memiliki 47 tabel: tabel PostgreSQL tanpa tabel OAuth MCP Web, ditambah tabel DB Client (`db_accounts`, `db_catalogs`, `db_clients`, `db_client_layouts`, `db_client_queries`, `sql_queries`).

### Menjalankan Mode Desktop dari Source
```bash
# Buat ./data.db
npm run db:push:sqlite

# API di port 3100 + Vite di port 3098
npm run dev:tauri:servers

# Jendela Tauri (perlu Rust toolchain)
npm run dev:tauri
```

- `npm run dev:desktop` menjalankan API saja di port `3100` dengan `DATABASE_URL=file:./data.db`, mengabaikan nilai di `.env`.
- `npm run dev:desktop:client` menjalankan Vite di port `3098`.
- Aplikasi Desktop hasil build memakai port `3099`.

`npm run db:seed:sqlite` membuat akun internal `admin@local.dev` untuk login otomatis Desktop/CLI. Akun ini bukan kredensial untuk Self-host.

---

## Referensi Cepat Script

| Command | Tujuan | Skema |
|:---|:---|:---|
| `npm run db:generate:pg:local` | Generate Prisma Client PostgreSQL | `schema.pg.prisma` |
| `npm run db:push:pg:local` | Membuat/menyelaraskan tabel PostgreSQL | `schema.pg.prisma` |
| `npm run db:migrate:pg:local` | Membuat migrasi PostgreSQL | `schema.pg.prisma` |
| `npm run db:seed:pg:local` | Seed data PostgreSQL | `schema.pg.prisma` |
| `npm run db:generate:supabase` | Generate Prisma Client Supabase | `schema.prisma` |
| `npm run db:generate:sqlite` | Generate Prisma Client SQLite | `schema.sqlite.prisma` |
| `npm run db:push:sqlite` | Membuat `./data.db` | `schema.sqlite.prisma` |
| `npm run db:seed:sqlite` | Seed SQLite | `schema.sqlite.prisma` |
| `npm run dev:pg:local` | Push skema + jalankan PostgreSQL murni | `schema.pg.prisma` |
| `npm run dev` | Jalankan server tanpa push skema | dari `DATABASE_URL` |
| `npm run dev:desktop` | Jalankan API mode Desktop (port 3100) | `schema.sqlite.prisma` |

---

## Masalah Umum

### Menu Team tidak muncul atau `Teams are available only on a self-hosted server.`
Server tidak berjalan dalam mode PostgreSQL murni. Pastikan `DATABASE_URL` diawali `postgresql://` dan tidak ada `SUPABASE_URL` maupun `VITE_SUPABASE_URL`. Team juga memerlukan lisensi Self-host Commercial yang aktif.

### `PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions`
Prisma 7 membutuhkan opsi `adapter`; `new PrismaClient()` tanpa argumen akan gagal. Pastikan aplikasi menggunakan *driver adapter* yang sesuai.

### Seed atau push gagal karena database salah
Pastikan `DATABASE_URL` mengarah ke database yang benar:
- **SQLite**: `DATABASE_URL=file:./data.db`
- **PostgreSQL**: `DATABASE_URL` di `.env` mengarah ke database lokal

### File `prisma/data.db` stale
File `prisma/data.db` kadang terbentuk secara tidak sengaja. Untuk mode Desktop dari source, gunakan `./data.db` di root proyek dan hapus `prisma/data.db`.
