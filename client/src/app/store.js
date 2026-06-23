import {configureStore} from "@reduxjs/toolkit"
import apiSlice from "./apiSlice"
import authSlice from "../features/auth/authSlice"
import proSlice from "../features/product/proSlice"

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authSlice,
        pro:proSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store