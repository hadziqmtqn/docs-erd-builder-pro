---
sidebar_position: 3
slug: /configuration/ai-setup
---

# AI Configuration

:::info
Fitur AI masih dalam tahap **pengembangan**. Mohon dimaklumi jika hasil generate atau asisten AI terkadang belum memberikan jawaban yang sempurna.
:::

ERD Builder Pro dilengkapi dengan asisten AI yang dapat membantu Anda membuat diagram, menulis catatan, dan menyusun flowchart. Fitur ini memerlukan konfigurasi API Key dari penyedia layanan AI.

## Pengaturan via UI (Recommended)

Anda dapat mengatur API Key langsung melalui antarmuka aplikasi di menu **Settings > AI Configuration**. Antarmuka ini memungkinkan Anda untuk:
- Memilih penyedia layanan AI.
- Memasukkan API Key secara aman.
- Memilih model default yang ingin digunakan.
- Mengetes koneksi ke penyedia layanan.

## Penyedia Layanan yang Didukung

Saat ini, ERD Builder Pro mendukung tiga jenis integrasi:

### 1. OpenAI
Gunakan API Key resmi dari [OpenAI Platform](https://platform.openai.com/).
- **Model Populer:** `gpt-4o`, `gpt-4o-mini`.
- **Fitur:** Performa tinggi dan instruksi yang sangat akurat.

### 2. Google AI Studio (Gemini AI)
Gunakan API Key gratis atau berbayar dari [Google AI Studio](https://aistudio.google.com/).
- **Model Populer:** `gemini-1.5-pro`, `gemini-1.5-flash`.
- **Fitur:** *Context window* yang sangat besar, sangat baik untuk menganalisis skema SQL yang panjang.

### 3. OpenAI Compatible
Gunakan ini jika Anda menggunakan layanan *proxy* atau *self-hosted* yang mengikuti standar API OpenAI (seperti **9router**, Groq, atau OpenRouter).
- **Base URL:** Alamat endpoint provider (contoh: `http://localhost:20128/v1`).
- **API Key:** Key dari provider tersebut.

## Variabel Lingkungan (.env)

Konfigurasi provider, model, dan API key dilakukan melalui **Settings > AI Configuration** dan disimpan di database. `AI_PROVIDER`, `AI_API_KEY`, `AI_BASE_URL`, dan `AI_MODEL` bukan variabel environment yang digunakan oleh server saat ini.

Untuk web/Docker/self-host, atur kunci enkripsi server:

```env
ERD_ENCRYPTION_KEY="kunci-acak-minimal-32-karakter"
```

Kunci ini dipakai untuk mengenkripsi API key AI sebelum disimpan dan mendekripsinya saat request `/api/ai/proxy`, pengujian koneksi, atau pengambilan daftar model. Simpan kunci yang sama selama database digunakan.

## Keamanan Data

- **Server-side storage:** API key yang disimpan melalui UI tidak dikembalikan ke frontend; UI hanya menerima placeholder `***`.
- **Enkripsi:** API key dienkripsi di database menggunakan `ERD_ENCRYPTION_KEY`.
- **Proxy:** API key hanya dikirim server ke provider yang dipilih. Jangan masukkan API key ke URL atau commit ke repository.
- **Private endpoint:** Endpoint AI privat diblokir secara default untuk perlindungan SSRF. Aktifkan `AI_ALLOW_PRIVATE_BASE_URL=true` hanya untuk endpoint internal yang Anda kontrol.
- **Guest:** Guest AI nonaktif secara default. `GUEST_AI_ENABLED=true` membuat Guest memakai API key server dan dapat menghabiskan kuota Anda.

---
*Catatan: Jika Anda mengalami kendala koneksi, pastikan kuota API Anda masih mencukupi dan API Key memiliki izin yang tepat.*
