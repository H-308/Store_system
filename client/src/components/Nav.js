import { Link, NavLink, useNavigate } from "react-router-dom"
import useAuth from "../features/auth/useAuth"
import React from 'react';
import { Button } from 'primereact/button';
import { useDispatch } from "react-redux";
import { clearToken } from "../features/auth/authSlice"
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
const Navigetion = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = () => {
        dispatch(clearToken())
        navigate("./")
    }
    const { isUserloggedIn, _id, role, userName,fullName} = useAuth()

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: "/"

        },
        {
            label: 'Register',
            icon: 'pi pi-user-plus',
            url: "/users/register"
        },
        {
            label: 'Login',
            icon: 'pi pi-sign-in',
            url: "/users/login"
        },
        (isUserloggedIn && {
            label: 'Products',
            icon: 'pi pi-list',
            url: "/products"
        }),
        (role == "Admin" && {
            label: 'NewProduct',
            icon: 'pi pi-file-plus',
            url:"/products/newProduct"
        }),
        (isUserloggedIn &&{
            label: 'Basket',
            icon: 'pi pi-shopping-cart',
            url:"/basket"
        })
    ];

    const start = <img alt="logo" src="http://localhost:1000/images/logo.jpg" height="40" className="mr-2"></img>;
    const end = (

        <div className="flex align-items-center gap-2">
            {isUserloggedIn && <Button onClick={() => handleClick()} icon="pi pi-sign-out" label="LogOut" rounded aria-label="Filter" />}
            {isUserloggedIn && <Avatar image="http://localhost:1000/images/logo.jpg" shape="circle" />}
            {isUserloggedIn && <span className="font-bold text-bluegray-50">{fullName}</span>}
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    )

}

export default Navigetion