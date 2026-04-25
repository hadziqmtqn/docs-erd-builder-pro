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
*Detail pengisian variabel environment dapat dilihat pada [Modul 6](../reference/env-variables.md).*

## 4. Menjalankan Aplikasi
Jalankan perintah berikut untuk memulai server pengembangan:
```bash
npm run dev
```
Aplikasi akan tersedia di `http://localhost:5173`.
