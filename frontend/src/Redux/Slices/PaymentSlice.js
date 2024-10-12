import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";
const initialState = {
    subscription:"inactive",
    allRegisteredUsers:0,
    subscribedUsersCount:0
}

export const subscribe = createAsyncThunk("/payment/subscribe",async()=>{
    try{
        let res = axiosInstance.get("payments/subscribe");
        toast.promise(res,{
            loading:"loading...",
            success:"you are successfully subscribed!",
            // success:(data)=>{
            //     return data?.data?.message
            // },
            error:"Failed to buy subscription!"
        })

        res = await res;
        return res?.data;
        

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
//cancel subscription
export const CancelSubscription = createAsyncThunk("/payment/cancelSubscription",async()=>{
    try{
        let res = axiosInstance.get("payments/unsubscribe");
        toast.promise(res,{
            loading:"loading...",
            success:"subscription got cancellled!",
            // success:(data)=>{
            //     return data?.data?.message
            // },
            error:"Failed to cancel subscription!"
        })

        res = await res;
        return res?.data;
        

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
});

// function to get all the payment record
export const getPaymentRecord = createAsyncThunk("paymentrecord", async () => {
    try {
      const res = axiosInstance.get("payments/");
      toast.promise(res, {
        loading: "Getting the payments record...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to get payment records",
      });
  
      const response = await res;
      
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

const paymentSlice = createSlice({
    name:'payment',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // // for user login
        .addCase(subscribe.fulfilled,(state,action)=>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            
            
            
            state.subscription = action?.payload?.user?.subscription;
        })
        .addCase(CancelSubscription.fulfilled,(state,action)=>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            
            
            
            state.subscription = action?.payload?.user?.subscription;
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            
            
            
            
            state.allRegisteredUsers = action?.payload?.allRegisteredUsers;
            state.subscribedUsersCount = action?.payload?.subscribedUsersCount;
        })
        
        
    }
});

export default paymentSlice.reducer;