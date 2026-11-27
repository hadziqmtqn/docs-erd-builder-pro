---
sidebar_position: 2
slug: /security-backup/auto-backup
---
# Auto Backup

**Auto Backup** membuat backup database secara terjadwal dari dalam aplikasi. Tersedia di Self-host (PostgreSQL), Desktop, dan CLI, di tempat yang sama dengan [Database Backup](./manual-backup.md). Cloud tidak memiliki menu ini.

## Mengaktifkan Auto Backup

1. Buka **Settings → Database Backup**, lalu tab **Settings**.
2. Centang **Auto Backup**.
3. Pilih **Interval**: 15 minutes, 30 minutes, 1 hour, 6 hours, 12 hours, atau 24 hours.
4. Pilih **Keep**: simpan 3, 5, 10, 20, 30, atau 50 backup terakhir.

Nilai bawaan: nonaktif, setiap 1 jam, menyimpan 10 backup.

Server memeriksa jadwal setiap menit, jadi Auto Backup hanya berjalan selama server (atau aplikasi Desktop/CLI) menyala.

## Aturan Retensi

:::caution
Pengaturan **Keep** menghitung **semua** backup yang selesai, termasuk backup manual dan backup pengaman `PreRestore_…`. Setelah setiap Auto Backup, backup yang lebih lama dari jumlah tersebut dihapus dari folder lokal beserta catatannya. Salinan di storage tidak ikut dihapus.

Bila Anda perlu menyimpan backup tertentu lebih lama, unduh dan simpan di tempat lain.
:::

## Pemeriksaan Rutin

- Lihat tab **Histories** secara berkala untuk memastikan backup berstatus **Completed**.
- Uji pemulihan di lingkungan terpisah sesekali. Lihat [Restore & Pemulihan](./disaster-recovery.md).
- Di Docker, pastikan folder backup berada di volume persisten atau storage dikonfigurasi. Lihat [Backup di Docker](../getting-started/deployment.md#backup-di-docker).

## Supabase (Legacy)

Deployment Supabase lama tidak memiliki Auto Backup di aplikasi. Tombol **Create Backup** di mode itu memicu workflow GitHub Actions (`repository_dispatch` bernama `database-backup`) bila `GITHUB_TOKEN`, `GITHUB_REPO_OWNER`, dan `GITHUB_REPO_NAME` diisi. Workflow `auto-backup.yml` di repositori juga berjalan harian pukul 00:00 UTC, menjalankan `pg_dump` atas `SUPABASE_DB_URL`, lalu mengunggah hasilnya ke R2 di `erd-builder-pro/backups/`. Atur secret `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL`, dan variabel `R2_*` di repositori GitHub Anda.
