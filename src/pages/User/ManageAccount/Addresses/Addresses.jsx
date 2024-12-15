import { Card, Divider, Dropdown, Flex, message, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Addresses.module.css";
import { toggle } from "@redux/features/toggle/toggleSlice";
import { updateAccount } from "@redux/features/user/userSlice";
import MyButton from "@components/Common/MyButton/MyButton";
import { useState } from "react";
import ModalEditAddress from "@components/User/ModalEditAddress/ModalEditAddress";
import ModalAddAddress from "@components/Order/ProductChooses/ModalAddAddress/ModalAddAddress";
import { user_deleteAddress } from "@services/api";

const Address = () => {
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [addressEdit, setAddressEdit] = useState({});

  const removeAddress = async (id) => {
    try {
      const res = await user_deleteAddress(id);
      if (res.vcode != 0) {
        return message.error(res.msg);
      }

      message.success(res.msg);
      dispatch(
        updateAccount({
          addresses: user.addresses.filter((item) => item._id !== id),
        })
      );
    } catch (error) {
      console.error("error", error);
    }
  };

  const items = (id) => [
    {
      label: (
        <Button
          onClick={() => {
            setAddressEdit(user.addresses.find((item) => item._id === id));
            dispatch(toggle("modalEditAddress"));
          }}
        >
          Sửa
        </Button>
      ),
      key: "0",
    },
    {
      label: <Button onClick={() => removeAddress(id)}>Xóa</Button>,
      key: "1",
    },
  ];
  return (
    <div className={styles.address}>
      <div className={styles.addressHeader}>
        <h2 className={styles.addressTitle}>Địa chỉ của tôi</h2>
        <MyButton
          text={"+Thêm địa chỉ mới"}
          onClick={() => {
            if (user.addresses.length >= 3) {
              return message.error("Bạn chỉ được thêm tối đa 3 địa chỉ");
            }
            dispatch(toggle("modalAddAddress"));
          }}
        />
      </div>
      {user.addresses.map((item) => {
        return (
          <Card key={item._id} className={"bg-Black text-white"}>
            <Flex justify="space-between">
              <div>
                <div className={styles.groupInfo}>
                  <h3>{item.name}</h3>
                  <Divider type="vertical" />
                  <p>{item.phone}</p>
                </div>
                <p>{item.address}</p>
                <p>
                  {item.ward}, {item.city}, {item.district}
                </p>
                {item.active && (
                  <button className="mt-2 border border-white rounded py-1 px-2">
                    Mặc định
                  </button>
                )}
              </div>

              <Flex className={styles.groupAction}>
                <Dropdown
                  menu={{
                    items: items(item._id),
                  }}
                  trigger={["click"]}
                >
                  <Button className="text-white">...</Button>
                </Dropdown>
              </Flex>
            </Flex>
          </Card>
        );
      })}
      <ModalEditAddress address={addressEdit} />
      <ModalAddAddress />
    </div>
  );
};
export default Address;
