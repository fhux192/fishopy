import { ItemsContainer } from "./ItemsContainer";

const Footer = () => {
  return (
    <footer className="bg-teal2 ">
      <ItemsContainer />
      <div
        className="mt-[1.25rem] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-10
      text-center pt-0.3 text-white text-sm pb-5 "
      >
        <span>© 2020 Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
      </div>
    </footer>
  );
};

export default Footer;
