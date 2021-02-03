import { TEST_BASE } from './../config/index';
import { GET_SUMMONER_REQUEST, GET_SUMMONER_FAIL, GET_SUMMONER_SUCCESS, GET_SUMMONER_RESET, GET_SUMMONER_DETAIL_REQUEST, GET_SUMMONER_DETAIL_SUCCESS, GET_SUMMONER_DETAIL_FAIL } from './../constants/getSummonerConstants';
import { ThunkDispatch } from 'redux-thunk';
import Axios from 'axios';


export const getSummoner = (summonerId: string, region: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    const USER_ID = 'user account id';
    console.log("getSummoner 액션 들어")
    dispatch({ type: GET_SUMMONER_RESET });
    dispatch({ type: GET_SUMMONER_REQUEST });
    try {
        const { data } = await Axios.get(`${TEST_BASE}/summonorById/proxy/${summonerId}/${region}`);
        console.log('data ==>> ', data)
        dispatch({ type: GET_SUMMONER_SUCCESS, payload: data });
        localStorage.setItem(USER_ID, data.id);
        const id = data.id;
        dispatch({ type: GET_SUMMONER_DETAIL_REQUEST });

        // summoner 기본 정보 받았으니 => summoner 디테일 뽑기
        try {
            const { data } = await Axios.get(`${TEST_BASE}/summonorById/proxy/${id}/${region}/summonerDetail`);
            dispatch({ type: GET_SUMMONER_DETAIL_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: GET_SUMMONER_DETAIL_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
        }


    } catch (error) {
        dispatch({ type: GET_SUMMONER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
    // finally {
    //     dispatch({ type: NOTIFY_USERS })
    // }
}