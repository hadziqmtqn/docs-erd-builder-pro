---
sidebar_position: 4
slug: /getting-started/deployment
---

# Deployment

ERD Builder Pro dirancang agar fleksibel untuk dideploy di berbagai platform, baik sebagai layanan serverless maupun menggunakan container.

### 1. Local Deployment (via Docker)

Ini adalah cara tercepat untuk menjalankan ERD Builder Pro di server sendiri (self-hosted). Kami menyediakan image resmi di Docker Hub.

:::warning Penting
Meskipun variabel Vite sudah terpasang di dalam image, Anda **tetap wajib** menyiapkan file `.env` yang berisi konfigurasi **Cloudflare R2** dan **Supabase Service Role**. Jika konfigurasi R2 tidak disiapkan, fitur unggah file/gambar (seperti pada modul *Notes* atau *Drawings*) akan mengalami error saat digunakan. 

Jika Anda tidak berencana menggunakan fitur unggah gambar, Anda bisa mengosongkan variabel tersebut, namun sangat disarankan untuk tetap melakukan setup agar aplikasi berjalan penuh.
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

## 4. Coolify / PaaS Lainnya

Jika Anda menggunakan **Coolify**, Anda bisa menggunakan metode **Dockerfile**. 
- Pastikan port yang diekspos adalah `3000`.
- Masukkan semua variabel environment di bagian *Variables* pada dashboard Coolify.

---
*Tips: Selalu pastikan `NODE_ENV=production` saat melakukan deployment untuk performa optimal.*
