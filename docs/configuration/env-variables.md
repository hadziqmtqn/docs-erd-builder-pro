---
sidebar_position: 1
slug: /configuration/env-variables
---
# Environment Variables

Aplikasi ini menggunakan variabel lingkungan (environment variables) untuk mengelola konfigurasi database, autentikasi, API, dan fitur opsional. Variabel ini harus dimasukkan ke dalam file `.env` di root folder proyek saat pengembangan lokal atau diatur sebagai *Secrets* di platform deployment (Vercel/VPS).

ERD Builder Pro mendukung **dua mode database PostgreSQL**:

- **Supabase (Production/Cloud)**: PostgreSQL via Supabase pooler, autentikasi Supabase Auth (JWT), ID tipe `BigInt`.
- **Local PostgreSQL (Development/Self-hosted)**: PostgreSQL langsung di mesin lokal/server, autentikasi lokal (email + password), ID tipe `Int`.

Panduan lengkap untuk masing-masing mode ada di [Setup Database](./supabase-setup).

## Core (Wajib)
Variabel ini wajib diatur agar aplikasi dapat berfungsi.
- `DATABASE_URL`: Connection string PostgreSQL.
  - **Supabase**: Gunakan string pooler (port `6543`, dengan `pgbouncer=true&connection_limit=10`).
  - **Local PostgreSQL**: Gunakan `postgresql://user:password@localhost:5432/nama_database`.
- `PORT`: Port untuk server backend (default: 3000).

## Autentikasi (Opsional — Tergantung Mode)
Variabel berikut **hanya untuk mode Supabase**. Jika menggunakan Local PostgreSQL, variabel ini tidak diperlukan.

- `SUPABASE_URL`: URL API proyek Supabase Anda.
- `SUPABASE_SERVICE_ROLE_KEY`: Kunci peran layanan (*service_role*) untuk operasi server-side. **Jangan pernah membocorkan kunci ini ke frontend.**

## AI & Realtime Sync (Opsional)
Variabel dengan prefix `VITE_` ini diperlukan agar fitur AI Context, @mentions, dan sinkronisasi real-time di frontend dapat bekerja.
- `VITE_SUPABASE_URL`: Sama dengan `SUPABASE_URL`, diperlukan oleh client Supabase di browser.
- `VITE_SUPABASE_ANON_KEY`: Kunci anonim (*anon/public*) untuk akses publik Supabase.
- `VITE_ENABLE_GUEST_MODE`: Set ke `true` untuk mengizinkan penggunaan fitur dasar tanpa login (default: `true`).

## Storage - Cloudflare R2 (Recommended)
Disarankan untuk menyimpan aset (gambar/file) secara permanen di Cloudflare R2.
- `R2_ACCOUNT_ID`: ID akun Cloudflare Anda.
- `R2_ACCESS_KEY_ID`: Access Key dari API Token R2.
- `R2_SECRET_ACCESS_KEY`: Secret Key dari API Token R2.
- `R2_BUCKET_NAME`: Nama bucket yang digunakan.
- `R2_PUBLIC_URL`: URL publik atau domain kustom (CDN) untuk mengakses file.

## Feedback Integration (Opsional)
Fitur opsional untuk mengirimkan *feedback* pengguna ke pengembang melalui **Telegram bot**.

### GitHub
- `GITHUB_TOKEN`: Personal Access Token GitHub.
- `GITHUB_REPO_OWNER`: Username atau organisasi pemilik repo.
- `GITHUB_REPO_NAME`: Nama repositori target.

## Matriks Kebutuhan Platform

| Nama Variabel | Lokal / Dev | Vercel / VPS | Kegunaan |
| :--- | :---: | :---: | :--- |
| `DATABASE_URL` | ✅ | ✅ | Koneksi DB |
| `SUPABASE_URL` | 💡¹ | 💡¹ | Auth Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | 💡¹ | 💡¹ | Admin Auth |
| `R2_ACCOUNT_ID` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_ACCESS_KEY_ID` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_SECRET_ACCESS_KEY` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_BUCKET_NAME` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_PUBLIC_URL` | ⭐️ | ⭐️ | Cloudflare R2 |
| `VITE_SUPABASE_URL` | 💡² | 💡² | AI & Realtime |
| `VITE_SUPABASE_ANON_KEY` | 💡² | 💡² | AI & Realtime |
| `VITE_ENABLE_GUEST_MODE` | 💡 | 💡 | Guest Mode |
| `VITE_API_URL` | ❌ | 💡 | Custom Backend URL |

*Keterangan: ✅ Wajib | ⭐️ Recommended | 💡 Opsional | ❌ Tidak Diperlukan*
*¹ Hanya untuk mode Supabase | ² Hanya jika Supabase digunakan sebagai backend auth*

## Panduan Pemasangan

### 1. Lokal (`.env`)
Salin file `.env.example` menjadi `.env` di root folder proyek:
```bash
cp .env.example .env
```
Isi nilai variabel sesuai dengan dashboard penyedia layanan masing-masing.

### 2. Deployment (Vercel / VPS)
- Masukkan variabel di atas pada dashboard **Project Settings > Environment Variables**.
- Pastikan variabel `VITE_` dicentang untuk semua lingkungan (Production & Preview).
- Jika menggunakan Docker, masukkan variabel melalui file `.env` atau flag `-e` saat `docker run`.

---
*Informasi lebih lanjut tentang setup database dapat dilihat di [Setup Database](./supabase-setup).*
