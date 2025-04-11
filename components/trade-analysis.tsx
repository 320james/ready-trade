'use client';

import { cn } from '@/lib/utils';
import type { Player } from '@/lib/types';
import {
  ArrowRight,
  Minus,
  AlertTriangle,
  ThumbsUp,
  Laugh,
  Frown,
  Scale,
  PartyPopper,
  Skull,
} from 'lucide-react';

interface TradeAnalysisProps {
  playersGiving: Player[];
  playersGetting: Player[];
}

export default function TradeAnalysis({
  playersGiving,
  playersGetting,
}: TradeAnalysisProps) {
  // Calculate total value for each side using both value and redraftValue
  const givingValue = playersGiving.reduce(
    (sum, player) => sum + player.value,
    0
  );
  const gettingValue = playersGetting.reduce(
    (sum, player) => sum + player.value,
    0
  );
  const givingRedraftValue = playersGiving.reduce(
    (sum, player) => sum + player.redraftValue,
    0
  );
  const gettingRedraftValue = playersGetting.reduce(
    (sum, player) => sum + player.redraftValue,
    0
  );

  // Calculate the differences
  const valueDifference =
    Number((gettingValue / 100).toFixed(1)) -
    Number((givingValue / 100).toFixed(1));
  const redraftValueDifference =
    Number((gettingRedraftValue / 100).toFixed(1)) -
    Number((givingRedraftValue / 100).toFixed(1));
  const totalValue = givingValue + gettingValue;

  // Format value for display
  const formatValue = (value: number) => (value / 100).toFixed(1);

  // Calculate average ranks
  const givingAvgRank =
    playersGiving.reduce((sum, player) => sum + player.overallRank, 0) /
    (playersGiving.length || 1);
  const gettingAvgRank =
    playersGetting.reduce((sum, player) => sum + player.overallRank, 0) /
    (playersGetting.length || 1);
  const rankDifference = givingAvgRank - gettingAvgRank; // Lower rank is better

  // Determine if the trade is good, bad, or neutral with adjusted thresholds
  let statusIcon = <Minus className="h-5 w-5" />;
  let statusText = 'This trade is perfectly balanced, as all things should be.';
  const statusClass = cn('p-4 rounded-lg max-w-[700px]', {
    'bg-red-500/10 text-red-500 dark:text-red-400': valueDifference < -30,
    'bg-yellow-500/10 text-yellow-500 dark:text-yellow-400':
      valueDifference >= -30 && valueDifference < -15,
    'bg-green-500/10 text-green-500 dark:text-green-400':
      valueDifference >= -15 && valueDifference < 15,
    'bg-blue-500/10 text-blue-500 dark:text-blue-400': valueDifference >= 15,
  });

  // Adjusted thresholds based on actual value ranges (values are in hundreds)
  if (
    valueDifference >= 30 ||
    redraftValueDifference >= 30 ||
    rankDifference >= 20
  ) {
    statusIcon = <PartyPopper className="h-5 w-5" />;
    statusText =
      "Make it happen. Cross your fingers your league doesn't veto this one pal.";
  } else if (
    valueDifference >= 15 ||
    redraftValueDifference >= 15 ||
    rankDifference >= 12
  ) {
    statusIcon = <ThumbsUp className="h-5 w-5" />;
    statusText = "Solid win for you. They clearly didn't do their homework.";
  } else if (
    valueDifference >= 8 ||
    redraftValueDifference >= 8 ||
    rankDifference >= 6
  ) {
    statusIcon = <Laugh className="h-5 w-5" />;
    statusText = "A winning trade. I'd say go for it.";
  } else if (
    valueDifference <= -30 ||
    redraftValueDifference <= -30 ||
    rankDifference <= -20
  ) {
    statusIcon = <Skull className="h-5 w-5" />;
    statusText =
      'Yeah, sure if you want to ruin your season :D Maybe check your noggin bud.';
  } else if (
    valueDifference <= -15 ||
    redraftValueDifference <= -15 ||
    rankDifference <= -12
  ) {
    statusIcon = <AlertTriangle className="h-5 w-5" />;
    statusText =
      "You're getting the short end of the stick here. I'm sorry, little one.";
  } else if (
    valueDifference <= -8 ||
    redraftValueDifference <= -8 ||
    rankDifference <= -6
  ) {
    statusIcon = <Frown className="h-5 w-5" />;
    statusText =
      'Eh, losing just a tad bit, but not horrible. Ask for a kicker to even things out.';
  } else {
    statusIcon = <Scale className="h-5 w-5" />;
    statusText = 'This trade is balanced, as all things should be.';
  }

  // Calculate percentages for the progress bar
  const givingPercent = totalValue > 0 ? (givingValue / totalValue) * 100 : 50;
  const gettingPercent =
    totalValue > 0 ? (gettingValue / totalValue) * 100 : 50;

  if (playersGiving.length === 0 || playersGetting.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Select players on both sides to see analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-secondary rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex-shrink-0">{statusIcon}</div>
          <div
            className={cn('p-4 rounded-lg max-w-[800px] flex justify-center', {
              'bg-red-500/10 text-red-500 dark:text-red-400':
                valueDifference < -30,
              'bg-yellow-500/10 text-yellow-500 dark:text-yellow-400':
                valueDifference >= -30 && valueDifference < -15,
              'bg-green-500/10 text-green-500 dark:text-green-400':
                valueDifference >= -15 && valueDifference < 15,
              'bg-blue-500/10 text-blue-500 dark:text-blue-400':
                valueDifference >= 15,
            })}
          >
            <p className="text-center">{statusText}</p>
          </div>
        </div>
        {valueDifference !== 0 && (
          <div className="flex flex-col items-center mt-2 space-y-1">
            <p className="text-sm text-muted-foreground text-center">
              {Math.abs(valueDifference).toFixed(1)} point{' '}
              {Math.abs(valueDifference).toFixed(1) === '1.0'
                ? 'difference'
                : 'differences'}{' '}
              in
              {valueDifference > 0 ? ' your favor' : ' their favor'}
            </p>
            {redraftValueDifference !== 0 && (
              <p className="text-sm text-muted-foreground text-center">
                {Math.abs(redraftValueDifference).toFixed(1)} redraft value{' '}
                {Math.abs(redraftValueDifference).toFixed(1) === '1.0'
                  ? 'difference'
                  : 'differences'}{' '}
                in
                {redraftValueDifference > 0 ? ' your favor' : ' their favor'}
              </p>
            )}
            {rankDifference !== 0 && (
              <p className="text-sm text-muted-foreground text-center">
                Average rank {Math.abs(rankDifference).toFixed(1)} positions{' '}
                {rankDifference > 0 ? 'better' : 'worse'} for you
              </p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div className="text-center">
          <p className="text-sm font-medium mb-1">You Give</p>
          <p className="text-2xl font-bold">{formatValue(givingValue)}</p>
          <p className="text-sm text-muted-foreground">
            Avg Rank: {givingAvgRank.toFixed(1)}
          </p>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium mb-1">You Get</p>
          <p className="text-2xl font-bold">{formatValue(gettingValue)}</p>
          <p className="text-sm text-muted-foreground">
            Avg Rank: {gettingAvgRank.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Trade Balance</span>
          <span
            className={cn(
              valueDifference > 0
                ? 'text-green-500 dark:text-green-400'
                : valueDifference < 0
                ? 'text-red-500 dark:text-red-400'
                : ''
            )}
          >
            {valueDifference > 0 ? '+' : ''}
            {formatValue(valueDifference)}
          </span>
        </div>
        <div className="h-2.5 flex rounded-full overflow-hidden">
          <div
            className="bg-blue-600 dark:bg-blue-700"
            style={{ width: `${givingPercent}%` }}
          />
          <div
            className={cn(
              valueDifference > 30 ||
                redraftValueDifference > 30 ||
                rankDifference > 20
                ? 'bg-green-500 dark:bg-green-400'
                : valueDifference > 15 ||
                  redraftValueDifference > 15 ||
                  rankDifference > 12
                ? 'bg-green-600 dark:bg-green-500'
                : valueDifference > 8 ||
                  redraftValueDifference > 8 ||
                  rankDifference > 6
                ? 'bg-green-700 dark:bg-green-600'
                : valueDifference < -30 ||
                  redraftValueDifference < -30 ||
                  rankDifference < -20
                ? 'bg-red-500 dark:text-red-400'
                : valueDifference < -15 ||
                  redraftValueDifference < -15 ||
                  rankDifference < -12
                ? 'bg-red-600 dark:bg-red-500'
                : valueDifference < -8 ||
                  redraftValueDifference < -8 ||
                  rankDifference < -6
                ? 'bg-red-700 dark:bg-red-600'
                : 'bg-amber-500 dark:bg-amber-400'
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Players You're Giving</h3>
            <ul className="space-y-2 divide-y divide-border/40">
              {playersGiving.map((player) => (
                <li
                  key={player.id}
                  className="flex flex-col sm:flex-row justify-between text-sm pt-2 gap-2"
                >
                  <div className="space-y-1">
                    <span className="font-medium">
                      {player.name} ({player.position})
                    </span>
                    <div className="text-xs text-muted-foreground">
                      <span>Overall Rank: #{player.overallRank}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {player.position} Rank: #{player.positionRank}
                      </span>
                    </div>
                  </div>
                  <span className="font-medium sm:text-right">
                    {formatValue(player.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Players You're Getting</h3>
            <ul className="space-y-2 divide-y divide-border/40">
              {playersGetting.map((player) => (
                <li
                  key={player.id}
                  className="flex flex-col sm:flex-row justify-between text-sm pt-2 gap-2"
                >
                  <div className="space-y-1">
                    <span className="font-medium">
                      {player.name} ({player.position})
                    </span>
                    <div className="text-xs text-muted-foreground">
                      <span>Overall Rank: #{player.overallRank}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {player.position} Rank: #{player.positionRank}
                      </span>
                    </div>
                  </div>
                  <span className="font-medium sm:text-right">
                    {formatValue(player.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
