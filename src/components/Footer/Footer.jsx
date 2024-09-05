import { ItemsContainer } from "./ItemsContainer";

const Footer = () => {
  return (
    <footer className="  ">
      <ItemsContainer />
      <div className="grid grid-cols-2 font-bold sm:grid-cols-2 lg:grid-cols-2 gap-10  text-center font-mono  text-primaryBlack text-md py-3 place-items-center ">
      </div>
    </footer>
  );
};

export default Footer;
