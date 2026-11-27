---
sidebar_position: 5
slug: /getting-started/desktop-app
---
# Aplikasi Desktop

Aplikasi Desktop menjalankan ERD Builder Pro di komputer Anda dengan database SQLite lokal. Tidak ada halaman login dan tidak perlu server. Workspace yang tersedia hanya **Personal**.

## Unduh dan Pasang

Unduh installer dari halaman [GitHub Releases](https://github.com/hadziqmtqn/erd-builder-pro/releases/latest). Pilih file sesuai sistem Anda:

| Sistem | File |
| :--- | :--- |
| macOS Apple Silicon (M1 ke atas) | `ERD-Builder-Pro_<versi>_aarch64.dmg` |
| macOS Intel | `ERD-Builder-Pro_<versi>_x86_64.dmg` |
| Windows x64 | `ERD Builder Pro_<versi>_x64-setup.exe` atau `ERD Builder Pro_<versi>_x64_en-US.msi` |
| Linux x86_64 | `ERD Builder Pro_<versi>_amd64.AppImage` atau `ERD Builder Pro_<versi>_amd64.deb` |

File lain di halaman rilis, seperti `.sig`, `.app.tar.gz`, dan `latest.json`, dipakai oleh updater aplikasi; Anda tidak perlu mengunduhnya. Rilis yang namanya mengandung `-rc` adalah *pre-release* untuk pengujian.

### Peringatan Saat Pertama Dibuka
Installer Windows belum ditandatangani Authenticode, dan aplikasi macOS belum ditandatangani dengan Apple Developer ID maupun dinotarisasi. Karena itu macOS (Gatekeeper) atau Windows (SmartScreen) dapat menampilkan peringatan atau mencegah aplikasi dibuka. Di macOS, tutup dialog *Apple could not verify…*, buka **System Settings → Privacy & Security**, lalu klik **Open Anyway** di samping ERD Builder Pro.

Di macOS, pindahkan aplikasi ke folder **Applications**. Aplikasi yang dijalankan dari lokasi read-only, misalnya langsung dari file `.dmg`, menampilkan pesan **Move ERD Builder Pro to Applications to update** dan tidak bisa memperbarui dirinya.

## Update

Aplikasi memeriksa update sekitar 5 detik setelah dibuka. Bila ada versi baru:

1. Muncul notifikasi **Update Available** dengan teks *New version (vX) is ready.*
2. Pilih **Update Now** untuk mengunduh dan memasang, atau **Later** untuk menundanya.
3. Setelah **Update installed successfully!**, aplikasi dibuka ulang dengan versi baru.

Pemeriksaan manual:
- macOS: menu aplikasi **Check for Updates…**.
- Semua sistem: dialog **About**, tombol **Download Update**.

Hasilnya **You're up to date** bila sudah versi terbaru, atau **Check failed** bila pemeriksaan gagal.

Bila server lokal aplikasi gagal berjalan, jendela updater terpisah dapat muncul dengan pilihan **Install and Restart**, **Show Logs**, dan **Download manually**.

## Lokasi Data {/* #lokasi-data */}

Database (`data.db`) dan file pendukungnya berada di folder data aplikasi:

| Sistem | Folder |
| :--- | :--- |
| macOS | `~/Library/Application Support/com.erdbuilderpro.app` |
| Windows | `%APPDATA%\com.erdbuilderpro.app` |
| Linux | `$XDG_DATA_HOME/com.erdbuilderpro.app` atau `~/.local/share/com.erdbuilderpro.app` |

Kunci enkripsi lokal (`.erd-encryption-key`) dibuat di samping database. Simpan folder ini bila Anda memindahkan data ke komputer lain.

## Fitur Khusus Desktop

Fitur berikut hanya ada di Desktop dan CLI:

- [DB Client](../core-features/db-client.md) untuk membuka database PostgreSQL, MySQL, dan SQLite.
- Panel [Git Repository](../core-features/git-repository.md) untuk membandingkan ERD dengan skema di repositori.
- MCP lokal untuk klien AI seperti Codex, VS Code, dan JetBrains AI. Lihat [MCP](../configuration/mcp.md).
- **Settings → Storage** untuk mengisi storage Cloudflare R2 atau S3-compatible tanpa file environment.
- **Database Backup** dengan pilihan folder penyimpanan, serta **Import Database**.

Gambar yang disisipkan ke Drawings disimpan di dalam file gambar itu sendiri, jadi tidak membutuhkan storage. Gambar di Notes tetap membutuhkan storage.

Desktop tidak mendukung PostgreSQL sebagai database aplikasi, Team Workspace, komentar, maupun notifikasi.
