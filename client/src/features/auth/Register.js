import { useEffect, useState } from "react"
import { useRegisterMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom"
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";
import { InputMask } from "primereact/inputmask";

const Register = () => {
    const nevigate = useNavigate()

    const [register, { isError, isSuccess, isLoading, error }] = useRegisterMutation()

    const [userData, setUserData] = useState(
        { fullName: "", userName: "", email: "", phone: "", password: "" })


    useEffect(() => {
        if (isSuccess)
            nevigate("/users/login")
    }, [isSuccess])

    const handleChanges = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register(userData)
    }

    if (isLoading)
        return <h1>loading</h1>
    return (
        <div >
            <h1>Register</h1>
            {isError && JSON.stringify(error.data)}

            <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>
                <div className="card flex justify-content-center" style={{ width: "400" }}>
                    <FloatLabel >
                        <InputText id="fullname" name="fullName" onChange={(e) => handleChanges(e)} />
                        <label htmlFor="fullname">שם מלא</label>
                    </FloatLabel>
                </div>
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

                <div className="flex-auto">
                    <InputMask id="phone" mask="(999) 999-9999" placeholder="(999) 999-9999" name="phone" onChange={(e) => handleChanges(e)} ></InputMask>
                </div>



                <div className="flex-auto" >
                    <FloatLabel >
                        <InputText id="email" keyfilter="email" className="w-full" name="email" type="email" onChange={(e) => handleChanges(e)} placeholder="mail@gmail.com" />
                        <label htmlFor="email">אימייל</label>
                    </FloatLabel>
                </div>

                <div className="card flex flex-wrap justify-content-center gap-3">
                    <Button type="submit" label="הירשם" icon="pi pi-check" />
                </div>

            </form>
        </div>
    )
}

export default Register