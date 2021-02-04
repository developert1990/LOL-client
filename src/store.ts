import { GetGames100InitialStateType, getGames100InitialState, getGames100Reducer } from './reducers/getGames100Reducer';
import { GetSummonerDetailInitialStateType, getSummonerDetailInitialState, getSummonerDetailReducer } from './reducers/getSummonerDetailReducer';
import { GetSummonerInitialStateType, getSummonerInitialState, getSummonerReducer } from './reducers/getSummonerReducer';
import { ChampsInitialStateType, champsInitialState, champsReducer, RunesInitialStateType, runesInitialState, runesReducer, SpellsInitialStateType, spellsInitialState, spellReducer } from './reducers/initialDataReducer';
import { regionReducer, regionInitialStateType, regionInitialState } from './reducers/regionReducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import promise from 'redux-promise-middleware';
// import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


export interface initialAppStateType {
    regionStore: regionInitialStateType,
    champsStore: ChampsInitialStateType,
    runesStore: RunesInitialStateType,
    spellsStore: SpellsInitialStateType,
    getSummonerStore: GetSummonerInitialStateType,
    getSummonerDetailStore: GetSummonerDetailInitialStateType,
    getGames100Store: GetGames100InitialStateType,
}

export const initialAppState: initialAppStateType = {
    regionStore: regionInitialState,
    champsStore: champsInitialState,
    runesStore: runesInitialState,
    spellsStore: spellsInitialState,
    getSummonerStore: getSummonerInitialState,
    getSummonerDetailStore: getSummonerDetailInitialState,
    getGames100Store: getGames100InitialState,
}

const reducer = combineReducers({
    regionStore: regionReducer,
    champsStore: champsReducer,
    runesStore: runesReducer,
    spellsStore: spellReducer,
    getSummonerStore: getSummonerReducer,
    getSummonerDetailStore: getSummonerDetailReducer,
    getGames100Store: getGames100Reducer,
})

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(promise, thunk)))

export default store;