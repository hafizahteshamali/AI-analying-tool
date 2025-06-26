import { howWorksCardsData } from "../../../assets/constantData";
import Cards from "../../../components/Cards";

const HowItWorks = ({howItWorksData}) => {

    const {smHeading, lgHeading, description} = howItWorksData;

  return (
    <div className="w-full bg-[var(--primary-color)] p-5">
        <div className="container mx-auto">
            <div className="flex justify-center items-center h-[400px] lg:h-[300px]">
            <div className="lg:h-[300px] w-[90%] md:w-[60%] lg:w-[100%] items-center flex flex-col justify-between gap-6 lg:gap-0 lg:flex-row" >
                
                <div className="w-[100%] lg:w-[50%]  flex flex-col justify-center items-start">
                    <h5 className="text-[12px] text-[var(--secondary-color)] font-semibold">{smHeading}</h5>
                    <h1 className="text-4xl lg:text-6xl text-[var(--secondary-color)] font-bold">{lgHeading}</h1>
                </div>

                <div className="w-[100%] lg:w-[50%] flex flex-col justify-center items-start" >
                    <p className="text-[var(--secondary-color)] text-[16px] font-[400]">{description}</p>
                </div>
            </div>
            </div>


            <div className="flex flex-wrap gap-4">
                {howWorksCardsData.map((item, index)=>{
                    return(
                        <Cards key={index} data={item} />
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default HowItWorks