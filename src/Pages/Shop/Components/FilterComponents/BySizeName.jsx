import React, { useState, useRef, useEffect } from "react";

const BySizeName = ({
  data,
  selectedSizeName,
  setSelectedSizeName,
  onHandleSizeName,
  onCloseFiler,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (name) => {
    setSelectedSizeName(name);
    setIsOpen(false);
    onCloseFiler();
    onHandleSizeName(name);
    setSearchTerm("");
  };

  const filteredSizes = data?.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h2 className="font-bold uppercase text-lg mb-4">By Size</h2>

      <div
        className="flex flex-col gap-y-3 border-b-[1.5px] border-black pb-2"
        ref={dropdownRef}
      >
        <div className="relative">
          <div
            className="border border-gray-300 rounded px-3 py-2 cursor-pointer flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selectedSizeName || "Select Size"}</span>
            <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
          </div>

          {isOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
              <div className="p-2 sticky top-0 bg-white border-b">
                <input
                  type="text"
                  placeholder="Search size..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </div>

              <div>
                <div
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleChange("")}
                >
                  All Sizes
                </div>
                {filteredSizes?.map((name, index) => (
                  <div
                    key={index}
                    className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                      selectedSizeName === name ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleChange(name)}
                  >
                    {name}
                  </div>
                ))}
                {filteredSizes?.length === 0 && (
                  <div className="px-3 py-2 text-gray-500">
                    No sizes match your search
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BySizeName;
