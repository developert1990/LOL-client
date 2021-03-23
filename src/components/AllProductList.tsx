
import React from 'react';
import { ProductType } from '../productTypes';
import { ProductListTable } from './ProductListTable';

export interface AllProductListProps {
    error: string;
    products: ProductType[];
}
export const AllProductList: React.FC<AllProductListProps> = ({ error, products }) => {

    return (
        <div>
            {
                error !== "" ? error : (
                    <div className="adminTable_Page">

                        <ProductListTable products={products} />
                    </div>
                )
            }
        </div>
    )
}
