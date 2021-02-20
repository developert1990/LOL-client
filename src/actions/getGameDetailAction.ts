import { MATCHHISTORY_LENGTH } from '../config/index';
import { API_BASE } from './../config/index';
import { MatchedGameType } from './../types.d';
import { THREE_GAMES_DETAIL_REQUEST, THREE_GAMES_DETAIL_FAIL, THREE_GAMES_DETAIL_SUCCESS } from './../constants/getGamesDetailConstants';
import { ThunkDispatch } from 'redux-thunk';
import { getDetailedImageData, getSummonerMatchDetail } from '../libs/index';



export const getGameDetail = (start: number, gameIdInfo: number[], region: string, accountId: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: THREE_GAMES_DETAIL_REQUEST });
    const matchesData: MatchedGameType[] = [];
    try {
        for (let i = start; i < start + MATCHHISTORY_LENGTH; i++) {
            const response = await fetch(`${API_BASE}/lol/match/v4/matches/${gameIdInfo[i]}?region=${region}`);
            const data = await response.json();
            matchesData.push(data);
        }
        const summonerMatchDetail = await getSummonerMatchDetail(matchesData, accountId, region); // 검색한 유저가 경기한 디테일을 가져옴
        const detailedImageData = getDetailedImageData(summonerMatchDetail, matchesData);
        dispatch({ type: THREE_GAMES_DETAIL_SUCCESS, payload: matchesData, summonerMatchDetail, detailedImageData });

    } catch (error) {
        dispatch({ type: THREE_GAMES_DETAIL_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}