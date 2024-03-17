import { useDispatch, useSelector } from "react-redux";
import { toggleModalLogin } from "../../redux/features/toggle/toggleSlice";
import { toast } from "react-toastify";
import { logout } from "../../redux/features/user/userSlice";
const ModalAuth = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Đăng xuất thành công");
  };

  return (
    <div className="absolute top-[150%] w-[8rem] right-[0] bg-primaryBlack text-white">
      {account?.name ? (
        <button
          onClick={handleLogout}
          className="p-4 text-center text-md font-bold hover:text-secondTeal duration-150"
        >
          Đăng xuất
        </button>
      ) : (
        <>
          <button
            onClick={() => dispatch(toggleModalLogin())}
            className="p-4 text-center text-md font-bold hover:text-secondTeal duration-150"
          >
            Đăng nhập
          </button>
          <button className="p-4 text-center text-md font-bold hover:text-secondTeal duration-150">
            Đăng ký
          </button>
        </>
      )}
    </div>
  );
};
export default ModalAuth;
