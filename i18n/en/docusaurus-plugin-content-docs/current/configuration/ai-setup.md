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

If you want to set the configuration permanently at the server level (without going through the UI), you can use the following variables in the `.env` file:

| Variable Name | Description | Example |
| :--- | :--- | :--- |
| `AI_PROVIDER` | Default AI provider (`openai`, `google`, or `custom`) | `openai` |
| `AI_API_KEY` | Main API Key | `sk-...` |
| `AI_BASE_URL` | Endpoint (specific to `custom`) | `http://.../v1` |
| `AI_MODEL` | Default Model ID | `gpt-4o-mini` |

## Data Security

- **Local Storage:** If set via the UI, the API Key is stored locally in your browser (or encrypted in the database if logged in).
- **Security:** Your API Key is never shared with any third party other than the service provider you choose.
- **Encryption:** Connections to the AI provider always use the HTTPS protocol.

---
*Note: If you experience connection issues, make sure your API quota is still sufficient and the API Key has the correct permissions.*