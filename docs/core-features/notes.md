---
sidebar_position: 4
slug: /core-features/notes
---
# Notes & Documentation

ERD Builder Pro menyertakan editor teks kaya (rich text editor) berbasis **Tiptap** untuk membantu Anda membuat dokumentasi proyek yang mendalam.

## Fitur Editor

Editor berbasis **Tiptap** (ProseMirror) mendukung fitur penulisan yang luas:

### Format Teks
- **Dasar**: Bold (`⌘B`), Italic (`⌘I`), Underline (`⌘U`), Strikethrough (`⌘⇧X`), Inline Code (`⌘E`).
- **Warna Teks**: 8 pilihan warna tema.
- **Perataan**: Kiri, Tengah, Kanan (`⌘⇧L/C/R`).
- **Tautan**: Sisipkan hyperlink via `⌘K` atau menu bubble.

### Blok & Struktur
- **Heading**: H1–H4 (`⌘⌥1-4`).
- **Daftar**: Bullet, Numbered, Task List (centang checklist).
- **Blockquote** (`⌘⇧.`).
- **Code Block**: Cuplikan kode dengan syntax highlighting.
- **Badge**: Teks badge berwarna — `⌘⌥B`.
- **Toggle**: Blok collapsible yang bisa dibuka/ditutup.
- **Divider**: Garis pemisah horizontal.

### Media & Ekstensi Khusus
- **Gambar**: Unggah gambar ke Cloudflare R2. Gambar bisa di-resize setelah disisipkan. Deteksi paste dari Excel/Google Sheets.
- **Lucide Icon**: Sisipkan ikon Lucide — `⌘⌥I` atau via Slash Menu. Dukungan pencarian nama ikon.
- **Calendar**: Node tanggal interaktif — pilih tanggal via popover kalender. Sisipkan via Slash Menu (`/today`, `/tomorrow`, `/date range`, dll).

### Document Outline
Klik ikon sidebar di sebelah kiri editor untuk melihat **daftar heading** (H1–H5) dari dokumen. Klik heading untuk langsung loncat ke bagian tersebut.

### Paste Handler Cerdas
Editor secara otomatis mendeteksi konten yang ditempel:
- **Markdown**: Jika konten mengandung sintaks markdown (heading, list, code fence, tabel), akan dikonversi ke HTML via `marked.parse`.
- **Markdown Table**: Tabel markdown (`| col | col |`) dikonversi ke tabel editor.
- **Excel / Google Sheets**: Konten dari spreadsheet (terdeteksi via marker HTML) akan disanitasi dan struktur sel (colspan/rowspan) dipertahankan.
- **Fenced Markdown**: Blok `\`\`\`markdown ... \`\`\`` akan di-unwrap otomatis.

## Smart Tables & Auto-Calculation

Fitur **Smart Table** memungkinkan Anda melakukan perhitungan matematis sederhana langsung di dalam sel tabel — seperti spreadsheet, tetapi terintegrasi langsung di dokumen.

### Rumus yang Didukung

| Rumus | Alias Lain | Arah | Deskripsi |
| :--- | :--- | :--- | :--- |
| `=sum` | `=sum()` | Vertikal | Menjumlahkan semua angka di kolom yang sama (dari baris data di atasnya) |
| `=sumv` | `=sumv()`, `=sum-vertical`, `=sumvertical` | Vertikal | Alias untuk `=sum` — jumlahkan secara vertikal |
| `=avg` | `=avg()`, `=average`, `=average()` | Vertikal | Menghitung rata-rata dari angka di kolom yang sama |
| `=avgv` | `=avgv()`, `=avg-vertical`, `=avgvertical` | Vertikal | Alias untuk `=avg` — rata-rata secara vertikal |
| `=mul` | `=mul()`, `=product`, `=product()` | Vertikal | Mengalikan semua angka di kolom yang sama |
| `=mulv` | `=mulv()`, `=productv`, `=productv()` | Vertikal | Alias untuk `=mul` — perkalian secara vertikal |
| `=sumh` | `=sumh()`, `=sum-horizontal`, `=sumhorizontal` | Horizontal | Menjumlahkan semua angka di baris yang sama (ke kiri) |
| `=avgh` | `=avgh()`, `=avg-horizontal`, `=avghorizontal` | Horizontal | Menghitung rata-rata angka di baris yang sama (ke kiri) |
| `=mulh` | `=mulh()`, `=producth`, `=producth()` | Horizontal | Mengalikan semua angka di baris yang sama (ke kiri) |

**Cara menggunakan**: Ketik salah satu rumus di atas di dalam sel tabel (contoh: `=sum`, `=sumv`, `=mulh`), lalu tekan Enter. Hasil perhitungan akan muncul secara otomatis. Semua bentuk alias menghasilkan hasil yang sama.

> [!TIP]
> **Vertikal** (`=sum`, `=sumv`, `=avg`, `=avgv`, `=mul`, `=mulv`): Menghitung dari baris data di atas sel rumus, hingga batas baris Header atau Footer berikutnya.
> **Horizontal** (`=sumh`, `=avgh`, `=mulh`): Menghitung dari kolom di kiri sel rumus dalam baris yang sama.

### Angka & Format

- **Pemisah ribuan**: Angka diformat otomatis dengan pemisah titik sesuai standar Indonesia (contoh: `1.500.000`).
- **Desimal koma**: Mendukung input angka dengan koma sebagai desimal (contoh: `15,5`).
- **Sel kosong diabaikan**: Sel yang kosong atau tidak berisi angka tidak akan memengaruhi hasil perhitungan.
- **`formulaTitle`**: Saat Anda hover ke sel hasil rumus, tooltip akan menampilkan referensi sel seperti `SUM(A2:A10)`.

### Tipe Baris Khusus

Tipe baris menentukan **jangkauan** (*scope*) perhitungan rumus:

| Tipe Baris | Fungsi | Jangkauan Rumus Vertikal |
| :--- | :--- | :--- |
| **Data** (default) | Baris data biasa | Sumber data untuk rumus |
| **Header** (Subtotal) | Pemisah sub-grup | Rumus di bawahnya hanya menghitung hingga Header berikutnya |
| **Footer** (Grand Total) | Total akhir | Rumus di baris ini menghitung **SEMUA** data di tabel |

**Contoh penggunaan**:

```
┌──────────────┬────────┐
│ Header Row   │ Total  │   ← =sum (menjumlahkan 2 baris data di bawah)
├──────────────┼────────┤
│ Item A       │ 500    │
│ Item B       │ 300    │
├──────────────┼────────┤
│ Subtotal     │ 800    │   ← Header Row → =sum (reset counter)
├──────────────┼────────┤
│ Item C       │ 200    │
│ Item D       │ 100    │
├──────────────┼────────┤
│ Grand Total  │ 1100   │   ← Footer Row → =sum (total SEMUA: 500+300+200+100)
└──────────────┴────────┘
```

Untuk mengubah tipe baris:
1. Klik di dalam sel tabel.
2. Arahkan kursor ke **Table Bubble Menu** yang muncul.
3. Buka submenu **Rows** → pilih **Header Row** atau **Footer Row**.

## Manajemen Tabel Lanjutan

### Table Bubble Menu & Sub-menus

Untuk menjaga area kerja tetap bersih, menu aksi tabel dikelompokkan ke dalam sub-menu:

- **Alignment**: Tombol cepat untuk mengatur perataan teks (Kiri, Tengah, Kanan) di baris utama menu.
- **Table Actions** → submenu:
    - **Rows**:
        - Add Row Below — menambah baris di bawah posisi kursor.
        - Delete Row — menghapus baris saat ini.
        - Header Row — mengubah baris menjadi tipe Header (Subtotal).
        - Footer Row — mengubah baris menjadi tipe Footer (Grand Total).
    - **Columns**:
        - Add Column After — menambah kolom di sebelah kanan.
        - Delete Column — menghapus kolom saat ini.
        - Move Left — memindahkan kolom ke kiri.
        - Move Right — memindahkan kolom ke kanan.
    - **Insert Line Above** — menyisipkan baris paragraf kosong di atas tabel (berguna jika tabel di posisi paling atas dokumen).
    - **Delete Table** — menghapus seluruh tabel.

### Responsive Tables (Horizontal Scroll)

Tabel dengan banyak kolom atau konten lebar mendukung **Horizontal Scroll**. Geser tabel ke samping menggunakan *scrollbar* kustom di bagian bawah tabel.

### Insert Table

Cara menyisipkan tabel baru:
- **Keyboard**: `⌘ ⌥ T` (Mac) / `Ctrl Alt T` (Win/Linux).
- **Slash Menu**: Ketik `/table` pada baris kosong → pilih **Table**.
- Tabel default berukuran 3×3 dengan baris Header aktif.

## Keyboard Shortcuts & Slash Menu

Editor Notes mendukung berbagai shortcut keyboard untuk mempercepat proses penulisan Anda:

### Format Teks & Navigasi
| Aksi | Shortcut (Mac) | Shortcut (Win/Linux) |
| :--- | :--- | :--- |
| **Bold** | `⌘ B` | `Ctrl B` |
| **Italic** | `⌘ I` | `Ctrl I` |
| **Underline** | `⌘ U` | `Ctrl U` |
| **Strikethrough** | `⌘ ⇧ X` | `Ctrl Shift X` |
| **Inline Code** | `⌘ E` | `Ctrl E` |
| **Add Link** | `⌘ K` | `Ctrl K` |
| **Align Left** | `⌘ ⇧ L` | `Ctrl Shift L` |
| **Align Center** | `⌘ ⇧ C` | `Ctrl Shift C` |
| **Align Right** | `⌘ ⇧ R` | `Ctrl Shift R` |

### Blok & Struktur
| Aksi | Shortcut (Mac) | Shortcut (Win/Linux) |
| :--- | :--- | :--- |
| **Heading 1-4** | `⌘ ⌥ 1-4` | `Ctrl Alt 1-4` |
| **Bulleted List** | `⌘ ⇧ 8` | `Ctrl Shift 8` |
| **Numbered List** | `⌘ ⇧ 7` | `Ctrl Shift 7` |
| **Task List** | `⌘ ⇧ 9` | `Ctrl Shift 9` |
| **Blockquote** | `⌘ ⇧ .` | `Ctrl Shift .` |

### Fitur Khusus
| Aksi | Shortcut (Mac) | Shortcut (Win/Linux) |
| :--- | :--- | :--- |
| **Insert Table** | `⌘ ⌥ T` | `Ctrl Alt T` |
| **Lucide Icon** | `⌘ ⌥ I` | `Ctrl Alt I` |
| **Auto Sum/Avg**| `=sum` / `=sumv` / `=sumh` | `=sum` / `=sumv` / `=sumh` |
| **Auto Multiply**| `=mul` / `=mulv` / `=mulh` | `=mul` / `=mulv` / `=mulh` |
| **Auto Average** | `=avg` / `=avgv` / `=avgh` | `=avg` / `=avgv` / `=avgh` |
| **Import Note** | `⌘ ⇧ I` | `Ctrl Shift I` |
| **Export Note** | `⌘ ⇧ E` | `Ctrl Shift E` |
| **Insert Calendar** | `/` (Slash Menu) | `/` (Slash Menu) |

### Slash Menu (`/`)
Ketik `/` pada baris baru untuk membuka menu cepat. Menu ini menyertakan berbagai perintah seperti penyisipan tabel, heading, dan kategori **Insert Calendar** dengan pilihan:
- **Time/Now**: Menyisipkan waktu atau tanggal sekarang sebagai teks.
- **Today/Tomorrow/Yesterday**: Menyisipkan kalendar interaktif dengan tanggal terkait.
- **In a week/A week ago**: Menyisipkan kalendar dengan jeda satu minggu.
- **Date Range**: Menyisipkan pemilih rentang tanggal interaktif.

## Import & Export Dokumentasi

### Import File Eksternal

> [!WARNING]
> Fitur **Import** file eksternal masih dalam tahap **Eksperimental**. Format dokumen mungkin tidak sepenuhnya presisi setelah diimpor.

Untuk mengimpor file ke dalam Notes:
1. Gunakan shortcut `⌘⇧I` (Mac) / `Ctrl Shift I` (Win/Linux).
2. Pilih file yang akan diimpor.

**Format yang didukung:**
- **Markdown** (`.md`) — konversi via `marked.parse` + sanitasi HTML.
- **DOCX** (`.docx`) — konversi via Mammoth.js.
- **HTML** — sanitasi via DOMPurify sebelum dimasukkan ke editor.

**Paste langsung**: Anda juga bisa menyalin konten dari dokumen eksternal dan menempelkan langsung ke editor — markdown dan tabel spreadsheet akan otomatis dikonversi.

### Export ke PDF
1. Gunakan shortcut `⌘⇧E` (Mac) / `Ctrl Shift E` (Win/Linux).
2. Dokumen akan dicetak ke PDF via jendela cetak browser.
3. Opsi **Table of Contents** tersedia untuk dokumen panjang.

## Sinkronisasi & Penyimpanan

Notes disimpan menggunakan sistem 2 tahap:
1. **Draft Lokal** (IndexedDB): Disimpan otomatis ~400ms setelah berhenti mengetik.
2. **Cloud Sync** (Server): Disinkronkan ~1000ms setelah berhenti mengetik.

> [!NOTE]
> Mode **Guest** hanya menyimpan ke IndexedDB tanpa sinkronisasi cloud.

## Kegunaan

Gunakan fitur Notes ini untuk mencatat:
- Estimasi biaya proyek menggunakan **Smart Table** dengan rumus `=sum`.
- Aturan bisnis (*Business Rules*).
- Penjelasan alur API.
- Dokumentasi teknis dengan gambar, tabel, dan kode.
- Jadwal proyek dengan **Calendar** node dan **Task List**.
