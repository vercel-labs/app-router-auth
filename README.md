This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Create a new [Postgres db on Vercel](https://vercel.com/docs/storage/vercel-postgres)
2. Copy the config and paste it into an `.env.local` file
3. Generate a secret using `openssl rand -base64 32` and paste it in your `.env.local` as `SECRET=<YOUR_SECRET_HERE>`
4. Install dependencies

```bash
  pnpm i
```
5. Start the dev server and visit `localhost:3000`
```bash
  pnpm dev
```
