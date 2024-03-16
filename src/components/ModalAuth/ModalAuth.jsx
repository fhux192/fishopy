import { useDispatch, useSelector } from "react-redux";
import { toggleModalLogin } from "../../redux/features/toggle/toggleSlice";
const ModalAuth = () => {
  const { isShowModalLogin } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  return (
    <div className="absolute top-[150%] w-[8rem] right-[0] bg-primaryBlack text-white">
      <button
        onClick={() => dispatch(toggleModalLogin())}
        className="p-4 text-center text-md font-bold hover:text-secondTeal duration-150"
      >
        Đăng nhập
      </button>
      <button className="p-4 text-center text-md font-bold hover:text-secondTeal duration-150">
        Đăng ký
      </button>
    </div>
  );
};
export default ModalAuth;
