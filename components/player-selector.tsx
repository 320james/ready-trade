"use client"

import { useState, useRef } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Player } from "@/lib/types"
import { mockPlayers } from "@/lib/mock-data"

interface PlayerSelectorProps {
  selectedPlayers: Player[]
  onChange: (players: Player[]) => void
}

export default function PlayerSelector({ selectedPlayers, onChange }: PlayerSelectorProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredPlayers = mockPlayers.filter(
    (player) =>
      !selectedPlayers.some((selected) => selected.id === player.id) &&
      player.name.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSelect = (player: Player) => {
    onChange([...selectedPlayers, player])
    setSearch("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleRemove = (playerId: string) => {
    onChange(selectedPlayers.filter((player) => player.id !== playerId))
  }

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            Select players
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search players..." value={search} onValueChange={setSearch} ref={inputRef} />
            <CommandList>
              <CommandEmpty>No players found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-y-auto">
                {filteredPlayers.map((player) => (
                  <CommandItem key={player.id} value={player.name} onSelect={() => handleSelect(player)}>
                    <Check className={cn("mr-2 h-4 w-4", "opacity-0")} />
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
          <Badge key={player.id} variant="secondary" className="flex items-center gap-1 py-1.5">
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
        {selectedPlayers.length === 0 && <p className="text-sm text-muted-foreground">No players selected</p>}
      </div>
    </div>
  )
}
