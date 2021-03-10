import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router';

export const AdminProductListPage = () => {
    const history = useHistory();

    const createHandler = () => {
        history.push('/Admin/productCreate');
    }

    return (
        <div>
            어드민 프로덕트 리스트 페이지
            <Button className="createBtn" value="success" onClick={createHandler}>Create Product</Button>
        </div>
    )
}
