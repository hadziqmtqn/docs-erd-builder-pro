---
sidebar_position: 11
slug: /core-features/git-repository
---
# Git Repository (Desktop & CLI)

Panel **Repository Schema** menghubungkan sebuah ERD dengan repositori Git di komputer Anda, lalu membaca skema dari file migrasi atau SQL di repositori itu. Repositori dan branch aktif tidak pernah diubah.

:::info Hanya Desktop dan CLI
Panel ini hanya tersedia di aplikasi Desktop dan CLI, dan membutuhkan `git` terpasang di komputer.
:::

## Sumber Skema yang Didukung

- **Laravel migrations**: `database/migrations/*.php`
- File `.dbml`
- File `schema.sql`
- File `.sql` di dalam folder `migrations/`

Satu sumber dapat berisi 1–500 file dengan total maksimal 5 MB.

## Menghubungkan Repositori

1. Buka ERD, lalu klik **Repository** di toolbar canvas.
2. Isi **Repository path** (di Desktop tersedia tombol untuk memilih folder), lalu klik **Connect repository**.
3. Pilih **Git ref**: *Working tree* (isi folder saat ini), branch lokal atau remote, atau salah satu dari 50 commit terakhir.
4. Pilih **Schema** bila repositori memiliki lebih dari satu sumber.

Hubungan repositori disimpan per diagram.

## Membandingkan

- **Preview against current ERD** menampilkan perbedaan antara skema di repositori dan ERD saat ini langsung di canvas. Perubahan dapat digabungkan ke ERD.
- **Compare Git refs** membandingkan dua ref: pilih **Base ref**, lalu **Compare with selected ref**. Hasilnya hanya pratinjau.
- **Disconnect** memutus hubungan ERD dengan repositori.

## Di CI dan Klien AI

- Perintah `erdbpro schema check` dan `erdbpro schema diff` menjalankan pemeriksaan yang sama tanpa membuka aplikasi. Lihat [CLI](../getting-started/cli.md#pemeriksaan-skema-di-repositori).
- Tool MCP lokal `workspace_resolve_repository` memakai hubungan ini agar klien AI menemukan ERD dari folder repositori yang sedang dikerjakan. Lihat [MCP](../configuration/mcp.md).
