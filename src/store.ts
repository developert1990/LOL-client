import { productCreateInitialState, productCreateInitialStateType, productCreateReducer, productDeleteInitialStateType, productDeleteInitialState, productDeleteReducer, productListInitialState, productListInitialStateType, productListReducer, productUpdateInitialStateType, productUpdateInitialState, productUpdateReducer } from './reducers/productReducer';
import { getRankInitialState, getRankInitialStateType, getRankReducer } from './reducers/getRankReducer';
import { getGameDetailsInitialState, GetGameDetailsInitialStateType, getGameDetailsReducer } from './reducers/getGamesDetailReducer';
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
import { userRegisterInitialType, userSigninInitialState, userSigninInitialStateType, userSigninReducer, userRegisterInitailState, userRegisterReducer, checkIsAdminInitialStateType, checkIsAdminInitialState, checkIsAdminReducer, userListInitialStateType, userListInitialState, userListReducer, userDetailInitialStateType, userDetailInitialState, userDetailReducer, userUpdateInitialStateType, userUpdateInitialState, userUpdateReducer, userDeleteInitialStateType, userDeleteInitialState, userDeleteReducer } from './reducers/userReducer';



export interface initialAppStateType {
    regionStore: regionInitialStateType,
    champsStore: ChampsInitialStateType,
    runesStore: RunesInitialStateType,
    spellsStore: SpellsInitialStateType,
    getSummonerStore: GetSummonerInitialStateType,
    getSummonerDetailStore: GetSummonerDetailInitialStateType,
    getGames100Store: GetGames100InitialStateType,
    getGameDetailStore: GetGameDetailsInitialStateType,
    getRankStore: getRankInitialStateType,
    userStore: userSigninInitialStateType,
    registerStore: userRegisterInitialType,
    checkAdminStore: checkIsAdminInitialStateType,
    productCreateStore: productCreateInitialStateType,
    productListStore: productListInitialStateType,
    productDeleteStore: productDeleteInitialStateType,
    productUpdateStore: productUpdateInitialStateType,
    userListStore: userListInitialStateType,
    userDetailStore: userDetailInitialStateType,
    userUpdateStore: userUpdateInitialStateType,
    userDeleteStore: userDeleteInitialStateType,
}

export const initialAppState: initialAppStateType = {
    regionStore: regionInitialState,
    champsStore: champsInitialState,
    runesStore: runesInitialState,
    spellsStore: spellsInitialState,
    getSummonerStore: getSummonerInitialState,
    getSummonerDetailStore: getSummonerDetailInitialState,
    getGames100Store: getGames100InitialState,
    getGameDetailStore: getGameDetailsInitialState,
    getRankStore: getRankInitialState,
    userStore: userSigninInitialState,
    registerStore: userRegisterInitailState,
    checkAdminStore: checkIsAdminInitialState,
    productCreateStore: productCreateInitialState,
    productListStore: productListInitialState,
    productDeleteStore: productDeleteInitialState,
    productUpdateStore: productUpdateInitialState,
    userListStore: userListInitialState,
    userDetailStore: userDetailInitialState,
    userUpdateStore: userUpdateInitialState,
    userDeleteStore: userDeleteInitialState,
}

const reducer = combineReducers({
    regionStore: regionReducer,
    champsStore: champsReducer,
    runesStore: runesReducer,
    spellsStore: spellReducer,
    getSummonerStore: getSummonerReducer,
    getSummonerDetailStore: getSummonerDetailReducer,
    getGames100Store: getGames100Reducer,
    getGameDetailStore: getGameDetailsReducer,
    getRankStore: getRankReducer,
    userStore: userSigninReducer,
    registerStore: userRegisterReducer,
    checkAdminStore: checkIsAdminReducer,
    productCreateStore: productCreateReducer,
    productListStore: productListReducer,
    productDeleteStore: productDeleteReducer,
    productUpdateStore: productUpdateReducer,
    userListStore: userListReducer,
    userDetailStore: userDetailReducer,
    userUpdateStore: userUpdateReducer,
    userDeleteStore: userDeleteReducer,

});


const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(promise, thunk)))


export default store;