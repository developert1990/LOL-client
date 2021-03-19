import React from 'react'
import { useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { UserListTable } from './UserListTable'


export const AllUserList = () => {
    const { error } = useSelector((state: initialAppStateType) => state.userListStore);

    return (
        <div>
            {
                error !== "" ? error : (
                    <div className="adminTable_Page">
                        <UserListTable />
                    </div>
                )
            }

        </div>
    )
}
