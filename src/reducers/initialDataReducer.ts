import { FETCH_RUNES, FETCH_SPELLS } from './../constants/initialDataConstants';
import { champsActionType, runesActionType, spellsActionType } from './types.d';

import { FETCH_CHAMPS } from '../constants/initialDataConstants';

export interface ChampsInitialStateType {
    champs: [];
    isLoading: boolean;
    errorMessage: string;
}

export const champsInitialState: ChampsInitialStateType = {
    champs: [],
    isLoading: false,
    errorMessage: '',
}

export const champsReducer = (state = champsInitialState, action: champsActionType) => {
    switch (action.type) {
        case `${FETCH_CHAMPS}_PENDING`: {
            return {
                ...state,
                isLoading: true,
                errorMessage: '',
            }
        }
        case `${FETCH_CHAMPS}_FULFILLED`: {
            return {
                ...state,
                isLoading: false,
                champs: action.payload,
                errorMessage: '',
            }
        }
        case `${FETCH_CHAMPS}_REJECTED`: {
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        }
        default: return state;
    }
}


export interface RunesInitialStateType {
    runes: [];
    isLoading: boolean;
    errorMessage: string;
}

export const runesInitialState: RunesInitialStateType = {
    runes: [],
    isLoading: false,
    errorMessage: '',
}

export const runesReducer = (state = runesInitialState, action: runesActionType) => {
    switch (action.type) {
        case `${FETCH_RUNES}_PENDING`:
            return {
                ...state,
                isLoading: true,
                errorMessage: '',
            };
        case `${FETCH_RUNES}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                runes: action.payload,
            };
        case `${FETCH_RUNES}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                errorMessage: '',
            };
        default:
            return state;
    }
}


export interface SpellsInitialStateType {
    spells: [];
    isLoading: boolean;
    errorMessage: string;
}


export const spellsInitialState: SpellsInitialStateType = {
    spells: [],
    isLoading: false,
    errorMessage: '',
}

export const spellReducer = (state = spellsInitialState, action: spellsActionType) => {
    switch (action.type) {
        case `${FETCH_SPELLS}__PENDING`:
            return {
                ...state,
                isLoading: true,
                errorMessage: '',
            };
        case `${FETCH_SPELLS}_FULFILLED`:
            return {
                ...state,
                isLoading: false,
                spells: action.payload,

            };
        case `${FETCH_SPELLS}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                errorMessage: '',
            };

        default:
            return state;
    }
}