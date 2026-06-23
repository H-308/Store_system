import { useParams } from "react-router-dom"
import { useGetProductByIdQuery } from "./proApiSlice"
import { Button } from 'primereact/button';
import React, { useState, useEffect } from 'react';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import{useAddProductToBasketMutation}from "../basket/basketApiSlice"

const Product = () => {

    const { id } = useParams()

    const { isError, isSuccess, isLoading, error, data: product } = useGetProductByIdQuery(id)
    const[addProductToBasket]=useAddProductToBasketMutation()

    const handleAddToBasket=(id)=>{
        addProductToBasket(id)
        alert("The product add to basket succsesfuly!!")
    }

    if (isLoading)
        return <h1>loading</h1>
    return (

        <div>
            {isError && JSON.stringify(error)}
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4')}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1000/images/${product.image}.jpg`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" onClick={()=>handleAddToBasket(product._id)} className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product