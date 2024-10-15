import { useState } from "react";
import HackerLogo from '../Assets/HackerLogo.png'
import { IoSettingsOutline,IoSearchOutline } from "react-icons/io5"

const Header = ({ onSearch,searchQuery }) => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState(searchQuery || "");

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    onSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div className="bg-[#ff742b] h-14">
      <div className="flex gap-4">
        <div className="flex row gap-1 mt-1 mx-4 px-2">
          <img className="w-10" src={HackerLogo} alt="logo"/>
          <h1 className="mt-2 font-normal text-lg">Hacker News</h1>
        </div>
        <div className="text-center mt-2 w-3/5">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="relative w-full">
              <IoSearchOutline className="absolute mt-2 ml-1 text-[#ff742b] w-10 h-6"/>
            <input
               type="text"
               value={inputValue}
               className="w-full h-10 pl-12 outline-none"
               placeholder="Search stories by title , url or author"
               onChange={handleInputChange}
      />
       <img className="absolute right-4 top-2 w-16 h-7" src="https://hn.algolia.com/public/38a9c67b12016b52267071c530ff2e78.svg" alt="Algolia logo" />
       </div>
          </form>
        </div>
        <div className="flex items-center">
        <IoSettingsOutline className="h-8 w-7 mt-2 ml-32" />
        </div>
      </div>
    </div>
  );
};
export default Header;
