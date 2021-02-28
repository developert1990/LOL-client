
import { API_BASE } from '../config/index';
import Axios from 'axios';




export const getParticipantTiers = async (deepCopyEncryped: string[][], region: string) => {
    const newArr2: any[] = [];
    const promiseCall: any[] = [];

    deepCopyEncryped.forEach((data, outerIndex) => {
        data.forEach((id, innerIndex) => {

            promiseCall.push(Axios.get(`${API_BASE}/lol/league/v4/entries/by-summoner/${id}?region=${region}`)
                .then((res) => {
                    if (res.data[0]) {
                        return res.data[0].tier;
                    } else {
                        return "UNRANK"
                    }
                })
            )
        })
    })
    const promiseResult = await Promise.all(promiseCall)
    while (promiseResult.length) newArr2.push(promiseResult.splice(0, 10));
    return newArr2;
}





