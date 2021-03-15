import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { productList } from '../../actions/productAction';
import { AllProductList } from '../../components';
import { Loading } from '../../components/Loading';
import { initialAppStateType } from '../../store';

export const AdminProductListPage = () => {
    const dispatch = useDispatch();
    const { error, loading, products } = useSelector((state: initialAppStateType) => state.productListStore);


    useEffect(() => {
        dispatch(productList('all', 'all', 0, 'none'));
    }, [dispatch])

    return (
        <div>
            {
                loading ? <Loading /> : (
                    <AllProductList error={error} products={products} />
                )
            }

        </div>
    )
}
