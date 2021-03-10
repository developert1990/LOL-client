import React, { ComponentType, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { checkIsAdmin } from '../actions/userAction';
import { initialAppStateType } from '../store';

interface adminRoutePropsType extends RouteProps {
    component: ComponentType<any>
}

export const AdminRoute: React.FC<adminRoutePropsType> = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();

    const { error, isAdmin, loading } = useSelector((state: initialAppStateType) => state.checkAdminStore);
    const { userInfo } = useSelector((state: initialAppStateType) => state.userStore);

    useEffect(() => {
        if (userInfo) {
            dispatch(checkIsAdmin());
        }
    }, [dispatch, userInfo]);

    return (
        <Route
            {...rest}
            render={(props) => isAdmin ? (
                <Component {...props}></Component>
            ) : (
                <Redirect to="/signin" />
            )}
        >
        </Route>
    )
}
