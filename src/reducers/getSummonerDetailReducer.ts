import { SummonerDetailType } from './../types.d';
import { getSummonerDetailActionType, ErrorType } from './types.d';
import { GET_SUMMONER_DETAIL_SUCCESS, GET_SUMMONER_DETAIL_FAIL, GET_SUMMONER_DETAIL_RESET, GET_SUMMONER_DETAIL_REQUEST } from './../constants/getSummonerConstants';


export interface GetSummonerDetailInitialStateType {
    isLoading: boolean;
    error: ErrorType | null;
    summonerDetail: SummonerDetailType | undefined;
}

export const getSummonerDetailInitialState: GetSummonerDetailInitialStateType = {
    isLoading: false,
    error: null,
    summonerDetail: undefined,
}

export const getSummonerDetailReducer = (state = getSummonerDetailInitialState, action: getSummonerDetailActionType) => {
    switch (action.type) {
        case GET_SUMMONER_DETAIL_REQUEST:
            return { ...state, isLaoding: true }
        case GET_SUMMONER_DETAIL_SUCCESS:
            return { ...state, isLoading: false, summonerDetail: action.payload };
        case GET_SUMMONER_DETAIL_FAIL:
            return { ...state, isLoading: false, error: action.payload };
        case GET_SUMMONER_DETAIL_RESET:
            return {
                isLoading: false,
                error: null,
                summonerDetail: undefined,
            };
        default:
            return state;
    }
}