const AiContractAnalysis = () => {
  return (
    <div className="w-full py-6 px-2">
      <div className="w-[95%]">
        <div className="w-[100%] pb-4 lg:min-h-[100px] border-b-2 border-gray-500 p-3 my-[30px]">
          <p className="text-xl lg:text-2xl font-[400] lg:w-[64%] leading-10">
            Überprüfen und korrigieren Sie Analyseergebnisse, um die KI zu
            verbessern
          </p>
        </div>

        <div className="w-[100%] p-3 my-[30px]">
          <h1 className="text-2xl font-[500]">mietvertrag.pdf</h1>
          <p className="text-xl font-[400] lg:w-[64%] leading-10">
          htiioodetr.pvn
          </p>
        </div>

        <div className="w-[100%] p-3 my-[30px]">
          <h1 className="text-2xl font-[500]">Klauselbewertung</h1>
          <div className="flex justify-between items-center">
          <p className="text-xl font-[400] lg:w-[64%] leading-10">
          Mieter muss die Wände streichen
          </p>
          <span className="bg-[#E00000] text-[var(--white-color)] py-2 w-[100px] flex justify-center items-center rounded">risk</span>
          </div>
        </div>

        <div className="w-[100%] p-3 my-[30px]">
          <h1 className="text-2xl font-[500]">Analyseergebnis</h1>
          <div className="w-[100%]  p-2 border my-5 border-gray-500 rounded-lg">
          <p className="text-2xl font-[400] lg:w-[70%] leading-10">
          Diese Klausel könnte für den Mieter nachteilig sein und unwirksam gemäß § XXX BGB
          </p>
          </div>
        </div>

        <div className="w-[100%] p-3 my-[30px] flex justify-center items-center gap-7">
            <span className="bg-[#05AE05] text-[var(--white-color)] w-[30%] lg:w-[15%] rounded-lg py-2 flex justify-center items-center">Richtig</span>
            <span className="bg-[#E00000] text-[var(--white-color)] w-[30%] lg:w-[15%] rounded-lg py-2 flex justify-center items-center">Falsch</span>
            <span className="bg-[#DEDE03] text-[var(--white-color)] w-[30%] lg:w-[15%] rounded-lg py-2 flex justify-center items-center">Unklar</span>
        </div>
      </div>
    </div>
  );
};

export default AiContractAnalysis;
