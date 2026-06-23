import apiSlice from "../../app/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (registerUser) => ({
                url: "/users/register",
                method: "POST",
                body: registerUser
            })
        }),
        login: build.mutation({
            query: (loginUser) => ({
                url: "/users/login",
                method: "POST",
                body: loginUser
            })
        })

    })
})

export const {useRegisterMutation, useLoginMutation} =authApiSlice