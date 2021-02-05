import { THREE_GAMES_DETAIL_RESET } from './../constants/getGamesDetailConstants';
import { MatchType, SummonerDetailType } from './../types.d';
import { TEST_BASE } from './../config/index';
import { GET_SUMMONER_REQUEST, GET_SUMMONER_FAIL, GET_SUMMONER_SUCCESS, GET_SUMMONER_RESET, GET_SUMMONER_DETAIL_SUCCESS, GET_SUMMONER_DETAIL_FAIL, GET_SUMMONER_GAMES_100_SUCCESS, GET_SUMMONER_GAMES_100_FAIL, GET_SUMMONER_DETAIL_RESET, GET_SUMMONER_GAMES_100_RESET } from './../constants/getSummonerConstants';
import { ThunkDispatch } from 'redux-thunk';
import Axios from 'axios';


export const getSummoner = (summonerId: string, region: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    const USER_ID = 'user account id';
    console.log("getSummoner 액션 들어")
    dispatch({ type: GET_SUMMONER_RESET });
    // dispatch({ type: THREE_GAMES_DETAIL_RESET });
    // dispatch({ type: GET_SUMMONER_DETAIL_RESET });
    // dispatch({ type: GET_SUMMONER_GAMES_100_RESET });
    dispatch({ type: GET_SUMMONER_REQUEST });
    try {
        const { data } = await Axios.get(`${TEST_BASE}/summonorById/proxy/${summonerId}/${region}`);
        dispatch({ type: GET_SUMMONER_SUCCESS, payload: data });
        localStorage.setItem(USER_ID, data.id);
        const id: string = data.id;
        const accountId: string = data.accountId;

        // summoner 기본 정보 받았으니 => summoner 디테일 뽑기
        try {
            const { data } = await Axios.get(`${TEST_BASE}/summonorById/proxy/${id}/${region}/summonerDetail`);
            const summonerDetailForGameType: SummonerDetailType[] = data;
            const detail = summonerDetailForGameType.reduce((a, c) => {
                let soloType = {};
                if (c.queueType === "RANKED_SOLO_5x5") {
                    soloType = c;
                }
                return soloType
            }, {})
            dispatch({ type: GET_SUMMONER_DETAIL_SUCCESS, payload: detail });

            // 해당유저의 게임 했던것들 정보 가져옴 총 100개
            try {
                const { data } = await Axios.get(`${TEST_BASE}/summonorById/proxy/${accountId}/${region}/matchId`);
                const matches: MatchType[] = data.matches;

                // 게임 id(number)만 뽑아서 길이가 100인 배열을 만든다. 
                const matchIds = matches.reduce((a: number[], c) => {
                    a.push(c.gameId)
                    return a;
                }, [])

                dispatch({ type: GET_SUMMONER_GAMES_100_SUCCESS, payload: matches, matchIds: matchIds });
            } catch (error) {
                dispatch({ type: GET_SUMMONER_GAMES_100_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
            }
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