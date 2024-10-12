import { useNavigate } from "react-router-dom";

function PageNotFound(){
    const navigate = useNavigate();
        
        return(
            <div className = "w-full  h-screen flex flex-col justify-center items-center bg-[#1A2238]">
                <h1 className = "text-white text-8xl font-bold tracking-widest">404</h1>
                <div className="bg-orange-400 text-black px-2  text-sm rounded rotate-12 absolute md:left-[45%] md:top-[45%] left-[30%] top-[45%] ">
                    Page Not Found
                </div>
                <button className="mt-5 w">
                    <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none  focus:ring ">
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />

                    <span
                        onClick={() => navigate(-1)}
                        className="relative block px-8 py-3 bg-[#1A2238] border border-current"
                    >
                        Go Back
                    </span>
                    </a>
                </button>



            </div>
        )
}
export default PageNotFound;