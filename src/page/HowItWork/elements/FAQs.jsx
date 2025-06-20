import React from 'react'
import Accordion from '../../../components/Accordion'
import { accordionData } from '../../../assets/constantData'

const FAQs = () => {
  return (
    <div className='bg-[#E5E7EB]'>
        <div className="container mx-auto">
        <div className="flex flex-col py-[100px] justify-center items-start lg:items-center w-[90%] mx-auto">
          <h1 className="text-4xl text-[var(--secondary-color)] font-bold">
            Häufig gestellte Fragen
          </h1>
          <p className="text-[16px] text-[var(--secondary-color)] font-semibold my-4">
            Mehr als 500+ Kunden vertrauen darauf
          </p>

          <div className="lg:w-[80%] lg:mx-auto w-full">
            <Accordion accordionData={accordionData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQs