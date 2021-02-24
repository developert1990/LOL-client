import { SummonerDetailType } from './../types.d';
import { RANKING_REQUEST, RANKING_SUCCESS, RANKING_FAIL, RANKING_RESET } from './../constants/getRankConstants';
import { getRankAction } from './types.d';

export interface getRankInitialStateType {
    isLoading: boolean;
    error: string;
    rank: SummonerDetailType[];
}

export const getRankInitialState: getRankInitialStateType = {
    error: "",
    isLoading: false,
    rank: [],
}

export const getRankReducer = (state = getRankInitialState, action: getRankAction) => {
    switch (action.type) {
        case RANKING_REQUEST:
            return { ...state, isLoading: true }
        case RANKING_SUCCESS:
            return { ...state, isLoading: false, rank: action.payload }
        case RANKING_FAIL:
            return { ...state, isLoading: false, error: action.payload }
        case RANKING_RESET:
            return {
                error: "",
                isLoading: false,
                rank: [],
            }
        default:
            return state;
    }
}