import apiSlice from "../../app/apiSlice";

const proApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => ({
                url: 'products'
            }),
            providesTags:["products"]
        }),
        getProductById: build.query({
            query: (id) => ({
                url: `products/${id}`,
                method: "GET",
            }),
            providesTags:["products"]
        }),
        createProduct: build.mutation({
            query: (newProduct) => ({
                url: "products",
                method: "POST",
                body: newProduct
            }),
            invalidatesTags:["products"]
        }),
        updateProduct: build.mutation({
            query: (updateProduct) => ({
                url: `products/update/${updateProduct.id}`,
                method: "PUT",
                body: updateProduct 
            }),
            invalidatesTags:["products"]
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products"]
        })
    })
})

export const { useGetAllProductsQuery, useGetProductByIdQuery, useCreateProductMutation,
    useUpdateProductMutation, useDeleteProductMutation
} = proApiSlice