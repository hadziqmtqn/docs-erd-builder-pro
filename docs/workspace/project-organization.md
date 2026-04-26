---
sidebar_position: 1
slug: /workspace/project-organization
---
# Organisasi Proyek

ERD Builder Pro menggunakan sistem organisasi berbasis proyek untuk memastikan dokumentasi Anda tetap terstruktur dan mudah ditemukan.

## Hierarki Workspace
Dokumentasi Anda diatur dalam tiga level utama:
1.  **Workspace**: Ruang kerja global Anda (terhubung ke satu database Supabase).
2.  **Project**: Wadah logis untuk satu aplikasi atau satu klien tertentu.
3.  **Files**: Dokumen teknis yang ada di dalam proyek tersebut.

## Tipe Dokumen dalam Proyek
Setiap proyek bersifat sangat fleksibel. Anda dapat menggabungkan berbagai tipe dokumen berikut dalam satu proyek yang sama:

- **ERD Diagrams**: Fokus pada perancangan skema database PostgreSQL/MySQL.
- **Flowcharts**: Digunakan untuk memetakan alur logika atau proses bisnis aplikasi.
- **Notes & Documentation**: Tempat mencatat aturan bisnis, dokumentasi API, atau panduan teknis.
- **Drawings (Excalidraw)**: Kanvas bebas untuk mockup UI, brainstorming, atau sketsa arsitektur.

> [!TIP]
> Satu proyek tidak terbatas pada satu file saja. Anda bisa memiliki, misalnya, 3 ERD Diagram (untuk modul berbeda), 5 file Notes, dan beberapa sketsa Drawings dalam satu proyek "Aplikasi E-Commerce".

## Manajemen File & Proyek
- **Pengelompokan**: Gunakan nama proyek yang deskriptif (contoh: `Backend-CRM-V2`) untuk memisahkan fokus pekerjaan.
- **Pindah File**: Jika salah satu file dirasa lebih cocok berada di proyek lain, Anda dapat memindahkannya melalui menu pengaturan pada masing-masing file tanpa kehilangan data.
- **Pencarian**: Gunakan fitur filter/pencarian di sidebar untuk menemukan file dengan cepat berdasarkan nama atau tipe filenya.

> [!CAUTION]
> **Hati-hati Saat Menghapus Proyek**: Menghapus sebuah proyek akan menghapus **seluruh** dokumen yang ada di dalamnya secara massal. Meskipun file tersebut masuk ke Trash, proses pemulihan file dalam jumlah banyak bisa memakan waktu. Selalu cek kembali isi proyek sebelum menghapusnya.
