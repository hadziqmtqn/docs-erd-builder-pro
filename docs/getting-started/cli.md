---
sidebar_position: 6
slug: /getting-started/cli
---
# CLI (`erdbpro`)

Paket npm `erdbpro` menjalankan ERD Builder Pro di komputer Anda tanpa clone repositori, tanpa Docker, dan tanpa menyiapkan database. Datanya tersimpan di SQLite lokal, dan aplikasi langsung masuk tanpa halaman login.

## Persyaratan
- **Node.js 22** atau lebih baru. Perintah `start`, `mcp`, dan `schema` berhenti dengan pesan `ERD Builder Pro requires Node.js 22+.` bila versinya lebih rendah.

## Mulai Cepat

```bash
npx erdbpro
```

Server berjalan di `http://localhost:3101`, lalu muncul menu interaktif.

Atau pasang secara global:

```bash
npm install -g erdbpro
erdbpro
```

## Menu Interaktif

Menjalankan `erdbpro` tanpa argumen sama dengan `erdbpro start`. Menu yang muncul:

```
▶ Web UI (Open in Browser)
  Hide to Background
  Exit
```

- **↑ ↓** memindahkan pilihan, **Enter** menjalankan aksi, **q** keluar.
- Bila ada versi baru, menu menambahkan **Update to vX (current: vY)** di paling atas.
- Di macOS, CLI juga menampilkan ikon di menu bar bila tersedia di paket.

## Daftar Perintah

| Perintah | Fungsi |
| :--- | :--- |
| `erdbpro` atau `erdbpro start` | Menjalankan server dan menampilkan menu. |
| `erdbpro start --port 4000` | Memakai port lain (bawaan `3101`). |
| `erdbpro start --background` | Menjalankan server di background. |
| `erdbpro start --open` | Melewati menu dan langsung membuka browser. |
| `erdbpro start --force` | Memulai server meski server sebelumnya tampak masih berjalan. |
| `erdbpro stop` | Menghentikan server background. |
| `erdbpro status` | Memeriksa apakah server berjalan. |
| `erdbpro update` | Memeriksa versi baru dan menampilkan perintah instalasinya. |
| `erdbpro mcp` | Menjalankan server MCP lokal lewat stdio. Lihat [MCP](../configuration/mcp.md). |
| `erdbpro schema check` | Memvalidasi sumber skema di repositori Git tanpa menjalankan aplikasi. |
| `erdbpro schema diff` | Membandingkan sumber skema di dua Git ref tanpa checkout. |
| `erdbpro --version` | Menampilkan versi CLI. |

## Update

```bash
erdbpro update
```

Perintah ini memeriksa versi terbaru di npm, lalu mencetak salah satu hasil:

- `✅ erdbpro vX is up to date.`
- `⬆  Update vX → vY`, diikuti perintah yang perlu dijalankan.

`erdbpro update` tidak memasang apa pun sendiri. Jalankan perintah yang ditampilkan, misalnya:

```bash
npm install -g erdbpro@latest --prefer-online
```

Versi beta (nomor versi mengandung `-beta`) memakai tag npm `beta`. Item **Update** di menu interaktif menghentikan server lalu menampilkan perintah yang sama. Setelah update, jalankan lagi `erdbpro`.

## Pemeriksaan Skema di Repositori {/* #pemeriksaan-skema-di-repositori */}

`schema check` dan `schema diff` membaca sumber skema langsung dari repositori Git, cocok untuk dipakai di CI. Sumber yang dikenali:

- migrasi Laravel di `database/migrations/*.php`;
- file `.dbml`;
- file `schema.sql`;
- file `.sql` di dalam folder `migrations/`.

### `schema check`

```bash
erdbpro schema check --repo . --fail-on-warnings
```

| Opsi | Keterangan |
| :--- | :--- |
| `-r, --repo <path>` | Folder repositori. Bawaan: folder saat ini. |
| `--ref <git-ref>` | Git ref yang dibaca. Bawaan: `WORKTREE` (isi folder saat ini). |
| `--source <id>` | Sumber skema bila ada lebih dari satu, misalnya `laravel:database/migrations`, `dbml:schema.dbml`, atau `sql:database/schema.sql`. |
| `--json` | Output JSON. |
| `--fail-on-warnings` | Keluar dengan kode `2` bila ada peringatan. |

### `schema diff`

```bash
erdbpro schema diff --base origin/main --markdown --fail-on-destructive
```

| Opsi | Keterangan |
| :--- | :--- |
| `-r, --repo <path>` | Folder repositori. Bawaan: folder saat ini. |
| `--base <git-ref>` | Ref pembanding (wajib). |
| `--head <git-ref>` | Ref yang diperiksa. Bawaan: `WORKTREE`. |
| `--source <id>` | Sumber skema yang dibandingkan. |
| `--json` / `--markdown` | Format output. |
| `--fail-on-destructive` | Keluar dengan kode `2` bila ada perubahan destruktif. |

Kedua perintah keluar dengan kode `1` bila terjadi error.

## Lokasi Data {/* #lokasi-data */}

Semua data CLI berada di `~/.erdbpro/`:

| File | Isi |
| :--- | :--- |
| `data.db` | Database SQLite. |
| `server.pid` | PID server background. |
| `logs/` | Log server. |
| `update.json` | Cache pemeriksaan update. |

Kunci enkripsi lokal dibuat di samping database bila `ERD_ENCRYPTION_KEY` dan `ERD_ENCRYPTION_KEY_FILE` tidak diatur.

## Fitur Khusus CLI dan Desktop

CLI menjalankan mode instalasi lokal yang sama dengan aplikasi Desktop, sehingga fitur berikut tersedia: [DB Client](../core-features/db-client.md), [Git Repository](../core-features/git-repository.md), MCP lokal, dan **Settings → Storage**. Team Workspace, komentar, dan notifikasi tidak tersedia karena CLI hanya untuk satu pengguna.

## Uninstall

```bash
npm uninstall -g erdbpro
rm -rf ~/.erdbpro
```

:::caution
Perintah `rm -rf ~/.erdbpro` menghapus database lokal Anda. Buat backup lebih dulu bila datanya masih diperlukan.
:::
