---
sidebar_position: 2
slug: /configuration/supabase-setup
---
# Supabase

ERD Builder Pro uses Supabase as its PostgreSQL database and authentication system. Follow these steps to set up your Supabase project.

## 1. Create a New Project
1. Log in to [Supabase Dashboard](https://database.new).
2. Create a new project, select the nearest **Region**, and securely save your **Database Password**.

## 2. Initialize Database (Schema)
You need to create the required tables manually using the SQL Editor:
1. Open the `supabase_schema.sql` file located in the root directory of the ERD Builder Pro application.
2. Copy the entire contents of the file.
3. In the Supabase dashboard, open the **SQL Editor** menu.
4. Click **New Query**, paste the copied code, then click **Run**.
5. Ensure all tables (such as `projects`, `files`, etc.) have been created successfully.

## 3. Configure Authentication (Private)
To keep your application private and prevent others from using it:
1. Open the **Authentication > Settings** menu.
2. In the **Sign Up** section, disable (uncheck) the **Allow new users to sign up** option.
3. Save the changes. *Now strangers cannot sign up on their own.*

## 4. Register Your Account
After disabling public registration, you must create your own account manually:
1. Open the **Authentication > Users** menu.
2. Click the **Add User** button and select **Create new user**.
3. Enter the **Email** and **Password** you want to use.
4. (Optional) Disable the "Auto-confirm user" option if you want to verify the email, or leave it enabled for instant login.
5. Click **Create User**. Use this account to log in to your ERD Builder Pro application.

## 5. Retrieve API Keys
Open the **Settings > API** menu to get the required variables for the `.env` file:
- **Project URL**: Insert into `SUPABASE_URL` and `VITE_SUPABASE_URL`.
- **anon public**: Insert into `VITE_SUPABASE_ANON_KEY`.
- **service_role**: Insert into `SUPABASE_SERVICE_ROLE_KEY`.

> [!CAUTION]
> Never share your `service_role` key with anyone or include it in frontend code (without the `VITE_` prefix).