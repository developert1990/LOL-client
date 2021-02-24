import { userActionType } from './types.d';
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_RESET, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from '../constants/userConstants';
import { cartItemType } from './cartReducer';


export interface userType {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    isSeller: boolean;
    tokenExp: string | number;
    refreshTokenExp: string | number;
    token: string;
    cart: cartItemType[];
}

export interface userSigninInitialStateType {
    userInfo: userType;
    error: string;
    loading: boolean;
}

export const userSigninInitialState: userSigninInitialStateType = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
    error: '',
    loading: false,
}

export const userSigninReducer = (state = userSigninInitialState, action: userActionType) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true }
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNOUT:
            return {}
        default:
            return state;
    }
}


export interface registerType {
    name: string;
    email: string;
}

export interface userRegisterInitialType {
    userInfo: registerType;
    error: string;
    loading: boolean;
}

export const userRegisterInitailState: userRegisterInitialType = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
    error: '',
    loading: false,
}


export const userRegisterReducer = (state = userRegisterInitailState, action: userActionType) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case USER_REGISTER_RESET:
            return {};
        default:
            return state;
    }
}
