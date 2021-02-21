import { mixedArrType } from './libs/getParticipantsData';
export interface SummonerInfoType {
    id: string;
    name: string;
    profileIconId: number;
    level: number;
    accountId: string;
}

export interface SummonerDetailType {
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    leagueId?: string;
    summonerId?: string;
    summonerName?: string;
    veteran?: boolean;
    inactive?: boolean;
    freshBlood?: boolean;
    hotStreak?: boolean;
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

export interface SummonerReduxtype {
    accountId: string;
    id: string;
    name: string;
    profileIconId: number;
    puuid: string;
    revisionDate: number;
    summonerLevel: number;
}


// 챔피언 정보 타입
export interface ChampDetailType {
    allytips: string[];
    blurb: string;
    enemytips: string[];
    id: string;
    image: ChampImageType;
    info: ChampInfo;
    key: string;
    lore: string;
    name: string;
    partype: string;
    passive: ChampionInnerPassiveType;
    skins: ChampionSkinsType[];
    spells: ChampionSpellsType[];
    stats: ChampStatsType;
    tags: string[];
    title: string;
}

export interface ChampionInnerPassiveType {
    description: string;
    image: ChampionInnerImgType;
}

export interface ChampionSkinsType {
    chromas: boolean;
    id: string;
    name: string;
    num: number;
}

export interface ChampionSpellsType {
    cooldown: number[];
    cost: number[];
    description: string;
    id: string;
    image: ChampionInnerImgType;
    name: string;
    range: number[];
    resource: string;
}

export interface ChampionInnerImgType {

    full: string;
    group: string;
    sprite: string;

}

export interface ChampInfoType {
    attack: number;
    defense: number;
    difficulty: number;
    magic: number;
}

export interface ChampImageType {
    full: string;
    group: string;
    h: number;
    sprite: string;
    w: number;
    x: number;
    y: number;
}

export interface ChampStatsType {
    armor: number;
    armorperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackrange: number;
    attackspeed: number;
    attackspeedperlevel: number;
    crit: number;
    critperlevel: number;
    hp: number;
    hpperlevel: number;
    hpregen: number;
    hpregenperlevel: number;
    movespeed: number;
    mp: number;
    mpperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
}


// 스펠 정보 타입

export interface SpellDetailType {
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    costType: string;
    datavalues: {}
    description: string;
    effect: (number[] | null)[];
    effectBurn: (string | null)[];
    id: string;
    image: SpellImageType;
    key: string;
    maxammo: string;
    maxrank: number;
    modes: string[];
    name: string;
    range: number[];
    rangeBurn: string;
    resource: string;
    summonerLevel: number;
    tooltip: string;

}

export interface SpellImageType {
    full: string;
    group: string;
    h: number;
    sprite: string;
    w: number;
    x: number;
    y: number;
}


// 룬 정보 타입

export interface RuneBigType {
    icon: string;
    id: number;
    key: string;
    name: string;
    slots: RuneSlotsType[];
}

export interface RuneSlotsType {
    runes: RuneSmallType[];
}

export interface RuneSmallType {
    icon: string;
    id: number;
    key: string;
    longDesc: string;
    name: string;
    shortDesc: string;
}



// 매치 히스토리에서 게임정보 타입


export interface MatchedGameType {
    gameCreation: number;
    gameDuration: number;
    gameId: number;
    gameMode: string;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participantIdentities: ParticipantIdentitiesType[];
    participants: ParticipantsType[];
    platformId: string;
    queueId: number;
    seasonId: number;
    teams: TeamsType[];
}

export interface ParticipantIdentitiesType {
    participantId: number;
    player: PlayerType;
}

export interface PlayerType {
    accountId: string;
    currentAccountId: string;
    currentPlatformId: string;
    matchHistoryUri: string;
    platformId: string;
    profileIcon: number;
    summonerId: string;
    summonerName: string;
}


export interface TeamsType {
    bans: GameBansType[];
    baronKills: number;
    dominionVictoryScore: number;
    dragonKills: number;
    firstBaron: boolean;
    firstBlood: boolean;
    firstDragon: boolean;
    firstInhibitor: boolean;
    firstRiftHerald: boolean;
    firstTower: boolean;
    inhibitorKills: number;
    riftHeraldKills: number;
    teamId: number;
    towerKills: number;
    vilemawKills: number;
    win: string;
}

export interface GameBansType {
    championId: number;
    pickTurn: number;
}



export interface ParticipantsType {
    championId: number | string;
    participantId: number | string;
    spell1Id: number | string;
    spell2Id: number | string;
    stats: ParticipantsStatsType;
    teamId: number;
    timeline: ParticipantsTimelineType;
    otherParticipants: mixedArrType[];
}

export interface ParticipantsStatsType {
    assists: number;
    champLevel: number;
    combatPlayerScore: number;
    damageDealtToObjectives: number;
    damageDealtToTurrets: number;
    damageSelfMitigated: number;
    deaths: number;
    doubleKills: number;
    firstBloodAssist: false
    firstBloodKill: false
    firstInhibitorAssist: true
    firstInhibitorKill: false
    firstTowerAssist: true
    firstTowerKill: false
    goldEarned: number;
    goldSpent: number;
    inhibitorKills: number;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
    killingSprees: number;
    kills: number;
    largestCriticalStrike: number;
    largestKillingSpree: number;
    largestMultiKill: number;
    longestTimeSpentLiving: number;
    magicDamageDealt: number;
    magicDamageDealtToChampions: number;
    magicalDamageTaken: number;
    neutralMinionsKilled: number;
    neutralMinionsKilledEnemyJungle: number;
    neutralMinionsKilledTeamJungle: number;
    objectivePlayerScore: number;
    participantId: number;
    pentaKills: number;
    perk0: number;
    perk0Var1: number;
    perk0Var2: number;
    perk0Var3: number;
    perk1: number;
    perk1Var1: number;
    perk1Var2: number;
    perk1Var3: number;
    perk2: number;
    perk2Var1: number;
    perk2Var2: number;
    perk2Var3: number;
    perk3: number;
    perk3Var1: number;
    perk3Var2: number;
    perk3Var3: number;
    perk4: number;
    perk4Var1: number;
    perk4Var2: number;
    perk4Var3: number;
    perk5: number;
    perk5Var1: number;
    perk5Var2: number;
    perk5Var3: number;
    perkPrimaryStyle: number | string;
    perkSubStyle: number | string;
    physicalDamageDealt: number;
    physicalDamageDealtToChampions: number;
    physicalDamageTaken: number;
    playerScore0: number;
    playerScore1: number;
    playerScore2: number;
    playerScore3: number;
    playerScore4: number;
    playerScore5: number;
    playerScore6: number;
    playerScore7: number;
    playerScore8: number;
    playerScore9: number;
    quadraKills: number;
    sightWardsBoughtInGame: number;
    statPerk0: number;
    statPerk1: number;
    statPerk2: number;
    timeCCingOthers: number;
    totalDamageDealt: number;
    totalDamageDealtToChampions: number;
    totalDamageTaken: number;
    totalHeal: number;
    totalMinionsKilled: number;
    totalPlayerScore: number;
    totalScoreRank: number;
    totalTimeCrowdControlDealt: number;
    totalUnitsHealed: number;
    tripleKills: number;
    trueDamageDealt: number;
    trueDamageDealtToChampions: number;
    trueDamageTaken: number;
    turretKills: number;
    unrealKills: number;
    visionScore: number;
    visionWardsBoughtInGame: number;
    wardsKilled: number;
    wardsPlaced: number;
    win: boolean;
}

export interface ParticipantsTimelineType {
    lane: string;
    participantId: number;
    role: string;
}


export interface SpellsIngameType {
    spell1: number;
    spell2: number;
}

export interface RunesIngameType {
    primaryRune: number;
    subRune: number;
}




// game images type

export interface GameImageType {
    createdGame: number;
    gameDuration: number;
    teams: TeamsType[];
    gameId: number;
    champImage: string;
    championId?: string;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
    spell1: any;
    spell1Id?: string;
    spell2Id?: string;
    spell2: any;
    gold: number;
    ward: number;
    stats?: ParticipantsStatsType;
    kills: number;
    assists: number;
    deaths: number;
    minionKillded: number;
    rate: string;
    gameResult: string;
    level: number;
    mainRune: any;
    perkPrimaryStyle?: string;
    perkSubStyle?: string;
    subRune: any;
    otherParticipants: mixedArrType[];
}



// masteries
export interface MasteriesType {
    championId: number | string;
    championLevel: number;
    championPoints: number;
    lastPlayTime: number;
    championPointsSinceLastLevel: number;
    championPointsUntilNextLevel: number;
    chestGranted: boolean;
    tokensEarned: number;
    summonerId: string;
}


export interface RotationChampType {
    freeChampionIds: number[];
    freeChampionIdsForNewPlayers: number[];
}

export interface RotationChampEachType {
    id: string;
    name: string;
    tags: string[];
}
export interface RotationChampResultType {
    freeChampForAll: RotationChampEachType[];
    freeChampForNew: RotationChampEachType[];
}