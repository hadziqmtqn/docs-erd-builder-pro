---
sidebar_position: 1
slug: /workspace/integration
---

# Workspace Integration

ERD Builder Pro didesain dengan pendekatan **modular** di mana fitur-fitur seperti Notes, ERD Builder, dan Flowchart beroperasi dalam satu ekosistem yang saling terhubung. Artikel ini menjelaskan secara teknis bagaimana integrasi tersebut bekerja.

## Konsep Project-Based

Seluruh konten di ERD Builder Pro dikelompokkan dalam **Project**. Setiap entitas (Catatan, ERD, Flowchart, Drawing) memiliki field `project_id` yang menjadi penghubung antarfitur.

### Struktur Data
```
Project
├── Notes (project_id: X)
├── ERD Diagrams (project_id: X)
├── Flowcharts (project_id: X)
└── Drawings (project_id: X)
```

Ketika Anda berpindah dari satu fitur ke fitur lain dalam project yang sama, data akan tetap sinkron karena semuanya merujuk ke `project_id` yang identik.

## AI Context Sharing (@Mentions)

Salah satu fitur andalan adalah kemampuan AI untuk "melihat" konten dari fitur lain saat Anda sedang mengobrol di salah satu modul. Ini dicapai melalui sistem **@Mention**.

### Cara Kerja
1. Saat mengetik di AI Chat, ketik karakter `@`.
2. Dropdown akan muncul menampilkan daftar file dari project yang sama.
3. Pilih file yang ingin Anda rujuk.
4. Konten file tersebut akan disisipkan ke dalam prompt secara otomatis.

### Contoh Penggunaan
Misalnya, Anda sedang membuat **Flowchart** untuk alur login. Anda bisa mengetik:
```
@DatabaseSchema buatkan flowchart untuk alur authentication user
```
Dengan mention tersebut, AI akan mengambil konteks dari schema database Anda (ERD) dan membuatkan flowchart yang sesuai.

## State Management

Di balik layar, aplikasi menggunakan dua context utama untuk mengelola state:

### 1. WorkspaceContext
Terletak di `src/providers/WorkspaceContext.tsx`, ini mengelola:
- Data autentikasi pengguna.
- List semua dokumen (Notes, ERD, Flowchart, dll).
- ID aktif yang sedang dipilih.
- Konfigurasi workspace (seperti tema danundo/redo).

### 2. AIActionContext
Terlocated di `src/contexts/AIActionContext.tsx`, ini mengelola:
- actions yang bisa dilakukan oleh AI (replace, append).
- Teks yang sedang diseleksi (selectionText) untuk konteks tambahan.
- Handler untuk menerima konten dari AI dan diterapkan ke dokumen.

### Interaksi Keduanya
Ketika Anda menggunakan @Mention:
1. `WorkspaceContext` menyediakan list file yang tersedia di project tersebut.
2. `AIActionContext` menangani pemilihan dan penyisipan konten ke dalam prompt.
3. Server-side (`buildSiblingContext`) menyusun konteks dari semua file yang dirujuk sebelum dikirim ke AI provider.

## Keuntungan Integrasi

1. ** Konsisten:** Semua fitur berbagi satu sumber data (Supabase).
2. ** Smart:** AI dapat bekerja lintas-modul tanpa perlu menyalin tempel manual.
3. ** Modular:** Fitur baru dapat ditambahkan dengan mudah karena sudah ada fondasi shared state.

---
*Catatan teknis: Jika Anda seorang kontributor, lihat file `useAIChat.ts` untuk melihat bagaimana `project_id` digunakan dalam query dinamis.*