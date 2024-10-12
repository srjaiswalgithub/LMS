import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";


const initialState = {
    isLoggedIn:localStorage.getItem('isLoggedIn')|| false,
    role:localStorage.getItem('role')|| "",
    data:(localStorage.getItem('data')!== "undefined"?JSON.parse(localStorage.getItem('data')):localStorage.getItem('data'))|| {},
}

// function to handle signup
export const createAccount = createAsyncThunk("user/register",async (data)=>{
    try{
        let res = axiosInstance.post("user/register", data);
        toast.promise(res,{
            loading:"Wait! Creating your account",
            success:"user successfully registered",
            // success:(data)=>{
            //     return data?.data?.message
            // },
            error:"Failed to create account!"
        })

        // getting response resolved here
        res = await res;
        return res.data;


    }
    catch(error){
        toast.error(error?.response?.data?.message);
        
    }
})

// function to handle login
export const login = createAsyncThunk("user/login",async (data)=>{
    try{
        let res = axiosInstance.post("user/login", data);
        toast.promise(res,{
            loading:"Wait! authentication is in process...",
            success:"you are successfully logged in",
            // success:(data)=>{
            //     return data?.data?.message
            // },
            error:"Failed to login!"
        })

        // getting response resolved here
        res = await res;
        
        return res.data;


    }
    catch(error){
        toast.error(error?.response?.data?.message);
        
    }
})

// function to handle logout
export const logout = createAsyncThunk("user/logout",async ()=>{
    try{
        let res = axiosInstance.post("user/logout");
        toast.promise(res,{
            loading:"loading...",
            success:"you logout successfully ",
            // success:(data)=>{
            //     return data?.data?.message
            // },
            error:"Failed to logout!"
        })

        // getting response resolved here
        res = await res;
        return res.data;


    }
    catch(error){
        toast.error(error?.response?.data?.message);
        
    }
})
// function to update user profile
export const updateProfile = createAsyncThunk("/update/profile", async (newUserData)=>{
            try{
                let res = axiosInstance.put(`user/update/${newUserData[0]}`,newUserData[1]);
                toast.promise(res,{
                    loading:"Updating...",
                    success:"profile updated successfully",
                    // success:(data)=>{
                    //     return data?.data?.message
                    // },
                    error:"Failed to update profile"
                })
                res = await res;
                return res.data;

            }
            catch(error){
                toast.error(error?.response?.data?.message);
            }
})


export const getUserData = createAsyncThunk("/user/details",async()=>{
    try{
        let res = await axiosInstance.get("/user/me");
        return res?.data;

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

// function to change user password
export const changePassword = createAsyncThunk(
    "/auth/changePassword",
    async (userPassword) => {
      try {
        let res = axiosInstance.post("/user/change-password", userPassword);
  
        await toast.promise(res, {
          loading: "Loading...",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to change password",
        });
  
        // getting response resolved here
        res = await res;
        return res.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
);

// function to handle forget password
export const forgetPassword = createAsyncThunk(
    "auth/forgetPassword",
    async (email) => {
      try {
        let res = axiosInstance.post("/user/reset", { email });
  
        await toast.promise(res, {
          loading: "Loading...",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to send verification email",
        });
  
        // getting response resolved here
        res = await res;
        return res.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
);

// function to reset the password
export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
    try {
      let res = axiosInstance.post(`/user/reset-password/${data.resetToken}`, {
        password: data.password,
      });
  
      toast.promise(res, {
        loading: "Resetting...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to reset password",
      });
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
});
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // // for user login
        .addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.data));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.data?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.data;
            state.role = action?.payload?.data?.role;
        })
        // // for logout 
        .addCase(logout.fulfilled,(state,action)=>{
            localStorage.clear();
            
            state.isLoggedIn = false;
            state.data = {};
            
        })
        // for update user details
        .addCase(getUserData.fulfilled,(state,action)=>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.userData));
            localStorage.setItem("isLoggedIn", true);
            
            state.isLoggedIn = true;
            state.data = action?.payload?.userData;
            state.role = action?.payload?.userData?.role;
        })
        // .addCase(updateProfile.fulfilled,(state,action)=>{
        //     localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        //     localStorage.setItem("isLoggedIn", true);
            
        //     state.isLoggedIn = true;
        //     state.data = action?.payload?.user;
        //     state.role = action?.payload?.user?.role;
        // })
    }
});

export default authSlice.reducer;