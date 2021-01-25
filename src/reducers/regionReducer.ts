import { regionActionType } from './types.d';
import { CHANGE_REGION } from '../constants/regionConstants';

export interface regionInitialStateType {
    region: string;
}

export const regionInitialState: regionInitialStateType = {
    region: 'kr',
}

export const regionReducer = (state = regionInitialState, action: regionActionType) => {
    switch (action.type) {
        case CHANGE_REGION:
            return { region: action.payload };
        default:
            return state;
    }
}