import { ProductType } from './../productTypes.d';
import { userType } from './userReducer';
import { GameImageType } from './../types.d';
export interface regionActionType {
    payload: string;
    type: string;
}

export interface champsActionType {
    payload: any;
    type: string;
}

export interface runesActionType {
    payload: any;
    type: string;
}

export interface spellsActionType {
    payload: any;
    type: string;
}

export interface getSummonerActionType {
    payload: any;
    type: string;
}

export interface getSummonerDetailActionType {
    payload: any;
    type: string;
}

export interface getGames100ActionType {
    payload: any;
    type: string;
    matchIds: number[];
}

export interface getGameDetailAction {
    payload: any;
    type: string;
    summonerMatchDetail: any;
    detailedImageData: any;
}

export interface ErrorType {
    "status": {
        "message": string;
        "status_code": number;
    }
    "Error": string;
    "message": string;
}

export interface getRankAction {
    payload: any;
    type: string;
}


export interface userActionType {
    type: string;
    payload: userType | string;
}


export interface checkIsAdminActionType {
    type: string;
    payload: any;
}


export interface ProductActionType {
    type: string;
    payload: ProductType[];
    reDirectUrl: string;
}

export interface userListActionType {
    type: string;
    payload: any;
}

export interface userDetailActionType {
    type: string;
    payload: userType | string;
}

export interface userProfileUpdateActionType {
    type: string;
    payload: any;
}
export interface userDeleteActionType {
    type: string;
    payload: any;
}