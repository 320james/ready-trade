'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import PlayerSelector from '@/components/player-selector';
import TradeAnalysis from '@/components/trade-analysis';
import type { Player } from '@/lib/types';

export default function TradeAnalyzer() {
  const [playersGiving, setPlayersGiving] = useState<Player[]>([]);
  const [playersGetting, setPlayersGetting] = useState<Player[]>([]);

  const [leagueSettings, setLeagueSettings] = useState({
    isDynasty: false,
    numQbs: 1,
    numTeams: 12,
    ppr: 1,
  });

  const handleReset = () => {
    setPlayersGiving([]);
    setPlayersGetting([]);
  };

  return (
    <div className="grid gap-6 md:gap-8">
      <Card className="border-gray-800/20 dark:border-gray-300/10">
        <CardHeader>
          <CardTitle>League Settings</CardTitle>
          <CardDescription>
            Configure your league settings for accurate trade analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">League Type</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={leagueSettings.isDynasty ? 'dynasty' : 'redraft'}
                onChange={(e) =>
                  setLeagueSettings({
                    ...leagueSettings,
                    isDynasty: e.target.value === 'dynasty',
                  })
                }
              >
                <option value="redraft">Redraft</option>
                <option value="dynasty">Dynasty</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Teams</label>
              <input
                type="number"
                min="8"
                max="16"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={leagueSettings.numTeams}
                onChange={(e) =>
                  setLeagueSettings({
                    ...leagueSettings,
                    numTeams: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of QBs</label>
              <input
                type="number"
                min="1"
                max="2"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={leagueSettings.numQbs}
                onChange={(e) =>
                  setLeagueSettings({
                    ...leagueSettings,
                    numQbs: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">PPR</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={leagueSettings.ppr}
                onChange={(e) =>
                  setLeagueSettings({
                    ...leagueSettings,
                    ppr: parseInt(e.target.value),
                  })
                }
              >
                <option value="0">Standard (0 PPR)</option>
                <option value="0.5">Half PPR (0.5 PPR)</option>
                <option value="1">Full PPR (1 PPR)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <Card className="border-gray-800/20 dark:border-gray-300/10">
          <CardHeader className="pb-3">
            <CardTitle>Players You're Giving</CardTitle>
            <CardDescription>
              Select the players you're trading away
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PlayerSelector
              selectedPlayers={playersGiving}
              onChange={setPlayersGiving}
              leagueSettings={leagueSettings}
            />
          </CardContent>
        </Card>

        <Card className="border-gray-800/20 dark:border-gray-300/10">
          <CardHeader className="pb-3">
            <CardTitle>Players You're Getting</CardTitle>
            <CardDescription>
              Select the players you're receiving
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PlayerSelector
              selectedPlayers={playersGetting}
              onChange={setPlayersGetting}
              leagueSettings={leagueSettings}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-800/20 dark:border-gray-300/10">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle>Trade Analysis</CardTitle>
            <CardDescription>
              See if this trade is beneficial for you
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="rounded-full"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Reset</span>
          </Button>
        </CardHeader>
        <CardContent>
          <TradeAnalysis
            playersGiving={playersGiving}
            playersGetting={playersGetting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
