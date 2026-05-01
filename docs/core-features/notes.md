---
sidebar_position: 4
slug: /core-features/notes
---
# Notes & Documentation

ERD Builder Pro menyertakan editor teks kaya (rich text editor) berbasis **Tiptap** untuk membantu Anda membuat dokumentasi proyek yang mendalam.

## Fitur Editor
- **Rich Formatting**: Bold, italic, underline, strikethrough, dan perataan teks (kiri, tengah, kanan).
- **Task Lists**: Checklist interaktif untuk melacak progres pengembangan.
- **Code Blocks**: Menampilkan cuplikan kode dengan *syntax highlighting*.
- **Image Support**: Unggah gambar langsung ke dalam dokumen (disimpan di Cloudflare R2).
- **Smart Tables**: Tabel interaktif dengan fitur kalkulasi otomatis dan manajemen baris pintar.

## Smart Tables & Auto-Calculation

Fitur **Smart Table** memungkinkan Anda melakukan perhitungan matematis sederhana langsung di dalam sel tabel tanpa perlu menggunakan kalkulator eksternal.

### Kalkulasi Otomatis (`=sum` dan `=avg`)
Anda dapat melakukan perhitungan dalam satu kolom dengan mengetikkan shortcut khusus di dalam sel:
- **`=sum`** atau **`=SUM`**: Sistem akan secara otomatis menjumlahkan semua angka yang ada di atas sel tersebut (hingga batas baris Header/Subtotal sebelumnya).
- **`=avg`** atau **`=AVG`**: Sistem akan secara otomatis menghitung nilai rata-rata (*average*) dari angka-angka di atasnya. Sel yang kosong tidak akan dimasukkan ke dalam perhitungan agar rata-rata tetap akurat.
- **Format Otomatis**: Angka yang dimasukkan atau dihasilkan akan diformat secara otomatis mengikuti standar mata uang Indonesia (Rupiah) dengan pemisah ribuan titik (misal: `1.500.000`).

### Tipe Baris Khusus
Gunakan **Bubble Menu** saat sel tabel terpilih untuk mengubah tipe baris:
- **Header Row (Subtotal)**: Gunakan ikon **Heading** pada menu tabel untuk menandai baris sebagai sub-total fitur tertentu. Baris ini akan menjadi pembatas jangkauan kalkulasi `=sum` atau `=avg` di bawahnya.
- **Footer Row (Grand Total)**: Gunakan ikon **Sigma (Σ)** pada menu tabel untuk baris total keseluruhan. Baris ini akan menjumlahkan seluruh nilai komponen di tabel tanpa menghitung ulang baris subtotal (menghindari *double counting*).

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
| **Auto Sum/Avg**| `=sum` / `=avg` | `=sum` / `=avg` |
| **Import Note** | `⌘ ⇧ I` | `Ctrl Shift I` |
| **Export Note** | `⌘ ⇧ E` | `Ctrl Shift E` |
| **Insert Calendar** | `/` (Slash Menu) | `/` (Slash Menu) |

### Slash Menu (`/`)
Ketik `/` pada baris baru untuk membuka menu cepat. Menu ini menyertakan berbagai perintah seperti penyisipan tabel, heading, dan kategori **Insert Calendar** dengan pilihan:
- **Time/Now**: Menyisipkan waktu atau tanggal sekarang sebagai teks.
- **Today/Tomorrow/Yesterday**: Menyisipkan kalendar interaktif dengan tanggal terkait.
- **In a week/A week ago**: Menyisipkan kalendar dengan jeda satu minggu.
- **Date Range**: Menyisipkan pemilih rentang tanggal interaktif.

## Kegunaan
Gunakan fitur Notes ini untuk mencatat:
- Estimasi biaya proyek menggunakan **Smart Table**.
- Aturan bisnis (*Business Rules*).
- Penjelasan alur API.
- Panduan teknis bagi anggota tim lainnya.

## Import Dokumentasi (Eksperimental)
> [!WARNING]
> Fitur **Import** file eksternal (seperti `.md` atau `.docx`) ke dalam Notes saat ini masih dalam tahap **Eksperimental**. Format dokumen mungkin tidak sepenuhnya presisi setelah diimpor.
