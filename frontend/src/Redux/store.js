import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './Slices/AuthSlice';
import CourseSlice from './Slices/CourseSlice';
import LectureSlice from './Slices/LectureSlice';
import PaymentSlice from './Slices/PaymentSlice';
 
const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        courses:CourseSlice,
        payment:PaymentSlice,
        lectures:LectureSlice
    },
    devTools:true
});

export default store;