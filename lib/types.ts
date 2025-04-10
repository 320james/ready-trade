// https://api.fantasycalc.com/values/current?isDynasty=false&numQbs=1&numTeams=12&ppr=1
const examplePlayerResponse = [
  {
    player: {
      id: 5856,
      name: "Ja'Marr Chase",
      mflId: '15281',
      sleeperId: '7564',
      position: 'WR',
      maybeBirthday: '2000-03-01',
      maybeHeight: '72',
      maybeWeight: 205,
      maybeCollege: 'LSU',
      maybeTeam: 'CIN',
      maybeAge: 25.1,
      maybeYoe: 4,
      espnId: '4362628',
      fleaflickerId: '16250',
    },
    value: 10519,
    overallRank: 1,
    positionRank: 1,
    trend30Day: 116,
    redraftDynastyValueDifference: 0,
    redraftDynastyValuePercDifference: 0,
    redraftValue: 10519,
    combinedValue: 21038,
    maybeMovingStandardDeviation: 2,
    maybeMovingStandardDeviationPerc: 0,
    maybeMovingStandardDeviationAdjusted: 2,
    displayTrend: false,
    maybeOwner: null,
    starter: false,
    maybeTier: 1,
    maybeAdp: null,
    maybeTradeFrequency: null,
  },
  {
    player: {
      id: 7569,
      name: 'Justin Jefferson',
      mflId: '14836',
      sleeperId: '6794',
      position: 'WR',
      maybeBirthday: '1999-06-16',
      maybeHeight: '73',
      maybeWeight: 198,
      maybeCollege: 'LSU',
      maybeTeam: 'MIN',
      maybeAge: 25.8,
      maybeYoe: 5,
      espnId: '4262921',
      fleaflickerId: '15540',
    },
    value: 10300,
    overallRank: 2,
    positionRank: 2,
    trend30Day: 57,
    redraftDynastyValueDifference: 0,
    redraftDynastyValuePercDifference: 0,
    redraftValue: 10300,
    combinedValue: 20600,
    maybeMovingStandardDeviation: -8,
    maybeMovingStandardDeviationPerc: 0,
    maybeMovingStandardDeviationAdjusted: 2,
    displayTrend: false,
    maybeOwner: null,
    starter: false,
    maybeTier: 2,
    maybeAdp: null,
    maybeTradeFrequency: null,
  },
];

// https://fantasyfootballcalculator.com/api/v1/adp/standard?teams=12&year=2023
const exampleADPResponse = {
  status: 'Success',
  meta: {
    type: 'Non-PPR',
    teams: 12,
    rounds: 15,
    total_drafts: 1104,
    start_date: '2023-08-30',
    end_date: '2023-09-01',
  },
  players: [
    {
      player_id: 4876,
      name: 'Justin Jefferson',
      position: 'WR',
      team: 'MIN',
      adp: 1.2,
      adp_formatted: '1.01',
      times_drafted: 109,
      high: 1,
      low: 3,
      stdev: 0.4,
      bye: 6,
    },
    {
      player_id: 2434,
      name: 'Christian McCaffrey',
      position: 'RB',
      team: 'SF',
      adp: 1.4,
      adp_formatted: '1.01',
      times_drafted: 113,
      high: 1,
      low: 3,
      stdev: 0.6,
      bye: 9,
    },
  ],
};

// FantasyCalc API Response Types
export interface FantasyCalcPlayer {
  id: number;
  name: string;
  position: string;
  maybeTeam?: string;
  mflId?: string;
  sleeperId?: string;
  maybeBirthday?: string;
  maybeHeight?: string;
  maybeWeight?: number;
  maybeCollege?: string;
  maybeAge?: number;
  maybeYoe?: number;
  espnId?: string;
  fleaflickerId?: string;
}

export interface FantasyCalcPlayerResponse {
  player: FantasyCalcPlayer;
  value: number;
  overallRank: number;
  positionRank: number;
  trend30Day: number;
  redraftValue: number;
  combinedValue: number;
  starter: boolean;
  maybeTier?: number;
  maybeAdp?: number | null;
  maybeTradeFrequency?: number | null;
}

export type FantasyCalcResponse = FantasyCalcPlayerResponse[];

// For use in the UI
export interface Player {
  id: number;
  name: string;
  position: string;
  team: string;
  value: number;
  overallRank: number;
  positionRank: number;
  trend30Day: number;
  redraftValue: number;
  combinedValue: number;
  starter: boolean;
  maybeTier?: number;
  maybeAdp?: number | null;
  maybeTradeFrequency?: number | null;
}

// FFCalculator API Response Types
export interface ADPPlayer {
  player_id: number;
  name: string;
  position: string;
  team: string;
  adp: number;
  adp_formatted: string;
  times_drafted: number;
  high: number;
  low: number;
  stdev: number;
  bye: number;
}

export interface ADPResponse {
  status: string;
  meta: {
    type: string;
    teams: number;
    rounds: number;
    total_drafts: number;
    start_date: string;
    end_date: string;
  };
  players: ADPPlayer[];
}

// API Query Parameters
export interface FantasyCalcQueryParams {
  isDynasty?: boolean;
  numQbs?: number;
  numTeams?: number;
  ppr?: number;
}

export interface ADPQueryParams {
  teams?: number;
  year?: number;
  type?: 'standard' | 'ppr' | 'half-ppr';
}
