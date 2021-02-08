import { SummonerDetailType } from './../types.d';
import { TEST_BASE } from './../config/index';
import Axios from 'axios';



export const getSummonerDetailData = async (id: string, region: string) => {
    const { data } = await Axios.get(`${TEST_BASE}/summonorById/proxy/${id}/${region}/summonerDetail`);
    const summonerDetail: SummonerDetailType[] = data;
    return summonerDetail;
}