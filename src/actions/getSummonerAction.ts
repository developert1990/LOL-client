import { TEST_BASE } from './../config/index';
import { GET_SUMMONER_REQUEST, GET_SUMMONER_FAIL, GET_SUMMONER_SUCCESS, GET_SUMMONER_RESET } from './../constants/getSummonerConstants';
import { ThunkDispatch } from 'redux-thunk';
import Axios from 'axios';


export const getSummoner = (summonerId: string, region: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    console.log("액션 들어d")
    dispatch({ type: GET_SUMMONER_RESET });
    dispatch({ type: GET_SUMMONER_REQUEST });
    try {
        const { data } = await Axios.get(`${TEST_BASE}/summonorById/proxy/${summonerId}/${region}`);
        console.log('data ==>> ', data)
        dispatch({ type: GET_SUMMONER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: GET_SUMMONER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
    // finally {
    //     dispatch({ type: NOTIFY_USERS })
    // }
}