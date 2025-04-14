import type {
  FantasyCalcQueryParams,
  ADPQueryParams,
  FantasyCalcResponse,
  ADPResponse,
} from './types';

const FANTASYCALC_API = 'https://api.fantasycalc.com/values/current';
const FFCALCULATOR_API = 'https://fantasyfootballcalculator.com/api/v1/adp';

// Rate limiting configuration
const RATE_LIMIT = {
  tokens: 10, // Maximum tokens in bucket
  refillRate: 1, // Tokens per second
  lastRefill: Date.now(),
  tokensAvailable: 10,
};

// Rate limiting function
async function rateLimit() {
  const now = Date.now();
  const timePassed = (now - RATE_LIMIT.lastRefill) / 1000;
  RATE_LIMIT.tokensAvailable = Math.min(
    RATE_LIMIT.tokens,
    RATE_LIMIT.tokensAvailable + timePassed * RATE_LIMIT.refillRate
  );
  RATE_LIMIT.lastRefill = now;

  if (RATE_LIMIT.tokensAvailable < 1) {
    const waitTime =
      ((1 - RATE_LIMIT.tokensAvailable) / RATE_LIMIT.refillRate) * 1000;
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    return rateLimit();
  }

  RATE_LIMIT.tokensAvailable -= 1;
}

export async function fetchFantasyCalcPlayers(
  params: FantasyCalcQueryParams
): Promise<FantasyCalcResponse> {
  await rateLimit();

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
  await rateLimit();

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
