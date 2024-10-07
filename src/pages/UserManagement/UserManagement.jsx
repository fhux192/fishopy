import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Table,
  Typography,
  message,
  Popconfirm,
  Row,
  Col,
} from "antd";
import { useDispatch } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import ModalAddUser from "../../components/Modal/ModalAddUser/ModalAddUser";
import ModalEditUser from "../../components/Modal/ModalEditUser/ModalEditUser";
import { callDeleteUser, callFetchUser } from "../../services/api";
import {
  toggleModalAddUser,
  toggleModalEditUser,
} from "../../redux/features/toggle/toggleSlice";

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
      render: (_id) => (
        <Typography.Text ellipsis copyable>
          {_id}
        </Typography.Text>
      ),
      responsive: ["lg"],
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (name) => <Typography.Text ellipsis>{name}</Typography.Text>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <Typography.Text>{phone}</Typography.Text>,
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Typography.Text>
          <strong> {role} </strong>
        </Typography.Text>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "actions",
      render: (_id, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "orange" }} />}
            onClick={() => {
              setUserEdit(record);
              dispatch(toggleModalEditUser());
            }}
          />
          <Popconfirm
            title="Xóa người dùng?"
            description="Bạn có chắc chắn muốn xóa người dùng này?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => handleDeleteUser(_id)}
          >
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDeleteUser = async (id) => {
    try {
      const res = await callDeleteUser(id);
      if (res.vcode === 0) {
        const newUsers = users.filter((user) => user._id !== id);
        setUsers(newUsers);
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
      if (res.vcode === 0) {
        const users = res.data.result.map((item) => ({
          ...item,
          key: item._id,
        }));
        setTotal(res.data.meta.total);
        setUsers(users);
      } else {
        console.error(res.message);
      }
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
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }} align="middle">
        <Col>
          <Button
            onClick={() => {
              dispatch(toggleModalAddUser());
            }}
            icon={<PlusCircleOutlined />}
          >
            Thêm người dùng
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => fetchUser()}
            icon={<ReloadOutlined />}
            shape="circle"
            size="middle"
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={users}
        loading={isLoading}
        rowKey="_id"
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setCurrent(page);
            setPageSize(pageSize);
          },
          showSizeChanger: true,
          responsive: true,
        }}
        scroll={{ x: "max-content" }}
      />

      <ModalAddUser setUsers={setUsers} />

      <ModalEditUser userEdit={userEdit} setUsers={setUsers} />
    </div>
  );
};

export default UserManagement;
