import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch,useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import {logout} from "../Redux/Slices/AuthSlice";




function Layout({children}){


    const dispatch = useDispatch();
    const navigate = useNavigate();


    // for checking user logged in or not
    const isLoggedIn = useSelector((state)=>state?.auth?.isLoggedIn);
    // for dispaying the options, according to user role
    const role = useSelector((state)=>state?.auth?.role);
    
    // function for changing the drawer width on menu button click
    function changewidth(){
       
        
        
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "auto";

    };
     // function to hide the drawer on close button click
    function hideDrawer(){
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        // collapsing the drawer-side width to zero
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 0;
    };
    // function to handle logout
    const handleLogout = async (event)=>{
        event.preventDefault();
        // calling logout action
        const res = await dispatch(logout());
        // redirect to home page if true
        if(res?.payload?.success){
            navigate("/");
        }

    }
    return (
        <>
            <div className = "w-[100%] ">   
                {/* adding the daisy ui drawer */}
                <div className = "drawer absolute  z-50 left-0 w-fit ">
                    <input id = "my-drawer" className = "drawer-toggle  " type = "checkbox"/>
                    <div className = "drawer-content ">
                        <label htmlFor="my-drawer" className="cursor-pointer relative">
                            <FiMenu
                            onClick = {changewidth}
                            size={32}
                            className="font-bold text-white m-2 md:m-4 "
                            />

                        </label>
                    </div>
                    <div className = "drawer-side w-0 ">
                        <label htmlFor="my-drawer" className="drawer-overlay "></label>
                        <ul className = "text-yellow-200 menu p-2 md:p-4 w-fit sm:w-80 bg-base-400 text-base-content relative">
                            {/* close button for drawer */}
                            <li className = "w-fit absolute z-50 right-2 ">
                                <button onClick = {hideDrawer}>
                                <AiFillCloseCircle size={24} />

                                </button>

                            </li>

                            <li>

                            </li>

                            <li>
                                <Link to = {"/"} className = "">Home</Link>
                            </li>
                            {/* displaying dashboard, if user is logged in */}
                            {isLoggedIn && role ==="ADMIN" && (
                                <li>
                                    <Link to = {"/admin/dashboard"}>Admin Dashboard</Link>
                                </li>

                            )}

                            {/* displaying dashboard, if user is logged in */}
                            {isLoggedIn && role ==="ADMIN" && (
                                <li>
                                    <Link to = {"/course/create"}>Create Course</Link>
                                </li>

                            )}

                            <li>
                                <Link to={"/courses"}>All Courses</Link>
                            </li>

                            <li>
                                <Link to={"/contact"}>Contact Us</Link>
                            </li>

                            <li>
                                <Link to={"/about"}>About Us</Link>
                            </li>

                            {/* creating the bottom part of drawer */}
                            {/* if user is not logged in */}
                            {
                                !isLoggedIn && (
                                    <li>
                                        <div className = "w-full flex flex-col  md:flex-row items-center justify-center">
                                            <button className = "bg-pink-600 px-4 py-1 rounded-md w-full font-semibold ">
                                                <Link to = {"/login"}>Login</Link>
                                            </button>
                                            <button className = "bg-orange-600 px-4 py-1 rounded-md w-full font-semibold ">
                                                <Link to = {"/signup"}>Signup</Link>
                                            </button>
                                        </div>
                                    </li>
                                )
                            }
                            
                            {
                                isLoggedIn && (
                                    <li>
                                        <div className = "w-full flex flex-col   md:flex-row items-center justify-center">
                                            <button className = "bg-pink-600 px-4 py-1 rounded-md w-full font-semibold ">
                                                <Link to = {"/user/profile"}>Profile</Link>
                                            </button>
                                            <button className = "bg-orange-600 px-4 py-1 rounded-md w-full font-semibold ">
                                                <Link onClick={handleLogout}>Logout</Link>
                                            </button>
                                        </div>
                                    </li>
                                )
                            }

                        </ul>


                    


                    </div>

                </div>
                {children}
                {/* adding the footer */}
                <Footer/>
            </div>
        </>
        
    )
};
export default Layout;