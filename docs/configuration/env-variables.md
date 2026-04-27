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

> Catatan: `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` dipakai oleh client-side Supabase di browser. Jika aplikasi Anda dibangun di Vercel/VPS dan frontend-nya dijalankan sebagai web app, kedua variabel tersebut tetap harus diatur di environment deployment.
> 
> `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` adalah kredensial server-side untuk backend dan backup, bukan pengganti `VITE_` frontend.

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

## GitHub (Backup Manual/Otomatis)
- `GITHUB_TOKEN`: Personal Access Token GitHub untuk memicu workflow backup.
- `GITHUB_REPO_OWNER`: Nama pemilik repositori GitHub.
- `GITHUB_REPO_NAME`: Nama repositori GitHub.

## Matriks Kebutuhan Platform

Berikut adalah daftar variabel yang wajib diisi berdasarkan tempat Anda menjalankan aplikasi:

| Nama Variabel | Lokal / Dev | Vercel / VPS | GitHub Actions |
| :--- | :---: | :---: | :---: |
| `VITE_SUPABASE_URL` | ✅ | ✅ | ❌ |
| `VITE_SUPABASE_ANON_KEY` | ✅ | ✅ | ❌ |
| `SUPABASE_URL` | ✅ | ✅ | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | ✅ | ✅ |
| `SUPABASE_DB_URL` | ✅ | ❌ | ✅ |
| `R2_ACCOUNT_ID` | ✅ | ✅ | ✅ |
| `R2_ACCESS_KEY_ID` | ✅ | ✅ | ✅ |
| `R2_SECRET_ACCESS_KEY` | ✅ | ✅ | ✅ |
| `R2_BUCKET_NAME` | ✅ | ✅ | ✅ |
| `R2_PUBLIC_URL` | ✅ | ✅ | ❌ |
| `GITHUB_TOKEN` | ✅ | ✅ | ❌ |
| `GITHUB_REPO_OWNER` | ✅ | ✅ | ❌ |
| `GITHUB_REPO_NAME` | ✅ | ✅ | ❌ |

## Panduan Pemasangan (Setup)

Setelah Anda memiliki nilai untuk variabel di atas, Anda harus memasukkannya ke platform tempat aplikasi Anda berjalan.

### 1. Lokal (`.env`)
Salin file `.env.example` menjadi `.env` di root folder proyek Anda, lalu isi variabelnya.

### 2. Deployment (Vercel / VPS)
- Buka dashboard **Vercel > Project Settings > Environment Variables** atau konfigurasi environment pada server VPS Anda.
- Masukkan semua variabel dari daftar **Frontend**, **Supabase**, **Storage**, dan **GitHub** di atas.
- Karena frontend dan backend dideploy dari satu repo, `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` tetap diperlukan di deployment.
- Pastikan mencentang lingkungan *Production*, *Preview*, dan *Development* jika menggunakan Vercel.

### 3. GitHub Actions (Backup Otomatis)
Jika Anda menggunakan fitur backup otomatis, masukkan variabel dari daftar **Backup** di atas ke:
- **GitHub Repo > Settings > Secrets and variables > Actions**.
- Klik **New repository secret** untuk setiap variabel.

---
*Detail mengenai cara mendapatkan nilai variabel Supabase secara spesifik dapat dilihat pada halaman [Setup Supabase](./supabase-setup).*
