---
sidebar_position: 4
slug: /getting-started/deployment
---

# Deployment

Halaman ini membahas cara menjalankan ERD Builder Pro sebagai **Self-host** di server Anda: Docker (disarankan), Docker Compose, panel container seperti Easypanel, Coolify, atau Dokploy, dan Vercel dengan batasan. Untuk pemakaian pribadi tanpa server, lihat [Aplikasi Desktop](./desktop-app.md) dan [CLI](./cli.md).

## Memilih Plan Self-host

Self-host Personal Gratis hanya menyediakan Personal Workspace. Self-host Commercial Team memakai lisensi instance untuk menambahkan Team Workspace dan kapasitas member. Konfigurasi Cloud SaaS memakai lingkungan berbeda; lihat [Environment Variables](../configuration/env-variables.md).

- **Personal Gratis:** siapkan database PostgreSQL dan `ERD_ENCRYPTION_KEY`; environment lisensi Team tidak diperlukan.
- **Commercial Team Berbayar:** pasang storage persisten seperti dijelaskan di bawah, lalu masukkan license key melalui **Settings → Application License**. Server lisensi resmi sudah menjadi bawaan, jadi environment endpoint lisensi tidak diperlukan.

Team Workspace hanya tersedia bila server memakai **PostgreSQL murni** (tanpa Supabase). Kedua plan memakai konfigurasi dasar PostgreSQL yang sama. Sejak versi 3.5.6, Commercial Team tidak memerlukan `ERDBPRO_LICENSE_API_URL` maupun `ERDBPRO_LICENSE_ISSUER`; isi keduanya hanya untuk memakai server lisensi lain, seperti dijelaskan di [Environment Variables](../configuration/env-variables.md#self-host-commercial-team-license-berbayar). Jangan menyimpan license key di file environment. Nilai `ERDBPRO_LICENSE_STATE_FILE` berbeda menurut platform karena variabel itu menunjuk ke file pada filesystem server. Lihat [contoh path per platform](#nilai-path-per-jenis-deployment).

## 1. Docker (Disarankan)

Image resmi tersedia di Docker Hub sebagai `bekenweb/erd-builder-pro`.

:::warning Gunakan PostgreSQL untuk server
Bila `DATABASE_URL` kosong atau diawali `file:`, container memakai SQLite di `/app/data/erd-builder.db`. Mode ini hanya untuk dicoba sendiri oleh satu orang di komputer lokal. Untuk server yang diakses orang lain, gunakan PostgreSQL. Team Workspace juga hanya tersedia di PostgreSQL.
:::

### Siapkan `.env`

```env
DATABASE_URL="postgresql://user:password@db:5432/erd_builder_pro"
ERD_ENCRYPTION_KEY="hasil-dari-openssl-rand-hex-32"
```

- `DATABASE_URL` (wajib): connection string PostgreSQL yang dapat dijangkau dari container, diawali `postgresql://`.
- `ERD_ENCRYPTION_KEY` (wajib): nilai acak minimal 32 karakter, misalnya hasil `openssl rand -hex 32`. Kunci ini mengenkripsi API key AI yang disimpan. Gunakan nilai yang sama selama database dipakai.
- Variabel R2 (disarankan): diperlukan agar gambar bisa diunggah ke Notes dan Drawings. Jangan isi `R2_PUBLIC_URL`. Lihat [Konfigurasi R2](../cloud-storage/r2-config.md).
- `ERDBPRO_LICENSE_STATE_FILE`: untuk Commercial Team, arahkan ke volume persisten, misalnya `/app/data/.erdbpro/license-state.json`.

Contoh lengkap ada di [`.env.example`](https://github.com/hadziqmtqn/erd-builder-pro/blob/master/.env.example) dan [Environment Variables](../configuration/env-variables.md).

### Jalankan Container

```bash
docker pull bekenweb/erd-builder-pro:latest
docker run -d \
  -p 3000:3000 \
  --name erd-builder-pro \
  --env-file .env \
  -v erd-data:/app/data \
  bekenweb/erd-builder-pro:latest
```

Buka `http://localhost:3000`. Pada database kosong, aplikasi menampilkan halaman **Create administrator account** untuk membuat SuperAdmin pertama. Jangan gunakan `admin@local.dev` / `admin123`; kombinasi itu ditolak oleh login Self-host.

### Tag Image

| Tag | Isi |
| :--- | :--- |
| `latest` | Rilis stabil terbaru. |
| `3.5.7` | Versi persis. Cocok bila Anda ingin mengatur jadwal upgrade sendiri. |
| `3.5` | Patch terbaru dari seri 3.5. |
| `54a7f36` (short SHA) | Build dari satu commit tertentu. |
| `3.5.8-rc.1` | Release candidate untuk pengujian. Jangan dipakai di produksi. |

Image tersedia untuk arsitektur **amd64** (x86_64).

### Yang Dilakukan Container Saat Start {/* #yang-dilakukan-container-saat-start */}

Entrypoint image menyiapkan database sebelum server berjalan:

1. **PostgreSQL** (`postgresql://`): menunggu database siap hingga 30 detik, membuat database bila belum ada, menyelaraskan tabel dengan skema aplikasi (`prisma db push`), mengisi data awal, lalu menjalankan server.
2. **Supabase** (`SUPABASE_URL` diisi): langsung menjalankan server tanpa mengubah skema.
3. **SQLite** (`DATABASE_URL` kosong atau `file:`): memakai `/app/data/erd-builder.db`.

Server berjalan di port `3000`. Image juga memiliki healthcheck ke `/api/health`.

### Docker Compose dengan PostgreSQL

Contoh berikut menjalankan aplikasi dan PostgreSQL dalam satu Compose project:

```yaml
services:
  app:
    image: bekenweb/erd-builder-pro:3.5
    ports:
      - "3000:3000"
    env_file: .env
    environment:
      ERDBPRO_LICENSE_STATE_FILE: /app/data/.erdbpro/license-state.json
    volumes:
      - erd-data:/app/data
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: erd
      POSTGRES_PASSWORD: ganti-password-ini
      POSTGRES_DB: erd_builder_pro
    volumes:
      - pg-data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  erd-data:
  pg-data:
```

Isi `.env` di folder yang sama:

```env
DATABASE_URL="postgresql://erd:ganti-password-ini@db:5432/erd_builder_pro"
ERD_ENCRYPTION_KEY="hasil-dari-openssl-rand-hex-32"
```

`docker-compose.yml` di repositori membangun image dari source dan secara bawaan memakai SQLite. Untuk server, gunakan PostgreSQL seperti contoh di atas. Jangan gunakan `docker compose down -v`, `docker volume rm`, atau `docker volume prune` pada volume yang menyimpan data aplikasi.

### Build Image Sendiri

```bash
docker build -t erd-builder-pro .
docker run -d -p 3000:3000 --name erd-builder-pro --env-file .env -v erd-data:/app/data erd-builder-pro
```

Build argument `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` hanya relevan untuk deployment Supabase lama.

### Backup di Docker {/* #backup-di-docker */}

**Settings → Database Backup** menyimpan file backup di folder home user proses server. Pada image Docker, folder itu adalah `/root/ERD Builder Pro` di dalam container, di luar volume `/app/data`, sehingga hilang saat container dibuat ulang. Pilih salah satu:

- unduh file backup secara berkala dari halaman Database Backup;
- pasang volume ke `/root/ERD Builder Pro`; atau
- isi konfigurasi R2 agar setiap backup juga disalin ke bucket.

Lihat [Database Backup](../security-backup/manual-backup.md).

## Persistent License State (Paid Self-host) {/* #persistent-license-state-paid-self-host */}

Deployment Commercial Team harus menyimpan state lisensi pada filesystem lokal yang persisten dan dapat ditulis oleh proses aplikasi. `license-state.json` menyimpan client token dan signed entitlement, bukan license key mentah. File `installation-identity.json` biasanya disimpan di folder yang sama untuk mempertahankan installation ID dan private key yang menandatangani record Team lokal.

`ERDBPRO_LICENSE_STATE_FILE` menerima path lengkap ke file `license-state.json`, bukan nama folder atau URL. Gunakan path absolut yang terlihat dari proses server. Jika `ERDBPRO_INSTALLATION_IDENTITY_FILE` tidak diatur, runtime menyimpan `installation-identity.json` di folder yang sama. Set override identity hanya jika diperlukan, dan pastikan file itu juga berada di storage persisten.

Server juga membutuhkan akses HTTPS keluar ke `https://license.erdbuilderpro.com`. Bila server lisensi tidak terjangkau, Team tetap berjalan sampai 72 jam sejak pemeriksaan terakhir yang berhasil.

### Nilai Path per Jenis Deployment {/* #nilai-path-per-jenis-deployment */}

| Jenis deployment | `ERDBPRO_LICENSE_STATE_FILE` | `ERDBPRO_INSTALLATION_IDENTITY_FILE` |
| --- | --- | --- |
| Docker atau Docker Compose dengan volume `erd-data:/app/data` | `/app/data/.erdbpro/license-state.json` | Opsional: `/app/data/.erdbpro/installation-identity.json`; biasanya kosongkan agar memakai default ini |
| Container terkelola seperti Easypanel, Coolify, atau Dokploy | `<path-mount-persisten>/.erdbpro/license-state.json`, misalnya `/data/.erdbpro/license-state.json` jika mount terlihat di `/data` | Opsional: `<path-mount-persisten>/.erdbpro/installation-identity.json`; biasanya kosongkan agar memakai file saudara |
| Linux VPS tanpa Docker, misalnya service systemd | `/var/lib/erd-builder-pro/.erdbpro/license-state.json` | Opsional: `/var/lib/erd-builder-pro/.erdbpro/installation-identity.json`; biasanya kosongkan agar memakai file saudara |
| Vercel Functions | Tidak ada nilai path yang didukung untuk lisensi Commercial Team saat ini | Tidak ada nilai path yang didukung |

Untuk container, gunakan path di dalam container. Contohnya, bila host memasang `/srv/erdbpro-data` ke `/app/data`, isi variabel dengan `/app/data/.erdbpro/license-state.json`, bukan path host `/srv/erdbpro-data/...`. Runtime membuat folder induk, tetapi volume harus sudah terpasang dan dapat ditulis oleh user proses aplikasi.

### Catatan Docker dan Easypanel {/* #catatan-docker-dan-easypanel */}

Docker image tidak menetapkan `ERDBPRO_LICENSE_STATE_FILE` atau volume secara default. Jika variabel itu kosong, runtime memakai `.erdbpro/license-state.json` di working directory server, yaitu `/app/.erdbpro/license-state.json` pada image Docker. Membuat volume di `/app/data` saja tidak memindahkan state ke sana; contoh Compose di atas juga mengatur variabel path ke dalam volume tersebut.

- **Docker Compose:** contoh di atas membuat named volume `erd-data` di `/app/data` dan mengatur path lisensi ke `/app/data/.erdbpro/license-state.json`.
- **Easypanel App service:** buka **Storage**, tambahkan Volume mount pada `/app/data`, lalu pastikan environment berisi `ERDBPRO_LICENSE_STATE_FILE=/app/data/.erdbpro/license-state.json`. Tanpa mount, file di filesystem container dapat hilang saat Easypanel membuat ulang service. Image maupun environment variable tidak membuat storage persisten dengan sendirinya.
- **Target mount:** pasang volume di `/app/data`, bukan di `/app`; mount dapat menutupi file yang sudah ada pada direktori tujuan. Cadangkan isi `/app/data` sebelum memasang volume jika direktori itu sudah berisi file.
- **Backup:** volume persisten melindungi file saat container diganti, tetapi bukan backup. Atur backup volume secara terpisah dan pastikan Anda dapat memulihkannya.

Lihat juga [dokumentasi volume Docker](https://docs.docker.com/engine/storage/volumes/) dan [dokumentasi Storage Easypanel](https://easypanel.io/docs/services/app) untuk detail siklus hidup volume dan mount.

Volume aplikasi `/app/data` tidak menyimpan database PostgreSQL pada service terpisah; atur volume untuk service PostgreSQL tersebut secara terpisah. Pertahankan nilai `ERD_ENCRYPTION_KEY` saat menggunakan database yang sama, karena aplikasi memerlukannya untuk mendekripsi API key AI yang tersimpan.

Vercel menjalankan API sebagai Functions dan menyarankan object storage untuk file yang ditulis dari Functions. Runtime ERDBPro saat ini membaca dan menulis kedua file state lisensi melalui filesystem lokal; aplikasi belum menghubungkannya ke object storage. Karena itu, tidak ada path persisten yang didukung untuk lisensi Commercial Team pada integrasi Vercel saat ini. Jangan mengganti `/app/data` dengan `/tmp`; variabel path hanya memilih lokasi file dan tidak menyediakan storage persisten. Lihat [panduan file pada Vercel Functions](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions).

Laporan kapasitas harian juga dijalankan oleh proses server yang terus hidup. Entry point Vercel saat ini tidak menjalankan scheduler tersebut, jadi Vercel tidak menjamin pengiriman laporan harian. Gunakan container dengan persistent volume atau VPS untuk deployment Commercial Team.

Untuk instalasi yang sudah berjalan, sebelum mengganti konfigurasi atau membuat ulang container/server:

1. Periksa nilai `ERDBPRO_LICENSE_STATE_FILE` pada service yang sedang berjalan untuk menemukan path efektifnya. Jangan mengasumsikan file di `/app/.erdbpro` adalah file yang sedang dibaca jika variabel itu menunjuk ke path lain.
2. Simpan cadangan **kedua file asli** (`license-state.json` dan `installation-identity.json`). Jika folder `.erdbpro` berisi `team-provisioning-baseline-v1`, simpan juga. Menyalin seluruh folder biasanya paling aman. Jangan membagikan atau mengunggah file-file ini.
3. Pasang storage persisten pada deployment baru dan pulihkan file tanpa mengubah isinya. Set `ERDBPRO_LICENSE_STATE_FILE` ke path file pada mount; identity instalasi memakai file saudara kecuali Anda mengatur override-nya.
4. Setelah server mulai, periksa status lisensi dan daftar Team sebelum menghapus salinan cadangan.

Jika berpindah dari default `/app/.erdbpro` ke volume `/app/data`, pulihkan state lama ke `/app/data/.erdbpro/` sebelum menjalankan service dengan path baru. Jangan biarkan runtime membuat installation identity baru untuk menggantikan identity lama; perubahan identity dapat membuat tanda tangan Team yang ada tidak cocok. Bila state lisensi lama tidak tersedia, jangan anggap pengaktifan ulang otomatis akan memulihkan binding lama.

:::caution Jika startup tidak dapat menulis state lisensi
Periksa bahwa nilai `ERDBPRO_LICENSE_STATE_FILE` menunjuk ke storage persisten yang tersedia dan dapat ditulis oleh user proses aplikasi. Untuk Docker/Easypanel, pastikan `/app/data` benar-benar merupakan mount dan path variabel berada di dalamnya. Jika menjalankan `npm start` di VPS tanpa container, jangan gunakan path Docker `/app/data`; hilangkan override agar runtime memakai default di working directory atau atur path VPS seperti pada tabel di atas.

Periksa juga versi pada log startup agar cocok dengan image yang sedang diuji. Sebelum mencoba ulang pada deployment berbayar, pastikan salinan lama `license-state.json` dan `installation-identity.json` sudah aman.
:::

Personal Gratis tidak menggunakan state lisensi Team tersebut. Database, backup, dan file lain tetap harus mengikuti kebijakan persistensi deployment Anda.

## 2. Coolify, Easypanel, Dokploy, dan PaaS Lain

Gunakan image `bekenweb/erd-builder-pro` atau metode **Dockerfile** dari repositori.

- Ekspos port `3000`.
- Isi environment di dashboard panel, minimal `DATABASE_URL` dan `ERD_ENCRYPTION_KEY`.
- Pasang volume persisten di `/app/data`, terutama untuk Commercial Team.

## 3. Vercel (Terbatas)

Gunakan langkah ini hanya untuk mode deployment yang kompatibel dengan Vercel dan tidak memakai state file lisensi Team:
1. Hubungkan repositori GitHub Anda ke Vercel.
2. Gunakan *Framework Preset*: **Vite**.
3. Atur *Output Directory*: `dist`.
4. Masukkan environment yang diperlukan oleh mode tersebut di dashboard Vercel.

Self-host Commercial Team berlisensi belum didukung pada Vercel. Lihat [kebutuhan state persisten dan path lisensi](#persistent-license-state-paid-self-host). Untuk deployment berlisensi, gunakan Docker dengan persistent volume atau Linux VPS.

## CLI dan Desktop

CLI (`npx erdbpro`) dan aplikasi Desktop menjalankan server lokal dengan SQLite untuk satu orang. Panduannya ada di [CLI](./cli.md) dan [Aplikasi Desktop](./desktop-app.md).
