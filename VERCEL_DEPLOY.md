# Deploying ScholarLens to Vercel

This is a Next.js 15 App Router project that runs as-is on Vercel's free tier.

## 1. Push the repo to GitHub / GitLab / Bitbucket

From the `/app` directory:

```bash
git init
git add .
git commit -m "ScholarLens initial deploy"
git branch -M main
git remote add origin https://github.com/<your-user>/scholarlens.git
git push -u origin main
```

## 2. Import in Vercel

1. Go to https://vercel.com/new
2. Import the repository you just pushed.
3. Framework preset should auto-detect **Next.js**. Keep the defaults (Build Command `next build`, Output `.next`, Install Command `yarn install`).

## 3. Add environment variables in Vercel

Under **Project Settings → Environment Variables** add each of these for Production **and** Preview:

| Key | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase → Project Settings → API → `anon` / publishable key |
| `GEMINI_API_KEY` | https://aistudio.google.com/app/apikey |
| `GEMINI_MODEL` | `gemini-2.5-flash` (or the model your key supports) |
| `NEXT_PUBLIC_BASE_URL` | Set to your production URL, e.g. `https://scholarlens.vercel.app` |

> The `MONGO_URL` and `DB_NAME` values in `.env.example` are template-only and are not used by ScholarLens features.

## 4. Configure Supabase redirect URLs

In Supabase → Authentication → URL Configuration:

- **Site URL**: `https://<your-vercel-domain>`
- **Redirect URLs**: add both `https://<your-vercel-domain>` and `https://<your-vercel-domain>/**`

## 5. Apply the database schema

Open Supabase → SQL Editor and run the contents of `/supabase/schema.sql` once. This creates the `papers`, `users_saved_papers`, and `explanations_cache` tables and their RLS policies.

## 6. First deploy

Click **Deploy**. Vercel will build the app and give you a `*.vercel.app` URL. Any push to `main` afterwards automatically redeploys.

## 7. Verify

- Visit `/` — search returns results.
- Open any paper — abstract, `Open full text`, and Reading assistant render.
- Sign in with a magic link, save a paper — it should appear on `/library`.
- Check Google Analytics **Realtime** — you should see yourself as a visitor.
