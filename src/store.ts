import { regionReducer, regionInitialStateType, regionInitialState } from './reducers/regionReducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';


export interface initialAppStateType {
    regionStore: regionInitialStateType,

}

export const initialAppState: initialAppStateType = {
    regionStore: regionInitialState
}

const reducer = combineReducers({
    regionStore: regionReducer,
})

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(promise)))

export default store;