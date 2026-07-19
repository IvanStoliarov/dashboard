# Dashboard

A Next.js 16 dashboard with server-oriented Supabase email/password
authentication.

## Local development

Install dependencies and start the local Supabase stack:

```bash
pnpm install
pnpm exec supabase start
```

Copy the environment template and use the API URL and anon/publishable key
reported by the Supabase CLI:

```bash
cp .env.example .env.local
pnpm exec supabase status
```

Set these values in `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-or-publishable-key
```

Start the application at [http://localhost:3000](http://localhost:3000):

```bash
pnpm dev
```

The home, login, and signup pages are public. `/dashboard` requires a valid
Supabase session.

## Verification

```bash
pnpm lint
pnpm build
```
