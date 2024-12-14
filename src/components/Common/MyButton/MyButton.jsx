import { Link } from "react-router-dom";

const MyButton = ({ text, iconBefore, iconAfter, onClick, disabled, to }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="mt-2 text-center border-[1px] cursor-pointer border-Grey3 px-4 py-2 w-full bg-Black text-White font-bold rounded-full"
    >
      {text}
    </Link>
  );
};
export default MyButton;
