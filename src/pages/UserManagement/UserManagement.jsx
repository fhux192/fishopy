import { Button, Space, Table, Typography, Tag, Image, message, Flex, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import ModalAddUser from "../../components/Modal/ModalAddUser/ModalAddUser";
import ModalEditUser from "../../components/Modal/ModalEditUser/ModalEditUser";
import { callDeleteUser, callFetchUser } from "../../services/api";
import { toggleModalAddUser } from "../../redux/features/toggle/toggleSlice";

const UserManagement = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState({});

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => <a>{_id}</a>,
      width: 150,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (name) => <Typography.Text>{name}</Typography.Text>,
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <p>{phone}</p>,
      width: 150,
    },
    {
      title: " Thao tác",
      dataIndex: "_id",
      key: "_id",
      render: (_id, pro) => (
        <Space>
          <EditOutlined
            style={{
              color: "orange",
            }}
          />

          <Popconfirm
            title="Xóa sản phẩm này"
            description="Bạn có chắc chắn muốn xóa sản phẩm này?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => handleDeleteUser(_id)}
          >
            <DeleteOutlined
              style={{
                color: "red",
              }}
            />
          </Popconfirm>
        </Space>
      ),
      width: 150,
    },
  ];

  const handleDeleteUser = async (id) => {
    try {
      const res = await callDeleteUser(id);
      if (res.vcode == 0) {
        const newusers = users.filter((product) => product._id !== id);
        setUsers(newusers);
        message.success(res.message);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await callFetchUser(current, pageSize);
      if (res.vcode == 0) {
        const users = res.data.result.map((item) => ({
          ...item,
          key: item._id,
        }));
        setTotal(res.data.meta.total);
        setUsers(users);
      } else console.error(res.message);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [current, pageSize]);

  return (
    <div>
      <Flex
        style={{
          marginBottom: 16,
        }}
        gap={10}
      >
        <Button
          onClick={() => {
            dispatch(toggleModalAddUser());
          }}
        >
          Thêm người dùng
        </Button>
        <Button onClick={() => fetchUser()}>
          <ReloadOutlined />
        </Button>
      </Flex>
      <Table
        isLoading={isLoading}
        columns={columns}
        dataSource={users}
        loading={isLoading}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setCurrent(page);
            setPageSize(pageSize);
          },
        }}
      />

      <ModalAddUser setUsers={setUsers} />

      <ModalEditUser userEdit={userEdit} setUsers={setUsers} />
    </div>
  );
};
export default UserManagement;
