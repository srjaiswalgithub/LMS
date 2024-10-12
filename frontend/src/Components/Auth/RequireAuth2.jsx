import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import AdminCannotAccess from "../../Pages/AdminCannotAccess";
import AlreadySubscribed from "../../Pages/AlreadySubscribed";

const RequireAuth2 = () => {
    const { isLoggedIn, role } = useSelector((state) => state.auth);
    const { subscription} = useSelector((state) => state?.auth?.data);
  
    if(!isLoggedIn)return <Navigate to={"/login"}  />;
    else if(role === "ADMIN")return <AdminCannotAccess/>
    else if(subscription === "active")return <AlreadySubscribed/>
    else return <Outlet />
}; 
  
export default RequireAuth2;