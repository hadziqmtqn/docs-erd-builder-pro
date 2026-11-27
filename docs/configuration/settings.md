---
sidebar_position: 4
slug: /configuration/settings
---
# Settings

Jendela **Settings** dibuka dari menu profil di pojok kiri bawah sidebar. Tab yang tampil bergantung pada cara Anda memakai aplikasi dan peran akun Anda.

## Daftar Tab

| Grup | Tab | Tampil untuk |
| :--- | :--- | :--- |
| General | **Account** | Semua pengguna, kecuali di Cloud (akun Cloud dikelola di ERDBPro SaaS) |
| General | **Appearance** | Semua pengguna |
| General | **Storage** | Desktop dan CLI |
| General | **Usage** | Cloud |
| Feature | **AI Configuration** | SuperAdmin Self-host, Desktop, dan CLI. Tidak ada di Cloud. |
| Feature | **Application License** | SuperAdmin Self-host |
| Feature | **MCP Integration** | Semua pengguna |
| Feature | **AI Rules** | Semua pengguna |
| Feature | **System Prompts** | Semua pengguna |
| More | **Keymap** | Semua pengguna |
| More | **Export Data**, **Import Data**, **Database Backup** | SuperAdmin Self-host, Desktop, dan CLI |
| More | **What's New** | Semua pengguna |

Pengguna Guest hanya melihat **Appearance**, **Keymap**, dan **What's New**.

Pengelolaan Team dan pengguna Self-host tidak berada di Settings, melainkan di menu sidebar **Instance Administration → Team / Users** milik SuperAdmin. Di Cloud, menu **Manage account & billing** membuka ERDBPro SaaS.

## Appearance

Pilih tema **Light**, **Dark**, atau **System** (mengikuti sistem operasi). Bawaannya **System**. Pilihan disimpan di browser.

## Storage (Desktop dan CLI)

Tab **Storage** (berjudul **Storage Configuration**) mengatur tempat gambar Notes diunggah tanpa file environment:

1. Pilih **Cloudflare R2** atau **S3-Compatible**.
2. Isi kredensial dan nama bucket.
3. Klik **Test Connection**, lalu **Save Configuration**.

Konfigurasi yang disimpan di sini dipakai sebagai pengganti variabel `R2_*`. Biarkan kolom **Public URL (optional)** kosong, karena unggahan gambar ditolak bila kolom ini diisi.

## Usage (Cloud)

Menampilkan pemakaian storage workspace aktif, misalnya *&lt;terpakai&gt; of &lt;batas&gt; used*, rincian dokumen dan gambar, serta tombol **Open Library**. Lihat [Kuota Cloud](../cloud-storage/cloud-quota.md).

## Application License (Self-host)

Tab ini mengaktifkan lisensi Self-host Commercial untuk Team.

- Status menampilkan **Active: &lt;plan&gt;** atau **No commercial license is active**, jumlah **Active Teams** dan **Active members** terhadap batas lisensi, serta waktu **Last checked**.
- Untuk aktivasi, isi **Instance license key**, lalu klik **Activate license** dan konfirmasi. Kolom **Activation grant** hanya diperlukan setelah binding deployment di-reset.
- **Check license** memperbarui status dari server lisensi.

Lihat juga [Deployment](../getting-started/deployment.md#persistent-license-state-paid-self-host) untuk kebutuhan storage persisten.

## MCP Integration

Menampilkan konfigurasi untuk menghubungkan klien AI eksternal. Di Web, bagian **Public MCP Integration** menampilkan URL MCP. Di Desktop dan CLI, bagian **Connect AI Clients** menyediakan konfigurasi untuk JetBrains AI, VS Code, Codex, Hermes Agent, dan Generic MCP (STDIO). Lihat [MCP](./mcp.md).

## AI Rules {/* #ai-rules */}

Aturan tambahan yang dikirim ke AI Assistant sebagai instruksi sistem. Tab ini memiliki sub-tab **ERD**, **Notes**, **Flowchart**, dan **DB Client**, masing-masing untuk konteks editor terkait. Klik **Save Rules** untuk menyimpan.

- **Self-host:** satu set aturan bersama yang hanya dapat diubah SuperAdmin. Pengguna lain melihatnya dalam mode baca.
- **Desktop, CLI, dan Cloud:** setiap pengguna mengatur aturannya sendiri.

Aturan bawaan ditulis dalam Bahasa Indonesia dan dapat Anda ubah.

## System Prompts

Prompt sistem yang dapat dipilih untuk AI Assistant.

1. Klik **Create Prompt**.
2. Isi **Name**, **Category** (*System Instruction*, *Context*, *Format*, atau *Custom*), dan isi prompt.
3. Pada kartu prompt, klik **Set Active** untuk memakainya.

Satu prompt aktif per cakupan. Prompt **Global** (hanya dapat dibuat SuperAdmin Self-host) berlaku untuk semua pengguna, sedangkan prompt **Personal** hanya untuk Anda. Bila keduanya aktif, keduanya dikirim. Di Cloud, prompt global diatur dari ERDBPro SaaS.

## Keymap

Daftar pintasan keyboard untuk General, Notes, ERD Builder, Flowchart, dan DB Client (Desktop/CLI). Daftar ini hanya untuk dibaca; pintasan belum dapat diubah. Untuk Drawings, lihat menu Help di Excalidraw.

## Export Data, Import Data, dan Database Backup

Tab ini untuk SuperAdmin Self-host, Desktop, dan CLI. Database Backup dijelaskan di [Database Backup](../security-backup/manual-backup.md).
