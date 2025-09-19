# Todo app for Svelte(kit) practice

## Requirements
- this app requires a `.env` in the root with
    - `DATABASE_URL`
    - `BETTER_AUTH_SECRET`
    - `BETTER_AUTH_URL`
- this app is set up for Postrgres, if you want to use e.g. SQLite, you'll need to change `prisma/schema.prisma`

## Install
- seed database: `npx prisma db seed`
- generate prisma client: `npx prisma generate`
- run: `npm run dev`

## external docs
- https://svelte.dev/docs/kit
- https://svelte.dev/docs/kit/form-actions
- https://www.prisma.io/docs/orm/reference
- https://www.prisma.io/docs/orm/prisma-client/queries/crud
- https://valibot.dev/guides/parse-data/
- https://www.better-auth.com/docs/introduction
