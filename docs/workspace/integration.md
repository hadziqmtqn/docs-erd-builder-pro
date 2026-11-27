---
sidebar_position: 6
slug: /workspace/integration
---

# Integrasi Antarfitur

Notes, ERD, Flowchart, dan Drawing bekerja dalam satu ekosistem. Penghubungnya adalah **Project**: setiap file menyimpan Project tempat ia berada, sehingga fitur lain bisa menemukan file terkait.

## Konsep Project-Based

```
Workspace (Personal atau Team)
└── Project
    ├── ERD
    ├── Notes
    ├── Flowcharts
    ├── Drawings
    └── DB Client (Desktop/CLI)
```

Hak akses, pencarian, Version History, percakapan AI, dan MCP mengikuti Project dan workspace tempat file berada.

## Konteks AI (@mention)

AI Assistant dapat membaca isi file lain di Project yang sama:

1. Saat mengetik di AI Assistant, ketik `@` atau klik **Reference a file**.
2. Pilih Notes, ERD, atau Flowchart dari Project yang sama.
3. Isi file tersebut (maksimal 2.000 karakter per file) ikut dikirim sebagai konteks.

Contoh: saat membuat Flowchart alur login, ketik:
```
@Skema Database buatkan flowchart untuk alur authentication user
```
AI membaca daftar tabel dan DBML dari ERD tersebut, lalu menyusun flowchart yang sesuai. Drawings tidak dapat dirujuk.

## Preview Antarfile di Notes

Dari Slash Menu Notes, **Open preview** membuka ERD, Flowchart, atau Drawing di panel samping, sehingga Anda bisa menulis dokumentasi sambil melihat diagramnya. Lihat [Notes](../core-features/notes.md#open-preview).

## Percakapan AI per Project

Riwayat percakapan AI disimpan per Project, sehingga anggota Team dapat membaca percakapan yang sama. Hanya pembuat percakapan yang dapat mengirim pesan di dalamnya.

## Keuntungan

1. **Konsisten**: semua fitur membaca data dari Project yang sama.
2. **Lintas modul**: AI dan preview bekerja antarjenis file tanpa salin-tempel manual.
3. **Terkendali**: hak akses Project berlaku untuk semua jenis file di dalamnya.

---
*Catatan untuk kontributor: state workspace dikelola di `src/providers/WorkspaceContext.tsx`, aksi AI di `src/contexts/AIActionContext.tsx`, dan konteks @mention disusun di `src/hooks/aiEntityContext/siblings.ts`.*
