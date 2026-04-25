---
sidebar_position: 2
slug: /security-backup/auto-backup
---
# Backup Otomatis

Untuk memastikan keamanan data jangka panjang, ERD Builder Pro mendukung backup otomatis menggunakan **GitHub Actions**.

## Konfigurasi GitHub Actions
1. Pastikan repositori Anda memiliki file `.github/workflows/auto-backup.yml`.
2. Buka menu **Settings > Secrets and variables > Actions** di repositori GitHub Anda.
3. Tambahkan *Repository Secrets* yang diperlukan. Daftar lengkap variabel dapat dilihat pada halaman **[Konfigurasi Environment](/configuration/env-variables)**.

### Detail Khusus: SUPABASE_DB_URL
Variabel `SUPABASE_DB_URL` sangat penting untuk proses *dumping* database. Format yang digunakan adalah **URI**:
`postgresql://postgres.[project-id]:[password]@[region].pooler.supabase.com:6543/postgres`

**Cara mendapatkan URL ini:**
1. Masuk ke dashboard **Supabase**.
2. Pilih database Anda dan klik tombol **Connect**.
3. Pilih tab **Direct (Connecting String)**.
4. **Penting**: Gunakan mode **Transaction Pooler** (Port 6543) jika GitHub Actions Anda mengalami kendala koneksi IPv6. Pastikan opsi "Display connection pooler" aktif.
5. Salin URL tersebut dan ganti `[YOUR-PASSWORD]` dengan password database Anda.

> [!IMPORTANT]
> GitHub Actions runner saat ini tidak mendukung koneksi IPv6 secara bawaan. Karena proyek Supabase baru seringkali menggunakan IPv6 untuk koneksi langsung (port 5432), sangat disarankan untuk menggunakan **Transaction Pooler** yang mendukung IPv4 agar skrip backup dapat terhubung dengan sukses.

## Jadwal Backup
Secara default, skrip backup akan berjalan setiap hari pada pukul **00:00 UTC**. Anda dapat mengubah jadwal ini pada bagian `cron` di file `.yml`:
```yaml
on:
  schedule:
    - cron: '0 0 * * *' # Menjalankan backup setiap tengah malam
```
