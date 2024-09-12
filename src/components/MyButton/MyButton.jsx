const MyButton = ({ text, iconBefore, iconAfter, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-Teal text-white rounded-full"
    >
      {text}
    </button>
  );
};
export default MyButton;
