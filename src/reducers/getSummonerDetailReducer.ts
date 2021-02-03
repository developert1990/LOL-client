import { SummonerDetailType } from './../types.d';
import { getSummonerActionType } from './types.d';
import { GET_SUMMONER_DETAIL_REQUEST, GET_SUMMONER_DETAIL_SUCCESS, GET_SUMMONER_DETAIL_FAIL, GET_SUMMONER_DETAIL_RESET } from './../constants/getSummonerConstants';


export interface GetSummonerDetailInitialStateType {
    isLoading: boolean;
    error: string;
    summonerDetail: SummonerDetailType | undefined;
}

export const getSummonerDetailInitialState: GetSummonerDetailInitialStateType = {
    isLoading: false,
    error: '',
    summonerDetail: undefined,
}

export const getSummonerDetailReducer = (state = getSummonerDetailInitialState, action: getSummonerActionType) => {
    switch (action.type) {
        case GET_SUMMONER_DETAIL_REQUEST:
            return { isLoading: true }
        case GET_SUMMONER_DETAIL_SUCCESS:
            return { isLoading: false, summonerDetail: action.payload };
        case GET_SUMMONER_DETAIL_FAIL:
            return { isLoading: false, error: action.payload };
        case GET_SUMMONER_DETAIL_RESET:
            return {};
        default:
            return state;
    }
}