# Nuxt 3 + Cloudflare (Pages + D1)

Demo using Nuxt and Cloudflare Pages + D1 database.

Inspired by: https://github.com/Atinux/nuxt-todos-edge

## Development Server

Install dependencies

```
pnpm i
```

Add schema to database

```
sqlite3 db.sqlite < ./server/db/migrations/0000_harsh_goblin_queen.sql
```

Development server

```bash
pnpm dev
```

## Production

### Pages
Create a CF pages deployment linked to your GitHub repository.

### D1
In the CF Pages project settings -> Functions, add the binding between your D1 database and the DB variable.

