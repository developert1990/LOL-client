export interface SummonerInfoType {
    id: string | undefined;
    name: string;
    profileIconId: number;
    level: number;
    accountId: string | undefined;
}

export interface SummonerDetailType {
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
}
export interface MatchType {
    champion: number;
    gameId: number;
    lane: string;
    platformId: string;
    queue: number;
    role: string;
    season: number;
    timestamp: number;
}
export interface GameMatcheType {
    endIndex: number;
    matches: MatchType[];
    startIndex: number;
    totalGames: number;
}