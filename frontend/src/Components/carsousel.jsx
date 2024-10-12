function Carsousel({slideNumber,image,title,description,totalSlides}){
    return(
        <>

            <div id ={`slide${slideNumber}`} className="carousel-item relative w-full">
                <div className = " w-[100%] md:w-[80%] flex flex-col justify-center items-center mx-auto text-center">
                    <img
                    src={image}
                    className="h-[30%]  md:h-[50%] rounded-full" />
                    {/* for writting the quotes */}
                    <p className=" text-gray-200 my-5 px-10 md:px-0 mx-1">
                        {description}
                    </p>
                    {/* for personality name */}
                    <h3 className="text-2xl font-semibold">{title}</h3>

                </div>
                
                <div className="absolute left-0 right-0 md:left-5 md:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${(slideNumber==1)?totalSlides:slideNumber-1}`} className="btn btn-circle ">❮</a>
                <a href={`#slide${(slideNumber==totalSlides)?1:slideNumber+1}`} className="btn btn-circle">❯</a>
                </div>
                                
                                
                                    
            </div>

        </>

    )
}
export default Carsousel;