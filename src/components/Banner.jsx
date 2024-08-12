import React from 'react'
import { motion } from "framer-motion";
import Countdown from "./Countdown";
import { useBanner } from '../contexts/BannerContext';

const Banner = () => {
    const { bannerData, countDown } = useBanner();    

    if(!bannerData.isVisible || countDown === 0){
        return null;
    }

    return (
        <div className='banner'>
            <h1 className='text-4xl font-bold text-center my-5'>TUF Assignment</h1>
        <div className="bg-[url('/bgimgg.jpg')] bg-no-repeat bg-cover bg-center h-full ">
            <div className="max-w-7xl pt-44 md:pt-36 flex justify-center items-center flex-col mx-auto pb-36 px-4">   
            <motion.h1
            initial={{
            opacity: 0,
            y: 100,
            
            }}
            whileInView={{
            opacity: 1,
            y: 0,
            
            transition: {
                duration:  1// Animation duration
            }
            }}
            viewport={{ once: true }}
            className="font-bold text-5xl md:text-[60px] lg:text-[64px] text-white text-center"
        >
            <span className="text-4xl md:text-[64px] text-[#ff6021]">{bannerData.title}</span> <br />
        </motion.h1>
        <p className="text-md md:text-[20px] font-medium text-center text-white my-4 mt-4 mb-10">
        {bannerData.description}
        </p>
        <Countdown timer={bannerData.timer} />
        <br></br>
        <a className='text-white underline' href={bannerData.link}>Link</a>
        </div>
        </div>
        </div>
    )
}

export default Banner
