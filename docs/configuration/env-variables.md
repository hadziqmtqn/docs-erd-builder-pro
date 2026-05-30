---
sidebar_position: 1
slug: /configuration/env-variables
---
# Environment Variables

Aplikasi ini menggunakan variabel lingkungan (environment variables) untuk mengelola konfigurasi keamanan, API, dan fitur opsional. Variabel ini harus dimasukkan ke dalam file `.env` di root folder proyek saat pengembangan lokal atau diatur sebagai *Secrets* di platform deployment (Vercel/VPS).

## Core (Wajib)
Variabel ini wajib diatur agar aplikasi dapat berjalan dan terhubung ke database.
- `SUPABASE_URL`: URL API proyek Supabase Anda.
- `SUPABASE_SERVICE_ROLE_KEY`: Kunci peran layanan (*service_role*) untuk operasi server-side. **Jangan pernah membocorkan kunci ini ke frontend.**
- `PORT`: Port untuk server backend (default: 3000).

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
Fitur opsional untuk mengirimkan masukan pengguna langsung ke repositori GitHub.

### GitHub
- `GITHUB_TOKEN`: Personal Access Token GitHub.
- `GITHUB_REPO_OWNER`: Username atau organisasi pemilik repo.
- `GITHUB_REPO_NAME`: Nama repositori target.

## Matriks Kebutuhan Platform

| Nama Variabel | Lokal / Dev | Vercel / VPS | Kegunaan |
| :--- | :---: | :---: | :--- |
| `SUPABASE_URL` | ✅ | ✅ | Koneksi DB |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | ✅ | Admin Auth |
| `R2_ACCOUNT_ID` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_ACCESS_KEY_ID` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_SECRET_ACCESS_KEY` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_BUCKET_NAME` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_PUBLIC_URL` | ⭐️ | ⭐️ | Cloudflare R2 |
| `VITE_SUPABASE_URL` | 💡 | 💡 | AI & Realtime |
| `VITE_SUPABASE_ANON_KEY` | 💡 | 💡 | AI & Realtime |
| `VITE_ENABLE_GUEST_MODE` | 💡 | 💡 | Guest Mode |
| `VITE_API_URL` | ❌ | 💡 | Custom Backend URL |

*Keterangan: ✅ Wajib | ⭐️ Recommended | 💡 Opsional | ❌ Tidak Diperlukan*

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
*Informasi lebih lanjut tentang cara mendapatkan kredensial Supabase dapat dilihat di [Setup Supabase](./supabase-setup).*
