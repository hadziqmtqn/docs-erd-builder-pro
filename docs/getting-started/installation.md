---
sidebar_position: 3
slug: /getting-started/installation
---
# Instalasi Lokal

Ikuti langkah-langkah berikut untuk menjalankan ERD Builder Pro di mesin lokal Anda.

## <span id="clone-repository"></span>1. Clone Repositori
```bash
git clone https://github.com/hadziqmtqn/erd-builder-pro.git
cd erd-builder-pro
```

## <span id="install-dependencies"></span>2. Instal Dependensi
Anda perlu menginstal dependensi untuk frontend dan backend.
```bash
npm install
```

## <span id="environment-configuration"></span>3. Konfigurasi Environment
Salin file `.env.example` menjadi `.env` dan isi dengan kredensial Anda.
```bash
cp .env.example .env
```
*Detail pengisian variabel environment dapat dilihat pada [Modul 6](../reference/env-variables.md).*

## <span id="running-application"></span>4. Menjalankan Aplikasi
Jalankan perintah berikut untuk memulai server pengembangan:
```bash
npm run dev
```
Aplikasi akan tersedia di `http://localhost:5173`.
