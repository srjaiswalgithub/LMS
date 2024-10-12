import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";


function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    // for user input
  const [loginData, setLoginData] = useState({
    
    email: "",
    password: "",
    
  });

  // function to set the signup data
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
    

     // function to create account
    const onLogin = async (event)=>{
        event.preventDefault();
        if( !loginData.email || !loginData.password ){
            toast.error("Please fill all the fields")
            
            
            return;
        }
        
       

        
        

            // calling create account action
            const res =  await dispatch(login(loginData));
            // redirect to login page if true
            if(res?.payload?.success){
                navigate("/");
            }

            // clearing the signup inputs
            setLoginData({
               
                email: "",
                password: "",
                
            });

            


    };
    return(
        <Layout>
            <div className = "flex justify-center items-center h-[90vh] w-full">

                <form  onSubmit = {onLogin} className = "flex flex-col justify-center items-center  w-[70%] gap-3 md:w-96 p-4 rounded-lg text-white shadow-[0_0_10px_black]" noValidate>
                    <h1 className = "text-center text-xl md:text-2xl font-bold">Login Page</h1>
                  
                    
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="email">Email </label>
                        
                        <input noValidate required type="email" name = "email" id = "email" placeholder="Enter your email" className="bg-transparent px-2 py-1 border" value={loginData.email} onChange={handleUserInput}/>
                        
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="password">Password </label>
                        
                        <input noValidate required type="password" name = "password" id = "password" placeholder="Enter your password" className="bg-transparent px-2 py-1 border" value={loginData.password} onChange={handleUserInput}/>
                    </div>
                    <button className="w-[70%] bg-yellow-600 mt-2 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-1 font-semibold text-lg cursor-pointer" type="submit">Login</button>
                    <Link to={"/forgetpassword"}>
                        <p className="text-center link text-accent cursor-pointer">
                        Forget Password
                        </p>
                    </Link>
                    <p className="text-center">Do not have an account? <Link to = {"/signup"}className = "text-accent link cursor-pointer">signUp
                    </Link></p>
                </form>

            </div>
        </Layout>
    )
}
export default Login;