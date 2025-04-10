"use client"

import { cn } from "@/lib/utils"
import type { Player } from "@/lib/types"
import { ArrowRight, Minus, AlertTriangle, ThumbsUp, Laugh, Frown, Meh, PartyPopper, Skull } from "lucide-react"

interface TradeAnalysisProps {
  playersGiving: Player[]
  playersGetting: Player[]
}

export default function TradeAnalysis({ playersGiving, playersGetting }: TradeAnalysisProps) {
  // Calculate total value for each side
  const givingValue = playersGiving.reduce((sum, player) => sum + player.value, 0)
  const gettingValue = playersGetting.reduce((sum, player) => sum + player.value, 0)

  // Calculate the difference and percentage
  const difference = gettingValue - givingValue
  const totalValue = givingValue + gettingValue

  // Determine if the trade is good, bad, or neutral with more range
  let statusIcon = <Minus className="h-5 w-5" />
  let statusText = "This trade is perfectly balanced, as all things should be."
  let statusClass = "text-gray-500"

  if (difference > 15) {
    statusIcon = <PartyPopper className="h-5 w-5" />
    statusText = "Highway robbery! Accept before they come to their senses."
    statusClass = "text-white"
  } else if (difference > 5) {
    statusIcon = <ThumbsUp className="h-5 w-5" />
    statusText = "Solid win for you. They clearly didn't do their homework."
    statusClass = "text-gray-300"
  } else if (difference > 1) {
    statusIcon = <Laugh className="h-5 w-5" />
    statusText = "Slight edge in your favor. They won't even notice what hit them."
    statusClass = "text-gray-400"
  } else if (difference < -15) {
    statusIcon = <Skull className="h-5 w-5" />
    statusText = "Are you trying to get fleeced? Maybe reconsider your life choices."
    statusClass = "text-white"
  } else if (difference < -5) {
    statusIcon = <AlertTriangle className="h-5 w-5" />
    statusText = "You're getting the short end of the stick here. Hard pass."
    statusClass = "text-gray-300"
  } else if (difference < -1) {
    statusIcon = <Frown className="h-5 w-5" />
    statusText = "Slightly unfavorable. Ask for a kicker to even things out."
    statusClass = "text-gray-400"
  } else {
    statusIcon = <Meh className="h-5 w-5" />
    statusText = "Dead even. Flip a coin or go with your gut."
    statusClass = "text-gray-500"
  }

  // Calculate percentages for the progress bar
  const givingPercent = totalValue > 0 ? (givingValue / totalValue) * 100 : 50
  const gettingPercent = totalValue > 0 ? (gettingValue / totalValue) * 100 : 50

  if (playersGiving.length === 0 && playersGetting.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Select players on both sides to see analysis</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center gap-2 py-3 px-4 bg-secondary rounded-lg">
        <div className="flex items-center gap-2">
          {statusIcon}
          <span className={cn("text-lg font-medium", statusClass)}>{statusText}</span>
        </div>
        {difference !== 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            {Math.abs(difference)} point {Math.abs(difference) === 1 ? "difference" : "differences"} in
            {difference > 0 ? " your favor" : " their favor"}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="text-center">
          <p className="text-sm font-medium mb-1">You Give</p>
          <p className="text-2xl font-bold">{givingValue}</p>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium mb-1">You Get</p>
          <p className="text-2xl font-bold">{gettingValue}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Trade Balance</span>
          <span
            className={cn(
              difference > 0
                ? "text-green-500 dark:text-green-400"
                : difference < 0
                  ? "text-red-500 dark:text-red-400"
                  : "",
            )}
          >
            {difference > 0 ? "+" : ""}
            {difference}
          </span>
        </div>
        <div className="h-2.5 flex rounded-full overflow-hidden">
          <div className="bg-blue-600 dark:bg-blue-700" style={{ width: `${givingPercent}%` }} />
          <div
            className={cn(
              difference > 15
                ? "bg-green-500 dark:bg-green-400"
                : difference > 5
                  ? "bg-green-600 dark:bg-green-500"
                  : difference > 1
                    ? "bg-green-700 dark:bg-green-600"
                    : difference < -15
                      ? "bg-red-500 dark:bg-red-400"
                      : difference < -5
                        ? "bg-red-600 dark:bg-red-500"
                        : difference < -1
                          ? "bg-red-700 dark:bg-red-600"
                          : "bg-amber-500 dark:bg-amber-400",
            )}
            style={{ width: `${gettingPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Your Players</span>
          <span>Their Players</span>
        </div>
      </div>

      {playersGiving.length > 0 && playersGetting.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Players You're Giving</h3>
            <ul className="space-y-2 divide-y divide-border/40">
              {playersGiving.map((player) => (
                <li key={player.id} className="flex justify-between text-sm pt-2">
                  <span>
                    {player.name} ({player.position})
                  </span>
                  <span className="font-medium">{player.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Players You're Getting</h3>
            <ul className="space-y-2 divide-y divide-border/40">
              {playersGetting.map((player) => (
                <li key={player.id} className="flex justify-between text-sm pt-2">
                  <span>
                    {player.name} ({player.position})
                  </span>
                  <span className="font-medium">{player.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
