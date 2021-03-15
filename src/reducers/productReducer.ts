import { ProductActionType } from './types.d';
import { ProductType } from '../productTypes';
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_FINISH, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/productConstants';


export interface productCreateInitialStateType {
    product: ProductType,
    error: string;
    loading: boolean;
    success: boolean;
    reDirectUrl: string;
}

export const productCreateInitialState: productCreateInitialStateType = {
    product: {
        _id: '',
        name: '',
        category: '',
        image: '',
        price: 0,
        brand: '',
        rating: 0,
        numReviews: 0,
        description: '',
        countInStock: 0,
        reviews: []
    },
    error: '',
    loading: false,
    success: false,
    reDirectUrl: '',
}

export const productCreateReducer = (state = productCreateInitialState, action: ProductActionType) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { ...state, loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { ...state, loading: false, success: true, product: action.payload, reDirectUrl: action.reDirectUrl };
        case PRODUCT_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case PRODUCT_CREATE_RESET:
            return {}
        case PRODUCT_CREATE_FINISH:
            return { ...state, reDirectUrl: '' };
        default:
            return state;
    }
}




export interface ProductListInitialStateType {
    products: ProductType[],
    error: string;
    loading: boolean;
}

export const productListInitialState: ProductListInitialStateType = {
    products: [],
    error: '',
    loading: false,
}

export const productListReducer = (state = productListInitialState, action: ProductActionType) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}