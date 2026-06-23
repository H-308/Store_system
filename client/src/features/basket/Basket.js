import React, { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
import { useGetBasketQuery, useDeleteProductFromBasketMutation,useChangesQuantityMutation } from "./basketApiSlice"
import { Button } from 'primereact/button';

const Basket = () => {
    
    const { isError, isSuccess, isLoading, error, data } = useGetBasketQuery()
    const [deleteProductFromBasket] = useDeleteProductFromBasketMutation()
    const [changesQuantity]=useChangesQuantityMutation()

    const handleChange=(pro)=>{
        console.log("hjh");
        changesQuantity(pro)
    }
    const handleDelete = (id) => {
        deleteProductFromBasket(id)
    }


    const itemTemplate = (item) => {
       // console.log(item);

        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`http://localhost:1000/images/${item.productId.image}.jpg`} alt={item.productId.name} />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.productId.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.quantity}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${item.productId.price}</span>
                <Button label="Delete" icon="pi pi-trash" onClick={() => handleDelete(item._id)} />
                <Button  label="+" onClick={() => handleChange({num:1, proId: item.productId})} />
                <Button  label="-" onClick={() => handleChange({num:-1, proId: item.productId})} />
            </div>
        );
    };
    if (isLoading)
        return <h1>loading</h1>
    return (

        <div className="card xl:flex xl:justify-content-center">
            <OrderList dataKey="id" value={data.productsList} itemTemplate={itemTemplate} header="Products" filter filterBy="name"></OrderList>
        </div>
    )
}
export default Basket