---
sidebar_position: 2
slug: /getting-started/requirements
---
# Persyaratan Sistem

Kebutuhan sistem bergantung pada cara Anda memakai ERD Builder Pro.

## Per Cara Penggunaan

| Cara | Yang dibutuhkan |
| :--- | :--- |
| **Cloud** | Browser versi terbaru (Chrome, Firefox, Safari, atau Edge). Tidak perlu instalasi. |
| **Desktop** | macOS (Apple Silicon atau Intel), Windows x64, atau Linux x86_64 (AppImage atau `.deb`). Lihat [Aplikasi Desktop](./desktop-app.md). |
| **CLI** | **Node.js 22** atau lebih baru dan npm. Lihat [CLI](./cli.md). |
| **Self-host dengan Docker** | Docker dan database **PostgreSQL**. Node.js sudah ada di dalam image (Node 26.12.1 atau lebih baru). Image tersedia untuk arsitektur amd64 (x86_64). |
| **Self-host dari source** | Node.js 22 (versi yang dipakai CI), npm, Git, dan PostgreSQL. |

## Layanan Opsional

- **Cloudflare R2**: diperlukan agar gambar bisa diunggah ke Notes dan Drawings di Web dan Self-host. Tanpa storage, unggahan gambar ditolak. Desktop dan CLI juga bisa memakai storage S3-compatible dari **Settings → Storage**. Lihat [Konfigurasi R2](../cloud-storage/r2-config.md).
- **Provider AI**: API key OpenAI, Google Gemini, Anthropic, atau provider yang kompatibel dengan OpenAI. Lihat [AI Configuration](../configuration/ai-setup.md).
- **Lisensi Self-host Commercial**: hanya bila Anda membutuhkan Team Workspace di Self-host. Personal Workspace gratis.

## Koneksi Jaringan

- **Self-host Commercial** membutuhkan akses HTTPS keluar ke server lisensi `https://license.erdbuilderpro.com` untuk aktivasi dan pemeriksaan berkala. Bila server lisensi tidak terjangkau, Team tetap berjalan sampai 72 jam sejak pemeriksaan terakhir yang berhasil.
- **AI Assistant** membutuhkan akses dari server ke provider AI yang dipilih.
- **Unggah gambar** membutuhkan akses dari server ke bucket R2.
- Desktop dan CLI dapat dipakai tanpa internet, kecuali untuk fitur di atas dan pemeriksaan update.

:::note
Supabase tidak lagi menjadi persyaratan. Mode Supabase hanya dipertahankan untuk deployment lama; instalasi baru memakai PostgreSQL. Lihat [Setup Database](../configuration/database-setup.md).
:::
