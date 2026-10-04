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

## Profil Self-host: Personal Gratis dan Commercial Team

Bagian ini membedakan **plan Self-host**. Pilihan database seperti Local PostgreSQL atau Supabase adalah konfigurasi teknis yang terpisah; Cloud SaaS juga memakai konfigurasi Cloud tersendiri.

| Profil | Kegunaan | Environment lisensi |
| --- | --- | --- |
| **Self-host Personal (gratis)** | Satu Personal Workspace lokal; tidak menyediakan Team atau member Team | Tidak memerlukan environment client lisensi Team di bawah |
| **Self-host Commercial Team (berbayar)** | Personal Workspace pemilik aplikasi ditambah Team Workspace dan kuota member sesuai lisensi instance | Wajib mengatur endpoint API dan issuer lisensi; state lisensi dan identity instalasi harus persisten |

Kedua profil tetap memakai environment server bersama seperti `DATABASE_URL` dan `ERD_ENCRYPTION_KEY` di bagian berikut. Upgrade dari Personal ke Commercial Team dilakukan dengan mengaktifkan lisensi melalui **Application Settings**. Jangan menaruh license key di `.env`.

## Self-host Commercial Team License (Berbayar)

Variabel berikut hanya diperlukan jika instalasi memakai lisensi kapasitas Team. Salin endpoint resmi yang diberikan untuk lingkungan lisensi Anda; produksi harus memakai HTTPS.

- `ERDBPRO_LICENSE_API_URL`: **Wajib**. Origin API lisensi, misalnya `https://license.example.com` tanpa path endpoint. Aplikasi menambahkan path aktivasi dan pemeriksaan lisensi.
- `ERDBPRO_LICENSE_ISSUER`: **Wajib**. Nilai issuer persis yang dipakai pada signed entitlement dari control plane. Jangan menebak nilainya dari nama plan.
- `ERDBPRO_LICENSE_STATE_FILE`: Path lengkap opsional untuk file state lisensi, misalnya `/app/data/.erdbpro/license-state.json` di Docker. Pilih path absolut pada filesystem persisten yang dapat ditulis oleh proses server. File ini memuat client token dan bersifat rahasia.
- `ERDBPRO_INSTALLATION_IDENTITY_FILE`: Override path opsional untuk identity instalasi. Jika tidak diatur, `installation-identity.json` dibuat berdampingan dengan file state lisensi. File ini berisi private key lokal dan harus dipertahankan bersama file state.

Kunci verifikasi publik resmi sudah disertakan di server. Jangan mengatur public key atau key ID khusus di production. Untuk Personal Gratis, jangan isi variabel client lisensi Team hanya untuk menjalankan Personal Workspace.

Nilai path yang tepat berbeda untuk Docker, container terkelola, VPS, dan Vercel. Lihat [tabel path per jenis deployment](../getting-started/deployment#nilai-path-per-jenis-deployment). Saat memindahkan instalasi yang sudah ada, salin **kedua file state tersebut** ke storage persisten sebelum mengganti path atau membuat ulang server. Jangan membuat identity baru untuk menggantikan identity instalasi lama.

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
- `SUPABASE_ANON_KEY`: Kunci anon/public yang dipakai server untuk memvalidasi sesi Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: Kunci peran layanan (*service_role*) untuk operasi server-side. **Jangan pernah membocorkan kunci ini ke frontend.**

## MCP Web (Opsional — Web App)

Public MCP hanya berjalan pada Web App melalui HTTPS. Desktop dan CLI tetap menggunakan MCP lokal melalui `stdio`.

- `MCP_PUBLIC_URL`: URL HTTPS kanonis endpoint Streamable HTTP MCP, termasuk path, misalnya `https://app.example.com/api/mcp` atau `https://mcp.example.com/api/mcp`. Mengaktifkan public MCP saat variabel ini diisi.
- `MCP_AUTH_PROVIDER`: Provider OAuth MCP, yaitu `local` untuk Pure PostgreSQL atau `supabase` untuk Supabase Auth. Jika dikosongkan, server memilih `supabase` ketika `SUPABASE_URL` tersedia dan `local` jika tidak; sebaiknya isi eksplisit pada deployment.
- `MCP_CONSENT_URL`: URL halaman consent OAuth untuk provider `local`. Default-nya adalah origin dari `MCP_PUBLIC_URL` dengan path `/oauth/consent`.
- `MCP_AUTH_ISSUER_URL`: Override issuer OAuth hanya untuk provider `supabase`. Kosongkan untuk memakai `${SUPABASE_URL}/auth/v1`; isi hanya jika Supabase Auth menggunakan custom domain.

Untuk `MCP_AUTH_PROVIDER=local`, `DATABASE_URL` harus menunjuk ke Pure PostgreSQL dan `SUPABASE_URL` tidak boleh diatur. Untuk `MCP_AUTH_PROVIDER=supabase`, siapkan variabel Supabase Auth dan pastikan claim JWT `aud` sama persis dengan `MCP_PUBLIC_URL`. Lihat [konfigurasi MCP Web](./mcp#mcp-web-public-api).

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

Matriks ini merangkum kebutuhan environment aplikasi secara umum. Nilai path state lisensi Commercial Team bergantung pada platform dan dijelaskan terpisah pada [tabel path lisensi](../getting-started/deployment#nilai-path-per-jenis-deployment).

| Nama Variabel | Lokal / Dev | Vercel / VPS | Kegunaan |
| :--- | :---: | :---: | :--- |
| `DATABASE_URL` | ✅ | ✅ | Koneksi DB |
| `ERD_ENCRYPTION_KEY` | ✅¹ | ✅ | Enkripsi password DB dan API key AI |
| `ERD_ENCRYPTION_KEY_FILE` | 💡² | 💡² | File kunci Desktop/CLI |
| `SUPABASE_URL` | 💡¹ | 💡¹ | Auth Supabase |
| `SUPABASE_ANON_KEY` | 💡¹ | 💡¹ | Validasi sesi Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | 💡¹ | 💡¹ | Admin Auth |
| `MCP_PUBLIC_URL` | 💡 | 💡 | Public MCP Web + OAuth resource |
| `MCP_AUTH_PROVIDER` | 💡 | 💡 | Provider OAuth MCP: `local` atau `supabase` |
| `MCP_CONSENT_URL` | 💡 | 💡 | URL consent OAuth provider local |
| `MCP_AUTH_ISSUER_URL` | 💡 | 💡 | Custom issuer OAuth provider Supabase |
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

### 2. Deployment (Docker, VPS, atau Vercel)
- Masukkan variabel yang dibutuhkan pada dashboard penyedia atau konfigurasi service.
- Untuk Docker, kirim variabel melalui `.env` atau flag `-e` saat `docker run`; path lisensi harus mengarah ke persistent volume yang dipasang di container.
- Untuk VPS tanpa container, gunakan path absolut yang dapat ditulis oleh user service.
- Vercel tidak mendukung state file lisensi persisten yang diperlukan Self-host Commercial Team saat ini. Lihat [panduan deployment](../getting-started/deployment).
- Pastikan variabel `VITE_` dicentang untuk semua lingkungan (Production & Preview).

---
*Informasi lebih lanjut tentang setup database dapat dilihat di [Setup Database](./database-setup).*
