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
    console.log('promiseResult ??? ', promiseResult)
    return newArr2;
}








// export const testinparticipant = (deepCopyEncryped: string[][], region: string) => {
//     const result = "a";
//     // let newArr: string[][] =[];

//     const newArr = Promise.all(
//         deepCopyEncryped.map((data, outIndex) => {
//             data.map(
//                 async (id: string, inIndex) => {
//                     const { data } = await Axios.get(`${TEST_BASE}/summonorById/proxy/${id}/${region}/summonerDetail`);
//                     console.log('data', data)
//                     deepCopyEncryped[outIndex][inIndex] = data[0].tier;
//                 })
//         }));

//     console.log("하하")
//     console.log('newArr', newArr)

//     return result;
// }