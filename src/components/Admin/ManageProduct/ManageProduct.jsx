import { Button, Space, Table, Typography, Tag } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleModalAddProduct } from "../../../redux/features/toggle/toggleSlice";
import ModalAddProduct from "../../Modal/ModalAddProduct/ModalAddProduct";

const columns = [
  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
    render: (text) => <a>{text}</a>,
    width: 150,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
    width: 150,
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    width: 150,
  },
  {
    title: "Tình trạng",
    dataIndex: "tags",
    key: "tags",
    render: () => <Tag color="green">Còn hàng</Tag>,
    width: 150,
  },
  {
    title: " Thao tác",
    dataIndex: "address",
    key: "address 4",
    render: () => (
      <Space>
        <EditOutlined
          style={{
            color: "orange",
          }}
        />
        <DeleteOutlined
          style={{
            color: "red",
          }}
        />
      </Space>
    ),
    width: 150,
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 2 Lake Park, London No. 2 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park, Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const ManageProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        type="link"
        style={{
          marginBottom: 16,
        }}
        onClick={() => {
          dispatch(toggleModalAddProduct());
        }}
      >
        Thêm sản phẩm
      </Button>
      <Table columns={columns} dataSource={data} loading={isLoading} />

      <ModalAddProduct />
    </div>
  );
};
export default ManageProduct;
