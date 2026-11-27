---
sidebar_position: 6
slug: /core-features/flowcharts
---
# Flowcharts

![Flowchart Toolbar](/img/docs/flowchart-toolbar.png)

**Flowchart** dipakai untuk memvisualkan alur logika, proses bisnis, atau urutan algoritma aplikasi Anda.

## Toolbar

| Tombol | Fungsi |
| :--- | :--- |
| **Auto Layout** | Menata ulang posisi simbol berdasarkan alur koneksinya. |
| **Add Symbol** | Menambah simbol baru. |
| **Undo** / **Redo** | Membatalkan atau mengulang perubahan. |
| **Clear Canvas** | Mengosongkan canvas. |

## Jenis Simbol

| Bentuk | Kegunaan |
| :--- | :--- |
| **Oval (Start/End)** | Awal atau akhir alur |
| **Rectangle (Process)** | Langkah atau operasi |
| **Diamond (Decision)** | Percabangan Ya/Tidak |
| **Parallelogram (Input/Output)** | Input atau output data |
| **Cylinder (Database)** | Penyimpanan data |
| **Document** | Dokumen atau laporan |
| **Cloud (External System)** | Sistem eksternal |
| **Circle (Connector)** | Penghubung antarbagian alur |

## Membuat Alur

1. Klik **Add Symbol**. Di dialog **Create New Symbol**, isi label, **Group Title** (opsional, untuk mengelompokkan simbol), **Shape Type**, dan **Color**.
2. Hubungkan dua simbol dengan menarik garis dari titik sambung salah satu simbol ke simbol lain.
3. Klik garis untuk membuka **Connector Properties**: **Text Label**, **Line Style** (*Solid Line* atau *Dashed Line*), dan **Arrow Style** (panah di akhir, di awal, di kedua ujung, atau tanpa panah).
4. Klik simbol untuk mengubahnya lewat **Symbol Properties**.

## Auto Layout

Klik **Auto Layout** bila simbol mulai berantakan atau saling tumpang tindih. Sistem menata ulang posisi simbol mengikuti arah koneksinya.

## AI Assistant

AI Assistant dapat membuat atau melanjutkan flowchart dari deskripsi teks. Perubahan dari AI ditinjau dulu di **Preview Flowchart Changes** sebelum diterapkan. Lihat [AI Integration](./ai-integration.md).

## Kolaborasi dan Riwayat

- Di Team Workspace, klik kanan simbol lalu pilih **Comment**. Lihat [Komentar & Diskusi](../collaboration/comments-discussions.md).
- Perubahan yang tersimpan dapat dipulihkan dari [Version History](../collaboration/version-history.md).

## Export

Export Flowchart ke gambar atau PDF saat ini tidak tersedia. Flowchart tetap dapat dibagikan dengan [link publik](../collaboration/public-share.md).
