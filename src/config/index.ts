// aws ec2 docker address : "http://ec2-3-80-79-7.compute-1.amazonaws.com:7080";
export const USER_BASE = 'https://react-lol-app.herokuapp.com/user';
export const API_AWS_BASE = process.env.REACT_APP_API_BASE;
export const API_BASE_LOCAL = 'http://localhost:7080';
export const API_BASE = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_BASE : API_BASE_LOCAL;
export const GAME_VERSION = "11.4.1";
export const API = {
    GET_SUMMONER_BY_NAME: `${API_BASE}/lol/summoner/v4/summoners/by-name`,
    GET_SUMMONER_DETAIL_BY_ID: `${API_BASE}/lol/league/v4/entries/by-summoner`,
    GET_CHAMPION_SQUARE_IMG: `https://ddragon.leagueoflegends.com/cdn/${GAME_VERSION}/img/champion`,
    GET_ITEMS_IMG: `https://ddragon.leagueoflegends.com/cdn/${GAME_VERSION}/img/item`,
    GET_SPELLS_IMG: `https://ddragon.leagueoflegends.com/cdn/${GAME_VERSION}/img/spell`,
    GET_PASSIVE_IMG: `http://ddragon.leagueoflegends.com/cdn/${GAME_VERSION}/img/passive`,
    GET_RUNES_IMG: `https://ddragon.leagueoflegends.com/cdn/img`,
    GET_CHAMPIONS: `https://ddragon.leagueoflegends.com/cdn/${GAME_VERSION}/data/en_US/champion`,
    GET_SKINS: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash`,
    GET_RANKS: `${API_BASE}/lol/league-exp/v4/entries/RANKED_SOLO_5x5`,
    GET_PROFILEICON: `https://ddragon.leagueoflegends.com/cdn/${GAME_VERSION}/img/profileicon`,
    GET_MATCH_ID: `${API_BASE}/lol/match/v4/matchlists/by-account`,
    GET_MATCH_DETAILS: `${API_BASE}/lol/match/v4/matches`,
    GET_MASTERY: `${API_BASE}/lol/champion-mastery/v4/champion-masteries/by-summoner`,
    GET_CHAMP_ROTATION: `${API_BASE}/lol/platform/v3/champion-rotations`,
}

export enum TIER {
    CHALLENGER = 'CHALLENGER',
    GRANDMASTER = 'GRANDMASTER',
    MASTER = 'MASTER',
    DIAMOND = 'DIAMOND',
    PLATINUM = 'PLATINUM',
    GOLD = 'GOLD',
    SILVER = 'SILVER',
    BRONZE = 'BRONZE',
    IRON = 'IRON',
}

export const DIVISIONS = [
    'I',
    'II',
    'III',
    'IV'
]

export const MATCHHISTORY_LENGTH: number = 3

export const EMAIL_REG_EXP = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i