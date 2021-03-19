
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productList } from '../../actions/productAction';
import { AllProductList } from '../../components';
import { Loading } from '../../components/Loading';
import { initialAppStateType } from '../../store';

export const AdminProductListPage = () => {
    const dispatch = useDispatch();
    const { error, loading, products } = useSelector((state: initialAppStateType) => state.productListStore);
    const { successDelete } = useSelector((state: initialAppStateType) => state.productDeleteStore);

    useEffect(() => {
        dispatch(productList('all', 'all', 0, 'none'));
    }, [dispatch, successDelete])

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
