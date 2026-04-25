---
sidebar_position: 3
slug: /getting-started/installation
---
# Instalasi Lokal

Ikuti langkah-langkah berikut untuk menjalankan ERD Builder Pro di mesin lokal Anda.

## 1. Clone Repositori
```bash
git clone https://github.com/hadziqmtqn/erd-builder-pro.git
cd erd-builder-pro
```

## 2. Instal Dependensi
Anda perlu menginstal dependensi untuk frontend dan backend.
```bash
npm install
```

## 3. Konfigurasi Environment
Salin file `.env.example` menjadi `.env` dan isi dengan kredensial Anda.
```bash
cp .env.example .env
```
*Detail pengisian variabel environment dapat dilihat pada [Modul Konfigurasi](../configuration/env-variables.md).*

> [!TIP]
> Secara default, server backend berjalan pada port `3000`. Jika Anda perlu menggunakan port berbeda (terutama di lingkungan produksi), Anda dapat mengaturnya melalui variabel `PORT` di file `.env`.

## 4. Menjalankan Aplikasi
Jalankan perintah berikut untuk memulai server pengembangan:
```bash
npm run dev
```
Aplikasi akan tersedia di `http://localhost:3000`.
