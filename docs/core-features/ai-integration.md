---
sidebar_position: 4
slug: /core-features/ai-integration
---

# AI Integration & Smart Actions

ERD Builder Pro mengintegrasikan kecerdasan buatan (AI) tidak hanya sebagai chat bot biasa, tetapi sebagai **AI Assistant** yang memahami konteks dan dapat melakukan aksi langsung ke konten Anda melalui berbagai tombol pintar (*Smart Actions*).

:::warning
Fitur AI saat ini masih dalam tahap **pengembangan aktif**. Performa dan kecerdasan AI sangat bergantung pada model yang Anda pilih di pengaturan.
:::

## 1. AI Action Menu (Per View)

Setiap halaman (View) memiliki kumpulan aksi AI yang spesifik untuk jenis konten tersebut. Aksi ini dapat diakses melalui menu AI atau tombol aksi cepat.

### 2.1 ERD View
Digunakan untuk memodifikasi atau menganalisis tabel database.

| Tombol | Aksi | Auto-apply | Deskripsi |
| :--- | :--- | :---: | :--- |
| **Edit Columns** | Modifikasi kolom | ✅ Ya | Mengubah struktur tabel (tambah/hapus/ubah kolom) via JSON mutation. |
| **Explain Table** | Deskripsi tabel | ❌ No | Memberikan penjelasan fungsi tabel dalam bahasa natural. |
| **Suggest Indexes** | Rekomendasi indeks | ❌ No | Memberikan saran indeks SQL untuk optimasi query. |
| **Seed Data** | Generate data | ❌ No | Membuat contoh perintah `INSERT INTO` untuk data dummy. |

### 2.2 Notes View
Fokus pada pengolahan teks dan dokumentasi.

| Tombol | Aksi | Strategi | Deskripsi |
| :--- | :--- | :---: | :--- |
| **Summarize** | Ringkasan | Append | Membuat ringkasan singkat dari catatan yang ada. |
| **Improve Grammar** | Perbaiki bahasa | Replace | Mengoreksi tata bahasa dan gaya penulisan. |
| **Generate Docs** | Dokumentasi | Append | Membuat draf dokumentasi teknis yang rapi. |

### 2.3 Flowchart View
Mengotomatisasi pembuatan alur kerja visual.

| Tombol | Aksi | Strategi | Deskripsi |
| :--- | :--- | :---: | :--- |
| **Generate Diagram** | Buat flowchart | Append | Membuat flowchart baru berdasarkan deskripsi teks. |
| **Explain Flow** | Jelaskan alur | ❌ No | Memberikan deskripsi langkah demi langkah dari diagram. |
| **Generate Pseudocode**| Buat kode | ❌ No | Mengonversi alur visual menjadi logika pemrograman. |
| **Insert Between** | Sisipkan node | Append | Menyisipkan simbol di antara dua node yang dipilih. |
| **Import Description** | Ganti alur | Replace | Membuat ulang seluruh flowchart dan menimpa canvas. |

## 2. Action Mode Selector (Radio Pills)

Di atas kotak input chat, terdapat **Radio Pills** yang berfungsi sebagai pemilih mode aksi.
- **Dynamic Context:** Ikon dan placeholder teks akan berubah sesuai dengan jenis aksi yang dipilih.
- **HoverCard:** Arahkan kursor ke setiap pill untuk melihat deskripsi detail fungsi aksi tersebut.

## 3. Content-Aware Action Buttons

Setiap balasan dari AI di Chat Panel dilengkapi dengan tombol aksi pintar yang muncul secara dinamis berdasarkan isi pesan tersebut.

### 3.1 Replace All & Append
- **Flowchart View:** Muncul otomatis jika AI memberikan respon berupa struktur JSON nodes.
- **ERD View:** Muncul otomatis jika AI memberikan respon SQL DDL (`CREATE TABLE`).
- **Replace:** Menghapus konten lama dan menggantinya dengan yang baru.
- **Append:** Menambahkan konten baru di bawah atau di samping konten yang sudah ada.

### 3.2 Diagram & Database Dialogs
Jika AI mendeteksi konten khusus saat Anda berada di halaman yang berbeda, tombol khusus akan muncul:
- **Database (SQL):** Membuka *ErdFromSqlDialog* untuk membuat tabel baru dari SQL meski Anda sedang di halaman Notes.
- **Flowchart (JSON):** Membuka *FlowchartFromJsonDialog* untuk membuat diagram dari JSON.
- **Notes (Text):** Selalu muncul di semua view untuk menyimpan potongan percakapan menjadi catatan baru atau menambahkannya ke catatan aktif.

### 3.3 Prioritas Tombol
Urutan tombol (kiri ke kanan): `Copy` → `Replace/Append` → `Database` → `Flowchart` → `Notes`.
*Sistem akan otomatis menyembunyikan tombol Replace/Append jika mendeteksi SQL atau JSON agar tidak terjadi konflik aksi.*

## 4. Deteksi Konten Otomatis

AI Assistant memiliki logika deteksi internal:
- **SQL DDL:** Mendeteksi kata kunci seperti `CREATE TABLE`, `ALTER TABLE`, atau `INSERT INTO`.
- **DBML:** Mendeteksi blok kode yang mengandung sintaks DBML (`Table`, `Ref`, `Enum`). Tombol **Database** akan muncul untuk menerapkan skema DBML ke diagram ERD. Lihat [DBML Editor](/core-features/dbml-editor) untuk detail.
- **Flowchart JSON:** Mencari pola struktur `{ nodes: [...] }` di dalam blok kode JSON.

## 5. Arsitektur Data Flow

Aksi AI dikelola melalui **AIActionContext** menggunakan pola *Content Handler*:
1. **Register:** View (seperti Notes) mendaftarkan fungsi handler-nya.
2. **Detection:** Chat panel mendeteksi tipe konten dalam pesan AI.
3. **Apply:** Saat tombol diklik, `applyContent` memicu handler yang terdaftar untuk melakukan perubahan pada state aplikasi atau database.

## 6. Kasus Khusus (Edge Cases)

- **Streaming:** Semua tombol aksi disembunyikan saat AI sedang mengetik (streaming).
- **Guest Mode:** Fitur tetap berfungsi menggunakan sesi in-memory.
- **Multi-Selection:** Pada ERD, aksi "Edit Columns" dapat menangani modifikasi beberapa tabel sekaligus dalam satu instruksi.
- **Diff Preview:** Sebelum menerapkan perubahan (*Replace/Append*), sistem akan menampilkan jendela *Preview* untuk membandingkan perubahan.

---
*Tips: Gunakan fitur **@mention** untuk merujuk file lain agar AI memahami keterkaitan antar dokumen dalam satu project.*
