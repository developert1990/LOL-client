import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_SUCCESS } from './../constants/productConstants';
import { API_BASE } from './../config/index';
import Axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS } from '../constants/productConstants';
import { ProductType } from '../productTypes';

// Admin 계정으로 새 product Create
export const createProduct = (formData: FormData) => async (dispatch: ThunkDispatch<any, any, any>, getState: () => any) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const { userStore: { userInfo } } = getState();
    formData.append('userInfo', userInfo);
    try {
        const { data } = await Axios.post(`${API_BASE}/lolProduct/upload`, formData, {
            withCredentials: true
        });
        console.log('created product data', data)
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product, reDirectUrl: "/productList" });

    } catch (error) {
        const message = error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
}

// Admin 계정으로 product List 뽑아옴
export const productList = (name: string, category: string, priceLessThan: number, sortBy: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`${API_BASE}/lolProduct/productList/${name}/${category}/${priceLessThan}/${sortBy}/AdminProductList`, {
            withCredentials: true
        })
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

// Admin 계정으로 product delete
export const deleteProduct = (product: ProductType) => async (dispatch: ThunkDispatch<any, any, any>, getState: () => any) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    // const { userStore: { userInfo } } = getState();
    try {
        await Axios.delete(`${API_BASE}/lolProduct/productDelete/${product._id}/AdminProductDelete`, {
            withCredentials: true,
            // data: { userInfo: userInfo }, // 이렇게 넣으면 서버에서 body로 받는다. Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
}

// Admin 계정으로 product update
export const updateProduct = (product: ProductType) => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    try {
        const { data } = await Axios.put(`${API_BASE}/lolProduct/productUpdate/${product._id}/AdminProductUpdate`, { product }, {
            withCredentials: true,
        });
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        dispatch({ type: PRODUCT_UPDATE_FAIL, payload: message });
    }
}