import { useEffect, useState } from "react"
import { useLoginMutation } from "./authApiSlice"
import { setToken } from "./authSlice"
import { useDispatch } from "react-redux"
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";
import { useNavigate } from "react-router-dom"


const Login = () => {
    const nevigate = useNavigate()

    const dispatch = useDispatch()
    const [login, { isError, isSuccess, isLoading, error, data }] = useLoginMutation()

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            nevigate("/products")
            alert("Success")
        }
    }, [isSuccess])

    const [userData, setUserData] = useState({ userName: "", password: "" })

    const handleChanges = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(userData)
    }



    if (isLoading)
        return <h1>loading</h1>
    return (
        <div >
            <h1>Login</h1>
            {isError && JSON.stringify(error.data)}
            <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>

                <div className="card flex justify-content-center" >

                    <FloatLabel >
                        <InputText id="username" name="userName" onChange={(e) => handleChanges(e)} />
                        <label htmlFor="username">שם משתמש</label>
                    </FloatLabel>
                </div>
                <div className="card flex justify-content-center" >
                    <FloatLabel >
                        <Password id="password" name="password" type="password" onChange={(e) => handleChanges(e)} toggleMask />
                        <label htmlFor="password">סיסמא</label>
                    </FloatLabel>
                </div>
                <div className="card flex flex-wrap justify-content-center gap-3">
                    <Button type="submit" label="התחבר" icon="pi pi-check" />
                </div>

            </form>
        </div>
    )
}

export default Login