import { ItemsContainer } from "./ItemsContainer";

const Footer = () => {
  return (
    <footer className="bg-primaryTeal ">
      <ItemsContainer />
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-10  text-center font-mono  text-white text-sm py-3 place-items-center ">
        <span>© 2020 Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
      </div>
    </footer>
  );
};

export default Footer;
