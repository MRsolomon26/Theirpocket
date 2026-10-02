# Theirpocket

Quality fashion at affordable prices.

## Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- PostgreSQL 16+ running locally on `localhost:5432`

### Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.local.example .env.local
```
Edit `.env.local` and set the credentials of your local PostgreSQL instance in
`DATABASE_URL` (development) and `DATABASE_URL_TEST` (automated tests).

3. Create the development and test databases:
```bash
createdb -U postgres theirpocket
createdb -U postgres theirpocket_test
```

4. Generate the Prisma client and verify the environment:
```bash
npm run db:generate
npm run db:validate
```

5. Run development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000). `http://localhost:3000/api/health`
reports `database: connected` once PostgreSQL is reachable.

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate the Prisma client
- `npm run db:validate` - Validate the Prisma schema against the environment
- `npm run db:seed` - Seed reference data (categories, shipping zones, coupons)

The Prisma CLI and `tsx` do not read `.env.local`, so every `db:*` script runs through
`scripts/with-env.mjs`, which loads it with `@next/env` (already a Next.js dependency)
before invoking the tool. No extra dependency is required.

## Architecture

See [THEIRPOCKET_ARCHITECTURE.md](./THEIRPOCKET_ARCHITECTURE.md) for complete technical documentation.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM

## License

Proprietary - All rights reserved
