# Nuxt 3 + Cloudflare (Pages + D1) + Auth (Lucia)

A demo using [Nuxt](https://nuxt.com), Cloudflare [Pages](https://pages.cloudflare.com) + [D1](https://developers.cloudflare.com/d1) database, [Drizzle ORM](https://orm.drizzle.team) and [Lucia](https://lucia-auth.com/?nuxt) auth.

Inspired by: [Nuxt Todo List on the Edge](https://github.com/Atinux/nuxt-todos-edge)

## Setup

### Pages
A. Create a CF pages deployment linked to your GitHub repository.

B. Use [Wrangler](https://developers.cloudflare.com/workers/wrangler):

```bash
pnpm build
```

Preview build (setup D1 first):

```bash
pnpm wrangler pages dev dist
```

Deploy build to CF: 

```bash
pnpm wrangler pages publish dist
```

### D1
A. Create a D1 database in CF.

In the CF Pages project settings -> Functions, add the binding between your D1 database and the DB variable.

B. Use Wrangler:

```bash
wrangler d1 create <DATABASE_NAME>
```

[Bind](https://developers.cloudflare.com/d1/get-started/#4-bind-your-worker-to-your-d1-database) Worker with D1 database:

```bash
----
filename: wrangler.toml
----
name = "YOU PROJECT NAME"
main = "./.output/server/index.mjs"

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "<DATABASE_NAME>"
database_id = "<unique-ID-for-your-database>"
```

To init local database and run server locally:

```bash
wrangler d1 execute <DATABASE_NAME> --local --file server/db/migrations/0000_cultured_fixer.sql
wrangler dev --local --persist
```

Deploy:

```bash
wrangler d1 execute <DATABASE_NAME> --file server/db/migrations/0000_cultured_fixer.sql
wrangler deploy
```
