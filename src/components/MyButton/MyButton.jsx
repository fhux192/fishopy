const MyButton = ({ text, iconBefore, iconAfter, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-2 border-[1px] cursor-pointer border-Grey3 px-4 py-2 w-full bg-Black text-White font-bold rounded-full"
    >
      {text}
    </button>
  );
};
export default MyButton;
