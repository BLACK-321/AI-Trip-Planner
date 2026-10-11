import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import Footer from '@/view-trip/components/Footer';

function Hero() {
  return (
    <div className='w-full'>
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[43px] text-center mt-16'>
        <span className='text-[#f56551]'>Discover Your Next Adventure With AI:</span> Personalized Itineraries At Your Fingertips</h1>
        <p className='text-[20px] text-gray-700 text-center'>Your personal trip planner and travel curator, creating  custom itineraries tailored to your interests and budget.</p>
        <Link to={'/create-trip'}><Button className='hover:scale-115 hover:bg-black hover:text-white font-semibold text-lg'>Get Started, it's free</Button></Link>
        <img src='/Product.jpg' className='-mt-5'/>
        </div>
        <Footer />
        </div>
  )
}

export default Hero