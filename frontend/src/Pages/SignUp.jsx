import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";


function SignUp(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage,setPreviewImage] = useState("");

    // for user input
  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: "",
  });

  // function to set the signup data
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };
    // function to handle the image upload
    const getImage = (event)=>{
        event.preventDefault();
        const uploadedImage = event.target.files[0];
        if(uploadedImage){
            setSignupData({
                ...signupData,
                avatar: uploadedImage,
            });
            const filereader = new FileReader();
            filereader.readAsDataURL(uploadedImage);
            
            filereader.addEventListener("load",function (){
                setPreviewImage(this.result);
                
            })
        }
    };

     // function to create account
    const createNewAccount = async (event)=>{
        event.preventDefault();
        if(!signupData.fullname || !signupData.email || !signupData.password || !signupData.avatar){
            toast.error("Please fill all the fields")
           
            return;
        }
        
        // checking the name field length
        if(signupData.fullname.length<5){
            toast.error("Name should be atleast of 5 characters");
            return;
        }

        // email validation using regex
        if(!signupData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            toast.error("Invalid email id");
            return;
        }
        // password validation using regex
        if(!signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)){
            toast.error("Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol");
            return;
        }
        // creating the form data from the existing data
        const formData = new FormData();
        formData.append("fullname",signupData.fullName);
        formData.append("email",signupData.email);
        formData.append("password",signupData.password);
        formData.append("avatar",signupData.avatar);

            // calling create account action
            const res =  await dispatch(createAccount(formData));
            // redirect to login page if true
            if(res?.payload?.success){
                navigate("/login");
            }

            // clearing the signup inputs
            setSignupData({
                fullname: "",
                email: "",
                password: "",
                avatar: "",
            });

            setPreviewImage("");


    };
    return(
        <Layout>
            <div className = "flex justify-center items-center  h-[90vh] w-full  ">

                <form  onSubmit = {createNewAccount} className = "flex flex-col justify-center items-center  gap-2 md:gap-3 w-[80%] md:w-80 p-2 md:p-2 rounded-lg text-white shadow-[0_0_10px_black] lg:my-20 " noValidate>
                    <h1 className = "text-center text-xl md:text-2xl font-bold">Registration Page</h1>
                    <label htmlFor="image_uploads" >
                        {previewImage?(<img className=" w-20 h-20 md:w-24 md:h-24 rounded-full m-auto" src={previewImage}  alt="preview image"/>): <BsPersonCircle className="w-20 h-20 md:w-24 md:h-24 rounded-full m-auto"/>}
                        
                    </label>
                    <input  onChange = {getImage} type="file" name = "image_uploads" id = "image_uploads" className = "hidden" accept=".jpg, .jpeg, .png"/>
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="fullname">Name </label>
                        
                        <input noValidate required name="fullname" id="fullname" placeholder="Enter your name" className="bg-transparent px-2 py-1 border" value={signupData.fullname} onChange={handleUserInput}/>
              
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="email">Email </label>
                        
                        <input noValidate required type="email" name = "email" id = "email" placeholder="Enter your email" className="bg-transparent px-2 py-1 border" value={signupData.email} onChange={handleUserInput}/>
                        
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="password">Password </label>
                        
                        <input noValidate required type="password" name = "password" id = "password" placeholder="Enter your password" className="bg-transparent px-2 py-1 border" value={signupData.password} onChange={handleUserInput}/>
                    </div>
                    <button className="w-[60%] bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-1 font-semibold text-md md:text-lg cursor-pointer" type="submit">Create Account</button>
                    <p className="text-center">Already have an account? <Link to = {"/login"}className = "text-accent link cursor-pointer">login
                    </Link></p>
                </form>

            </div>
        </Layout>
    )
}
export default SignUp;