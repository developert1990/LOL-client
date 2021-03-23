
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { initialAppStateType } from '../store';

import Pagination, { UsePaginationProps } from '@material-ui/lab/Pagination';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { userType } from '../reducers/userReducer';
import { userDelete, userList } from '../actions/userAction';
import { USER_DETAILS_RESET, USER_DELETE_RESET } from '../constants/userConstants';
import { MessageBox } from './MessageBox';

export const UserListTable = () => {
    const { users } = useSelector((state: initialAppStateType) => state.userListStore);
    console.log(`users: `, users)
    const userDeleteStore = useSelector((state: initialAppStateType) => state.userDeleteStore);
    const { error: errorDelete, loading: loadingDelete, success: successDelete } = userDeleteStore;
    const dispatch = useDispatch();

    const history = useHistory();

    const deleteUserHandler = (userId: string) => {
        if (window.confirm('Are you sure?')) {
            dispatch(userDelete(userId));
        }
    }



    // pagination
    const [page, setPage] = useState<number>(1);
    const [pageData, setPageData] = useState<userType[]>([]);
    const dataLimit = 10;
    const indexOfLast = page * dataLimit;
    const indexOfFirst = indexOfLast - dataLimit;
    const handlePageChange: UsePaginationProps["onChange"] = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    }


    useEffect(() => {
        if (users) {
            setPageData(users.slice(indexOfFirst, indexOfLast));
        }
    }, [indexOfFirst, indexOfLast, users]);

    useEffect(() => {
        console.log("리스트 뽑을라고 유즈이펙트 들어옴")

        setTimeout(() => {
            if (successDelete) {
                dispatch(userList());
                dispatch({ type: USER_DETAILS_RESET });
            }
            dispatch({ type: USER_DELETE_RESET });
        }, 1500)
        return () => {
            clearTimeout();
        }
    }, [dispatch, successDelete])

    return (
        <div className="table_container">
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {console.log(`successDelete: `, successDelete)}
            {successDelete && <MessageBox variant="success">User Deleted Successfully</MessageBox>}
            <div className="table_top">
                <div className="table_title">
                    <span>User List</span>
                </div>
            </div>
            <table className="inner_table">
                <thead>
                    <tr>
                        <th>Num</th>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>IS ADMIN</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pageData.map((user) => (
                            <tr key={user._id}>
                                <td>{users.indexOf(user) + 1}</td>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                <td>
                                    <EditRoundedIcon className="actionBtn actionBtn_edit" onClick={() => history.push(`/user/${user._id}/edit`)} />
                                    <DeleteForeverRoundedIcon className="actionBtn actionBtn_delete" onClick={() => deleteUserHandler(user._id)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="pagination">
                <Pagination className="pagination" count={users && Math.ceil(users.length / dataLimit)} variant="outlined" shape="rounded" color="primary" onChange={handlePageChange} />
            </div>
        </div>
    )
}
