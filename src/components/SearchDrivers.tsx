import React, { useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";

export interface SearchDriversProps {
  setDrivers: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SearchDrivers: React.FC<SearchDriversProps> = ({ setDrivers }) => {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/demo/drivers/search`,
        {
          params: { q: query },
        }
      );
      setDrivers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search drivers..."
        className="p-2 border border-gray-300 rounded-lg focus:outline-none w-80"
      />
      <button
        onClick={handleSearch}
        className="absolute right-0 top-0 mt-1 mr-1 px-3 py-1 bg-gray-300 text-black rounded-sm"
      >
        {isLoading ? <Loader className="animate-spin" /> : "Search"}
      </button>
    </div>
  );
};
