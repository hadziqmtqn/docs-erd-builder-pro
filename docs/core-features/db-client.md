---
sidebar_position: 10
slug: /core-features/db-client
---
# DB Client (Desktop & CLI)

**DB Client** membuka database yang sudah berjalan, misalnya database development atau staging, langsung dari ERD Builder Pro: melihat data, menjalankan query baca, dan membaca skema menjadi ERD.

:::info Hanya Desktop dan CLI
DB Client hanya tersedia di [aplikasi Desktop](../getting-started/desktop-app.md) dan [CLI](../getting-started/cli.md). Self-host Web dan Cloud tidak menyediakannya, karena server web tidak boleh menyimpan kredensial atau menjangkau database kantor. Fitur ini masih berlabel **Experimental**.
:::

## Database yang Didukung

- PostgreSQL
- MySQL
- SQLite

## Membuat Koneksi

1. Buka halaman Project, lalu klik **Database connections**. Panel **Database Accounts** terbuka. Dari dialog file baru, tombolnya bernama **Open database connections**.
2. Klik **New DB Client**. Di dialog **New Server Account**, pilih **Database Type** (PostgreSQL, MySQL, atau SQLite) dan isi **Server Name**.
   - **PostgreSQL dan MySQL**: isi Host, Port, User, dan Password.
   - **SQLite**: isi path file database (atau klik **Choose**), nama ERD yang akan dibuat, dan Project tujuan.
3. Atur keamanan koneksi:

| Pengaturan | Pilihan | Bawaan |
| :--- | :--- | :--- |
| **Environment** | Local, Development, Staging, Production | Development |
| **Safe Mode** | Normal, Protected, Read-only | Protected |
| **TLS / SSL** | Disable, Require, Verify CA, Verify Full, beserta path file CA, sertifikat klien, dan private key | Disable |
| **Query timeout (ms)** | 1.000–600.000 | 30.000 |

4. Klik **Test Connection**, lalu **Create**.
5. Untuk PostgreSQL dan MySQL, pilih database di dialog **Create DB Client**, beri nama ERD dan Project, lalu konfirmasi. Untuk SQLite, skema file langsung diimpor, misalnya *Imported 4 tables as "Demo Shop Schema"*.

![DB Client dalam mode ERD](/img/core-features/db-client-erd.png)

- **Read-only** menolak semua perubahan data dan struktur.
- Pada environment **Production** atau Safe Mode **Protected**, aksi destruktif meminta Anda mengetik nama tabel sebagai konfirmasi.
- Password dan kunci disimpan terenkripsi di database lokal Desktop/CLI.

File DB Client muncul di tab **DB Client** pada Project, filter dashboard, filter Search, dan Trash.

## Mode Tampilan

DB Client memiliki tiga mode:

### Data
- Menampilkan isi tabel, 50 baris per halaman (maksimal 200).
- Mengubah record membutuhkan primary key. Record di katalog SQLite tidak dapat diubah dari DB Client.
- Struktur tabel dapat diedit, dan SQL struktur dapat diexport atau diimport.
- Daftar dan pembuatan database tersedia untuk PostgreSQL dan MySQL.

### ERD
Menampilkan skema database sebagai ERD **baca saja**: *Schema is read-only. Layout changes do not modify the database.* Gunakan **Sync** untuk membaca ulang skema dan **Export SVG** untuk mengunduh gambarnya. Skema katalog juga dapat diimpor ke ERD biasa.

### Query
- Tombol **Run**/**Stop**, **Explain**, **Save**, dan **Export** ke JSON atau CSV.
- Hanya satu statement `SELECT` atau `WITH` per eksekusi, dan selalu dijalankan sebagai transaksi baca saja.
- Tersedia untuk PostgreSQL dan MySQL.
- Hasil dibatasi maksimal 500 baris; hasil yang terpotong diberi tanda.
- Query yang berjalan dapat dihentikan.

Query dapat disimpan dengan nama dan grup (bawaan **Ungrouped**).

## AI dan MCP

- AI Assistant di DB Client memiliki **DB Client tools**: Explain Table, Analyze Query, Generate Query, Suggest Indexes, dan Find Schema Issues. Lihat [AI Assistant](./ai-integration.md).
- Klien AI eksternal dapat membaca katalog, skema, dan menjalankan query baca lewat MCP lokal (`db_list_catalogs`, `db_read_schema`, `db_query_read_only`) tanpa menerima password. Lihat [MCP](../configuration/mcp.md).
