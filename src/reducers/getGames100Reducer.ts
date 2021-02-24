import { GET_SUMMONER_GAMES_100_RESET } from './../constants/getSummonerConstants';
import { MatchType } from './../types.d';
import { getGames100ActionType } from './types.d';
import { GET_SUMMONER_GAMES_100_SUCCESS, GET_SUMMONER_GAMES_100_FAIL } from '../constants/getSummonerConstants';


export interface GetGames100InitialStateType {
    error: string;
    games100: MatchType[] | undefined;
    matchIds: number[];
}

export const getGames100InitialState: GetGames100InitialStateType = {
    error: '',
    games100: undefined,
    matchIds: [],
}

export const getGames100Reducer = (state = getGames100InitialState, action: getGames100ActionType) => {
    switch (action.type) {
        case GET_SUMMONER_GAMES_100_SUCCESS:
            return { ...state, games100: action.payload, matchIds: action.matchIds };
        case GET_SUMMONER_GAMES_100_FAIL:
            return { ...state, error: action.payload };
        case GET_SUMMONER_GAMES_100_RESET:
            return {};
        default:
            return state;
    }
}