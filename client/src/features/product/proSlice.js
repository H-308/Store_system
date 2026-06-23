import {createSlice} from "@reduxjs/toolkit"

const initProState={
    productArr:  localStorage.getItem("product")||[]
}

const proSlice = createSlice({
    name: "pro",
    initialState: initProState,
    reducers: {
        putProducts : (state,action)=>{
            localStorage.setItem("product",action.payload)
            state.ProductsArr= action.payload
        }
    }

})

export const {putProducts} = proSlice.actions
export default proSlice.reducer