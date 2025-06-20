import Button from "../../components/Button";

const TrainingArea = () => {
  return (
    <div className="w-full py-6 px-2">
      <div className="w-[95%]">
        <div className="w-[100%] pb-4 lg:min-h-[100px] mb-[10px]">
          <h1 className="text-3xl font-[500] my-3">Mietvertrag KI-Training</h1>
          <p className="text-xl lg:text-2xl font-[400] lg:w-[70%] leading-10">
            Bewerten Sie Vertragsklauseln, um das KI-Modell zu trainieren
          </p>
        </div>

        <div className="w-[100%] mb-[30px]">
          <h1 className="text-2xl font-[500]">Vertragsklausel</h1>
          <div className="w-[100%]  p-2 border my-5 border-gray-500 rounded-lg">
            <p className="text-2xl font-[400] lg:w-[70%] leading-10">
              htiloodetr. prvn <br /> Mieter muss die Wände streichen
            </p>
          </div>
        </div>

        <div className="w-[100%] mb-[10px] flex flex-wrap justify-center items-center gap-7">
          <span className="bg-[#E00000] text-[var(--white-color)] w-[30%] lg:w-[15%] rounded-lg py-2 flex justify-center items-center">
            riskant
          </span>
          <span className="bg-[#D9D9D9] text-[var(--white-color)] w-[30%] lg:w-[15%] rounded-lg py-2 flex justify-center items-center">
            neutral
          </span>
          <span className="bg-[#05AE05] text-[var(--white-color)] w-[80%] sm:w-[50%] md:w-[40%] lg:w-[25%] rounded-lg py-2 flex justify-center items-center">
            unproblematisch
          </span>
        </div>

        <div className="w-[100%] mb-[30px]">
          <h1 className="text-2xl font-[500]">Erklärung</h1>
          <form>
            <textarea
              type="text"
              className="w-[100%]  p-2 border my-5 border-gray-500 rounded-lg min-h-[150px] max-h-[200px]"
            ></textarea>
            <div className="flex justify-center items-center gap-7">
              <Button
                className="h-[50px] w-[45%] lg:w-[30%] border border-gray-500 text-lg rounded-lg"
                text="Überspringen"
              />
              <Button
                className="h-[50px] w-[45%] lg:w-[30%] bg-[var(--secondary-color)] text-[var(--white-color)] text-lg rounded-lg"
                text="Bestätigen"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrainingArea;
