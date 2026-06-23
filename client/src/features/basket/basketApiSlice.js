import apiSlice from "../../app/apiSlice";

const basketApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addProductToBasket:build.mutation({
            query:(productId)=>({
            url:`/basket/${productId}`,
            method:"POST",
            }),
            invalidatesTags:["baskets"]
        }),
        getBasket: build.query({
            query:()=>({
                url:"/basket",
                method:"GET"
            }),
            providesTags:["baskets"]
        }),
        deleteProductFromBasket:build.mutation({
            query:(productId)=>({
                url:`/basket/${productId}`,
                method:"DELETE"
            }),
            invalidatesTags:["baskets"]
        }),
        changesQuantity: build.mutation({
            query:(product)=>({
                url:'/basket/',
                method:'POST',
                body: product

            }),
            invalidatesTags:["baskets"]

        })
    })
    
})
export const{useAddProductToBasketMutation,useGetBasketQuery,useDeleteProductFromBasketMutation,useChangesQuantityMutation}=basketApiSlice