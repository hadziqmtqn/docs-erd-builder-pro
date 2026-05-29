---
sidebar_position: 4
slug: /core-features/ai-integration
---

# AI Integration

:::warning
Fitur AI saat ini masih dalam tahap **pengembangan aktif**. Performa dan kecerdasan AI mungkin belum sepenuhnya optimal atau sesuai ekspektasi. Kami terus melakukan peningkatan secara berkala.
:::

ERD Builder Pro mengintegrasikan kecerdasan buatan (AI) ke dalam alur kerja desain database dan dokumentasi Anda. Fitur ini memungkinkan interaksi yang lebih cerdas antara pengguna dan konten.

## AI Chat Panel

Fitur utama AI adalah **AI Chat Panel** yang dapat diakses di setiap halaman aplikasi. Panel ini memungkinkan Anda untuk:
- Berbicara dengan AI tentang konteks dokumen yang sedang Anda kerjakan.
- Menggunakan @mention untuk menyertakan konten dari file lain (Notes, ERD, Flowchart) ke dalam percakapan.
- Mengenerate atau memodifikasi konten secara langsung.

## AI di Notes (Tiptap Editor)

Pada fitur **Notes**, AI diintegrasikan langsung ke dalam editor berbasis Tiptap. Berikut kemampuannya:

### 1. Generate Content
- Anda dapat meminta AI untuk membuat konten baru, misalnya "Buat dokumen tentang arsitektur sistem."
- AI akan menghasilkan teks yang bisa langsung Anda masukkan ke dalam dokumen.

### 2. Modify Selection
- Jika Anda memilih teks tertentu di editor, AI dapat:
  - **Mengubah (Replace):** Mengganti teks yang dipilih dengan versi yang lebih baik.
  - **Menambahkan (Append):** Menambahkan konteks baru setelah teks yang dipilih.

### 3. Format & Structure
- AI dapat membantu mengatur format paragraf, membuat list, atau menambahkan heading secara otomatis.

## AI di ERD Builder

Pada fitur **ERD Builder**, AI membantu Anda mengelola skema database:

### 1. Generate from SQL
- Masukkan query SQL (`CREATE TABLE`, `ALTER TABLE`), dan AI akan mem-parse-nya menjadi diagram ERD visual.
- Fitur ini sangat berguna untuk migrasi atau reverse engineering database lama.

### 2. Schema Assistant
- Tanyakan langsung ke AI tentang relasi antar tabel, kolum yang hilang, atau rekomendasi tipe data.
- Anda dapat menyorot tabel tertentu dan meminta AI untuk menambahkan kolom atau foreign key.

### 3. Natural Language to ERD
- Jelaskan kebutuhan database Anda dalam bahasa Inggris atau Indonesia (contoh: "Buatkan tabel untuk user dengan email dan password"), dan AI akan membuatkannya dalam diagram.

## AI di Flowchart

Pada fitur **Flowchart**, AI membantu Anda membuat diagram alur dari deskripsi:

### 1. Text-to-Flowchart
- Masukkan deskripsi alur (misal: "Login → Check DB → Redirect to Dashboard"), dan AI akan mengkonversi menjadi bentuk flowchart visual menggunakan React Flow.
- Mendukung berbagai jenis simbol dan orientasi (atas-bawah atau kiri-kanan).

### 2. JSON Import
- Jika Anda memiliki definisi flowchart dalam format JSON, Anda dapat mengimpornya langsung dan AI akan merender-nya di canvas.

### 3. Flowchart Optimization
- Minta AI untuk menyederhanakan atau mengatur ulang alur jika diagram terlalu kompleks.

## Tips Menggunakan AI

1. **Gunakan @Mention:** Untuk hasil yang lebih akurat, gunakan fitur @mention untuk memberikan konteks file yang relevan. Perlu diingat bahwa fitur @mention ini **hanya berlaku untuk file yang berada di dalam workspace/project yang sama** dengan file yang sedang Anda buka.
2. **Seleksi Teks:** Jika Anda ingin AI memodifikasi bagian tertentu, pilih teks tersebut sebelum mengirim pesan.
3. **Cek Koneksi:** Pastikan API Key Anda sudah terkonfigurasi dengan benar di Settings > AI Configuration.

---
*Catatan: Kualitas output AI sangat bergantung pada model yang dipilih dan prompt yang Anda berikan.*