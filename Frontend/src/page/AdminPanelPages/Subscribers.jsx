import { PremiumOptionRoutesData } from "../../assets/constantData"
import {NavLink} from "react-router-dom";

const Subscribers = () => {
  return (
    <div className="w-full py-6 px-2">
      <div className="w-[100%]">
      <div className="w-[100%] pb-4 lg:min-h-[100px] mb-[10px]">
          <h1 className="text-3xl font-[500] my-3">Premium-Abo</h1>
          <p className="text-xl lg:text-2xl font-[400] lg:w-[100%] leading-10">
          Erhalten Sié Zugriff auf erweiterte Funktionen durch ein Premium-Abonnement
          </p>
        </div>


        <div className="w-[100%] bg-[var(--white-color)] shadow-2xl lg:min-h-[600px] flex justify-center items-center mb-[10px] rounded-2xl">
            <ul className="w-full lg:w-[90%]  flex flex-col items-start lg:gap-7">
              {PremiumOptionRoutesData.map((prem_op, index)=>{
                return(
                  <div className="flex justify-start items-center gap-5 lg:min-h-[100px] w-full border border-gray-500 rounded-lg p-5">
                    <img src={prem_op.icon} className="w-[70px] object-contain" alt="" />
                      <div className="w-[70%]">
                        <h2 className="text-[16px] sm:text-2xl font-[500]">{prem_op.text}</h2>
                        <p className="text-[12px]">{prem_op.description}</p>
                      </div>
                  </div>
                )
              })}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Subscribers