import React from "react";
import { Link } from "react-router-dom";

import homePageMainImage from '../assets/homePageMainImage.png';
import Layout from "../Layouts/HomeLayout";
// import CgptLayout from '../Layouts/cgptLayout';


function HomePage(){
    return (
        <Layout>
            <div className="pt-0 md:pt-0 px-5 md:pt-5 text-white flex flex-col  md:flex md:flex-row items-center justify-center gap-10 md:gap-5 lg:mx-16 md:mx-10 h-[90vh]  md:mb-0">
                {/* for platform details */}
                <div className = "w-full md:w-1/2 ">
                        <h1 className="text-2xl md:text-4xl lg:text-4xl font-semibold">
                        Find out best{" "}
                        <span className="text-yellow-500 font-bold">Online Courses</span>
                        </h1>
                        <p className="text-sm md:text-xl lg:text-xl text-gray-200 ">
                            We have a large library of courses taught by highly skilled and
                            qualified faculities at a very affordable cost.
                        </p>

                        {/* for buttons */}
                        <div className="mt-4">
                            <Link to={"/courses"}>
                            <button className="bg-yellow-500 mb-3 px-2 py-1 lg:px-5 lg:py-3 rounded-md font-semibold lg:text-lg text-md cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Explore Courses
                            </button>
                            </Link>
                            <Link to={"/contact"}>
                            <button className="border border-yellow-500 px-2 py-1 ml-2 lg:px-5 lg:py-3 rounded-md font-semibold lg:text-lg text-md cursor-pointer hover:border-yellow-600 transition-all ease-in-out duration-300">
                                Contact Us
                            </button>
                            </Link>
                        </div>

                </div>
                {/* right section for image */}
                <div className="w-full md:w-1/2 flex items-center justify-center ">
                    <img src={homePageMainImage} alt="home page image" />

                </div>


            </div>

        </Layout>
    )
}
export default HomePage;