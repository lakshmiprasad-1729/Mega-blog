import { useDispatch } from "react-redux"
import authservice from "../../appwrite/auth"
import { logout } from "../../store/authSlice";

export default function Logoutbth() {
    const dispatch = useDispatch();
    const logoutHandler=()=>{
     authservice.logout().then(()=>{
         dispatch(logout());
     })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'    
    onClick={logoutHandler}
    >
     logout
    </button>
  )
}
