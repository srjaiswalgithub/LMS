import React from 'react';

import AboutImage from '../assets/aboutMainImage.png';
import Carsousel from '../Components/carsousel';
import Celebrities  from '../constant/carouselData';
import Layout from '../Layouts/HomeLayout';

function AboutPage(){
    
    return (
        <Layout>
            <div className = " flex flex-col pt-10 md:pt-20 lg:pt-10">
                {/* creating the about page main section */}
                <div className = " flex flex-col md:flex-row justify-center items-center gap-5 mx-5 md:mx-10">
                    {/* out moto section */}
                    <section className = " w-full md:w-1/2 space-y-10">
                        <h1 className="text-3xl md:text-5xl text-yellow-500 font-semibold">
                            Affordable and Quality Education
                        </h1>
                        <p className=" text-md md:text-xl text-gray-200">
                            Our goal is to provide the affordable and quality education to the
                            world. We are providing the platform for the aspiring teachers and
                            students to share their creativity, skills and knowledge to each
                            other to empower and contribute in the growth and wellness of the
                            mankind.
                        </p>


                    </section>
                    <div className = "w-full md:w-1/2 flex justify-center items-center">
                        <img className = "drop-shadow-2xl " src={AboutImage} alt="home page image" />

                    </div>
                </div>

                {/* top personalities quotes section */}

                <div className="carousel mx-auto  w-[90%] md:w-[70%] lg:w-[60%]my-5 md:my-10">
                    {
                        Celebrities && Celebrities.map((celebrity)=><Carsousel slideNumber = {celebrity.slideNumber}  image = {celebrity.image} title = {celebrity.title} description = {celebrity.description} totalSlides = {Celebrities.length} key = {celebrity.slideNumber} />)
                    }
                        
                </div>


            </div>


        </Layout>
    )
    

}
export default AboutPage;