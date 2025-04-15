# Fantasy Football Trade Analyzer

A modern web application built with Next.js that helps fantasy football players analyze potential trades by comparing player values and rankings.

## Features

- **Real-time Trade Analysis**: Compare player values and rankings instantly
- **Customizable League Settings**:
  - Dynasty/Redraft leagues
  - 1 QB or 2 QB leagues
  - 8-16 team leagues
  - Standard, Half PPR, or Full PPR scoring
- **Player Search**: Search and select players with a responsive, debounced search interface
- **Value Comparison**: View detailed analysis of trade value differences
- **Rank Analysis**: Compare average player ranks between trade sides
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Next.js 15**: App Router, Server Components, and Client Components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Beautiful, accessible UI components
- **React Query**: Data fetching and caching
- **Rate Limiting**: Token bucket algorithm for API protection

## Next.js Features Used

- **App Router**: Modern routing system
- **Server Components**: Optimized rendering
- **Client Components**: Interactive UI elements
- **API Routes**: Serverless functions for data fetching
- **Metadata API**: SEO optimization
- **Layouts**: Consistent UI structure
- **Loading States**: Enhanced user experience

## API Credits

This application uses the FantasyCalc.com API, created by Josh Cordell. The API provides comprehensive player values and rankings for fantasy football analysis.

- **API Documentation Article**: [FantasyCalc API](https://colab.research.google.com/github/fantasydatapros/blog/blob/master/fantasyfootball/fantasycalc/post_1.ipynb#scrollTo=uptDifP-xL1b)
- **Creator**: Josh Cordell
- **Website**: [FantasyCalc.com](https://fantasycalc.com)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Psst - this project is still work in progress...
