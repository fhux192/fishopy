import { useState } from "react";
import search from "../../assets/Zoom.png";
import { motion } from "framer-motion";
const HeaderSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [isActiveSearch, setIsActiveSearch] = useState(false);

  return (
    <motion.div
      className={`flex justify-items-center shadow-md  shadow-black mr-[0.8rem] mt-[0.35rem] relative w-full overflow-hidden ${
        searchText && isActiveSearch ? "ml-[0rem]" : "ml-[48rem]"
      }`}
      animate={{
        x: searchText && isActiveSearch ? 5 : 0,
      }}
    >
      <form className="group absolute flex w-full h-[45px] rounded-full overflow-hidden">
        <div className="absolute w-full">
          {!isActiveSearch && !searchText && (
            <label
              htmlFor="header-search"
              className="absolute font-mono left-[1.1rem] top-[0.7rem] cursor-text"
            >
              Tìm Kiếm...
            </label>
          )}
          <input
            type="text"
            id="header-search"
            className=" header-search shadow-md "
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
    </motion.div>
  );
};
export default HeaderSearch;
