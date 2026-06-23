import { Outlet } from "react-router-dom"
import  Navigetion from "./Nav"

const Layout =()=>{
    return(
        <div>
            <Navigetion/>
            <Outlet/>
        </div>
    )
}
export default Layout