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
