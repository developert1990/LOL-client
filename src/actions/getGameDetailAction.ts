import { TEST_BASE } from './../config/index';
import { MatchedGameType } from './../types.d';
import { THREE_GAMES_DETAIL_REQUEST, THREE_GAMES_DETAIL_FAIL, THREE_GAMES_DETAIL_SUCCESS } from './../constants/getGamesDetailConstants';
import { ThunkDispatch } from 'redux-thunk';
import { getSummonerMatchDetail } from '../libs/index';


export const getGameDetail = (start: number, gameIdInfo: number[], region: string, accountId: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: THREE_GAMES_DETAIL_REQUEST });
    const matchesData: MatchedGameType[] = [];
    try {
        for (let i = start; i < start + 3; i++) {
            const response = await fetch(`${TEST_BASE}/summonorById/proxy/${gameIdInfo[i]}/${region}/matchList`);
            const data = await response.json();
            matchesData.push(data);
        }
        dispatch({ type: THREE_GAMES_DETAIL_SUCCESS, payload: matchesData });
        const summonerMatchDetail = getSummonerMatchDetail(matchesData, accountId); // 검색한 유저가 경기한 디테일을 가져옴
        console.log('summonerMatchDetail  **************************', summonerMatchDetail);

    } catch (error) {
        dispatch({ type: THREE_GAMES_DETAIL_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}