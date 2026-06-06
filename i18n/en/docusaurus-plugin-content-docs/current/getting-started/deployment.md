---
sidebar_position: 4
slug: /getting-started/deployment
---

# Deployment

ERD Builder Pro is designed to be flexible for deployment on various platforms, either as a serverless service or using containers.

### 1. Local Deployment (via Docker)

This is the fastest way to run ERD Builder Pro on your own server (self-hosted). We provide official images on Docker Hub.

:::warning Important
You **must** prepare a `.env` file containing the **Database** and **Cloudflare R2** configuration:
- `DATABASE_URL` — PostgreSQL connection string (required, both Supabase and Local PG)
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — only required when using **Supabase** mode
- R2 vars — recommended for full file/image upload functionality

If R2 is not configured, the file/image upload feature will error. For **Local PostgreSQL** mode, ensure the PostgreSQL database is reachable from the container.
:::

### Steps (Pull from Docker Hub):
1. **Pull Image:**
   ```bash
   docker pull bekenweb/erd-builder-pro:latest
   ```
2. **Run Container:**
   ```bash
   docker run -d \
     -p 3000:3000 \
     --name erd-builder-pro \
     --env-file .env \
     bekenweb/erd-builder-pro:latest
   ```

:::info
The Vite environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are baked into the Docker Hub image. Make sure you use the appropriate image tag for your needs.

The `.env` file content refers to [`.env.example`](https://github.com/hadziqmtqn/erd-builder-pro/blob/development/.env.example) in the main repository.

Available images: `latest`, specific versions (e.g., `v1.2.3`), and commit SHA.
:::

### Steps (Manual Build)
If you want to build your own image with custom configuration:
1. **Build Image:**
   ```bash
   docker build --build-arg VITE_SUPABASE_URL=your_url --build-arg VITE_SUPABASE_ANON_KEY=your_key -t erd-builder-pro .
   ```
2. **Run Container:**
   ```bash
   docker run -d \
     -p 3000:3000 \
     --name erd-builder-pro \
     --env-file .env \
     erd-builder-pro
   ```
3. Access the application at `http://localhost:3000`.

## 2. Vercel (Frontend & Serverless)

This application is compatible with Vercel for simpler deployment:
1. Connect your GitHub repository to Vercel.
2. Use the *Framework Preset*: **Vite**.
3. Set the *Output Directory*: `dist`.
4. Enter all *Environment Variables* in the Vercel dashboard.

## 4. Coolify / Other PaaS

If you are using **Coolify**, you can use the **Dockerfile** method.
- Ensure the exposed port is `3000`.
- Enter all environment variables in the *Variables* section of the Coolify dashboard.

---
*Tips: Always ensure `NODE_ENV=production` when deploying for optimal performance.*