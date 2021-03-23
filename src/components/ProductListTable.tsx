import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import Pagination, { UsePaginationProps } from '@material-ui/lab/Pagination';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { ProductType } from '../productTypes';
import { deleteProduct } from '../actions/productAction';
import { useDispatch } from 'react-redux';


export interface ProductListTableProps {
    products: ProductType[]
}

export const ProductListTable: React.FC<ProductListTableProps> = ({ products }) => {
    const history = useHistory();
    const dispatch = useDispatch();


    const deleteHandler = (product: ProductType) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteProduct(product));
            console.log("삭제한다.")
        }
    }
    const createHandler = () => {
        history.push('/Admin/productCreate');
    }
    console.log(`products: `, products)
    // pagination
    const [page, setPage] = useState<number>(1);
    const [pageData, setPageData] = useState<ProductType[]>([]);
    const dataLimit = 10;
    const indexOfLast = page * dataLimit;
    const indexOfFirst = indexOfLast - dataLimit;
    const handlePageChange: UsePaginationProps["onChange"] = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    }



    useEffect(() => {
        if (products) {
            setPageData(products.slice(indexOfFirst, indexOfLast));
        }
    }, [indexOfFirst, indexOfLast, products]);

    return (
        <div className="table_container">
            <div className="table_top">
                <div className="table_title">
                    <span>Prodcut List</span>
                </div>
                <div className="button_Container">
                    <Button className="createBtn" value="success" onClick={createHandler}>Create Product</Button>
                </div>
            </div>
            <table className="inner_table">
                <thead>
                    <tr>
                        <td>Num</td>
                        <td>Image</td>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>PRICE</td>
                        <td>CATEGORY</td>
                        <td>BRAND</td>
                        <td>ACTIONS</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        pageData.map((product) => (
                            <tr key={product._id}>
                                <td>{products.indexOf(product) + 1}</td>
                                <td>
                                    <img className="prodcut_img_admin" src={product.image} alt="product" />
                                </td>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <EditRoundedIcon className="actionBtn actionBtn_edit" onClick={() => history.push(`/product/${product._id}/edit`)} />
                                    <DeleteForeverRoundedIcon className="actionBtn actionBtn_delete" onClick={() => deleteHandler(product)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="pagination">
                <Pagination className="pagination" count={products && Math.ceil(products.length / dataLimit)} variant="outlined" shape="rounded" color="primary" onChange={handlePageChange} />
            </div>
        </div>

    )
}
