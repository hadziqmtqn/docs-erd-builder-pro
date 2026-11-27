---
sidebar_position: 5
slug: /core-features/notes
---
# Notes & Documentation

Notes adalah editor teks kaya berbasis **Tiptap** untuk menulis dokumentasi proyek: aturan bisnis, penjelasan API, catatan rapat, atau estimasi biaya dengan tabel yang bisa menghitung.

## Format Teks

Pilih teks untuk memunculkan **bubble menu** berisi Bold, Italic, Underline, Strikethrough, Code, Link, perataan, daftar, warna teks (**Theme Colors**: Default, Red, Orange, Green, Blue, Indigo, Purple, Pink), **Comment on block** (Team), dan **Send to AI**.

Tautan disisipkan lewat tombol Link di bubble menu, yang membuka dialog **Edit Link**.

## Blok & Struktur

Ketik `/` di awal baris atau setelah spasi untuk membuka **Slash Menu**:

| Grup | Item |
| :--- | :--- |
| Basic blocks | Text, Heading 1–4, Badge, Divider |
| Lists | Bulleted list, Ordered list, To-do list |
| Media | Image, Lucide Icon |
| Organization | Blockquote, Toggle Section, Code block, SQL Query (Desktop/CLI), Open preview › ERD Builder / Flowchart / Drawing |
| Advanced | Table Actions › Insert Table, Add Column, Delete Column, Add Row, Delete Row, Delete Table; Insert Calendar |
| History | Undo, Redo |

### Open Preview {/* #open-preview */}

**Open preview** membuka ERD, Flowchart, atau Drawing dari Project yang sama di panel samping Note, sehingga Anda bisa merujuk diagram sambil menulis. Gunakan **Open full editor** untuk membuka file tersebut di editornya sendiri, atau **Close preview** untuk menutup panel.

### Calendar

**Insert Calendar** menyisipkan tanggal hari ini lalu membuka pemilih tanggal. Node Calendar berisi **satu tanggal**. Matikan **All-day** untuk menambahkan jam. Arahkan kursor ke node lalu pilih **Edit date** untuk mengubahnya, atau ikon tempat sampah untuk menghapusnya.

### Document Outline

Bila Note memiliki heading, muncul bilah kecil di tepi kiri editor. Arahkan kursor atau klik bilah itu untuk melihat daftar heading H1–H5, lalu klik salah satunya untuk melompat ke bagian tersebut.

## Gambar

Tempel gambar dari clipboard, seret file ke editor, atau pilih **Image** di Slash Menu.

- Format: JPEG, PNG, WebP, dan SVG.
- Gambar sampai 5 MB dikompresi otomatis di browser hingga maksimal 1 MB dan lebar 1280 px.
- Satu dokumen dapat memuat hingga 15 gambar dengan total 2 MB.
- Unggahan memerlukan storage (Cloudflare R2, atau Settings → Storage di Desktop/CLI). Lihat [Unggah Gambar](../cloud-storage/upload-feature.md).

## Paste Cerdas

- **Tabel dari Excel, Google Sheets, atau Office** dibersihkan dari styling lalu dirapikan menjadi tabel editor.
- **Teks bergaya Markdown** (heading, daftar, code fence, tabel) dikonversi menjadi teks kaya.
- Blok ` ```markdown ... ``` ` dibuka otomatis.

## Smart Tables & Auto-Calculation

Tabel di Notes dapat menghitung seperti spreadsheet sederhana. Ketik rumus di sel tabel, lalu pindah dari sel tersebut; hasilnya muncul otomatis.

### Rumus yang Didukung

| Rumus | Alias | Arah | Fungsi |
| :--- | :--- | :--- | :--- |
| `=sum` | `=sumv` | Vertikal | Menjumlahkan angka di kolom yang sama |
| `=avg` | `=average`, `=avgv` | Vertikal | Rata-rata angka di kolom yang sama |
| `=mul` | `=product`, `=mulv`, `=productv` | Vertikal | Mengalikan angka di kolom yang sama |
| `=sumh` | — | Horizontal | Menjumlahkan angka di baris yang sama (ke kiri) |
| `=avgh` | — | Horizontal | Rata-rata angka di baris yang sama (ke kiri) |
| `=mulh` | `=producth` | Horizontal | Mengalikan angka di baris yang sama (ke kiri) |

Rumus tidak membedakan huruf besar-kecil dan boleh ditulis dengan `()`, misalnya `=SUM()`. Arahkan kursor ke sel hasil untuk melihat rentang sumbernya, misalnya `SUMV(B2:B5)`. Panduan lengkap tersedia di menu **Actions → Calculation Guide** (**Table Calculation Guide**).

### Tipe Baris Khusus

Tipe baris menentukan jangkauan rumus vertikal:

| Tipe Baris | Fungsi | Jangkauan Rumus Vertikal |
| :--- | :--- | :--- |
| **Data** (default) | Baris data biasa | Sumber data untuk rumus |
| **Header** (Subtotal) | Pemisah sub-grup | Rumus di bawahnya hanya menghitung hingga Header berikutnya |
| **Footer** (Grand Total) | Total akhir | Rumus di baris ini menghitung **semua** data di tabel |

Ubah tipe baris lewat bubble menu tabel: **Table Actions → Rows → Header Row / Footer Row**, atau klik kanan sel tabel.

### Angka & Format

- Angka diformat dengan pemisah ribuan titik, misalnya `1.500.000`.
- Koma dapat dipakai sebagai desimal, misalnya `15,5`.
- Sel kosong atau bukan angka diabaikan.

## Manajemen Tabel

- **Insert Table**: `⌥⌘T` / `Ctrl+Alt+T`, atau Slash Menu **Table Actions → Insert Table**. Tabel baru berukuran 3×3 dengan baris header.
- **Bubble menu tabel** muncul saat kursor berada di tabel: perataan, lalu **Table Actions** berisi **Rows** (Add Row Above/Below, Delete Row, Header Row, Footer Row), **Columns** (Add Column Before/After, Delete Column, Move Left/Right), **Insert Line Above** (paragraf kosong di atas tabel), dan **Delete Table**.
- Klik kanan sel tabel untuk menu yang sama, ditambah memindahkan baris ke atas/bawah dan **Comment on block** (Team).
- Tabel lebar dapat digeser horizontal.

## Keyboard Shortcuts

Di Windows dan Linux, ganti `⌘` dengan `Ctrl`, `⌥` dengan `Alt`, dan `⇧` dengan `Shift`.

### Format Teks
| Aksi | Mac | Windows/Linux |
| :--- | :--- | :--- |
| **Bold** | `⌘ B` | `Ctrl B` |
| **Italic** | `⌘ I` | `Ctrl I` |
| **Underline** | `⌘ U` | `Ctrl U` |
| **Inline Code** | `⌘ E` | `Ctrl E` |
| **Align Left / Center / Right** | `⇧ ⌘ L` / `⇧ ⌘ C` / `⇧ ⌘ R` | `Ctrl Shift L` / `C` / `R` |
| **Justify** | `⇧ ⌘ J` | `Ctrl Shift J` |

### Blok
| Aksi | Mac | Windows/Linux |
| :--- | :--- | :--- |
| **Heading 1–6** | `⌥ ⌘ 1`–`6` | `Ctrl Alt 1`–`6` |
| **Paragraf** | `⌥ ⌘ 0` | `Ctrl Alt 0` |
| **Bulleted List** | `⇧ ⌘ 8` | `Ctrl Shift 8` |
| **Numbered List** | `⇧ ⌘ 7` | `Ctrl Shift 7` |
| **Task List** | `⇧ ⌘ 9` | `Ctrl Shift 9` |
| **Blockquote** | `⇧ ⌘ B` | `Ctrl Shift B` |
| **Code Block** | `⌥ ⌘ C` | `Ctrl Alt C` |
| **Badge** | `⌥ ⌘ B` | `Ctrl Alt B` |
| **Insert Table** | `⌥ ⌘ T` | `Ctrl Alt T` |

### Dokumen
| Aksi | Mac | Windows/Linux |
| :--- | :--- | :--- |
| **Simpan ke server sekarang** | `⌘ S` | `Ctrl S` |
| **Import** | `⇧ ⌘ I` | `Ctrl Shift I` |
| **Export** | `⇧ ⌘ E` | `Ctrl Shift E` |
| **Undo / Redo** | `⌘ Z` / `⇧ ⌘ Z` | `Ctrl Z` / `Ctrl Y` |

Strikethrough, Lucide Icon, Divider, dan Link belum memiliki shortcut yang berfungsi; gunakan bubble menu atau Slash Menu. `⌘K` / `Ctrl+K` membuka [Search](../workspace/search-and-filter.md), bukan dialog link.

## Import & Export

Menu **Actions** (⋯) di header Note berisi **Calculation Guide**, **Copy Markdown**, **Import**, **Export**, dan **Text Stats**.

### Import

:::warning Experimental
Hasil import bisa tidak sepenuhnya sama dengan dokumen asli.
:::

1. Tekan `⇧⌘I` / `Ctrl+Shift+I`, atau pilih **Actions → Import**.
2. Pilih file **.md**, **.docx**, atau **.txt** (maksimal 3 MB). File `.txt` diproses sebagai Markdown.
3. Isi file ditambahkan ke akhir Note yang sedang terbuka. Bila tidak ada Note terbuka, Note baru dibuat dengan nama file tersebut.

Gambar di file Word yang gagal diunggah dilewati.

### Export

Tekan `⇧⌘E` / `Ctrl+Shift+E`, atau pilih **Actions → Export**, lalu pilih format:

| Format | Keterangan |
| :--- | :--- |
| **MD** | Markdown |
| **PDF** | PDF ringkas |
| **Print** | Cetak lewat dialog browser dengan kualitas tinggi. Tidak tersedia di Desktop. |
| **Word** | Dokumen Microsoft Word |

Untuk PDF, Print, dan Word tersedia opsi **Include Document Title**, **Include Metadata**, dan **Preserve Formatting**. Ukuran halaman A4.

## Penyimpanan

Notes disimpan dua tahap:
1. **Draft lokal** di browser (IndexedDB), sekitar 0,4 detik setelah Anda berhenti mengetik.
2. **Sinkronisasi ke server**, sekitar 1 detik setelah Anda berhenti mengetik.

Tekan `⌘S` / `Ctrl+S` untuk langsung menyinkronkan perubahan yang tertunda. Mode **Guest** hanya menyimpan di browser.

## Kolaborasi

Di Team Workspace, arahkan kursor ke sebuah blok lalu klik **Comment** untuk memberi komentar pada blok tersebut. Lihat [Komentar & Diskusi](../collaboration/comments-discussions.md). Riwayat perubahan tersedia di [Version History](../collaboration/version-history.md).
