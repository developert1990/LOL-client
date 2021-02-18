import { SummonerDetailType } from './../types.d';
import { API_BASE } from './../config/index';
import Axios from 'axios';



export const getSummonerDetailData = async (id: string, region: string) => {
    const { data } = await Axios.get(`${API_BASE}/lol/league/v4/entries/by-summoner/${id}?region=${region}`);
    if (data.length > 0) {
        const summonerDetail: SummonerDetailType[] = data;
        return summonerDetail;
    } else {
        throw { message: "No rank information for current filters." };
    }
}