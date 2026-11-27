---
sidebar_position: 3
slug: /configuration/ai-setup
---

# AI Configuration

:::info
Fitur AI masih dalam tahap **pengembangan**. Hasil generate atau jawaban AI Assistant bisa belum sempurna.
:::

AI Assistant membutuhkan provider AI dan API key. Siapa yang mengaturnya bergantung pada cara Anda memakai ERD Builder Pro:

| Cara | Yang mengatur |
| :--- | :--- |
| **Self-host** | SuperAdmin, lewat **Settings → AI Configuration**. Semua pengguna instance memakai konfigurasi SuperAdmin. |
| **Desktop dan CLI** | Anda sendiri, lewat **Settings → AI Configuration**. |
| **Cloud** | Tim ERD Builder Pro, dari ERDBPro SaaS. Menu AI Configuration tidak ada di Cloud. AI tersedia bila paket Team Anda mencakup AI Assistant dan masih memiliki kredit. |
| **Supabase (legacy)** | Setiap pengguna mengatur konfigurasinya sendiri. |

## Penyedia yang Didukung

| Provider | Keterangan |
| :--- | :--- |
| **OpenAI Compatible** | Layanan yang mengikuti API OpenAI, misalnya OpenRouter, Groq, atau server lokal. Base URL bawaan: `https://ai.paas.id`. |
| **OpenAI** | API key dari [OpenAI Platform](https://platform.openai.com/). |
| **Google Gemini** | API key dari [Google AI Studio](https://aistudio.google.com/). |
| **Anthropic (Claude)** | API key dari [Anthropic Console](https://console.anthropic.com/). |

## Mengatur Provider

Buka **Settings → AI Configuration**, tab **Configuration**:

1. Bila belum ada provider, klik **Initialize AI Configuration**.
2. Pilih provider, lalu isi **Base URL** (bila diperlukan) dan **API Key**.
3. Pilih **Default Model**. Untuk OpenAI Compatible, daftar model diambil dari endpoint `/models` provider, dan model yang dipilih otomatis ditambahkan ke katalog.
4. Centang **Enable this provider**.
5. Klik **Save Configuration**, lalu **Test Connection**.

**Test Connection** menguji API key yang sudah tersimpan di server, jadi simpan konfigurasi lebih dulu. Bila ada beberapa provider aktif, AI Assistant memakai konfigurasi aktif yang terakhir diperbarui.

## Katalog Model (AI Models)

Tab **AI Models** berisi daftar model per provider. Klik **Register Model** untuk menambah model dengan **Provider**, **Identifier** (ID model di API provider), dan **Display Name**. Model bawaan mencakup `gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`, `gemini-1.5-pro`, `gemini-1.5-flash`, `deepseek-v4-flash`, `claude-haiku-5-5`, dan `claude-sonnet-5-5`.

## Variabel Lingkungan

Provider, model, dan API key tidak dibaca dari `.env`. `AI_PROVIDER`, `AI_API_KEY`, `AI_BASE_URL`, dan `AI_MODEL` tidak dipakai server.

Untuk web, Docker, dan Self-host, atur kunci enkripsi server:

```env
ERD_ENCRYPTION_KEY="kunci-acak-minimal-32-karakter"
```

Kunci ini mengenkripsi API key sebelum disimpan dan mendekripsinya saat AI dipanggil. Simpan kunci yang sama selama database dipakai. Desktop dan CLI membuat file kunci lokal secara otomatis.

## Keamanan Data

- **Disimpan di server:** API key tidak dikembalikan ke browser; antarmuka hanya menampilkan `***`.
- **Terenkripsi:** API key dienkripsi AES-256-GCM dengan `ERD_ENCRYPTION_KEY`.
- **Lewat proxy server:** API key hanya dikirim server ke provider yang dipilih.
- **Endpoint privat diblokir:** Base URL di jaringan privat atau localhost ditolak untuk mencegah SSRF. Set `AI_ALLOW_PRIVATE_BASE_URL=true` hanya bila Anda sengaja memakai endpoint internal yang Anda kendalikan, misalnya Ollama.

## Aturan dan Prompt

Perilaku AI Assistant bisa diarahkan lewat **Settings → AI Rules** dan **Settings → System Prompts**. Lihat [Settings](./settings.md#ai-rules).

---
*Jika koneksi gagal, pastikan kuota API masih tersedia, API key memiliki izin yang tepat, dan Base URL provider OpenAI Compatible diakhiri `/v1` bila provider memintanya.*
