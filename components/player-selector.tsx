'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Check, ChevronsUpDown, X, Loader2, AlertTriangle } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Player, FantasyCalcResponse } from '@/lib/types';
import { fetchFantasyCalcPlayers } from '@/lib/api';

interface PlayerSelectorProps {
  selectedPlayers: Player[];
  onChange: (players: Player[]) => void;
  leagueSettings: {
    isDynasty: boolean;
    numQbs: number;
    numTeams: number;
    ppr: number;
  };
}

export default function PlayerSelector({
  selectedPlayers,
  onChange,
  leagueSettings,
}: PlayerSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadPlayers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchFantasyCalcPlayers(leagueSettings);
      // Transform the API response to match our Player interface
      const transformedPlayers: Player[] = (
        response as FantasyCalcResponse
      ).map((item) => ({
        id: item.player.id,
        name: item.player.name,
        position: item.player.position,
        team: item.player.maybeTeam || '',
        value: item.value,
        overallRank: item.overallRank,
        positionRank: item.positionRank,
        trend30Day: item.trend30Day,
        redraftValue: item.redraftValue,
        combinedValue: item.combinedValue,
        starter: item.starter,
        maybeTier: item.maybeTier,
        maybeAdp: item.maybeAdp,
        maybeTradeFrequency: item.maybeTradeFrequency,
      }));
      setPlayers(transformedPlayers);
    } catch (error) {
      console.error('Failed to load players:', error);
      setError('Failed to load players. Please try again.');
      setPlayers([]);
    } finally {
      setIsLoading(false);
    }
  }, [leagueSettings]);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 300);

  const filteredPlayers = players.filter(
    (player) =>
      !selectedPlayers.some((selected) => selected.id === player.id) &&
      player.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (player: Player) => {
    onChange([...selectedPlayers, player]);
    setSearch('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRemove = (playerId: number) => {
    onChange(selectedPlayers.filter((player) => player.id !== playerId));
  };

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading players...
              </>
            ) : error ? (
              <>
                <AlertTriangle className="mr-2 h-4 w-4" />
                {error}
              </>
            ) : (
              <>
                Select players
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search players..."
              value={search}
              onValueChange={debouncedSearch}
              ref={inputRef}
            />
            <CommandList>
              <CommandEmpty>
                {search
                  ? 'No players found.'
                  : 'Start typing to search players...'}
              </CommandEmpty>
              <CommandGroup className="max-h-64 overflow-y-auto">
                {filteredPlayers.map((player) => (
                  <CommandItem
                    key={player.id}
                    value={player.name}
                    onSelect={() => handleSelect(player)}
                  >
                    <Check className={cn('mr-2 h-4 w-4', 'opacity-0')} />
                    <span>{player.name}</span>
                    <span className="ml-auto text-sm text-muted-foreground">
                      {player.position} - {player.team}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {selectedPlayers.map((player) => (
          <Badge
            key={player.id}
            variant="secondary"
            className="flex items-center gap-1 py-1.5"
          >
            {player.name}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={() => handleRemove(player.id)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {player.name}</span>
            </Button>
          </Badge>
        ))}
        {selectedPlayers.length === 0 && (
          <p className="text-sm text-muted-foreground">No players selected</p>
        )}
      </div>
    </div>
  );
}
