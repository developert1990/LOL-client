import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userList } from '../../actions/userAction';
import { AllUserList } from '../../components';
import { Loading } from '../../components/Loading';
import { initialAppStateType } from '../../store';

export const AdminUserListPage = () => {
    const { loading } = useSelector((state: initialAppStateType) => state.userListStore);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userList());
    }, [dispatch])

    return (
        <div>
            {
                loading ? <Loading /> : (
                    <AllUserList />
                )
            }

        </div>
    )
}
