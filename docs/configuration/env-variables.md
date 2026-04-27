---
sidebar_position: 1
slug: /configuration/env-variables
---
# Environment Variables

Aplikasi ini membutuhkan beberapa variabel lingkungan (environment variables) agar semua fitur berjalan dengan lancar. Variabel ini harus dimasukkan ke dalam file `.env` di lokal atau diatur sebagai *Secrets* di platform deployment (Vercel/GitHub).

## Frontend
Variabel ini digunakan oleh sisi client (browser) dan wajib menggunakan prefix `VITE_`.
- `VITE_SUPABASE_URL`: URL API proyek Supabase Anda.
- `VITE_SUPABASE_ANON_KEY`: Kunci anonim untuk akses frontend.
- `VITE_ENABLE_GUEST_MODE`: (Opsional) Set ke `true` untuk mengizinkan penggunaan tanpa login.

## Supabase
Variabel ini hanya digunakan oleh sisi server (Express/Vercel Functions).
- `SUPABASE_URL`: URL API proyek Supabase Anda.
- `SUPABASE_SERVICE_ROLE_KEY`: Kunci peran layanan untuk operasi administratif.
- `PORT`: (Opsional) Port untuk server backend (default: 3000).

## Storage (Cloudflare R2)
- `R2_ACCOUNT_ID`: ID akun Cloudflare Anda.
- `R2_ACCESS_KEY_ID`: Access Key dari API Token R2.
- `R2_SECRET_ACCESS_KEY`: Secret Key dari API Token R2.
- `R2_BUCKET_NAME`: Nama bucket yang digunakan.
- `R2_PUBLIC_URL`: URL publik atau domain kustom untuk mengakses file (CDN).

## Matriks Kebutuhan Platform

Berikut adalah daftar variabel yang wajib diisi berdasarkan tempat Anda menjalankan aplikasi:

| Nama Variabel | Lokal / VPS | Vercel | GitHub Actions |
| :--- | :---: | :---: | :---: |
| `VITE_SUPABASE_URL` | ✅ | ❌ | ❌ |
| `VITE_SUPABASE_ANON_KEY` | ✅ | ❌ | ❌ |
| `SUPABASE_URL` | ✅ | ✅ | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | ✅ | ✅ |
| `SUPABASE_DB_URL` | ✅ | ❌ | ✅ |
| `R2_ACCOUNT_ID` | ✅ | ✅ | ✅ |
| `R2_ACCESS_KEY_ID` | ✅ | ✅ | ✅ |
| `R2_SECRET_ACCESS_KEY` | ✅ | ✅ | ✅ |
| `R2_BUCKET_NAME` | ✅ | ✅ | ✅ |
| `R2_PUBLIC_URL` | ✅ | ✅ | ❌ |

## Panduan Pemasangan (Setup)

Setelah Anda memiliki nilai untuk variabel di atas, Anda harus memasukkannya ke platform tempat aplikasi Anda berjalan.

### 1. Lokal (`.env`)
Salin file `.env.example` menjadi `.env` di root folder proyek Anda, lalu isi variabelnya.

### 2. Vercel (Frontend & API)
- Buka dashboard **Vercel > Project Settings > Environment Variables**.
- Masukkan semua variabel dari daftar **Frontend** dan **Backend** di atas.
- Pastikan mencentang lingkungan *Production*, *Preview*, dan *Development*.

### 3. GitHub Actions (Backup Otomatis)
Jika Anda menggunakan fitur backup otomatis, masukkan variabel dari daftar **Backup** di atas ke:
- **GitHub Repo > Settings > Secrets and variables > Actions**.
- Klik **New repository secret** untuk setiap variabel.

---
*Detail mengenai cara mendapatkan nilai variabel Supabase secara spesifik dapat dilihat pada halaman [Setup Supabase](./supabase-setup).*
