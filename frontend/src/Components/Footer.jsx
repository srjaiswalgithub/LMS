import react from 'react';
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
const Footer = ()=>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return(
        <>
            {/* adding the footer */}
        <footer className = "relative left-0 bottom-0 h-[10vh] md:py-5 py-3 flex flex-col md:flex-row items-center justify-between sm:px-10 text-white bg-gray-800 w-[100%]">
            {/* adding copyright section */}
            <section className = "md:text-lg text-sm">
                Copyright {year} | All Rights Reserved
            </section>
            {/* adding the social media section  */}
            <section className = "flex flex-row justify-center items-center gap-3 md:gap-5 md:text-2xl text-xl text-white">
                <a className = "hover:text-yellow-500 transition-all ease-in-out duration-300" href = "#">
                    <BsFacebook/>
                </a>
                <a className = "hover:text-yellow-500 transition-all ease-in-out duration-300" href = "#">
                    <BsInstagram/>
                </a>
                <a className = "hover:text-yellow-500 transition-all ease-in-out duration-300" href = "#">
                    <BsLinkedin/>
                </a>
                <a className = "hover:text-yellow-500 transition-all ease-in-out duration-300" href = "#">
                    <BsTwitter/>
                </a>

            </section>

        </footer>
        </>
        
    )
}

export default Footer;