import TradeAnalyzer from '@/components/trade-analyzer';
import { ThemeToggle } from '@/components/theme-toggle';
import { Rotate3D } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 dark:from-background dark:to-background/95">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="rounded-full p-2">
              <Rotate3D className="h-8 w-8 dark:text-gray-200 text-gray-800" />
            </div>
            <h1 className="text-2xl font-bold sm:text-2xl">Ready Trade</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-medium text-center mb-4">
            NFL Fantasy Football Trade Analyzer
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Make smarter trades with instant analysis. Because your team
            matters.
          </p>
          <TradeAnalyzer />
        </div>
      </main>
      <footer className="container mx-auto py-6 px-4 mt-12">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ready Trade. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
