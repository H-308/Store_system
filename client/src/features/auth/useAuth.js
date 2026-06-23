import { useSelector } from "react-redux"
import {jwtDecode} from "jwt-decode"
const useAuth=()=>{

    const token= useSelector((state)=>state.auth.token)
    if(token)
        {
            const obj = jwtDecode(token)
            const{_id,role,userName,fullName,icon}=obj
            return {isUserloggedIn: true,_id,role,userName,fullName}
        }
    else return {isUserloggedIn: false,_id:"",role:"",userName:"",fullName:""}    
}
export default useAuth