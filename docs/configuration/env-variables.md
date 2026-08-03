---
sidebar_position: 1
slug: /configuration/env-variables
---
# Environment Variables

Aplikasi ini menggunakan variabel lingkungan (environment variables) untuk mengelola konfigurasi database, autentikasi, API, dan fitur opsional. Variabel ini harus dimasukkan ke dalam file `.env` di root folder proyek saat pengembangan lokal atau diatur sebagai *Secrets* di platform deployment (Vercel/VPS).

ERD Builder Pro mendukung **dua mode database PostgreSQL**:

- **Supabase (Production/Cloud)**: PostgreSQL via Supabase pooler, autentikasi Supabase Auth (JWT), ID tipe `BigInt`.
- **Local PostgreSQL (Development/Self-hosted)**: PostgreSQL langsung di mesin lokal/server, autentikasi lokal (email + password), ID tipe `Int`.

Panduan lengkap untuk masing-masing mode ada di [Setup Database](./database-setup).

## Core (Wajib)
Variabel ini wajib diatur agar aplikasi dapat berfungsi.
- `DATABASE_URL`: Connection string PostgreSQL.
  - **Supabase**: Gunakan string pooler (port `6543`, dengan `pgbouncer=true&connection_limit=10`).
  - **Local PostgreSQL**: Gunakan `postgresql://user:password@localhost:5432/nama_database`.
- `PORT`: Port untuk server backend (default: 3000).

## Enkripsi Rahasia (Wajib untuk Web/Self-host)
Password koneksi database dan API key AI disimpan dalam bentuk terenkripsi di server.

- `ERD_ENCRYPTION_KEY`: Kunci rahasia untuk web, Docker, dan deployment server. Gunakan nilai acak minimal 32 karakter dan gunakan nilai yang sama pada seluruh instance yang membaca database yang sama.
- `ERD_ENCRYPTION_KEY_FILE`: Path file kunci untuk Desktop/CLI jika `ERD_ENCRYPTION_KEY` tidak diatur. Desktop/CLI akan membuat file kunci lokal di dekat database bila keduanya tidak diatur.

> [!CAUTION]
> Jangan commit atau membagikan `ERD_ENCRYPTION_KEY`, file kunci, atau `.env`. Jika kunci hilang atau berubah, password DB Connect dan API key AI yang tersimpan tidak dapat didekripsi.

## Autentikasi (Opsional — Tergantung Mode)
Variabel berikut **hanya untuk mode Supabase**. Jika menggunakan Local PostgreSQL, variabel ini tidak diperlukan.

- `SUPABASE_URL`: URL API proyek Supabase Anda.
- `SUPABASE_SERVICE_ROLE_KEY`: Kunci peran layanan (*service_role*) untuk operasi server-side. **Jangan pernah membocorkan kunci ini ke frontend.**

## AI, Guest Mode, dan Realtime Sync (Opsional)
Konfigurasi API key AI dilakukan melalui **Settings > AI Configuration** dan disimpan terenkripsi di database. Tidak ada `AI_API_KEY`, `AI_BASE_URL`, atau `AI_MODEL` yang dibaca dari `.env`.

- `VITE_SUPABASE_URL`: Sama dengan `SUPABASE_URL`, diperlukan oleh client Supabase di browser.
- `VITE_SUPABASE_ANON_KEY`: Kunci anonim (*anon/public*) untuk akses publik Supabase.
- `VITE_ENABLE_GUEST_MODE`: Set ke `true` untuk mengizinkan mode Guest (default: `false`).
- `GUEST_AI_ENABLED`: Set ke `true` untuk mengizinkan Guest memakai AI melalui API key server (default: `false`). Guest dapat menghabiskan kuota API Anda.
- `AI_ALLOW_PRIVATE_BASE_URL`: Set ke `true` hanya jika sengaja mengizinkan endpoint AI privat seperti Ollama. Biarkan `false` untuk perlindungan SSRF.

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
| `ERD_ENCRYPTION_KEY` | ✅¹ | ✅ | Enkripsi password DB dan API key AI |
| `ERD_ENCRYPTION_KEY_FILE` | 💡² | 💡² | File kunci Desktop/CLI |
| `SUPABASE_URL` | 💡¹ | 💡¹ | Auth Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | 💡¹ | 💡¹ | Admin Auth |
| `R2_ACCOUNT_ID` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_ACCESS_KEY_ID` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_SECRET_ACCESS_KEY` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_BUCKET_NAME` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_PUBLIC_URL` | ⭐️ | ⭐️ | Cloudflare R2 |
| `VITE_SUPABASE_URL` | 💡² | 💡² | AI & Realtime |
| `VITE_SUPABASE_ANON_KEY` | 💡² | 💡² | AI & Realtime |
| `VITE_ENABLE_GUEST_MODE` | 💡 | 💡 | Guest Mode (default nonaktif) |
| `GUEST_AI_ENABLED` | 💡 | 💡 | AI untuk Guest (default nonaktif) |
| `AI_ALLOW_PRIVATE_BASE_URL` | 💡 | 💡 | Endpoint AI privat (default nonaktif) |
| `VITE_API_URL` | ❌ | 💡 | Custom Backend URL |

*Keterangan: ✅ Wajib | ⭐️ Recommended | 💡 Opsional | ❌ Tidak Diperlukan*
*¹ Wajib untuk web/Docker/self-host; Desktop/CLI dapat membuat kunci lokal | ² Alternatif file kunci Desktop/CLI*

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
*Informasi lebih lanjut tentang setup database dapat dilihat di [Setup Database](./database-setup).*
