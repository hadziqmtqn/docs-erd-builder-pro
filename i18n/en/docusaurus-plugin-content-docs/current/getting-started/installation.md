---
sidebar_position: 3
slug: /getting-started/installation
---
# Local Installation

Follow these steps to run ERD Builder Pro on your local machine.

## 1. Clone Repository
```bash
git clone https://github.com/hadziqmtqn/erd-builder-pro.git
cd erd-builder-pro
```

## 2. Install Dependencies
You need to install dependencies for both frontend and backend.
```bash
npm install
```

## 3. Configure Environment
Copy the `.env.example` file to `.env` and fill it with your credentials.
```bash
cp .env.example .env
```
*For details on filling environment variables, see the [Configuration Module](../configuration/env-variables.md).*

> [!TIP]
> By default, the backend server runs on port `3000`. If you need to use a different port (especially in production), you can set it via the `PORT` variable in the `.env` file.

## 4. Run the Application
Run the following command to start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.