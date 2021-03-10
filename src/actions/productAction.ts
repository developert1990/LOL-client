import { API_BASE } from './../config/index';
import Axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS } from '../constants/productConstants';

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