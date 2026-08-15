# 🌻 WatchFlower

A terminal app to keep an eye on your crypto wallets.

## What does it do?

- **Multi-user login** — Create profiles and switch between them whenever you want.
- **Balance check** — Paste an address and see the governance token balance right away.
- **Watchlists** — Organize your wallets into lists. Create, edit, rename, add or remove wallets freely.

## How to run

Install dependencies:

```bash
npm install
```

Set up your environment variables:

```bash
cp .env.example .env
```

Start the PostgreSQL database:

```bash
docker compose up -d
```

Run the Prisma migrations:

```bash
npx prisma migrate dev
```

Start the app:

```bash
npm run start
```

And you're good to go. 🚀
