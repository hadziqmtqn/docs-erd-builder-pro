---
sidebar_position: 5
slug: /configuration/mcp
---

# Model Context Protocol (MCP)

:::warning[Experimental]
Integrasi MCP masih **Experimental**. Nama tool, format input, dan batas kemampuan dapat berubah pada rilis berikutnya. Tinjau setiap pemanggilan tool yang akan menulis data dan jangan aktifkan persetujuan otomatis untuk tool write.
:::

MCP memungkinkan aplikasi AI eksternal seperti Codex, Claude, dan VS Code mengakses konteks ERD Builder Pro melalui tool standar. Ini berbeda dari **AI Assistant** di dalam ERD Builder Pro: percakapan tetap berlangsung di klien AI eksternal, sedangkan ERD Builder Pro menyediakan data dan tindakan yang diizinkan.

## Ketersediaan

MCP hanya tersedia pada:

- aplikasi **CLI** melalui `erdbpro mcp`;
- aplikasi **Desktop** melalui `erdbpro mcp --desktop`.

MCP tidak tersedia pada Web App, Docker self-host, atau endpoint HTTP publik. Server berjalan secara lokal menggunakan transport `stdio` dan dihentikan saat klien MCP ditutup.

:::info[Database lokal yang digunakan]
`erdbpro mcp` membaca data instalasi CLI di `~/.erdbpro/data.db`. `erdbpro mcp --desktop` membaca database milik aplikasi Desktop. Keduanya merupakan instalasi terpisah dan tidak otomatis berbagi data.
:::

## Persiapan

1. Perbarui ERD Builder Pro ke versi yang sudah menyertakan MCP.
2. Buka aplikasi CLI atau Desktop setidaknya satu kali agar database dan user lokal dibuat.
3. Untuk CLI, pastikan perintah berikut dapat dijalankan dari terminal:

```bash
erdbpro mcp
```

Perintah tersebut menggunakan `stdio`, sehingga tidak menampilkan antarmuka web atau membuka port jaringan.

## Konfigurasi klien

### Codex

Tambahkan server melalui CLI Codex:

```bash
codex mcp add erdbpro -- erdbpro mcp
codex mcp list
```

Atau tambahkan konfigurasi berikut ke `~/.codex/config.toml`:

```toml
[mcp_servers.erdbpro]
command = "erdbpro"
args = ["mcp"]
default_tools_approval_mode = "writes"
```

Lihat juga [dokumentasi MCP Codex](https://developers.openai.com/codex/mcp/).

### Claude Desktop

Tambahkan server berikut pada `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "erdbpro": {
      "command": "erdbpro",
      "args": ["mcp"]
    }
  }
}
```

Simpan konfigurasi lalu restart Claude Desktop. Untuk Claude Code, perintah setara adalah:

```bash
claude mcp add erdbpro -- erdbpro mcp
```

Lihat [panduan MCP Claude](https://docs.anthropic.com/en/docs/mcp) untuk lokasi konfigurasi setiap sistem operasi.

### Visual Studio Code

Buat `.vscode/mcp.json` di workspace atau buka **MCP: Open User Configuration**, lalu gunakan:

```json
{
  "servers": {
    "erdbpro": {
      "type": "stdio",
      "command": "erdbpro",
      "args": ["mcp"]
    }
  }
}
```

Setelah disimpan, jalankan **MCP: List Servers** dan mulai atau restart `erdbpro`. Lihat [referensi konfigurasi MCP VS Code](https://code.visualstudio.com/docs/agents/reference/mcp-configuration).

### Menggunakan data aplikasi Desktop

Gunakan command yang sama dengan tambahan argumen `--desktop`:

```json
{
  "command": "erdbpro",
  "args": ["mcp", "--desktop"]
}
```

Launcher mendeteksi executable Desktop pada lokasi instalasi standar macOS, Windows, dan Linux. Untuk mode development, jalankan klien MCP dengan working directory di root repository agar database Desktop dev digunakan. Jika aplikasi dipasang pada lokasi khusus, set `ERDBPRO_DESKTOP_MCP_TARGET` ke path executable Desktop.

## Tool yang tersedia

| Tool | Akses | Fungsi |
| --- | --- | --- |
| `workspace_list_files` | Read-only | Daftar project, Notes, Flowchart, dan ERD. |
| `document_read` | Read-only | Membaca satu Note, Flowchart, atau ERD. |
| `history_list` | Read-only | Daftar snapshot pada `entity_changes`. |
| `history_read` | Read-only | Membaca satu snapshot tanpa melakukan restore. |
| `db_list_catalogs` | Read-only | Daftar katalog DB Client tanpa password atau kunci TLS. |
| `db_read_schema` | Read-only | Membaca tabel, kolom, indeks, check, dan foreign key. |
| `db_query_read_only` | Read-only | Menjalankan satu `SELECT`/CTE pada PostgreSQL atau MySQL. |
| `note_append_propose` | Read-only | Membuat preview penambahan teks pada Note. |
| `note_append_apply` | Write | Menerapkan proposal Append yang telah dikonfirmasi. |

Drawings belum disertakan. Write untuk Flowchart, ERD, struktur database, dan record DB Client juga belum tersedia.

## Perlindungan data

- MCP tidak mengirim password database, private key TLS, atau kredensial koneksi ke klien.
- Query DB Client dipaksa menggunakan sesi read-only, hanya menerima satu `SELECT`/CTE, dan membatasi hasil maksimal 500 baris.
- Append Notes memakai dua tahap: proposal lalu apply dengan ID konfirmasi yang sama.
- Proposal kedaluwarsa setelah 10 menit dan ditolak jika Note berubah setelah preview dibuat.
- Teks yang ditambahkan di-escape sebelum disimpan.
- Sebelum write diterapkan, versi pengaman disimpan ke `entity_changes` dengan sumber `mcp`.

:::caution
Persetujuan tool tetap dikendalikan oleh klien MCP. Periksa nama Note, preview, dan isi perubahan sebelum menyetujui `note_append_apply`.
:::

## Contoh penggunaan

- “Daftar semua ERD dalam project ini dan jelaskan tabel yang berhubungan dengan autentikasi.”
- “Baca schema katalog PostgreSQL ini dan sarankan indeks tanpa mengubah database.”
- “Baca riwayat Note ini dan bandingkan dua snapshot terakhir.”
- “Buat proposal untuk menambahkan ringkasan berikut ke Note dokumentasi.”

## Pemecahan masalah

### `erdbpro: command not found`

Pastikan paket CLI terpasang secara global dan direktori binary npm tersedia pada `PATH`:

```bash
npm install -g erdbpro@latest
erdbpro --version
```

### User lokal tidak ditemukan

Buka instalasi ERD Builder Pro yang sama setidaknya satu kali, lalu jalankan ulang klien MCP.

### Terdapat beberapa user lokal

Tetapkan user secara eksplisit melalui environment variable `ERDBPRO_MCP_USER_ID` pada konfigurasi MCP klien.

### Koneksi DB Client gagal

Uji koneksi dari panel DB Client terlebih dahulu. MCP memakai account, mode TLS, safe mode, dan timeout yang tersimpan di aplikasi tanpa mengekspos kredensial tersebut.
