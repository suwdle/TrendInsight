# TrendInsight - AI-Powered News Curation Platform

TrendInsight is a modern news curation platform that uses AI to personalize news and trends based on user interests. The platform aggregates content from various sources and presents it in a clean, distraction-free interface.

## Features

- 📰 Real-time news aggregation from trusted sources
- 🔍 Personalized content based on user interests
- 🌓 Dark mode / Light mode support
- 📱 Fully responsive design
- 🔖 Bookmark articles for later reading
- 🧠 Category-based news exploration
- 🔍 Search functionality
- 👤 User authentication and profiles

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/trendinsight.git
   cd trendinsight
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your own credentials

4. Set up the database:
   ```bash
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
trendinsight/
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── store/            # Zustand store
│   └── types/            # TypeScript type definitions
├── .env                  # Environment variables
└── README.md             # Project documentation
```

## Revenue Model

TrendInsight's revenue model is based on:

1. **Targeted Advertising**: Non-intrusive ads based on user interests
2. **Premium Subscription**: Ad-free experience with additional features
3. **Affiliate Marketing**: Earn commissions from product recommendations
4. **Sponsored Content**: Clearly labeled sponsored articles from partners

## License

MIT

## Acknowledgements

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma](https://prisma.io)
- [NextAuth.js](https://next-auth.js.org)
- [React Icons](https://react-icons.github.io/react-icons)
- [NewsAPI](https://newsapi.org)
