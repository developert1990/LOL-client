import { SummonerDetailType } from './../types.d';
import { getSummonerDetailActionType } from './types.d';
import { GET_SUMMONER_DETAIL_SUCCESS, GET_SUMMONER_DETAIL_FAIL, GET_SUMMONER_DETAIL_RESET } from './../constants/getSummonerConstants';


export interface GetSummonerDetailInitialStateType {
    error: string;
    summonerDetail: SummonerDetailType | undefined;
}

export const getSummonerDetailInitialState: GetSummonerDetailInitialStateType = {
    error: '',
    summonerDetail: undefined,
}

export const getSummonerDetailReducer = (state = getSummonerDetailInitialState, action: getSummonerDetailActionType) => {
    switch (action.type) {

        case GET_SUMMONER_DETAIL_SUCCESS:
            return { ...state, summonerDetail: action.payload };
        case GET_SUMMONER_DETAIL_FAIL:
            return { ...state, error: action.payload };
        case GET_SUMMONER_DETAIL_RESET:
            return {};
        default:
            return state;
    }
}