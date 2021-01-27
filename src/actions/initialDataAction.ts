import { TEST_BASE } from './../config/index';
import { FETCH_CHAMPS, FETCH_SPELLS, FETCH_RUNES } from './../constants/initialDataConstants';

export const fetchChamps = () => ({
    type: FETCH_CHAMPS,
    payload: new Promise(async (resolve, reject) => {
        try {
            const data = await (await fetch(`${TEST_BASE}/champs`)).json();
            // console.log(data);
            resolve(data);
        } catch (error) {
            reject(error.message);
        }
    })
});


export const fetchSpells = () => ({
    type: FETCH_SPELLS,
    payload: new Promise(async (resolve, reject) => {
        try {
            const data = await (await fetch(`${TEST_BASE}/spells`)).json();
            // console.log(data);
            resolve(data);
        } catch (error) {
            reject(error.message);
        }
    })
});

export const fetchRunes = () => ({
    type: FETCH_RUNES,
    payload: new Promise(async (resolve, reject) => {
        try {
            const data = await (await fetch(`${TEST_BASE}/runes`)).json();
            // console.log(data);
            resolve(data);
        } catch (error) {
            reject(error.message);
        }
    })
});
