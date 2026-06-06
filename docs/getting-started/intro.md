---
sidebar_position: 1
slug: /
---
# Pengenalan

![ERD Builder Pro Overview](../../static/img/docs/erd-intro.png)

ERD Builder Pro adalah alat desain database modern yang mengintegrasikan pembuatan _Entity Relationship Diagram (ERD)_ dengan SQL generator otomatis, sistem catatan teknis berbasis Tiptap, serta fitur _flowchart_ dan desain bebas menggunakan Excalidraw dalam satu platform dokumentasi yang terpadu.

Dirancang khusus untuk **Software Developer**, **Database Architect**, dan **Tim Teknis**, aplikasi ini membantu Anda mengelola seluruh siklus hidup perancangan database dari visualisasi hingga dokumentasi teknis tanpa perlu berpindah antar aplikasi.

## Mengapa ERD Builder Pro?
- **Offline First**: Keamanan data terjamin dengan penyimpanan lokal awal di **IndexedDB**, memungkinkan Anda tetap produktif meski koneksi terputus. Data akan disinkronkan ke cloud secara otomatis saat Anda kembali online.
- **All-in-One Documentation**: Satukan skema database, aturan bisnis, dan diagram alir aplikasi dalam satu workspace.
- **Produktivitas Tinggi**: Hasilkan kode SQL atau migrasi framework favorit Anda (Laravel, Prisma, dll) secara instan.
- **Kustomisasi Penuh**: Simpan data dan aset Anda di infrastruktur cloud milik sendiri (Supabase & Cloudflare).

## Teknologi & Pustaka
Aplikasi ini dibangun di atas ekosistem teknologi modern dan pustaka *open-source* yang luar biasa:

### Infrastruktur Utama
- **Frontend**: React + Vite untuk antarmuka yang cepat dan responsif.
- **Backend**: Express.js untuk logika server dan API.
- **Database**: PostgreSQL (Supabase / Local) untuk penyimpanan data.
- **Storage**: Cloudflare R2 untuk penyimpanan aset gambar.

### Pustaka Inti (Credits)
Kami berterima kasih kepada pengembang di balik teknologi utama berikut:
- **[React Flow](https://reactflow.dev/)**: Digunakan sebagai mesin utama untuk membangun antarmuka ERD yang interaktif.
- **[Tiptap](https://tiptap.dev/)**: Editor teks kaya (*Rich Text Editor*) yang ditenagai oleh ProseMirror untuk fitur Notes.
- **[Excalidraw](https://excalidraw.com/)**: Digunakan untuk fitur desain bebas (*Drawings*) dan diagram alir.

## Roadmap Mendatang
Kami terus berupaya untuk mengembangkan ERD Builder Pro menjadi alat yang lebih kuat bagi pengembang. Berikut adalah beberapa fitur besar yang direncanakan untuk masa depan:

| Fitur | Status |
| :--- | :--- |
| **AI-Powered ERD Generation** | ✅ Sudah Tersedia |
| **Kolaborasi Tim & Role-Based Access** | 🔜 Dalam Rencana |
| **Dukungan SQL Dialects Lebih Luas** | 🔜 Dalam Rencana |
| **Enhanced Export** | 🔜 Dalam Rencana |
| **Desktop Application** | 🔜 Dalam Rencana |
| **Local Database Runner** ⚡ | 🔜 Dalam Rencana |
| **Mindmap** | 🔜 Dalam Rencana |
| **API Mapper** | 🔜 Dalam Rencana |
| **Task Workspace** | 🔜 Dalam Rencana |

> [!NOTE]
> Seluruh fitur di atas dirancang untuk saling terintegrasi dalam satu ekosistem. **Mindmap** adalah tempat merencanakan ide, **ERD & Flowchart** adalah visualisasi struktur, **Task Workspace** mengatur eksekusi, dan **API Mapper** mendokumentasikan jalur data — semuanya terhubung satu sama lain. Dengan hadirnya **Kolaborasi Tim**, seluruh tim dapat berkontribusi secara real-time.
