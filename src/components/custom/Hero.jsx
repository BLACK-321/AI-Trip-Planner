import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import Footer from '@/view-trip/components/Footer';

function Hero() {
  return (
    <div className='w-full'>
    <div className='flex flex-col items-center px-4 sm:px-10 md:px-20 lg:px-36 xl:px-56 gap-4 sm:gap-6 md:gap-9 my-6 sm:my-10'>
      <h1 className='font-extrabold text-2xl sm:text-3xl md:text-[43px] text-center mt-6 sm:mt-12 md:mt-16'>
        <span className='text-[#f56551]'>Discover Your Next Adventure With AI:</span> Personalized Itineraries At Your Fingertips</h1>
        <p className='text-base sm:text-lg md:text-[20px] text-gray-700 text-center'>Your personal trip planner and travel curator, creating  custom itineraries tailored to your interests and budget.</p>
        <Link to={'/create-trip'}><Button className='hover:scale-115 hover:bg-black hover:text-white font-semibold text-lg'>Get Started, it's free</Button></Link>
        <img src='/Product.jpg' className='w-full max-w-3xl h-auto rounded-xl shadow-md mt-2'/>
        </div>
        <Footer />
        </div>
  )
}

export default Hero