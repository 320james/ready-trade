import type {
  FantasyCalcQueryParams,
  ADPQueryParams,
  FantasyCalcResponse,
  ADPResponse,
} from './types';

const FANTASYCALC_API = 'https://api.fantasycalc.com/values/current';
const FFCALCULATOR_API = 'https://fantasyfootballcalculator.com/api/v1/adp';

export async function fetchFantasyCalcPlayers(
  params: FantasyCalcQueryParams
): Promise<FantasyCalcResponse> {
  const queryParams = new URLSearchParams();

  if (params.isDynasty !== undefined)
    queryParams.append('isDynasty', params.isDynasty.toString());
  if (params.numQbs !== undefined)
    queryParams.append('numQbs', params.numQbs.toString());
  if (params.numTeams !== undefined)
    queryParams.append('numTeams', params.numTeams.toString());
  if (params.ppr !== undefined)
    queryParams.append('ppr', params.ppr.toString());

  const response = await fetch(`${FANTASYCALC_API}?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch FantasyCalc data');
  }
  return response.json();
}

export async function fetchADPData(
  params: ADPQueryParams
): Promise<ADPResponse> {
  const queryParams = new URLSearchParams();

  if (params.teams !== undefined)
    queryParams.append('teams', params.teams.toString());
  if (params.year !== undefined)
    queryParams.append('year', params.year.toString());
  if (params.type) queryParams.append('type', params.type);

  const response = await fetch(
    `${FFCALCULATOR_API}/${params.type || 'standard'}?${queryParams.toString()}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch ADP data');
  }
  return response.json();
}
