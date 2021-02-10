import { SummonerDetailType } from '../types';
import { TEST_BASE } from '../config/index';
import Axios from 'axios';







// arr[outerIndex][innerIndex] = res.data

export const getParticipantTiers = async (deepCopyEncryped: string[][], region: string) => {

    const newArr2: any[] = [];
    const promiseCall: any[] = [];

    deepCopyEncryped.forEach((data, outerIndex) => {
        data.forEach((id, innerIndex) => {

            promiseCall.push(Axios.get(`${TEST_BASE}/summonorById/proxy/${id}/${region}/summonerDetail`)
                // .then((res) => testArr.push(res.data[0].tier))
                .then((res) => res.data[0].tier)
            )
        })
    })
    const promiseResult = await Promise.all(promiseCall)
    while (promiseResult.length) newArr2.push(promiseResult.splice(0, 10));
    return newArr2;
}





