import { THREE_GAMES_DETAIL_REQUEST, THREE_GAMES_DETAIL_SUCCESS, THREE_GAMES_DETAIL_FAIL } from './../constants/getGamesDetailConstants';
import { MatchedGameType } from './../types.d';
import { getGameDetailAction } from './types';

export interface GetGameDetailsInitialStateType {
    isLoading: boolean;
    error: string;
    games: MatchedGameType[] | undefined;
}

export const getGameDetailsInitialState: GetGameDetailsInitialStateType = {
    isLoading: false,
    error: "",
    games: undefined,
}

export const getGameDetailsReducer = (state = getGameDetailsInitialState, action: getGameDetailAction) => {
    switch (action.type) {
        case THREE_GAMES_DETAIL_REQUEST:
            return { ...state, isLoading: true };
        case THREE_GAMES_DETAIL_SUCCESS:
            return { ...state, isLoading: false, games: action.payload };
        case THREE_GAMES_DETAIL_FAIL:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
}




