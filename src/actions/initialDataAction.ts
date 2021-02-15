import { API_BASE } from './../config/index';
import { FETCH_CHAMPS, FETCH_SPELLS, FETCH_RUNES } from './../constants/initialDataConstants';

export const fetchChamps = () => ({
    type: FETCH_CHAMPS,
    payload: new Promise(async (resolve, reject) => {
        try {
            const data = await (await fetch(`${API_BASE}/champs`)).json();
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
            const data = await (await fetch(`${API_BASE}/spells`)).json();
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
            const data = await (await fetch(`${API_BASE}/runes`)).json();
            resolve(data);
        } catch (error) {
            reject(error.message);
        }
    })
});
