---
sidebar_position: 1
slug: /configuration/env-variables
---
# Environment Variables

Server ERD Builder Pro dikonfigurasi lewat variabel lingkungan (environment variables). Saat pengembangan, isi variabel di file `.env` di root proyek. Saat deployment, atur variabel di Docker, panel container, atau layanan sistem Anda. Daftar lengkap dengan komentar ada di [`.env.example`](https://github.com/hadziqmtqn/erd-builder-pro/blob/master/.env.example).

## Mode Database dan Autentikasi

Server memilih mode berdasarkan `DATABASE_URL` dan variabel Supabase:

| Mode | Kapan aktif | Autentikasi | Team Workspace |
| :--- | :--- | :--- | :--- |
| **PostgreSQL murni** (utama) | `DATABASE_URL` diawali `postgresql://` dan tidak ada `SUPABASE_URL` maupun `VITE_SUPABASE_URL` | Akun lokal (email + password) | Ya, dengan lisensi Self-host Commercial |
| **Supabase** (legacy) | `SUPABASE_URL` atau `VITE_SUPABASE_URL` diisi, atau URL PostgreSQL dengan awalan lain seperti `postgres://` | Supabase Auth | Tidak |
| **SQLite** (Desktop, CLI) | `DATABASE_URL` kosong, diawali `file:`, atau berakhiran `.db` | Login otomatis satu pengguna | Tidak |

Cloud resmi memakai PostgreSQL murni ditambah `AUTH_MODE=sso` dan dikelola oleh tim ERD Builder Pro. Panduan per mode ada di [Setup Database](./database-setup.md).

:::caution
Gunakan awalan `postgresql://` pada `DATABASE_URL`. Awalan `postgres://` tidak dikenali sebagai PostgreSQL murni, sehingga server berjalan dalam mode Supabase.
:::

## Profil Self-host: Personal Gratis dan Commercial Team

Bagian ini membedakan **plan Self-host**. Cloud SaaS memakai konfigurasi Cloud tersendiri.

| Profil | Kegunaan | Environment lisensi |
| --- | --- | --- |
| **Self-host Personal (gratis)** | Satu Personal Workspace per akun; tidak menyediakan Team atau member Team | Tidak memerlukan environment client lisensi Team di bawah |
| **Self-host Commercial Team (berbayar)** | Personal Workspace ditambah Team Workspace dan kuota member sesuai lisensi instance | Server lisensi resmi sudah menjadi bawaan, tanpa variabel tambahan; state lisensi dan identity instalasi harus persisten |

Kedua profil memakai `DATABASE_URL` dan `ERD_ENCRYPTION_KEY` di bagian berikut. Team hanya tersedia pada mode PostgreSQL murni. Upgrade dari Personal ke Commercial Team dilakukan dengan mengaktifkan lisensi melalui **Settings → Application License**. Jangan menaruh license key di `.env`.

## Self-host Commercial Team License (Berbayar) {/* #self-host-commercial-team-license-berbayar */}

Variabel berikut hanya berlaku jika instalasi memakai lisensi kapasitas Team. Sejak versi 3.5.6, runtime memakai server lisensi resmi secara bawaan, jadi `ERDBPRO_LICENSE_API_URL` dan `ERDBPRO_LICENSE_ISSUER` tidak perlu diisi. Versi sebelumnya masih memerlukan keduanya; perbarui ke 3.5.6 atau lebih baru.

- `ERDBPRO_LICENSE_API_URL`: **Opsional**. Bawaan: `https://license.erdbuilderpro.com`. Isi hanya untuk memakai server lisensi lain, misalnya lingkungan staging. Nilainya origin tanpa path endpoint, misalnya `https://license.example.com`; aplikasi menambahkan path aktivasi dan pemeriksaan lisensi. Production harus memakai HTTPS.
- `ERDBPRO_LICENSE_ISSUER`: **Opsional**. Bawaan: issuer resmi `https://erdbuilderpro.com` dan `https://www.erdbuilderpro.com`. Jika diisi, hanya nilai ini yang diterima, jadi isi bersama `ERDBPRO_LICENSE_API_URL` dengan issuer persis dari signed entitlement server lisensi tersebut. Jangan menebak nilainya dari nama plan.
- `ERDBPRO_LICENSE_STATE_FILE`: Path lengkap opsional untuk file state lisensi, misalnya `/app/data/.erdbpro/license-state.json` di Docker. Pilih path absolut pada filesystem persisten yang dapat ditulis oleh proses server. Variabel ini hanya memilih path; variabel ini tidak membuat atau memasang volume. File ini memuat client token dan signed entitlement, sehingga harus diperlakukan sebagai rahasia.
- `ERDBPRO_INSTALLATION_IDENTITY_FILE`: Override path opsional untuk identity instalasi. Jika tidak diatur, `installation-identity.json` dibuat berdampingan dengan file state lisensi. File ini berisi private key lokal dan harus dipertahankan bersama file state.
- `ERDBPRO_LEGACY_TEAM_ID`: Opsional. UUID Team aktif yang dipilih administrator untuk menampung Project lama dari instalasi sebelum fitur Team. Project lama tidak dipindahkan ke Team tanpa pemetaan eksplisit ini.

Kunci verifikasi publik resmi sudah disertakan di server. Jangan mengatur public key atau key ID khusus di production. Untuk Personal Gratis, jangan isi variabel client lisensi Team hanya untuk menjalankan Personal Workspace.

Server membutuhkan akses HTTPS keluar ke server lisensi. Bila server lisensi tidak terjangkau, Team tetap berjalan sampai 72 jam sejak pemeriksaan terakhir yang berhasil.

Nilai path yang tepat berbeda untuk Docker, container terkelola, VPS, dan Vercel. Lihat [tabel path per jenis deployment](../getting-started/deployment.md#nilai-path-per-jenis-deployment) dan [catatan Docker/Easypanel](../getting-started/deployment.md#catatan-docker-dan-easypanel). Saat memindahkan instalasi yang sudah ada, salin file state, identity, dan marker instalasi yang ada ke storage persisten sebelum mengganti path atau membuat ulang server. Jangan membuat identity baru untuk menggantikan identity instalasi lama.

## Core (Wajib)
- `DATABASE_URL`: Connection string database.
  - **PostgreSQL murni**: `postgresql://user:password@localhost:5432/nama_database`.
  - **Supabase (legacy)**: string pooler Supabase.
- `PORT`: Port server (bawaan `3000`).
- `APP_TIMEZONE`: Zona waktu untuk format waktu dan log di server, misalnya `Asia/Jakarta`. Bawaan `UTC`. Timestamp di database tetap disimpan sebagai waktu absolut (UTC).

## Enkripsi Rahasia (Wajib untuk Web/Self-host)
API key AI disimpan terenkripsi di database. Di Desktop dan CLI, kunci yang sama juga mengenkripsi kredensial koneksi DB Client.

- `ERD_ENCRYPTION_KEY`: Kunci rahasia untuk web, Docker, dan deployment server. Gunakan nilai acak minimal 32 karakter (misalnya hasil `openssl rand -hex 32`) dan gunakan nilai yang sama pada seluruh instance yang membaca database yang sama.
- `ERD_ENCRYPTION_KEY_FILE`: Path file kunci untuk Desktop/CLI jika `ERD_ENCRYPTION_KEY` tidak diatur. Desktop/CLI membuat file kunci lokal di samping database bila keduanya tidak diatur.

:::caution
Jangan commit atau membagikan `ERD_ENCRYPTION_KEY`, file kunci, atau `.env`. Jika kunci hilang atau berubah, API key AI (dan kredensial DB Client di Desktop/CLI) yang tersimpan tidak dapat didekripsi.
:::

## Mode Autentikasi Cloud (`AUTH_MODE`)

- `AUTH_MODE`: Hanya untuk deployment Cloud resmi, dengan nilai `sso`. Nilai ini mematikan login password lokal dan menyerahkan login ke ERDBPro SaaS.

:::warning
Jangan mengisi `AUTH_MODE` di Self-host. Tanpa konfigurasi SSO Cloud, pengguna tidak bisa masuk. Desktop dan CLI selalu mengabaikan variabel ini.
:::

## Supabase (Legacy)
Variabel berikut **hanya untuk deployment Supabase lama**. Biarkan kosong pada PostgreSQL murni, karena mengisinya memindahkan server ke mode Supabase.

- `SUPABASE_URL`: URL API proyek Supabase.
- `SUPABASE_ANON_KEY`: Kunci anon/public yang dipakai server untuk memvalidasi sesi Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: Kunci *service_role* untuk operasi server-side. Jangan pernah dibagikan.
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`: Nilai cadangan yang dibaca **server** bila `SUPABASE_URL` atau `SUPABASE_ANON_KEY` kosong. Browser tidak membaca variabel ini.

## MCP Web (Opsional — Web App)

Public MCP hanya berjalan pada Web App melalui HTTPS. Desktop dan CLI tetap menggunakan MCP lokal melalui `stdio`.

- `MCP_PUBLIC_URL`: URL HTTPS kanonis endpoint Streamable HTTP MCP, termasuk path, misalnya `https://app.example.com/api/mcp` atau `https://mcp.example.com/api/mcp`. Mengaktifkan public MCP saat variabel ini diisi.
- `MCP_AUTH_PROVIDER`: Provider OAuth MCP, yaitu `local` untuk PostgreSQL murni atau `supabase` untuk Supabase Auth. Jika dikosongkan, server memilih `supabase` ketika `SUPABASE_URL` tersedia dan `local` jika tidak; sebaiknya isi eksplisit pada deployment.
- `MCP_CONSENT_URL`: URL halaman consent OAuth untuk provider `local`. Default-nya adalah origin dari `MCP_PUBLIC_URL` dengan path `/oauth/consent`.
- `MCP_AUTH_ISSUER_URL`: Override issuer OAuth hanya untuk provider `supabase`. Kosongkan untuk memakai `${SUPABASE_URL}/auth/v1`; isi hanya jika Supabase Auth menggunakan custom domain.

Untuk `MCP_AUTH_PROVIDER=local`, `DATABASE_URL` harus menunjuk ke PostgreSQL murni dan `SUPABASE_URL` tidak boleh diatur. Lihat [konfigurasi MCP Web](./mcp.md#mcp-web-public-api).

## AI dan Guest Mode (Opsional)
Provider, model, dan API key AI diatur melalui **Settings → AI Configuration** dan disimpan terenkripsi di database. Tidak ada `AI_API_KEY`, `AI_BASE_URL`, atau `AI_MODEL` yang dibaca dari `.env`. Lihat [AI Configuration](./ai-setup.md).

- `AI_ALLOW_PRIVATE_BASE_URL`: Set ke `true` hanya jika sengaja mengizinkan endpoint AI di jaringan privat, misalnya Ollama di server yang sama. Biarkan `false` untuk perlindungan SSRF.
- `VITE_ENABLE_GUEST_MODE`: Set ke `true` untuk mengizinkan login sebagai Guest (bawaan `false`). Server membaca nilai ini saat berjalan.
- `GUEST_AI_ENABLED`: Bawaan `false`. Saat ini Guest belum bisa memakai AI meski nilainya `true`, jadi biarkan nonaktif.

## Storage - Cloudflare R2 (Disarankan)
Diperlukan agar gambar bisa diunggah ke Notes dan Drawings. Gambar disimpan di bucket privat dan ditampilkan melalui signed URL. Lihat [Konfigurasi R2](../cloud-storage/r2-config.md).

- `R2_ACCOUNT_ID`: ID akun Cloudflare, atau endpoint `https://<account-id>.r2.cloudflarestorage.com`.
- `R2_ACCESS_KEY_ID`: Access Key dari API Token R2.
- `R2_SECRET_ACCESS_KEY`: Secret Key dari API Token R2.
- `R2_BUCKET_NAME`: Nama bucket.
- `R2_PUBLIC_URL`: **Kosongkan.** Bila diisi, setiap unggahan gambar Notes dan Drawings ditolak dengan pesan *Private document assets require storage without a public URL.*

## Retensi Data (Opsional) {/* #retensi-data-opsional */}

| Variabel | Bawaan | Fungsi |
| :--- | :--- | :--- |
| `TRASH_RETENTION_DAYS` | Self-host: nonaktif. Cloud: `30` | Menghapus permanen item Trash yang lebih tua dari N hari. Pada Self-host, antarmuka tidak menampilkan peringatan, jadi beri tahu pengguna bila Anda mengaktifkannya. |
| `REVISION_RETENTION_DAYS` | Self-host: nonaktif. Cloud: `30` | Menghapus Version History yang lebih tua dari N hari. |
| `NOTIFICATION_READ_RETENTION_DAYS` | `90` | Menghapus notifikasi yang sudah dibaca setelah N hari. |
| `NOTIFICATION_RETENTION_DAYS` | `180` | Menghapus semua notifikasi setelah N hari. |

Retensi Trash dan Version History hanya berjalan pada mode PostgreSQL.

## Batas Gambar per Dokumen (Opsional)

- `DOCUMENT_IMAGE_LIMIT`: Jumlah gambar maksimum per dokumen (bawaan `15`).
- `DOCUMENT_IMAGE_BYTES`: Total ukuran gambar per dokumen dalam byte (bawaan `2097152`, yaitu 2 MB).

## Feedback (Opsional)

Menu **Feedback** di aplikasi mengirim pesan ke tim ERD Builder Pro melalui endpoint bawaan `https://api.erdbuilderpro.com/api/feedback`.

- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`: Bila diisi, endpoint `/api/feedback` di server ini meneruskan setiap feedback ke chat Telegram tersebut. Bila salah satu kosong, endpoint menjawab `503`. Simpan di server saja; jangan dimasukkan ke variabel `VITE_*`.
- `VITE_FEEDBACK_API_URL`: Variabel saat build untuk mengganti endpoint feedback yang dipakai frontend.

## GitHub (Legacy Supabase)

- `GITHUB_TOKEN`, `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME`: Hanya dipakai mode Supabase lama untuk memicu workflow backup GitHub Actions (`repository_dispatch` bernama `database-backup`). Mode lain tidak memakainya.

## Jaringan dan Logging (Opsional)

- `CORS_ORIGINS`: Daftar origin HTTPS dipisah koma, tanpa garis miring di akhir, misalnya `https://app.example.com,https://www.example.com`. Hanya diperlukan bila frontend dibuka dari origin yang berbeda dengan API, misalnya subdomain MCP. Request dari host yang sama tidak memerlukannya.
- `VITE_API_URL`: Variabel saat build untuk URL backend kustom. Bawaan: URL relatif.
- `LOG_LEVEL`, `LOG_SERVICE`, `LOG_ENVIRONMENT`, `LOG_REGION`: Mengatur log terstruktur. Container produksi menulis log JSON ke stdout/stderr.

## Matriks Kebutuhan

| Variabel | Self-host (PostgreSQL) | Desktop / CLI | Kegunaan |
| :--- | :---: | :---: | :--- |
| `DATABASE_URL` | ✅ | ❌ (otomatis) | Koneksi database |
| `ERD_ENCRYPTION_KEY` | ✅ | 💡 | Enkripsi API key AI |
| `ERD_ENCRYPTION_KEY_FILE` | ❌ | 💡 | File kunci Desktop/CLI |
| `APP_TIMEZONE` | 💡 | 💡 | Zona waktu server |
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME` | ⭐️ | 💡 (atau Settings → Storage) | Unggah gambar |
| `ERDBPRO_LICENSE_STATE_FILE` | ⭐️ (Commercial Team) | ❌ | State lisensi persisten |
| `MCP_PUBLIC_URL`, `MCP_AUTH_PROVIDER` | 💡 | ❌ | Public MCP Web |
| `AI_ALLOW_PRIVATE_BASE_URL` | 💡 | 💡 | Endpoint AI privat |
| `TRASH_RETENTION_DAYS`, `REVISION_RETENTION_DAYS` | 💡 | ❌ | Retensi data |
| `CORS_ORIGINS` | 💡 | ❌ | Origin frontend lain |
| `AUTH_MODE` | ❌ | ❌ | Khusus Cloud resmi |

*Keterangan: ✅ Wajib | ⭐️ Disarankan | 💡 Opsional | ❌ Tidak dipakai*

## Panduan Pemasangan

### 1. Lokal (`.env`)
Salin `.env.example` menjadi `.env` di root proyek, lalu isi nilainya:
```bash
cp .env.example .env
```

### 2. Deployment (Docker, VPS, atau Panel)
- Masukkan variabel pada dashboard panel atau konfigurasi service.
- Untuk Docker, kirim variabel melalui `--env-file .env` atau flag `-e` saat `docker run`; path lisensi harus mengarah ke volume persisten di container.
- Untuk VPS tanpa container, gunakan path absolut yang dapat ditulis oleh user service.
- Vercel tidak mendukung state file lisensi persisten yang diperlukan Self-host Commercial Team. Lihat [panduan deployment](../getting-started/deployment.md).

---
*Panduan per mode database ada di [Setup Database](./database-setup.md).*
