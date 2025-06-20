import React from "react";
import { overviewData, users } from "../../assets/constantData";

const Overview = () => {
  return (
    <div className="w-full py-6 px-2">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Admin-Panel</h1>

      {/* Overview Cards */}
      <div className="flex flex-wrap justify-start items-start gap-4 mb-10">
        {overviewData.map((item, index) => (
          <div
            key={index}
            className="w-[70%] sm:w-[80%] md:w-[45%] lg:w-[31%] xl:w-[23%] bg-[var(--white-color)] rounded flex justify-start items-center gap-4 p-4 shadow-md"
          >
            <div className="h-[50px] w-[50px] rounded-full bg-[var(--primary-color)] flex justify-center items-center text-white">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <p className="text-[var(--black-color)] text-base font-medium">
                {item.text}
              </p>
              <h3 className="text-[var(--black-color)] text-xl font-semibold">
                {item.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="w-full shadow-md rounded-md">
        <div className="lg:w-full p-1">
          <h1 className="text-2xl font-semibold mb-4">Nutzerverwaltung</h1>

          <table className="w-[100%] lg:w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-1 lg:p-3 text-base font-semibold">
                  <span className="block lg:hidden">Dat...</span>
                  <span className="hidden lg:block">Datum</span>
                </th>
                <th className="p-1 lg:p-3 text-base font-semibold">
                  <span className="block lg:hidden">Ben...</span>
                  <span className="hidden lg:block">Benutzer</span>
                </th>
                <th className="p-1 lg:p-3 text-base font-semibold">
                  <span className="block lg:hidden">Rol...</span>
                  <span className="hidden lg:block">Rolle</span>
                </th>
                <th className="p-1 lg:p-3 text-base font-semibold">
                  <span className="block lg:hidden">Sta...</span>
                  <span className="hidden lg:block">Status</span>
                </th>
                <th className="p-1 lg:p-3 text-base font-semibold">
                  <span className="block lg:hidden">Abo...</span>
                  <span className="hidden lg:block">Abonnement</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="p-1 lg:p-3 text-sm">
                    <span className="block lg:hidden">
                      {user.datum.slice(0, 4)}...
                    </span>
                    <span className="hidden lg:block">{user.datum}</span>
                  </td>
                  <td className="p-1 lg:p-3 text-sm">
                    <span className="block lg:hidden">
                      {user.benutzer.slice(0, 4)}...
                    </span>
                    <span className="hidden lg:block">{user.benutzer}</span>
                  </td>
                  <td className="p-1 lg:p-3 text-sm">
                    <span className="block lg:hidden">
                      {user.rolle.slice(0, 4)}...
                    </span>
                    <span className="hidden lg:block">{user.rolle}</span>
                  </td>
                  <td className="p-1 lg:p-3 text-sm">
                    <span
                      className={`px-3 py-1 inline-block w-[100px] text-center rounded text-white ${
                        user.status === "inAktiv"
                          ? "bg-[#D9D9D9] text-black"
                          : "bg-[var(--secondary-color)]"
                      }`}
                    >
                      <span className="block lg:hidden">
                        {user.status.slice(0, 4)}...
                      </span>
                      <span className="hidden lg:block">{user.status}</span>
                    </span>
                  </td>
                  <td className="p-1 lg:p-3 text-sm">
                    <button className="border border-[var(--primary-color)] h-[36px] w-full text-sm text-[var(--black-color)] rounded">
                      <span className="block lg:hidden">
                        {user.abonnement.slice(0, 4)}...
                      </span>
                      <span className="hidden lg:block">{user.abonnement}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
