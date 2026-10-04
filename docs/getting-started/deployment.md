---
sidebar_position: 4
slug: /getting-started/deployment
---

# Deployment

ERD Builder Pro dapat dijalankan pada beberapa platform, termasuk serverless dan container. Ketersediaan fitur bergantung pada storage dan model proses yang disediakan platform; lisensi Commercial Team memerlukan filesystem persisten.

## Memilih Plan Self-host

Self-host Personal Gratis hanya menyediakan Personal Workspace. Self-host Commercial Team memakai lisensi instance untuk menambahkan Team Workspace dan kapasitas member. Konfigurasi Cloud SaaS memakai lingkungan berbeda; lihat [Environment Variables](../configuration/env-variables).

- **Personal Gratis:** siapkan database dan `ERD_ENCRYPTION_KEY`; environment lisensi Team tidak diperlukan.
- **Commercial Team Berbayar:** siapkan environment lisensi sesuai [Environment Variables](../configuration/env-variables#self-host-commercial-team-license-berbayar), pasang storage persisten seperti dijelaskan di bawah, lalu masukkan license key melalui **Application Settings**.

Kedua plan memakai konfigurasi dasar Local PostgreSQL yang sama. Tambahkan endpoint lisensi berikut hanya pada `.env` Commercial Team:

```env
ERDBPRO_LICENSE_API_URL=https://license.example.com
ERDBPRO_LICENSE_ISSUER=https://license.example.com
```

Ganti URL contoh dengan endpoint dan issuer yang diberikan penyedia lisensi. Jangan menyimpan license key di file environment. Nilai `ERDBPRO_LICENSE_STATE_FILE` berbeda menurut platform karena variabel itu menunjuk ke file pada filesystem server. Lihat [contoh path per platform](../configuration/env-variables#nilai-path-per-jenis-deployment).

## Persistent License State (Paid Self-host)

Deployment Commercial Team harus menyimpan state lisensi pada filesystem lokal yang persisten dan dapat ditulis oleh proses aplikasi. `license-state.json` menyimpan client token dan signed entitlement, bukan license key mentah. File `installation-identity.json` biasanya disimpan di folder yang sama untuk mempertahankan installation ID dan private key yang menandatangani record Team lokal.

`ERDBPRO_LICENSE_STATE_FILE` menerima path lengkap ke file `license-state.json`, bukan nama folder atau URL. Gunakan path absolut yang terlihat dari proses server. Jika `ERDBPRO_INSTALLATION_IDENTITY_FILE` tidak diatur, runtime menyimpan `installation-identity.json` di folder yang sama. Set override identity hanya jika diperlukan, dan pastikan file itu juga berada di storage persisten.

### Nilai Path per Jenis Deployment

| Jenis deployment | `ERDBPRO_LICENSE_STATE_FILE` | `ERDBPRO_INSTALLATION_IDENTITY_FILE` |
| --- | --- | --- |
| Docker atau Docker Compose dengan volume `erd-data:/app/data` | `/app/data/.erdbpro/license-state.json` | Opsional: `/app/data/.erdbpro/installation-identity.json`; biasanya kosongkan agar memakai default ini |
| Container terkelola seperti Easypanel, Coolify, atau Dokploy | `<path-mount-persisten>/.erdbpro/license-state.json`, misalnya `/data/.erdbpro/license-state.json` jika mount terlihat di `/data` | Opsional: `<path-mount-persisten>/.erdbpro/installation-identity.json`; biasanya kosongkan agar memakai file saudara |
| Linux VPS tanpa Docker, misalnya service systemd | `/var/lib/erd-builder-pro/.erdbpro/license-state.json` | Opsional: `/var/lib/erd-builder-pro/.erdbpro/installation-identity.json`; biasanya kosongkan agar memakai file saudara |
| Vercel Functions | Tidak ada nilai path yang didukung untuk lisensi Commercial Team saat ini | Tidak ada nilai path yang didukung |

Untuk container, gunakan path di dalam container. Contohnya, bila host memasang `/srv/erdbpro-data` ke `/app/data`, isi variabel dengan `/app/data/.erdbpro/license-state.json`, bukan path host `/srv/erdbpro-data/...`. Runtime membuat folder induk, tetapi volume harus sudah terpasang dan dapat ditulis oleh user proses aplikasi.

### Catatan Docker dan Easypanel

Docker image saat ini tidak menetapkan `ERDBPRO_LICENSE_STATE_FILE` atau volume secara default. Jika variabel itu kosong, runtime memakai `.erdbpro/license-state.json` di working directory server, yaitu `/app/.erdbpro/license-state.json` pada image Docker. Membuat volume di `/app/data` saja tidak memindahkan state ke sana; Compose resmi juga mengatur variabel path ke dalam volume tersebut.

- **Docker Compose resmi:** Compose membuat named volume `erd-data` dan mengarahkannya ke `/app/data`. Nilai path lisensi sudah diatur ke `/app/data/.erdbpro/license-state.json`. Jangan gunakan `docker compose down -v`, `docker volume rm`, atau `docker volume prune` pada volume yang menyimpan data aplikasi.
- **Easypanel App service:** buka **Storage**, tambahkan Volume mount pada `/app/data`, lalu pastikan environment berisi `ERDBPRO_LICENSE_STATE_FILE=/app/data/.erdbpro/license-state.json`. Tanpa mount, file di filesystem container dapat hilang saat Easypanel membuat ulang service. Image maupun environment variable tidak membuat storage persisten dengan sendirinya.
- **Target mount:** pasang volume di `/app/data`, bukan di `/app`; mount dapat menutupi file yang sudah ada pada direktori tujuan. Cadangkan isi `/app/data` sebelum memasang volume jika direktori itu sudah berisi file.
- **Backup:** volume persisten melindungi file saat container diganti, tetapi bukan backup. Atur backup volume secara terpisah dan pastikan Anda dapat memulihkannya.

Lihat juga [dokumentasi volume Docker](https://docs.docker.com/engine/storage/volumes/) dan [dokumentasi Storage Easypanel](https://easypanel.io/docs/services/app) untuk detail siklus hidup volume dan mount.

Volume aplikasi `/app/data` menyimpan database SQLite bila Anda memilih mode SQLite. Volume itu tidak menyimpan database PostgreSQL pada service terpisah; atur volume untuk service PostgreSQL tersebut secara terpisah. Pertahankan nilai `ERD_ENCRYPTION_KEY` saat menggunakan database yang sama, karena aplikasi memerlukannya untuk mendekripsi secret DB Connect dan AI yang tersimpan.

Vercel menjalankan API sebagai Functions dan menyarankan object storage untuk file yang ditulis dari Functions. Runtime ERDBPro saat ini membaca dan menulis kedua file state lisensi melalui filesystem lokal; aplikasi belum menghubungkannya ke object storage. Karena itu, tidak ada path persisten yang didukung untuk lisensi Commercial Team pada integrasi Vercel saat ini. Jangan mengganti `/app/data` dengan `/tmp`; variabel path hanya memilih lokasi file dan tidak menyediakan storage persisten. Lihat [panduan file pada Vercel Functions](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions).

Laporan kapasitas harian juga dijalankan oleh proses server yang terus hidup. Entry point Vercel saat ini tidak menjalankan scheduler tersebut, jadi Vercel tidak menjamin pengiriman laporan harian. Gunakan container dengan persistent volume atau VPS untuk deployment Commercial Team.

Untuk instalasi yang sudah berjalan, sebelum mengganti konfigurasi atau membuat ulang container/server:

1. Periksa nilai `ERDBPRO_LICENSE_STATE_FILE` pada service yang sedang berjalan untuk menemukan path efektifnya. Jangan mengasumsikan file di `/app/.erdbpro` adalah file yang sedang dibaca jika variabel itu menunjuk ke path lain.
2. Simpan cadangan **kedua file asli** (`license-state.json` dan `installation-identity.json`). Jika folder `.erdbpro` berisi `team-provisioning-baseline-v1`, simpan juga. Menyalin seluruh folder biasanya paling aman. Jangan membagikan atau mengunggah file-file ini.
3. Pasang storage persisten pada deployment baru dan pulihkan file tanpa mengubah isinya. Set `ERDBPRO_LICENSE_STATE_FILE` ke path file pada mount; identity instalasi memakai file saudara kecuali Anda mengatur override-nya.
4. Setelah server mulai, periksa status lisensi dan daftar Team sebelum menghapus salinan cadangan.

Jika berpindah dari default `/app/.erdbpro` ke volume `/app/data`, pulihkan state lama ke `/app/data/.erdbpro/` sebelum menjalankan service dengan path baru. Jangan biarkan runtime membuat installation identity baru untuk menggantikan identity lama; perubahan identity dapat membuat tanda tangan Team yang ada tidak cocok. Bila state lisensi lama tidak tersedia, jangan anggap pengaktifan ulang otomatis akan memulihkan binding lama.

:::caution Jika startup tidak dapat menulis state lisensi
Periksa bahwa nilai `ERDBPRO_LICENSE_STATE_FILE` menunjuk ke storage persisten yang tersedia dan dapat ditulis oleh user proses aplikasi. Untuk Docker/Easypanel, pastikan `/app/data` benar-benar merupakan mount dan path variabel berada di dalamnya. Jika menjalankan `npm run start` di VPS tanpa container, jangan gunakan path Docker `/app/data`; hilangkan override agar runtime memakai default di working directory atau atur path VPS seperti pada tabel di atas.

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

Untuk Docker berlisensi, tambahkan path file di dalam mount ke `.env`:

```env
ERDBPRO_LICENSE_STATE_FILE=/app/data/.erdbpro/license-state.json
```

Docker Compose resmi mengatur path default yang sama. Jangan isi `ERDBPRO_INSTALLATION_IDENTITY_FILE` kecuali Anda memang memindahkan file identity ke path persisten lain.

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

Gunakan langkah ini hanya untuk mode deployment yang kompatibel dengan Vercel dan tidak memakai state file lisensi Team:
1. Hubungkan repositori GitHub Anda ke Vercel.
2. Gunakan *Framework Preset*: **Vite**.
3. Atur *Output Directory*: `dist`.
4. Masukkan environment yang diperlukan oleh mode tersebut di dashboard Vercel.

Self-host Commercial Team berlisensi belum didukung pada Vercel. Lihat [kebutuhan state persisten dan path lisensi](#persistent-license-state-paid-self-host). Untuk deployment berlisensi, gunakan Docker dengan persistent volume atau Linux VPS.

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
