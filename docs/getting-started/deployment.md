---
sidebar_position: 4
slug: /getting-started/deployment
---
# Deployment

ERD Builder Pro dapat dideploy ke berbagai platform. Berikut adalah opsi yang direkomendasikan.

## <span id="vercel-deployment"></span>Vercel (Frontend & Serverless)
Karena aplikasi menggunakan Vite, Anda dapat dengan mudah melakukan deploy ke Vercel:
1. Hubungkan repositori GitHub Anda ke Vercel.
2. Atur *Build Command*: `npm run build`.
3. Atur *Output Directory*: `dist`.
4. Masukkan semua *Environment Variables* di dashboard Vercel.

## <span id="docker-deployment"></span>Docker (Rekomendasi)
Untuk stabilitas dan kemudahan pengelolaan server, gunakan Docker:
```bash
docker build -t erd-builder-pro .
docker run -d -p 3000:3000 --env-file .env erd-builder-pro
```

## <span id="easypanel-deployment"></span>Easypanel / Coolify
Jika Anda menggunakan panel manajemen server, pastikan untuk mengonfigurasi port eksternal ke `3000` dan menyertakan semua variabel environment yang diperlukan.
