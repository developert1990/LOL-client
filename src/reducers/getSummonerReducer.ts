import { GET_SUMMONER_REQUEST, GET_SUMMONER_SUCCESS, GET_SUMMONER_FAIL, GET_SUMMONER_RESET } from './../constants/getSummonerConstants';
import { SummonerReduxtype } from './../types.d';
import { ErrorType, getSummonerActionType } from './types';

export interface GetSummonerInitialStateType {
    isLoading: boolean;
    error: ErrorType | null;
    summonerInfo: SummonerReduxtype | undefined;
}

export const getSummonerInitialState: GetSummonerInitialStateType = {
    isLoading: false,
    error: null,
    summonerInfo: undefined,
}

export const getSummonerReducer = (state = getSummonerInitialState, action: getSummonerActionType) => {
    switch (action.type) {
        case GET_SUMMONER_REQUEST:
            return { ...state, isLoading: true }
        case GET_SUMMONER_SUCCESS:
            return { ...state, isLoading: false, summonerInfo: action.payload };
        case GET_SUMMONER_FAIL:
            return { ...state, isLoading: false, error: action.payload };
        case GET_SUMMONER_RESET:
            return {
                isLoading: false,
                error: null,
                summonerInfo: undefined,
            };
        default:
            return state;
    }
}