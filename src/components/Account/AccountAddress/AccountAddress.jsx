import { Card, Divider, Dropdown, Flex, message, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AccountAddress.module.css";
import { callRemoveAddress } from "../../../services/api";
import { toggle, toggleModalAddAddress } from "../../../redux/features/toggle/toggleSlice";
import { updateAccount } from "../../../redux/features/user/userSlice";
import MyButton from "../../MyButton/MyButton";
import ModalAddAddress from "../../Modal/ModalAddAddress";
import ModalEditAddress from "../../USER/modal/ModalEditAddress/ModalEditAddress";
import { useState } from "react";

const AccountAddress = () => {
  const { user: user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [addressEdit, setAddressEdit] = useState({});

  const removeAddress = async (id) => {
    try {
      const res = await callRemoveAddress(id);
      if (res.vcode == 0) {
        message.success(res.message);
        dispatch(updateAccount({ addresses: user.addresses.filter((item) => item._id !== id) }));
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const items = (id) => [
    {
      label: <Button onClick={() => {
        dispatch(toggle('modalEditAddress'));
        setAddressEdit(user.addresses.find((item) => item._id === id));
      }}>Sửa</Button>,
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
        <MyButton text={"+Thêm địa chỉ mới"} onClick={() => dispatch(toggleModalAddAddress())} />
      </div>
      {user.addresses.map((item) => {
        return (
          <Card key={item._id} className={styles.cardItem}>
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
                {item.active && <Button style={{ marginTop: "5px" }}>Mặc định</Button>}
              </div>

              <Flex className={styles.groupAction}>
                <Dropdown
                  menu={{
                    items: items(item._id),
                  }}
                  trigger={["click"]}
                >
                  <Button>...</Button>
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
export default AccountAddress;
