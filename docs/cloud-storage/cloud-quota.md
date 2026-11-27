---
sidebar_position: 4
slug: /cloud-storage/cloud-quota
---
# Kuota Cloud

Cloud membatasi jumlah file dan storage sesuai paket. Batasnya diatur ERDBPro SaaS dan dikirim ke Cloud sebagai entitlement. Self-host, Desktop, dan CLI tidak memiliki kuota file.

## Batas File Personal Workspace

- Setiap Personal Workspace memiliki batas jumlah file **per fitur**, dihitung terpisah untuk Notes, ERD, Drawings, dan Flowcharts.
- Batas awal pada mode Trial atau gratis adalah **3 file per fitur**. Paket Cloud berbayar dapat memberikan batas yang berbeda.
- File di Trash ikut dihitung sampai dihapus permanen.

Bila batas tercapai, pembuatan file baru ditolak dengan pesan *Personal Workspace has reached the limit of &lt;n&gt; &lt;Feature&gt; files.*

## Batas File Team Workspace

Kuota Team terpisah dari Personal dan mengikuti paket Organization Team. Paket Trial dapat membatasi jumlah file per fitur. Pesannya: *This Team has reached the limit of &lt;n&gt; &lt;Feature&gt; files for its plan.*

## Storage

| Workspace | Batas storage |
| :--- | :--- |
| **Personal** | Sesuai paket; bawaan 25 MB |
| **Team** | Sesuai paket Team |

- Storage terpakai = ukuran dokumen (termasuk yang ada di Trash) + gambar.
- Bila storage penuh, file baru dan unggahan ditolak (*This workspace has used its storage limit. Delete unused images or upgrade the plan.*). File yang ada tetap bisa diedit.
- Hapus gambar yang tidak terpakai lewat [Library](./library.md) untuk mengosongkan ruang.

## Melihat Pemakaian

Buka **Settings → Usage**. Halaman ini menampilkan:
- pemakaian storage, misalnya *&lt;terpakai&gt; of &lt;batas&gt; used · &lt;sisa&gt; left*;
- rincian dokumen dan gambar;
- peringatan *Storage is almost full.* atau *Storage is full: new files and uploads are refused. Existing files stay editable.*;
- tombol **Open Library**;
- tombol **Upgrade plan**, khusus Manager Team, saat pemakaian mencapai 80% atau lebih.

## Fitur Berbayar

Semua menu fitur Cloud tetap terlihat. Fitur yang tidak termasuk paket diberi badge **Pro**; membukanya menampilkan pesan *&lt;Feature&gt; needs a paid Cloud plan* dengan tombol **Unlock &lt;Feature&gt;**. Pesan penolakan kuota juga menyertakan tautan **View Cloud plans**.
