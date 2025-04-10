"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import PlayerSelector from "@/components/player-selector"
import TradeAnalysis from "@/components/trade-analysis"
import type { Player } from "@/lib/types"

export default function TradeAnalyzer() {
  const [playersGiving, setPlayersGiving] = useState<Player[]>([])
  const [playersGetting, setPlayersGetting] = useState<Player[]>([])

  const handleReset = () => {
    setPlayersGiving([])
    setPlayersGetting([])
  }

  return (
    <div className="grid gap-6 md:gap-8">
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <Card className="border-gray-800/20 dark:border-gray-300/10">
          <CardHeader className="pb-3">
            <CardTitle>Players You're Giving</CardTitle>
            <CardDescription>Select the players you're trading away</CardDescription>
          </CardHeader>
          <CardContent>
            <PlayerSelector selectedPlayers={playersGiving} onChange={setPlayersGiving} />
          </CardContent>
        </Card>

        <Card className="border-gray-800/20 dark:border-gray-300/10">
          <CardHeader className="pb-3">
            <CardTitle>Players You're Getting</CardTitle>
            <CardDescription>Select the players you're receiving</CardDescription>
          </CardHeader>
          <CardContent>
            <PlayerSelector selectedPlayers={playersGetting} onChange={setPlayersGetting} />
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-800/20 dark:border-gray-300/10">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle>Trade Analysis</CardTitle>
            <CardDescription>See if this trade is beneficial for you</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={handleReset} className="rounded-full">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Reset</span>
          </Button>
        </CardHeader>
        <CardContent>
          <TradeAnalysis playersGiving={playersGiving} playersGetting={playersGetting} />
        </CardContent>
      </Card>
    </div>
  )
}
