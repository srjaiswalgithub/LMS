import React, { useEffect } from "react";
import {  useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link , useNavigate} from "react-router-dom";

import Layout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { CancelSubscription,getPaymentRecord } from "../../Redux/Slices/PaymentSlice";

function Profile(){
    
    const userData = useSelector((state) => state?.auth?.data);
    let usr = useSelector((state) => state?.payment.subscription);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function cancelSubscription(){
        await dispatch(CancelSubscription());
        await dispatch(getUserData());
        
        
    }
    useEffect(()=>{
        dispatch(getUserData());
        
    },[])

    
    return (
        <Layout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-2 md:p-4 text-white w-fit shadow-[0_0_10px_black]">
                    <img
                        className="w-[8rem] md:w-40 m-auto rounded-full border border-black"
                        src={userData?.avatar?.secure_url}
                        alt="user profile image"
                    />

                    <h3 className="text-xl font-semibold text-center capitalize text-pink-500">
                        {userData.fullname}
                    </h3>

                    <div className="grid grid-cols-2 text-[.7rem] md:text-lg ">
                        <p>Email :</p>
                        <p className = "text-wrap">{userData?.email}</p>
                        <p>Role :</p>
                        <p>{userData?.role }</p>
                        {(userData?.role === "USER") && (
                            <>
                                <p>Subscription :</p>
                                <p>
                                {userData?.subscription === "active"
                                    ? "Active"
                                    : "Inactive"}
                                </p>
                            </>)
                        }       
                    </div>

                    {/* button to change the password */}
                    <div className="flex items-center justify-between gap-2">
                        <Link
                        to={
                            userData?.email === "test@gmail.com"
                            ? "/denied"
                            : "/changepassword"
                        }
                        className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-1 md:py-2 font-semibold cursor-pointer text-center"
                        >
                        <button>Change Password</button>
                        </Link>

                        <Link
                        to={
                            userData?.email === "test@gmail.com"
                            ? "/denied"
                            : "/user/editprofile"
                        }
                        className=" w-1/2 border border-yellow-600 hover:border-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-1 md:py-2 font-semibold cursor-pointer text-center"
                        >
                        <button>Edit Profile</button>
                        </Link>
                    </div>

                    {(userData?.subscription === "active") || (userData?.role === "ADMIN") ?(
                        <button
                        
                        className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
                        // onClick={()=>navigate("/payment/cancel-subscription")}
                        onClick = {cancelSubscription}
                        >
                        Cancel Subscription
                        </button>
                    ):(
                        <button
                        
                        className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
                        onClick={()=>navigate("/payment/subscribe")}
                        >
                        Buy Subscription
                        </button>
                    )}
                </div>
            </div>

        </Layout>
    )
}
export default Profile;