# AITools.tr

Türkiye'nin yapay zeka araçları platformu. Abonelik tabanlı, full-stack.

## Hızlı Başlangıç

```bash
git clone <repo-url>
cd aitools-tr
cp .env.example .env  # .env dosyasını doldurun
npm install
npm run dev
```

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS 4
- **Backend:** Node.js, Express 5, Prisma ORM, PostgreSQL
- **Ödeme:** Stripe
- **AI:** OpenAI API

## Proje Yapısı

```
aitools-tr/
├── packages/
│   ├── frontend/    # React SPA
│   └── backend/     # Express API
├── docs/
│   ├── specs/       # Tasarım dokümanları
│   └── plans/       # Uygulama planları
└── .env.example
```

## Çevresel Değişkenler

`.env.example` dosyasını `.env` olarak kopyalayın ve değerleri doldurun:
- `DATABASE_URL` - PostgreSQL bağlantı URL'i
- `REDIS_URL` - Redis bağlantı URL'i
- `JWT_SECRET` / `JWT_REFRESH_SECRET` - JWT anahtarları
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` - Stripe API anahtarları
- `OPENAI_API_KEY` - OpenAI API anahtarı

## Deployment

### Frontend (Vercel)
```bash
cd packages/frontend
vercel deploy
```

### Backend (Railway/Render)
```bash
cd packages/backend
# Prisma migration çalıştırın
npx prisma migrate deploy
# Server'ı başlatın
npm start
```

## Lisans

MIT
