const MyButton = ({ text, iconBefore, iconAfter, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-secondBlack text-white  hover:bg-teal-800  rounded-xl"
    >
      {text}
    </button>
  );
};
export default MyButton;
