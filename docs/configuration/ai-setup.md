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

Jika Anda ingin menetapkan konfigurasi secara permanen di tingkat server (tanpa melalui UI), Anda dapat menggunakan variabel berikut di file `.env`:

| Nama Variabel | Deskripsi | Contoh |
| :--- | :--- | :--- |
| `AI_PROVIDER` | Penyedia AI default (`openai`, `google`, atau `custom`) | `openai` |
| `AI_API_KEY` | API Key utama | `sk-...` |
| `AI_BASE_URL` | Endpoint (khusus untuk `custom`) | `http://.../v1` |
| `AI_MODEL` | ID Model default | `gpt-4o-mini` |

## Keamanan Data

- **Local Storage:** Jika diatur melalui UI, API Key disimpan secara lokal di browser Anda (atau dienkripsi di database jika sudah login).
- **Keamanan:** API Key Anda tidak pernah dibagikan ke pihak ketiga selain penyedia layanan yang Anda pilih.
- **Enkripsi:** Koneksi ke penyedia AI selalu menggunakan protokol HTTPS.

---
*Catatan: Jika Anda mengalami kendala koneksi, pastikan kuota API Anda masih mencukupi dan API Key memiliki izin yang tepat.*
