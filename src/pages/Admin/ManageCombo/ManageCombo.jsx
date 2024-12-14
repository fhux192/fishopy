import { useEffect, useState } from "react";
import ModalAddCombo from "@components/Admin/Combo/ModalAddCombo/ModalAddCombo";
import ModalEditCombo from "@components/Admin/Combo/ModalEditCombo/ModalEditCombo";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, message, Popconfirm, Space, Table } from "antd";
import { admin_deleteCombo, admin_getCombos_byFields } from "@services/api";
import { toggle } from "@redux/features/toggle/toggleSlice";
import { useDispatch } from "react-redux";

const ManageCombo = () => {
  const [loading, setLoading] = useState(false);

  const [combos, setCombos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(1);
  const [comboEdit, setComboEdit] = useState(null);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "imgs",
      render: (imgs) => <img width={50} src={imgs[0]} />,
    },
    {
      title: "Tên combo",
      dataIndex: "name",
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      render: (price) => <span>{price.toLocaleString()}đ</span>,
    },
    {
      title: "Giá khuyến mãi",
      dataIndex: "price_sale",
      render: (price_sale) => <span>{price_sale.toLocaleString()}đ</span>,
    },
    {
      title: "Thao tác",
      render: (record) => (
        <div className="">
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "orange" }} />}
            onClick={() => {
              dispatch(toggle("modalEditCombo"));
              setComboEdit(record);
            }}
          />

          <Popconfirm
            title="Xóa combo này?"
            onConfirm={() => handleDeleteCombo(record._id)}
            okText="Có"
            cancelText="Không"
            className="ml-4 cursor-pointer p-2"
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDeleteCombo = async (id) => {
    try {
      const res = await admin_deleteCombo(id);
      if (res.vcode != 0) {
        return message.error(res.msg);
      }
      setCombos(combos.filter((item) => item._id !== id));
      message.success(res.msg);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCombos({}, {}, limit, page);
  }, []);

  const getCombos = async (query, sort, limit, page) => {
    setLoading(true);
    try {
      const res = await admin_getCombos_byFields(query, sort, limit, page);
      if (res.vcode != 0) {
        return message.error(res.msg);
      }

      setTotal(res.total);
      setCombos(
        res.data.map((item) => {
          return { ...item, key: item._id };
        })
      );
    } catch (error) {
      console.error("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <Space>
          <Button onClick={() => dispatch(toggle("modalAddCombo"))}>
            + Thêm combo
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              setPage(1);
              setLimit(10);
              getCombos({}, {}, 10, 1);
            }}
          ></Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={combos}
        loading={loading}
        pagination={{
          total: total,
          pageSize: limit,
          current: page,
          onChange: (page) => setPage(page),
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          onShowSizeChange: (current, size) => setLimit(size),
        }}
      />

      <ModalAddCombo setCombos={setCombos} />

      {comboEdit && (
        <ModalEditCombo
          comboEdit={comboEdit}
          setCombos={setCombos}
          combos={combos}
        />
      )}
    </div>
  );
};
export default ManageCombo;
