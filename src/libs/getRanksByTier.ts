import axios from 'axios';
import { SummonerDetailType } from '../types';


export const getRanksByTier = async (urlCount: number, urls: string[], rankArr: SummonerDetailType[]) => {
    console.log('urls: ', urls)
    if (urlCount === 0) {
        for (let j = 1; j < 3; j++) {
            const { data } = await axios.get(`${urls[urlCount]}&tierPage=${j}`);
            rankArr.push(...data);
        }
        return rankArr;
    }
    if (urlCount === 1) {
        for (let j = 1; j < 5; j++) {
            const { data } = await axios.get(`${urls[urlCount]}&tierPage=${j}`);
            rankArr.push(...data);
            return rankArr;
        }
    }
    if (urlCount === 2) {
        for (let j = 1; j < 10; j++) {
            const { data } = await axios.get(`${urls[urlCount]}&tierPage=${j}`);
            rankArr.push(...data);
        }
        return rankArr;
    }

    if (urlCount === 3) {
        for (let j = 1; j < 10; j++) {
            const { data } = await axios.get(`${urls[urlCount]}&tierPage=${j}`);
            rankArr.push(...data);
        }
        return rankArr;
    }
}