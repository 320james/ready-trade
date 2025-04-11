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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const leagueTypes = [
    { value: 'redraft', label: 'Redraft' },
    { value: 'dynasty', label: 'Dynasty' },
  ];

  const qbOptions = [
    { value: '1', label: '1 QB' },
    { value: '2', label: '2 QB' },
  ];

  const pprOptions = [
    { value: '0', label: 'Standard (0 PPR)' },
    { value: '0.5', label: 'Half PPR (0.5 PPR)' },
    { value: '1', label: 'Full PPR (1 PPR)' },
  ];

  const teamOptions = Array.from({ length: 9 }, (_, i) => ({
    value: (i + 8).toString(),
    label: `${i + 8} Teams`,
  }));

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">League Type</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {leagueSettings.isDynasty ? 'Dynasty' : 'Redraft'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {leagueTypes.map((type) => (
                          <CommandItem
                            key={type.value}
                            value={type.value}
                            onSelect={() =>
                              setLeagueSettings({
                                ...leagueSettings,
                                isDynasty: type.value === 'dynasty',
                              })
                            }
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                leagueSettings.isDynasty ===
                                  (type.value === 'dynasty')
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {type.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Teams</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {leagueSettings.numTeams} Teams
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {teamOptions.map((team) => (
                          <CommandItem
                            key={team.value}
                            value={team.value}
                            onSelect={() =>
                              setLeagueSettings({
                                ...leagueSettings,
                                numTeams: parseInt(team.value),
                              })
                            }
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                leagueSettings.numTeams === parseInt(team.value)
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {team.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Number of QBs</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {leagueSettings.numQbs} QB
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {qbOptions.map((qb) => (
                          <CommandItem
                            key={qb.value}
                            value={qb.value}
                            onSelect={() =>
                              setLeagueSettings({
                                ...leagueSettings,
                                numQbs: parseInt(qb.value),
                              })
                            }
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                leagueSettings.numQbs === parseInt(qb.value)
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {qb.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">PPR</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {pprOptions.find(
                      (option) => option.value === leagueSettings.ppr.toString()
                    )?.label || 'Select PPR'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {pprOptions.map((ppr) => (
                          <CommandItem
                            key={ppr.value}
                            value={ppr.value}
                            onSelect={() =>
                              setLeagueSettings({
                                ...leagueSettings,
                                ppr: parseFloat(ppr.value),
                              })
                            }
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                leagueSettings.ppr === parseFloat(ppr.value)
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {ppr.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
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
            <CardTitle className="mb-2">Trade Analysis</CardTitle>
            <CardDescription>
              See if this trade is beneficial for you
            </CardDescription>
          </div>
          <Button variant="outline" onClick={handleReset}>
            Clear Results
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
