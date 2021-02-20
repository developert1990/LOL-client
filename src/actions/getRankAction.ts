
import { RANKING_REQUEST, RANKING_FAIL, RANKING_SUCCESS } from './../constants/getRankConstants';
import { ThunkDispatch } from 'redux-thunk';
import { SummonerDetailType } from '../types';
import { getRanksByTier } from '../libs';


export const getRankAction = (urls: string[], urlCount: number, rankArr?: SummonerDetailType[]) => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: RANKING_REQUEST });
    try {
        if (rankArr !== undefined) {
            console.log("더 받으러 옴")
            console.log('rankArr', rankArr)
            const finalRanksData = await getRanksByTier(urlCount, urls, rankArr);
            dispatch({ type: RANKING_SUCCESS, payload: finalRanksData });
        }
    } catch (error) {
        dispatch({ type: RANKING_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}