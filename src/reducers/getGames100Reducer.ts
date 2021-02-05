import { MatchType } from './../types.d';
import { getGames100ActionType } from './types.d';
import { GET_SUMMONER_GAMES_100_SUCCESS, GET_SUMMONER_GAMES_100_FAIL } from '../constants/getSummonerConstants';


export interface GetGames100InitialStateType {
    error: string;
    games100: MatchType[] | undefined;
    gameIdInfo: number[];
}

export const getGames100InitialState: GetGames100InitialStateType = {
    error: '',
    games100: undefined,
    gameIdInfo: [],
}

export const getGames100Reducer = (state = getGames100InitialState, action: getGames100ActionType) => {
    switch (action.type) {
        case GET_SUMMONER_GAMES_100_SUCCESS:
            return { ...state, games100: action.payload, gameIdInfo: action.matchIds };
        case GET_SUMMONER_GAMES_100_FAIL:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}