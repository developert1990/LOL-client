import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { API_BASE } from '../config';
import { CHECK_ISADMIN_FAIL, CHECK_ISADMIN_REQUEST, CHECK_ISADMIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_RESET, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from '../constants/userConstants';
import { cartItemType } from '../reducers/cartReducer';
import { userType } from '../reducers/userReducer';




export const signin = (email: string, password: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    // console.log('API_BASE는==>>  ', `${API_BASE}/lolUser/signin`);
    // console.log('process.env.NODE_ENV는? ==>> ', process.env.NODE_ENV)
    try {
        const { data } = await axios.post(`${API_BASE}/lolUser/signin`, { email, password }, {
            // 이부분에서 서버측과 클라이언트 측의 도메인주소가 다를 경우에 jwt token을 res.cooke로 해도 저장이 되지 않는다. 이를 해결하기 위해선 아래처럼 withCredentials: true 를 해줘야한다.
            // 그 다음 서버 측에서 cors 에 옵션을 줘서 credential 을 true로( Access-Control-Allow-Origin을 true로) origin을 true로 줘서 프론트 도메인 주소가 자동으로 Access-Control-Allow-Origin에 들어가게 해야한다.
            // 참고 (https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275)
            withCredentials: true
        });
        console.log('data:', data)
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('cartItems', JSON.stringify(data.cart));

        // 이부분은 유저가 로그인 하자마자 카트에 유저가 add 했던 cart목록을 넣는다.
        const typedUserInfo: userType = data;
        if (typedUserInfo) {
            const cartListInUserInfo = typedUserInfo.cart
            const typedItems: cartItemType[] = cartListInUserInfo;
            if (typedItems) {
                // typedItems.map((item) => dispatch(addToCart(item.product, item.qty)))
            }
        }
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}


export const signout = () => async (dispatch: ThunkDispatch<any, any, any>) => {
    const cartFromLocalStorage = localStorage.getItem('cartItems');
    const cartItem = JSON.parse((cartFromLocalStorage as string))
    await axios.put(`${API_BASE}/lolUser/signout`, cartItem, {
        withCredentials: true
    })
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ type: USER_SIGNOUT });
    dispatch({ type: USER_REGISTER_RESET });
    // dispatch({ type: CART_EMPTY })
};


export const register = (name: string, email: string, password: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post(`${API_BASE}/lolUser/register`, { name, email, password }, {
            withCredentials: true
        }); // {name, email, password} 이부분은 fetch에서 body를 주는 부분이다.
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('cartItems', JSON.stringify(data.cart));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}


// 로그인한 유저가 admin 계정인지 확인하는 API
export const checkIsAdmin = () => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: CHECK_ISADMIN_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE}/lolUser/checkAdmin/`, {
            withCredentials: true
        });
        dispatch({ type: CHECK_ISADMIN_SUCCESS, payload: data.isAdmin })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: CHECK_ISADMIN_FAIL, payload: message });
    }
}








export const refresh = () => async (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    // console.log('API_BASE는==>>  ', `${API_BASE}/lolUser/signin`);
    // console.log('process.env.NODE_ENV는? ==>> ', process.env.NODE_ENV)
    try {
        const { data } = await axios.get(`${API_BASE}/lolUser/refreshSession`, {
            withCredentials: true,
        });
        console.log('data:', data)
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })

        // 이부분은 유저가 로그인 하자마자 카트에 유저가 add 했던 cart목록을 넣는다.
        const typedUserInfo: userType = data;
        if (typedUserInfo) {
            const cartListInUserInfo = typedUserInfo.cart
            const typedItems: cartItemType[] = cartListInUserInfo;
            if (typedItems) {
                // typedItems.map((item) => dispatch(addToCart(item.product, item.qty)))
            }
        }
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
        dispatch(signout());
    }
}