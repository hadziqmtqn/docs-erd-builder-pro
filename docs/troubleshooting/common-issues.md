---
sidebar_position: 1
slug: /troubleshooting/common-issues
---
# Masalah Umum

Halaman ini merangkum kendala teknis yang sering ditemui beserta solusinya.

## 1. Halaman "Create administrator account" Muncul Lagi atau Login `admin@local.dev` Ditolak

**Penyebab**: `admin@local.dev` / `admin123` adalah kredensial internal Desktop/CLI dan sengaja ditolak di Self-host. Self-host tidak membuat akun bawaan; SuperAdmin dibuat melalui halaman **Create administrator account**.

**Solusi**:
- Buat akun dengan email dan password baru melalui halaman **Create administrator account**.
- Pastikan server dan perintah seed memakai `DATABASE_URL` yang sama.
- Pastikan `ERD_ENCRYPTION_KEY` tetap sama pada setiap restart dan deployment.

## 2. Lupa Password di Self-host

Tidak ada fitur "Lupa Password" di antarmuka Self-host. Jalankan script berikut dari folder proyek:

```bash
npm run reset-password -- --email email-anda@example.com --password passwordbaru123
```

Untuk Docker:

```bash
docker exec -it erd-builder-pro npm run reset-password -- --email email-anda@example.com --password passwordbaru123
```

Password minimal 6 karakter. Script ini mendukung PostgreSQL murni dan SQLite, dan tidak perlu restart. Mode Supabase memakai dashboard Supabase untuk reset password. Desktop dan CLI tidak memakai password.

## 3. API Key AI Tidak Dapat Didekripsi

**Gejala**: AI menampilkan error bahwa API key tersimpan tidak dapat didekripsi, atau koneksi DB Client di Desktop/CLI gagal setelah pindah komputer.

**Penyebab**: `ERD_ENCRYPTION_KEY` hilang atau berubah, atau file `.erd-encryption-key` di Desktop/CLI tidak ikut dipindahkan.

**Solusi**:
- Pulihkan nilai `ERD_ENCRYPTION_KEY` yang sama dari secret manager atau backup `.env`.
- Untuk Desktop/CLI, pastikan file `.erd-encryption-key` di samping database tetap ada, atau atur `ERD_ENCRYPTION_KEY_FILE`.
- Bila kunci lama tidak bisa dipulihkan, simpan ulang API key di **Settings → AI Configuration**.

## 4. Gambar Gagal Diunggah

| Pesan | Penyebab dan solusi |
| :--- | :--- |
| *Storage is not configured. Please add storage configuration in Settings.* | Storage belum diatur. Isi variabel `R2_*` di server, atau **Settings → Storage** di Desktop/CLI. Lihat [Konfigurasi R2](../cloud-storage/r2-config.md). |
| *Private document assets require storage without a public URL.* | `R2_PUBLIC_URL` (atau **Public URL** di Settings → Storage) diisi. Kosongkan, lalu restart server. |
| *File type is not allowed. Use JPEG, PNG, WebP or SVG.* | Format gambar tidak didukung. |
| *The image is still larger than 1 MB after compression...* | Potong gambar atau gunakan gambar yang lebih kecil. |
| *A document can hold up to 15 images and 2 MB of images...* | Batas gambar per dokumen tercapai. Hapus gambar lain di dokumen tersebut. |
| *This workspace has used its storage limit...* | (Cloud) Kuota storage penuh. Lihat [Kuota Cloud](../cloud-storage/cloud-quota.md). |

## 5. AI Tidak Merespons

- Pastikan provider sudah diatur dan aktif di **Settings → AI Configuration**. Di Self-host, menu ini hanya terlihat oleh SuperAdmin.
- Simpan konfigurasi dulu, lalu klik **Test Connection**; tombol itu menguji API key yang sudah tersimpan.
- Untuk **OpenAI Compatible**, pastikan Base URL benar. Banyak provider memerlukan akhiran `/v1`.
- Endpoint di jaringan privat atau localhost (misalnya Ollama) diblokir kecuali server memakai `AI_ALLOW_PRIVATE_BASE_URL=true`.
- Di Cloud, AI Assistant memerlukan paket Team yang mencakup AI dan kredit yang tersisa.
- Periksa log server atau tab Network di browser untuk melihat pesan error dari provider.

## 6. Import SQL Gagal

**Gejala**: *No valid CREATE TABLE statements found.* atau *Failed to parse SQL. Check your syntax.*

**Solusi**:
- Gunakan sintaks PostgreSQL atau MySQL, dan akhiri setiap statement dengan titik koma (`;`).
- Pastikan SQL berisi setidaknya satu `CREATE TABLE`. SQL yang hanya berisi `ALTER TABLE` tidak dapat diimpor.
- Bila file besar gagal diproses, impor per bagian.

Lihat [Import SQL](../core-features/import-sql.md). Teks SQL yang ditempel ke editor DBML tidak dikonversi; gunakan Import SQL.

## 7. "This file was changed by someone else"

Anggota Team lain menyimpan file yang sama. Perubahan Anda tidak dikirim, jadi tidak ada yang tertimpa. Klik **Load latest** untuk memuat versi terbaru; perubahan lokal Anda disimpan sebagai salinan pemulihan di browser. Lihat [Live Sync](../collaboration/live-sync.md).

## 8. Container Docker Tidak Bisa Diakses

- Pastikan port `3000` di host tidak dipakai aplikasi lain.
- Periksa log dengan `docker logs erd-builder-pro`.
- Pastikan `.env` ikut dipakai (`--env-file .env`) dan `DATABASE_URL` dapat dijangkau dari container.
- Container menunggu PostgreSQL hingga 30 detik saat start. Pastikan database sudah berjalan.

## 9. State Lisensi Tidak Dapat Ditulis

Periksa `ERDBPRO_LICENSE_STATE_FILE` dan volume persisten. Lihat [Persistent License State](../getting-started/deployment.md#persistent-license-state-paid-self-host).

## 10. Menu Team Tidak Muncul

- Team hanya tersedia pada mode PostgreSQL murni: `DATABASE_URL` diawali `postgresql://` tanpa variabel Supabase.
- Di Self-host, Team memerlukan lisensi Commercial yang aktif. Tanpa lisensi, **Add Team** menampilkan dialog **Unlock Teams**.
- Desktop dan CLI tidak memiliki Team.

## 11. Error 403 saat Mengelola AI Models (Supabase Legacy)

**Gejala**: 403 Forbidden saat membuat atau mengubah data di **Settings → AI Configuration → AI Models** pada deployment Supabase.

**Penyebab**: Akun Supabase tidak memiliki flag `is_super_admin` atau role `admin` di metadata pengguna.

**Solusi**:
1. Buka **SQL Editor** di dashboard Supabase.
2. Jalankan query berikut dengan email admin Anda:

```sql
UPDATE auth.users
    SET raw_app_meta_data = raw_app_meta_data || '{"is_super_admin": true}'::jsonb
    WHERE email = 'admin@example.com';
```

3. Logout lalu login kembali.

## 12. Menu Tidak Bisa Diklik saat Offline

Saat koneksi ke server terputus, **Search**, **Trash**, **Version History**, dan **Share** dinonaktifkan sampai koneksi kembali.
