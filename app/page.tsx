import TradeAnalyzer from "@/components/trade-analyzer"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeftRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 dark:from-background dark:to-background/95">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gray-800 dark:bg-gray-200 rounded-full p-2">
              <ArrowLeftRight className="h-6 w-6 text-gray-200 dark:text-gray-800" />
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl">Ready Trade</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-medium text-center mb-2">Fantasy Football Trade Analyzer</h2>
          <p className="text-center text-muted-foreground mb-8">Make smarter trades with instant analysis</p>
          <TradeAnalyzer />
        </div>
      </main>
      <footer className="container mx-auto py-6 px-4 mt-12">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ready Trade. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
