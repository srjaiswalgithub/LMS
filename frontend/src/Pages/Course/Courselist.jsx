import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function Courses(){
    const dispatch = useDispatch();
    const { coursesData } = useSelector((state) => state.courses);
    
    useEffect(() => {
        (async () => {
            await dispatch(getAllCourses());
        })();
    }, []);
    
    return(
        <Layout>
            {/* courses container for displaying the cards */}
            <div className="min-h-[90vh] pt-12  flex flex-col flex-wrap gap-10 text-white">
                <h1 className="text-center text-3xl font-semibold">
                Explore the courses made by{" "}
                <span className="font-bold text-yellow-500">Industry Experts</span>
                </h1>

                {/* wrapper for courses card */}
                <div className="mb-10 flex flex-wrap gap-14 justify-center items-center">
                    
                    {coursesData?.map((element) => {

                        
                        return <CourseCard key={element.title} data={element} />;
                    })}
                </div>
            </div>
        </Layout>
    )
}
export default Courses;