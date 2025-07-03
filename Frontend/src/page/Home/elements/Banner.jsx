import React from 'react'
import Header from '../../../Navigation/Header'
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';

const Banner = ({bannerData}) => {

    const navigate = useNavigate();

    const {lgHeading, para, btnText} = bannerData;

  return (
    <>
        <div className="lg:h-[100vh] w-full bg-[url('/assets/images/Home/top-banner-bg-img.jpg')] bg-cover p-4">
        <Header />

        <div className="container mx-auto h-[90%] flex items-center mt-[50px] lg:mt-0">
            <div className='w-[100%] mx-auto flex flex-col justify-center items-center lg:items-start lg:justify-start lg:mx-0 sm:w-[80%] lg:w-[50%] p-2'>
                <h1 className='text-4xl text-center lg:text-left lg:text-[60px] text-[var(--secondary-color)] font-[700] leading-tight'>{lgHeading}</h1>
                <p className='w-[100%] lg:w-[60%] text-center lg:text-left text-[var(--secondary-color)] text-[16px] my-5'>{para}</p>
                <Button onClick={() => navigate('/score')} className="h-[45px] w-[80%] sm:w-[50%] lg:w-[45%] bg-[var(--green-color)] text-[var(--white-color)] rounded-full" text={btnText} />
            </div>
        </div>
    </div>


    <div className='w-full'>
        <img src="./assets/images/Home/contract-img.jpg" className='lg:h-[600px] w-[100%] object-contain lg:object-fill' alt="" />
    </div>
    </>
  )
}

export default Banner