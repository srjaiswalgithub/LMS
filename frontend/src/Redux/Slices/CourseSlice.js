import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";


const initialState = {
    coursesData : []
}

export const getAllCourses = createAsyncThunk("/get/courses",async ()=>{
    try{
        let res = axiosInstance.get("/courses");
        toast.promise(res,{
            loading:"Loading courses data...",
            success:"Courses loaded successfully",
            error:"Failed to get courses"
        })

        // getting response resolved here
        res = await res;
        
        return res.data.courses;
    }
    catch(error){
        toast.error(error?.res?.data?.message)

    }
})

// function to create a new course
export const CreateNewCourse = createAsyncThunk("/course/get",async (data)=>{
    try{
        const formData = new FormData();
        formData.append("title",data?.title);
        formData.append("description",data?.description);
        formData.append("createdBy",data?.createdBy);
        formData.append("category",data?.category);
        formData.append("thumbnail",data?.thumbnail);

        let res = axiosInstance.post("/courses",formData);
        toast.promise(res,{
            loading:"Creating the course...",
            success:"Course created successfully",
            error:"Failed to create course"
        })
        res = await res;
        return res.data;

    }
    catch(error){
        toast.error(error?.res?.data?.message)
    }
})

// function to delete the course
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
      const res = axiosInstance.delete(`courses/${id}`);
  
      toast.promise(res, {
        loading: "Deleting the course...",
        success: "Courses deleted successfully",
        error: "Failed to delete course",
      });
  
      const response = await res;
  
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
});

const courseSlice = createSlice({
    name:'courses',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllCourses.fulfilled,(state,action)=>{
            if (action.payload) {
                
                state.coursesData = [...action.payload];
            }
        })
        
    }
})


export default courseSlice.reducer;