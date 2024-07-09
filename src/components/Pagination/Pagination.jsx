/* eslint-disable react/prop-types */
const Pagination = ({ totalPost, postPerPage ,setCurrentPage,currentPage}) => {
  let page = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    page.push(i);
  }

  return (
    <div className="flex items-center mt-4 justify-center w-max-[100rem]">
      {page.map((number) => (
        <div
          key={number}
          onClick={() => setCurrentPage(number) }
          className={`flex font-semibold items-center justify-center ${ number == currentPage? " bg-primaryBlack border-2 text-white border-primaryBlack" : "bg-white border-2 border-primaryGrey text-primaryBlack"}  w-8 h-8 mb-10 mt-[1.5rem] rounded-md mx-[1rem] bg-primaryBlack  cursor-pointer`}
        >
          {number}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
