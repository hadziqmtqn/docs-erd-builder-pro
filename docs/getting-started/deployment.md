---
sidebar_position: 4
slug: /getting-started/deployment
---
# Deployment

ERD Builder Pro dapat dideploy ke berbagai platform. Berikut adalah opsi yang direkomendasikan.

## Vercel (Frontend & Serverless)
Karena aplikasi menggunakan Vite, Anda dapat dengan mudah melakukan deploy ke Vercel:
1. Hubungkan repositori GitHub Anda ke Vercel.
2. Atur *Build Command*: `npm run build`.
3. Atur *Output Directory*: `dist`.
4. Masukkan semua *Environment Variables* di dashboard Vercel.

## Docker (Eksperimental)
> [!CAUTION]
> Metode deployment menggunakan Docker saat ini masih dalam tahap **Eksperimental** dan belum teruji secara mendalam untuk semua lingkungan server.

Untuk stabilitas dan kemudahan pengelolaan server, Anda dapat mencoba menggunakan Docker:
```bash
docker build -t erd-builder-pro .
docker run -d -p 3000:3000 --env-file .env erd-builder-pro
```

## Easypanel / Coolify (Eksperimental)
> [!WARNING]
> Penggunaan platform PaaS seperti Easypanel belum diuji secara resmi. Kami menyarankan penggunaan Vercel untuk deployment frontend yang lebih stabil.

Jika Anda menggunakan panel manajemen server, pastikan untuk mengonfigurasi port eksternal ke `3000` dan menyertakan semua variabel environment yang diperlukan.
