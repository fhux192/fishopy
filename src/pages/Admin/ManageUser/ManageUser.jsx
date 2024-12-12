import React, { useEffect, useState } from "react";
import { Button, Space, Table, Typography, message, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import ModalAddUser from "@components/Admin/User/ModalAddUser/ModalAddUser";
import ModalEditUser from "@components/Admin/User/ModalEditUser/ModalEditUser";
import { toggle } from "@redux/features/toggle/toggleSlice";
import { admin_getUsers_byFields, admin_deleteUser } from "@services/api";

const ManageUser = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState(null);

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
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <Typography.Text>{email}</Typography.Text>,
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
      fixed: "right",
      render: (_id, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "orange" }} />}
            onClick={() => {
              setUserEdit(record);
              dispatch(toggle("modalEditUser"));
            }}
          />
          <Popconfirm
            title="Xóa người dùng?"
            description="Bạn có chắc chắn muốn xóa người dùng này?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => handleDeleteUser(record._id)}
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
      const res = await admin_deleteUser(id);
      if (res.vcode != 0) {
        return message.error(res.msg);
      }

      const newUsers = users.filter((user) => user._id !== id);
      setUsers(newUsers);
      message.success(res.msg);
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const getUsers = async (query, sort, limit, page) => {
    setLoading(true);
    try {
      const res = await admin_getUsers_byFields(query, sort, limit, page);
      if (res.vcode === 0) {
        const users = res.data.map((item) => ({
          ...item,
          key: item._id,
        }));
        setTotal(res.total);
        setUsers(users);
      } else {
        console.error(res.msg);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers({}, {}, limit, page);
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Space>
          <Button
            onClick={() => {
              dispatch(toggle("modalAddUser"));
            }}
            icon={<PlusCircleOutlined />}
          >
            Thêm người dùng
          </Button>
          <Button
            onClick={() => getUsers({}, {}, limit, page)}
            icon={<ReloadOutlined />}
            shape="circle"
            size="middle"
          />
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="_id"
        pagination={{
          current: page,
          pageSize: limit,
          total: total,
          onChange: (page, limit) => {
            setPage(page);
            setLimit(limit);
            getUsers({}, {}, limit, page);
          },
          showSizeChanger: true,
          responsive: true,
        }}
        scroll={{ x: "max-content" }}
      />

      <ModalAddUser setUsers={setUsers} />

      {userEdit && (
        <ModalEditUser users={users} userEdit={userEdit} setUsers={setUsers} />
      )}
    </div>
  );
};

export default ManageUser;
