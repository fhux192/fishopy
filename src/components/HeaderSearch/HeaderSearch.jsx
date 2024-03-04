import { useState } from "react";
import search from "../../assets/Zoom.png";

const HeaderSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [isActiveSearch, setIsActiveSearch] = useState(false);

  return (
    <div className="ml-[40rem] mr-[0.8rem] relative w-full  overflow-hidden">
      <form className="absolute flex w-full h-[45px] rounded-full overflow-hidden">
        <div className="absolute w-full">
          {!isActiveSearch && !searchText && (
            <label
              htmlFor="header-search"
              className="absolute left-[1.1rem] top-[.7rem]"
            >
              Search...
            </label>
          )}
          <input
            type="text"
            id="header-search"
            className="header-search shadow-md"
            onFocus={() => setIsActiveSearch((pre) => !pre)}
            onBlur={() => setIsActiveSearch((pre) => !pre)}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <button className="absolute top-0 right-0 w-[2.9rem] h-[2.9rem] bg-white">
          <div className="w-full h-full grid place-items-center">
            <img src={search} alt="Search" width={25} height={25} />
          </div>
        </button>
      </form>
    </div>
  );
};
export default HeaderSearch;
