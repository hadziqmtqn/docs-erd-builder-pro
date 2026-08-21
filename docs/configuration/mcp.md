---
sidebar_position: 5
slug: /configuration/mcp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Model Context Protocol (MCP)

:::warning[Experimental]
Integrasi MCP masih **Experimental**. Nama tool, format input, dan batas kemampuan dapat berubah pada rilis berikutnya. MCP Web bersifat read-only; untuk MCP lokal, tinjau setiap pemanggilan tool yang akan menulis data dan jangan aktifkan persetujuan otomatis untuk tool write.
:::

MCP memungkinkan aplikasi AI eksternal seperti Codex, Claude, dan VS Code mengakses konteks ERD Builder Pro melalui tool standar. Ini berbeda dari **AI Assistant** di dalam ERD Builder Pro: percakapan tetap berlangsung di klien AI eksternal, sedangkan ERD Builder Pro menyediakan data dan tindakan yang diizinkan.

## Ketersediaan

MCP tersedia melalui dua transport yang terpisah:

- **Local stdio**: CLI melalui `erdbpro mcp` dan Desktop melalui `erdbpro mcp --desktop`;
- **Web Streamable HTTP**: deployment Web App berbasis Supabase Auth melalui URL HTTPS yang ditentukan oleh `MCP_PUBLIC_URL`.

MCP Web dinonaktifkan secara default dan tidak dapat diaktifkan pada Desktop, CLI, atau Web App yang memakai autentikasi Local PostgreSQL. Docker dapat mengekspos MCP Web hanya jika menjalankan mode Web Supabase dan memenuhi konfigurasi OAuth di bawah.

| Kemampuan | MCP lokal | MCP Web |
| --- | --- | --- |
| Transport | `stdio` | Streamable HTTP melalui HTTPS |
| Autentikasi | User instalasi lokal | OAuth 2.1 Supabase dengan PKCE |
| Notes, Flowcharts, Drawings, ERD reguler | Ya | Ya, read-only |
| Riwayat dokumen | Read dan restore terkonfirmasi | Read-only |
| DB Client / `production_db` | Read-only terbatas | **Tidak tersedia** |
| Operasi write | Proposal/apply tertentu | **Tidak tersedia** |

## MCP Web (public API)

Endpoint Web mengikuti [spesifikasi otorisasi MCP 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization). Server memublikasikan OAuth Protected Resource Metadata, mengembalikan challenge Bearer untuk request tanpa token, memvalidasi issuer, audience, masa berlaku, dan `client_id`, lalu membatasi setiap query ke data milik user OAuth tersebut.

### Menentukan domain

Gunakan satu URL kanonis lengkap, termasuk path endpoint:

```dotenv
# Domain yang sama dengan Web App
MCP_PUBLIC_URL=https://app.example.com/api/mcp

# Atau subdomain khusus
# MCP_PUBLIC_URL=https://mcp.example.com/api/mcp
```

Untuk domain yang sama, tidak ada DNS tambahan. Untuk subdomain khusus, arahkan DNS dan reverse proxy subdomain ke backend ERD Builder Pro yang sama, aktifkan TLS, pertahankan header `Host`, lalu tambahkan origin Web App ke `CORS_ORIGINS`. Path request harus sama persis dengan path pada `MCP_PUBLIC_URL`.

:::caution[URL kanonis]
`MCP_PUBLIC_URL` juga menjadi OAuth resource identifier dan nilai wajib claim JWT `aud`. Jika URL, domain, atau path berubah, perbarui hook audience dan hubungkan ulang klien agar memperoleh token baru.
:::

### Mengaktifkan OAuth Supabase

1. Di **Supabase Dashboard > Authentication > URL Configuration**, set **Site URL** ke domain Web App yang menampilkan halaman login.
2. Di **Authentication > OAuth Server**, aktifkan OAuth 2.1 dan set **Authorization Path** ke `/oauth/consent`.
3. Aktifkan **Dynamic Client Registration** jika klien MCP akan mendaftarkan dirinya otomatis. Jika dinonaktifkan, daftarkan setiap klien secara manual.
4. Buat **Custom Access Token Hook** yang, khusus token OAuth MCP, mengatur claim `aud` persis ke nilai `MCP_PUBLIC_URL`. Pertahankan semua claim wajib Supabase dan gunakan `client_id` untuk membatasi hook ke klien yang diizinkan. Lihat [Token Security Supabase](https://supabase.com/docs/guides/auth/oauth-server/token-security).
5. Set variabel server dan deploy ulang:

```dotenv
MCP_PUBLIC_URL=https://app.example.com/api/mcp
SUPABASE_URL=https://project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Hanya jika Auth memakai custom domain/issuer
# MCP_AUTH_ISSUER_URL=https://auth.example.com/auth/v1
```

Halaman `/oauth/consent` menggunakan sesi Web App yang sudah ada. Jika user belum login, aplikasi menampilkan login tanpa membuang `authorization_id`; setelah login user kembali ke halaman consent untuk menyetujui atau menolak akses.

Untuk detail pengaturan dashboard dan registrasi klien, lihat [Supabase OAuth 2.1 Getting Started](https://supabase.com/docs/guides/auth/oauth-server/getting-started).

### Memverifikasi deployment

Untuk endpoint `/api/mcp`, metadata berada di:

```bash
curl https://app.example.com/.well-known/oauth-protected-resource/api/mcp
```

Response harus berisi `resource` yang sama persis dengan `MCP_PUBLIC_URL` dan `authorization_servers` yang menunjuk ke issuer Supabase. Request MCP tanpa token harus ditolak dengan `401` dan header `WWW-Authenticate`:

```bash
curl -i -X POST https://app.example.com/api/mcp \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2026-07-28","capabilities":{},"clientInfo":{"name":"check","version":"1"}}}'
```

Di klien MCP yang mendukung remote OAuth, tambahkan URL `https://app.example.com/api/mcp`. Klien akan menemukan issuer, menjalankan OAuth Authorization Code + PKCE, membuka halaman consent ERD Builder Pro, lalu menyimpan access/refresh token sesuai kebijakan klien tersebut.

### Tool MCP Web

| Tool | Fungsi |
| --- | --- |
| `workspace_list_files` | Daftar project aktif, Notes, Flowcharts, Drawings, dan ERD reguler. |
| `document_read` | Membaca satu dokumen Web App yang diizinkan. |
| `history_list` | Daftar revisi riwayat dokumen yang diizinkan. |
| `history_read` | Membaca satu revisi tanpa restore. |

MCP Web tidak mendaftarkan tool DB Client, koneksi database, query SQL, kredensial, filesystem, trash, restore, append, atau write lain. Diagram dengan `source_type=production_db` disaring dari daftar dan ditolak jika diminta langsung.

## MCP lokal (CLI dan Desktop)

:::info[Database lokal yang digunakan]
`erdbpro mcp` membaca data instalasi CLI di `~/.erdbpro/data.db`. `erdbpro mcp --desktop` membaca database milik aplikasi Desktop. Keduanya merupakan instalasi terpisah dan tidak otomatis berbagi data.
:::

### Persiapan berdasarkan OS

1. Perbarui ERD Builder Pro ke versi yang sudah menyertakan MCP.
2. Buka aplikasi CLI atau Desktop setidaknya satu kali agar database dan user lokal dibuat.
3. Pilih tab OS Anda untuk melihat langkah instalasi. Setelah aplikasi berjalan, konfigurasi klien dibuat dari **Settings → MCP Integration**.

<Tabs>
  <TabItem value="macos" label="macOS" default>

#### CLI

```bash
npm install -g erdbpro@latest
erdbpro --version
```

Pasang Desktop dari rilis `.dmg`, buka aplikasi sekali, lalu gunakan **Settings → MCP Integration**. Jangan menyalin path `.app` atau argumen `--mcp` secara manual; panel tersebut menyediakan launcher yang benar untuk instalasi aktif.

  </TabItem>
  <TabItem value="windows" label="Windows">

#### CLI

```powershell
npm install -g erdbpro@latest
erdbpro --version
```

Pasang Desktop dari rilis `.msi`, buka aplikasi sekali, lalu gunakan **Settings → MCP Integration**. Jangan menyalin path `.exe` atau argumen `--mcp` secara manual; panel tersebut menyediakan launcher dan escaping Windows yang benar.

  </TabItem>
  <TabItem value="linux" label="Linux">

#### CLI

```bash
npm install -g erdbpro@latest
erdbpro --version
```

Pasang Desktop dari rilis `.deb`, buka aplikasi sekali, lalu gunakan **Settings → MCP Integration**. Jangan menyalin path executable atau argumen `--mcp` secara manual; panel tersebut menyediakan launcher dan escaping POSIX yang benar.

  </TabItem>
</Tabs>

Perintah `erdbpro mcp` menggunakan `stdio`, sehingga tidak menampilkan antarmuka web atau membuka port jaringan.

### Konfigurasi dari aplikasi Desktop atau CLI

Pada aplikasi Desktop atau CLI, buka **Settings → MCP Integration**. Halaman ini menampilkan launcher `stdio` yang sesuai dengan instalasi aktif dan menyediakan konfigurasi siap salin untuk:

- JetBrains AI;
- VS Code;
- Codex;
- Hermes Agent; dan
- klien MCP generik yang mendukung `stdio`.

Pilih klien, klik **Copy**, lalu tempel konfigurasi tersebut pada klien AI. `command` dan `args` dihasilkan dari runtime aktif, sehingga tidak boleh diganti dengan contoh tetap. Pada Windows, perintah Codex memakai escaping Windows; pada macOS/Linux, memakai quoting POSIX. Untuk satu klien AI, gunakan satu konfigurasi saja agar tidak menjalankan dua server MCP lokal yang sama.

### Konfigurasi klien

#### Codex

Pilih tab **Codex**, klik **Copy**, lalu jalankan perintah yang ditampilkan satu kali di terminal. Perintah tersebut sudah memuat command dan args runtime yang benar untuk OS serta instalasi Desktop/CLI aktif. Setelah itu, verifikasi dengan:

```bash
codex mcp list
```

Lihat juga [dokumentasi MCP Codex](https://developers.openai.com/codex/mcp/).

#### JetBrains AI

Buka **Settings → Tools → AI Assistant → Model Context Protocol (MCP)**, lalu salin output dari tab **JetBrains AI** ke konfigurasi JSON JetBrains. Jangan mengganti command atau args dengan `erdbpro mcp`.

Lihat juga [dokumentasi MCP JetBrains](https://www.jetbrains.com/help/ai-assistant/mcp.html).

#### Visual Studio Code

Buat `.vscode/mcp.json` di workspace atau buka **MCP: Open User Configuration**, lalu tempel output dari tab **VS Code**. Output tersebut sudah menggunakan format `servers` dan `type: "stdio"` yang dibutuhkan VS Code.

Setelah disimpan, jalankan **MCP: List Servers** lalu mulai atau restart server `erdbpro`. Lihat [referensi konfigurasi MCP VS Code](https://code.visualstudio.com/docs/agents/reference/mcp-configuration).

#### Hermes Agent

Pilih tab **Hermes Agent**, lalu isi dialog **Add MCP Server** menggunakan nilai yang ditampilkan:

- **Name**: `erdbpro`;
- **Transport**: `stdio`;
- **Command**: nilai `Command` dari panel;
- **Args**: nilai `Args` dari panel; dan
- **Environment**: kosong.

Jangan mengganti nilai tersebut dengan command lama. Jika `Args` menampilkan `(leave empty)`, biarkan field args kosong.

#### Generic MCP (STDIO)

Untuk agen lain yang menerima konfigurasi MCP standar, pilih tab **Generic MCP (STDIO)** dan tempel JSON yang dihasilkan. Gunakan command dan args apa adanya dari panel.

Setelah koneksi berhasil, uji dengan permintaan read-only seperti “daftarkan project dan dokumen Desktop saya”.

### Tool lokal yang tersedia

| Tool | Akses | Fungsi |
| --- | --- | --- |
| `workspace_list_files` | Read-only | Daftar project, Notes, Flowchart, dan ERD. |
| `document_read` | Read-only | Membaca satu Note, Flowchart, atau ERD. |
| `history_list` | Read-only | Daftar snapshot pada `entity_changes`. |
| `history_read` | Read-only | Membaca satu snapshot tanpa melakukan restore. |
| `history_restore_propose` | Read-only | Membuat preview pemulihan dari snapshot. |
| `history_restore_apply` | Write | Menerapkan pemulihan snapshot yang telah dikonfirmasi. |
| `db_list_catalogs` | Read-only | Daftar katalog DB Client tanpa password atau kunci TLS. |
| `db_read_schema` | Read-only | Membaca tabel, kolom, indeks, check, dan foreign key. |
| `db_query_read_only` | Read-only | Menjalankan satu `SELECT`/CTE pada PostgreSQL atau MySQL. |
| `note_append_propose` | Read-only | Membuat preview penambahan teks pada Note. |
| `note_append_apply` | Write | Menerapkan proposal Append yang telah dikonfirmasi. |

Drawings belum disertakan. Write untuk Flowchart, ERD, struktur database, dan record DB Client juga belum tersedia.

### Perlindungan data lokal

- MCP tidak mengirim password database, private key TLS, atau kredensial koneksi ke klien.
- Query DB Client dipaksa menggunakan sesi read-only, hanya menerima satu `SELECT`/CTE, dan membatasi hasil maksimal 500 baris.
- Append Notes memakai dua tahap: proposal lalu apply dengan ID konfirmasi yang sama.
- Proposal kedaluwarsa setelah 10 menit dan ditolak jika Note berubah setelah preview dibuat.
- Teks yang ditambahkan di-escape sebelum disimpan.
- Sebelum append atau restore diterapkan, versi pengaman disimpan ke `entity_changes` dengan sumber `mcp` atau `restore`.

:::caution
Persetujuan tool tetap dikendalikan oleh klien MCP. Periksa nama dokumen, preview, dan isi perubahan sebelum menyetujui `note_append_apply` atau `history_restore_apply`.
:::

## Contoh penggunaan

- “Daftar semua ERD dalam project ini dan jelaskan tabel yang berhubungan dengan autentikasi.”
- “Baca schema katalog PostgreSQL ini dan sarankan indeks tanpa mengubah database.”
- “Baca riwayat Note ini dan bandingkan dua snapshot terakhir.”
- “Buat proposal untuk mengembalikan ERD ini ke snapshot tertentu, lalu tampilkan preview tanpa menerapkannya.”
- “Buat proposal untuk menambahkan ringkasan berikut ke Note dokumentasi.”
- “Melalui MCP Web, baca Drawings dalam project ini tanpa mengubah workspace.”

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

### MCP Web selalu mengembalikan `401`

Pastikan token memiliki `iss` yang sama dengan `MCP_AUTH_ISSUER_URL` (atau `${SUPABASE_URL}/auth/v1`), claim `client_id`, claim `exp`, dan claim `aud` yang sama persis dengan `MCP_PUBLIC_URL`. Token sesi Web App biasa memiliki audience berbeda dan sengaja ditolak.

### Metadata OAuth tidak ditemukan

Pastikan reverse proxy meneruskan path `/.well-known/oauth-protected-resource/...` ke backend yang sama. Untuk `MCP_PUBLIC_URL=https://mcp.example.com/api/mcp`, path metadata adalah `/.well-known/oauth-protected-resource/api/mcp` pada host `mcp.example.com`.
