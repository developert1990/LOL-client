import { THREE_GAMES_DETAIL_REQUEST, THREE_GAMES_DETAIL_SUCCESS, THREE_GAMES_DETAIL_FAIL, THREE_GAMES_DETAIL_RESET } from './../constants/getGamesDetailConstants';
import { MatchedGameType, ParticipantsType, GameImageType } from './../types.d';
import { getGameDetailAction } from './types';

export interface GetGameDetailsInitialStateType {
    isLoading: boolean;
    error: string;
    games: MatchedGameType[];
    summonerMatchDetail: ParticipantsType[];
    detailedImageData: GameImageType[];
}

export const getGameDetailsInitialState: GetGameDetailsInitialStateType = {
    isLoading: false,
    error: "",
    games: [],
    summonerMatchDetail: [],
    detailedImageData: [],
}

export const getGameDetailsReducer = (state = getGameDetailsInitialState, action: getGameDetailAction) => {
    switch (action.type) {
        case THREE_GAMES_DETAIL_REQUEST:
            return { ...state, isLoading: true };
        case THREE_GAMES_DETAIL_SUCCESS:
            // 여기서 games 의 값을 처음에는 action.payload만 추가하고 두번째부터는 값을 차곡차곡 저장한다.
            return { ...state, isLoading: false, games: state.games.length === 0 ? action.payload : [...state.games, ...action.payload], summonerMatchDetail: action.summonerMatchDetail, detailedImageData: action.detailedImageData };
        case THREE_GAMES_DETAIL_FAIL:
            return { ...state, isLoading: false, error: action.payload };
        case THREE_GAMES_DETAIL_RESET:
            return {
                games: [],
                summonerMatchDetail: [],
                detailedImageData: [],
            };
        default:
            return state;
    }
}




