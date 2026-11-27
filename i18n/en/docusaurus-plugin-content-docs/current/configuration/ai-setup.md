---
sidebar_position: 3
slug: /configuration/ai-setup
---

# AI Configuration

:::info
The AI feature is still in **development**. Generated results and AI Assistant answers may not be perfect yet.
:::

The AI Assistant needs an AI provider and an API key. Who configures them depends on how you use ERD Builder Pro:

| How you use it | Configured by |
| :--- | :--- |
| **Self-host** | The SuperAdmin, in **Settings → AI Configuration**. All users of the instance use the SuperAdmin's configuration. |
| **Desktop and CLI** | You, in **Settings → AI Configuration**. |
| **Cloud** | The ERD Builder Pro team, from ERDBPro SaaS. The AI Configuration menu does not exist in Cloud. AI is available when your Team plan includes the AI Assistant and still has credits. |
| **Supabase (legacy)** | Each user sets up their own configuration. |

## Supported Providers

| Provider | Details |
| :--- | :--- |
| **OpenAI Compatible** | Services that follow the OpenAI API, for example OpenRouter, Groq, or a local server. Default Base URL: `https://ai.paas.id`. |
| **OpenAI** | API key from [OpenAI Platform](https://platform.openai.com/). |
| **Google Gemini** | API key from [Google AI Studio](https://aistudio.google.com/). |
| **Anthropic (Claude)** | API key from [Anthropic Console](https://console.anthropic.com/). |

## Configuring a Provider

Open **Settings → AI Configuration**, **Configuration** tab:

1. If there is no provider yet, click **Initialize AI Configuration**.
2. Select a provider, then fill in **Base URL** (if needed) and **API Key**.
3. Select a **Default Model**. For OpenAI Compatible, the model list is fetched from the provider's `/models` endpoint, and the selected model is added to the catalog automatically.
4. Check **Enable this provider**.
5. Click **Save Configuration**, then **Test Connection**.

**Test Connection** tests the API key already saved on the server, so save the configuration first. If several providers are active, the AI Assistant uses the active configuration that was updated most recently.

## Model Catalog (AI Models)

The **AI Models** tab lists the models for each provider. Click **Register Model** to add a model with **Provider**, **Identifier** (the model ID in the provider's API), and **Display Name**. The default models include `gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`, `gemini-1.5-pro`, `gemini-1.5-flash`, `deepseek-v4-flash`, `claude-haiku-5-5`, and `claude-sonnet-5-5`.

## Environment Variables

The provider, model, and API key are not read from `.env`. The server does not use `AI_PROVIDER`, `AI_API_KEY`, `AI_BASE_URL`, or `AI_MODEL`.

For web, Docker, and Self-host, set the server encryption key:

```env
ERD_ENCRYPTION_KEY="random-key-at-least-32-characters"
```

This key encrypts the API key before it is stored and decrypts it when the AI is called. Keep the same key for as long as the database is in use. Desktop and CLI create a local key file automatically.

## Data Security

- **Stored on the server:** The API key is not returned to the browser; the interface shows only `***`.
- **Encrypted:** The API key is encrypted with AES-256-GCM using `ERD_ENCRYPTION_KEY`.
- **Through the server proxy:** The API key is sent only from the server to the selected provider.
- **Private endpoints blocked:** Base URLs on a private network or localhost are rejected to prevent SSRF. Set `AI_ALLOW_PRIVATE_BASE_URL=true` only when you intentionally use an internal endpoint you control, such as Ollama.

## Rules and Prompts

You can steer the AI Assistant's behavior through **Settings → AI Rules** and **Settings → System Prompts**. See [Settings](./settings.md#ai-rules).

---
*If the connection fails, make sure the API quota is still available, the API key has the right permissions, and the Base URL of the OpenAI Compatible provider ends with `/v1` if the provider requires it.*
