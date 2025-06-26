import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"

const Accordion = ({ accordionData, contactFaqs }) => {
  const [openItems, setOpenItems] = useState(new Set([1])) // Second item open by default

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className={`w-full mx-auto my-5 ${contactFaqs ? "lg:space-y-7 space-y-5" : "space-y-3"}`}>
      {accordionData.map((item) => (
        <div key={item.id} className="bg-[#D9D9D9] rounded-lg overflow-hidden transition-all duration-200">
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-4 sm:px-6 py-4 min-h-[60px] sm:min-h-[80px] text-left cursor-pointer flex items-center justify-between bg-gray-50 hover:bg-gray-200 transition-colors duration-200"
            aria-expanded={openItems.has(item.id)}
            aria-controls={`accordion-content-${item.id}`}
          >
            <span className="text-[var(--secondary-color)] font-bold text-sm sm:text-base flex-1 pr-4">
              {item.question}
            </span>
            <span className="flex-shrink-0">
              <FaChevronDown
                className={`text-[var(--secondary-color)] w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                  openItems.has(item.id) ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>

          {openItems.has(item.id) && item.answer && (
            <div className="px-4 sm:px-6 p-4" id={`accordion-content-${item.id}`}>
              <div className="text-[var(--secondary-color)] text-xs sm:text-sm leading-relaxed">{item.answer}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Accordion
