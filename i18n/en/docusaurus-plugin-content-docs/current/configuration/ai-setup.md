---
sidebar_position: 3
slug: /configuration/ai-setup
---

# AI Configuration

:::info
The AI feature is still under **development**. Please understand that the generated results or AI assistant may sometimes not provide perfect answers.
:::

ERD Builder Pro is equipped with an AI assistant that can help you create diagrams, write notes, and compose flowcharts. This feature requires an API Key configuration from an AI service provider.

## UI Settings (Recommended)

You can configure your API Key directly through the application interface in the **Settings > AI Configuration** menu. This interface allows you to:
- Select an AI service provider.
- Enter your API Key securely.
- Choose a default model to use.
- Test the connection to the service provider.

## Supported Service Providers

Currently, ERD Builder Pro supports three types of integrations:

### 1. OpenAI
Use an official API Key from the [OpenAI Platform](https://platform.openai.com/).
- **Popular Models:** `gpt-4o`, `gpt-4o-mini`.
- **Features:** High performance and highly accurate instructions.

### 2. Google AI Studio (Gemini AI)
Use a free or paid API Key from [Google AI Studio](https://aistudio.google.com/).
- **Popular Models:** `gemini-1.5-pro`, `gemini-1.5-flash`.
- **Features:** Very large context window, great for analyzing long SQL schemas.

### 3. OpenAI Compatible
Use this if you are using a proxy or self-hosted service that follows the OpenAI API standard (such as **9router**, Groq, or OpenRouter).
- **Base URL:** The endpoint address of the provider (example: `http://localhost:20128/v1`).
- **API Key:** The key from that provider.

## Environment Variables (.env)

Provider, model, and API key configuration is managed through **Settings > AI Configuration** and stored in the database. The server does not currently read `AI_PROVIDER`, `AI_API_KEY`, `AI_BASE_URL`, or `AI_MODEL` from `.env`.

For web/Docker/self-host deployments, configure the server encryption key:

```env
ERD_ENCRYPTION_KEY="random-key-at-least-32-characters-long"
```

This key encrypts AI API keys before they are stored and decrypts them for `/api/ai/proxy`, connection tests, and model-list requests. Keep the same key for the lifetime of the database.

## Data Security

- **Server-side storage:** API keys saved through the UI are never returned to the frontend; the UI receives only the `***` placeholder.
- **Encryption:** API keys are encrypted in the database using `ERD_ENCRYPTION_KEY`.
- **Proxy:** The API key is sent only from the server to the selected provider. Do not put keys in URLs or commit them to a repository.
- **Private endpoints:** Private AI endpoints are blocked by default for SSRF protection. Enable `AI_ALLOW_PRIVATE_BASE_URL=true` only for an internal endpoint you control.
- **Guest access:** Guest AI is disabled by default. `GUEST_AI_ENABLED=true` lets Guests use the server API key and may consume your quota.

---
*Note: If you experience connection issues, make sure your API quota is still sufficient and the API Key has the correct permissions.*
