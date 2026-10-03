---
sidebar_position: 4
slug: /getting-started/deployment
---

# Deployment

ERD Builder Pro dirancang agar fleksibel untuk dideploy di berbagai platform, baik sebagai layanan serverless maupun menggunakan container.

## Memilih Plan Self-host

Self-host Personal Gratis hanya menyediakan Personal Workspace. Self-host Commercial Team memakai lisensi instance untuk menambahkan Team Workspace dan kapasitas member. Konfigurasi Cloud SaaS memakai lingkungan berbeda; lihat [Environment Variables](../configuration/env-variables).

- **Personal Gratis:** siapkan database dan `ERD_ENCRYPTION_KEY`; environment lisensi Team tidak diperlukan.
- **Commercial Team Berbayar:** siapkan environment lisensi sesuai [Environment Variables](../configuration/env-variables#self-host-commercial-team-license-berbayar), lalu masukkan license key melalui **Application Settings**. Persistensikan kedua file state lisensi.

Kedua plan memakai konfigurasi dasar Local PostgreSQL yang sama. Tambahkan tiga nilai ini hanya pada `.env` Commercial Team:

```env
ERDBPRO_LICENSE_API_URL=https://license.example.com
ERDBPRO_LICENSE_ISSUER=https://license.example.com
ERDBPRO_LICENSE_STATE_FILE=/app/data/.erdbpro/license-state.json
```

Ganti URL contoh dengan endpoint dan issuer yang diberikan penyedia lisensi. Jangan menyimpan license key di file environment.

## Persistent License State (Paid Self-host)

Container berbayar harus menyimpan state lisensi pada persistent volume. `license-state.json` mempertahankan client token, sedangkan file `installation-identity.json` di folder yang sama mempertahankan installation ID dan identity yang menandatangani record Team lokal.

Untuk instalasi yang sudah berjalan, sebelum mengganti konfigurasi atau membuat ulang container:

1. Temukan path efektif kedua file pada container yang sedang berjalan. Secara default, file berada di `.erdbpro/` di bawah working directory server.
2. Salin dan simpan **kedua file yang sama** ke lokasi aman.
3. Pasang volume persisten pada container baru dan pulihkan kedua file tanpa mengubah isinya. Set `ERDBPRO_LICENSE_STATE_FILE` ke path file di mount tersebut; identity instalasi otomatis memakai file saudara, kecuali Anda mengatur override-nya.
4. Setelah container mulai, periksa status lisensi dan daftar Team sebelum menghapus salinan cadangan.

Pada Easypanel atau platform container terkelola, buat persistent mount terlebih dahulu dan arahkan `ERDBPRO_LICENSE_STATE_FILE` ke file di mount. Jangan mengubah path lalu me-restart sebelum menyalin state yang ada; identity baru dapat membuat tanda tangan Team lama tidak cocok. Simpan kedua file sebagai secret lokal dan jangan unggah ke repositori atau SaaS.

:::caution Jika startup menampilkan `ENOENT` pada `/app/data/.erdbpro`
Pastikan `/app/data` benar-benar merupakan mount yang tersedia dan dapat ditulis oleh container. Kode runtime membuat subdirektori secara rekursif, tetapi tidak dapat menulis ke mount yang hilang atau tidak dapat diakses. Jika menjalankan `npm run start` di luar container, jangan gunakan path Docker `/app/data`; hilangkan override atau gunakan path lokal yang dapat ditulis.

Periksa juga versi pada log startup agar cocok dengan image yang sedang diuji. Sebelum mencoba ulang pada deployment berbayar, pastikan salinan lama `license-state.json` dan `installation-identity.json` sudah aman.
:::

Personal Gratis tidak menggunakan state lisensi Team tersebut. Database, backup, dan file lain tetap harus mengikuti kebijakan persistensi deployment Anda.

### 1. Local Deployment (via Docker)

Ini adalah cara tercepat untuk menjalankan ERD Builder Pro di server sendiri (self-hosted). Kami menyediakan image resmi di Docker Hub.

:::warning Penting
Siapkan `.env` dengan konfigurasi database dan kunci enkripsi. Cloudflare R2 direkomendasikan untuk unggah file/gambar:
- `DATABASE_URL` — connection string PostgreSQL (wajib, baik Supabase maupun Local PG)
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — hanya jika menggunakan mode **Supabase**
- `ERD_ENCRYPTION_KEY` — wajib untuk menyimpan password DB Connect dan API key AI secara aman pada deployment web/Docker
- `ERDBPRO_LICENSE_API_URL` + `ERDBPRO_LICENSE_ISSUER` — wajib hanya untuk Self-host Commercial Team berlisensi
- R2 vars — disarankan agar fitur unggah file/gambar berfungsi penuh

Jika R2 tidak disiapkan, fitur unggah file/gambar akan error. Untuk mode **Local PostgreSQL**, pastikan database PostgreSQL dapat dijangkau dari container.
:::

### Langkah-langkah (Pull dari Docker Hub)
1. **Pull Image:**
   ```bash
   docker pull bekenweb/erd-builder-pro:latest
   ```
2. **Jalankan Container:**
   ```bash
docker run -d \
  -p 3000:3000 \
  --name erd-builder-pro \
  --env-file .env \
  -v erd-data:/app/data \
  bekenweb/erd-builder-pro:latest
```

Konfigurasi dasar `.env` berikut dipakai oleh kedua plan Self-host pada mode Local PostgreSQL:
```env
DATABASE_URL="postgresql://user:password@db:5432/erd_builder_pro"
ERD_ENCRYPTION_KEY="ganti-dengan-kunci-acak-minimal-32-karakter"
```

Jangan gunakan atau membagikan `admin@local.dev` / `admin123`. Setelah database Local PostgreSQL kosong, aplikasi menampilkan setup satu kali untuk membuat super admin baru.

:::info
Variabel lingkungan Vite (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) sudah terpasang (*baked-in*) di dalam image Docker Hub. Pastikan Anda menggunakan tag image yang sesuai dengan kebutuhan Anda.

Isi `.env` mengacu pada [`.env.example`](https://github.com/hadziqmtqn/erd-builder-pro/blob/development/.env.example) di repositori utama.

Image yang tersedia: `latest`, versi spesifik (contoh: `v1.2.3`), dan commit SHA.
:::

### Langkah-langkah (Build Manual)
Jika Anda ingin membangun image sendiri dengan konfigurasi kustom:
1. **Build Image:**
   ```bash
   docker build --build-arg VITE_SUPABASE_URL=your_url --build-arg VITE_SUPABASE_ANON_KEY=your_key -t erd-builder-pro .
   ```
2. **Jalankan Container:**
   ```bash
   docker run -d \
     -p 3000:3000 \
     --name erd-builder-pro \
     --env-file .env \
     -v erd-data:/app/data \
     erd-builder-pro
   ```
3. Akses aplikasi di `http://localhost:3000`.

## 2. Vercel (Frontend & Serverless)

Aplikasi ini kompatibel dengan Vercel untuk deployment yang lebih sederhana:
1. Hubungkan repositori GitHub Anda ke Vercel.
2. Gunakan *Framework Preset*: **Vite**.
3. Atur *Output Directory*: `dist`.
4. Masukkan semua *Environment Variables* di dashboard Vercel.

## 3. CLI Installer (One-Command Setup)

Cara termudah untuk menjalankan ERD Builder Pro di mesin lokal — tanpa clone repo, tanpa Docker, tanpa setup database.

```bash
npx erdbpro
```

Cukup Node.js 18+. Browser akan terbuka di `http://localhost:3101`.

### Instalasi Global

```bash
npm install -g erdbpro
erdbpro
```

**Login:** CLI menggunakan SQLite lokal dan auto-login ke dashboard; tidak ada halaman login atau kredensial default yang perlu dibagikan.

Data tersimpan di `~/.erdbpro/` (SQLite). Zero config, selalu siap pakai. Kunci enkripsi lokal dibuat di dekat database jika `ERD_ENCRYPTION_KEY` dan `ERD_ENCRYPTION_KEY_FILE` tidak diatur.

### Perintah CLI

```bash
erdbpro                          # Start server + menu interaktif
erdbpro start                    # Sama seperti di atas
erdbpro start --background       # Run di background (detached)
erdbpro start --open             # Skip menu, buka browser langsung
erdbpro start --port 4000        # Port kustom
erdbpro start --force            # Restart jika sudah berjalan
erdbpro stop                     # Hentikan server background
erdbpro status                   # Cek status server
```

### Database

**SQLite only.** Database dibuat otomatis di `~/.erdbpro/data.db`. Tanpa konfigurasi.

Butuh PostgreSQL? Gunakan image Docker:
```bash
docker run -p 3101:3101 -e DATABASE_URL=postgresql://... bekenweb/erd-builder-pro
```

CLI distribution dibuat simpel — SQLite cepat, portabel, dan zero setup. Docker dan desktop (Tauri) mendukung PostgreSQL untuk production.

### Interactive Menu

Setelah `erdbpro` dijalankan, muncul menu navigasi dengan arrow key:

```
▶ Web UI (Open in Browser)
  Hide to Background
  Exit
```

- **↑↓** — pindah selector
- **Enter** — jalankan aksi
- **q** — keluar

### Background Mode

```bash
erdbpro start --background
erdbpro status              # → ✅ Server running (PID: 12345)
erdbpro stop                # → 🛑 Server stopped
```

PID file di `~/.erdbpro/server.pid`.

### Update

```bash
npm update -g erdbpro
erdbpro start --force       # Stop old + start new
```

### Uninstall

```bash
npm uninstall -g erdbpro
rm -rf ~/.erdbpro
```

---

## 4. Coolify / PaaS Lainnya

Jika Anda menggunakan **Coolify**, Anda bisa menggunakan metode **Dockerfile**. 
- Pastikan port yang diekspos adalah `3000`.
- Masukkan semua variabel environment di bagian *Variables* pada dashboard Coolify.

---
*Tips: Selalu pastikan `NODE_ENV=production` saat melakukan deployment untuk performa optimal.*
