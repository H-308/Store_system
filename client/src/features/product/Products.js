import { useGetAllProductsQuery, useDeleteProductMutation } from "./proApiSlice"
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import{useAddProductToBasketMutation}from "../basket/basketApiSlice"
import { useDispatch } from "react-redux";
import{putProducts}from "./proSlice"

const Products = () => {
    const {role}= useAuth()
    const nevigate = useNavigate()
    const { isError, isSuccess, isLoading, error, data: products } = useGetAllProductsQuery();
    const [deleteProduct] = useDeleteProductMutation()
    const[addProductToBasket]=useAddProductToBasketMutation()

    const handleDelete = (id) => {
        deleteProduct(id)
    }

    const handleUpdate = (id) => { 
        nevigate(`/products/update/${id}`)
    }

    const handleAddToBasket=(id)=>{
        addProductToBasket(id)
        alert("The product add to basket succsesfuly!!")
    }


    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');

    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ]

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const header = () => {
        return <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="w-full sm:w-14rem" />;
    };

    const itemTemplate = (product, index) => {
        return (
            <div className="col-12">
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1000/images/${product.image}.jpg`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <Link to={`./${product._id}`} style={{ textDecoration: "none" }}>
                                <div className="text-2xl font-bold text-900">{product.name}</div>
                            </Link >
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" onClick={()=>handleAddToBasket(product._id)} className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                           {role=="Admin"&& <Button label="Delete" icon="pi pi-trash" onClick={() => handleDelete(product._id)} />}
                           {role=="Admin"&& <Button label="עדכון" onClick={() => handleUpdate(product._id)} />}
                        </div>
                    </div>
                </div>
            </div >
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };
    if (isLoading)
        return <h1>loading</h1>

    return (
        <div className="card">
            {isError && JSON.stringify(error)}
            <DataView value={products} listTemplate={listTemplate} header={header()} sortField={sortField} sortOrder={sortOrder} />
        </div>
    )

}

export default Products