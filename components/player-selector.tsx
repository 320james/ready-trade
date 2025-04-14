'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isThrottled, setIsThrottled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedPlayerIds = useMemo(
    () => new Set(selectedPlayers.map((p) => p.id)),
    [selectedPlayers]
  );

  // Cache for API responses
  const [apiCache, setApiCache] = useState<Record<string, Player[]>>({});

  const loadPlayers = useCallback(async () => {
    if (isThrottled) return;

    const cacheKey = JSON.stringify(leagueSettings);

    // Check cache first
    if (apiCache[cacheKey]) {
      setPlayers(apiCache[cacheKey]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchFantasyCalcPlayers(leagueSettings);
      // Transform and pre-process the API response
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

      // Cache the transformed players
      setApiCache((prev) => ({ ...prev, [cacheKey]: transformedPlayers }));
      setPlayers(transformedPlayers);
    } catch (error) {
      console.error('Failed to load players:', error);
      setError('Failed to load players. Please try again.');
      setPlayers([]);
    } finally {
      setIsLoading(false);
    }
  }, [leagueSettings, apiCache, isThrottled]);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    if (isThrottled) return;
    setSearch(value);
    setIsThrottled(true);
    setTimeout(() => setIsThrottled(false), 1000); // Throttle for 1 second
  }, 300);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const filteredPlayers = useMemo(() => {
    if (!search)
      return players.filter((player) => !selectedPlayerIds.has(player.id));

    const searchLower = search.toLowerCase();
    return players.filter(
      (player) =>
        !selectedPlayerIds.has(player.id) &&
        player.name.toLowerCase().includes(searchLower)
    );
  }, [players, selectedPlayerIds, search]);

  const handleSelect = (player: Player) => {
    onChange([...selectedPlayers, player]);
    setInputValue('');
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
                <span className="truncate">Loading players...</span>
              </>
            ) : error ? (
              <>
                <AlertTriangle className="mr-2 h-4 w-4" />
                <span className="truncate">{error}</span>
              </>
            ) : (
              <>
                <span className="truncate">Select players</span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search players..."
              value={inputValue}
              onValueChange={handleInputChange}
              ref={inputRef}
              className="w-full"
            />
            <CommandList>
              <CommandEmpty>
                {search
                  ? 'No players found.'
                  : 'Start typing to search players...'}
              </CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-y-auto">
                {filteredPlayers.map((player) => (
                  <CommandItem
                    key={player.id}
                    value={player.name}
                    onSelect={() => handleSelect(player)}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2"
                  >
                    <Check className={cn('mr-2 h-4 w-4', 'opacity-0')} />
                    <span className="font-medium truncate">{player.name}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground truncate">
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
            className="flex items-center gap-1 py-1.5 max-w-full"
          >
            <span className="truncate">{player.name}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent flex-shrink-0"
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
