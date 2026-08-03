---
sidebar_position: 4
slug: /getting-started/deployment
---

# Deployment

ERD Builder Pro dirancang agar fleksibel untuk dideploy di berbagai platform, baik sebagai layanan serverless maupun menggunakan container.

### 1. Local Deployment (via Docker)

Ini adalah cara tercepat untuk menjalankan ERD Builder Pro di server sendiri (self-hosted). Kami menyediakan image resmi di Docker Hub.

:::warning Penting
Anda **tetap wajib** menyiapkan file `.env` yang berisi konfigurasi **Database** dan **Cloudflare R2**:
- `DATABASE_URL` — connection string PostgreSQL (wajib, baik Supabase maupun Local PG)
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — hanya jika menggunakan mode **Supabase**
- `ERD_ENCRYPTION_KEY` — wajib untuk menyimpan password DB Connect dan API key AI secara aman pada deployment web/Docker
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
  bekenweb/erd-builder-pro:latest
```

Untuk Local PostgreSQL, isi `.env` minimal seperti berikut:
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
