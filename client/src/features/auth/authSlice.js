import { createSlice } from "@reduxjs/toolkit"

const initAuthState = {
    token: localStorage.getItem("token") || "",
    isUserloggedIn: localStorage.getItem("item") ? true : false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initAuthState,
    reducers: {
        setToken: (state, action)=>{
            state.token = action.payload.accessToken
            state.isUserloggedIn = true
            localStorage.setItem("token", state.token)
        }, 
        clearToken : (state)=>{
            state.token = ""
            state.isUserloggedIn = false
            localStorage.removeItem("token")
        }
        
    }
})

export const {setToken, clearToken} = authSlice.actions
export default authSlice.reducer