import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// import AdminCannotAccess from "../../Pages/AdminCannotAccess";
// import AlreadySubscribed from "../../Pages/AlreadySubscribed";
import Denied from "../../Pages/Denied";

const RequireAuth3 = () => {
    const { isLoggedIn, role } = useSelector((state) => state.auth);
    const { subscription} = useSelector((state) => state?.auth?.data);
  
    if(!isLoggedIn)return <Navigate to={"/login"}  />;
    else if(role === "ADMIN")return <Outlet/>
    else if(subscription === "active")return <Outlet/>
    else return <Denied />
}; 
  
export default RequireAuth3;