import { useEffect, useState } from "react";
import ModalAddCombo from "@components/Admin/Combo/ModalAddCombo/ModalAddCombo";
import ModalEditCombo from "@components/Admin/Combo/ModalEditCombo/ModalEditCombo";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Table } from "antd";
import { callDeleteComboAdmin, callGetCombosAdmin } from "@services/api";

const ManageCombo = () => {
  const [showModalAddCombo, setShowModalAddCombo] = useState(false);
  const [showModalEditCombo, setShowModalEditCombo] = useState(false);
  const [combos, setCombos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(1);
  const [comboEdit, setComboEdit] = useState(null);

  const columns = [
    {
      title: "Tên combo",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Thao tác",
      render: (record) => (
        <div className="">
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "orange" }} />}
            onClick={() => {
              setShowModalEditCombo(!showModalEditCombo);
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
      const res = await callDeleteComboAdmin(id);
      if (res.vcode === 0) {
        setCombos(combos.filter((item) => item._id !== id));
        message.success(res.msg);
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  useEffect(() => {
    getCombos();
  }, [page, limit]);

  const getCombos = async () => {
    try {
      const res = await callGetCombosAdmin({}, {}, page, limit);
      setTotal(res.total);
      setCombos(res.data.map((item) => ({ ...item, key: item._id })));
    } catch (error) {
      console.error("error", error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <h1>Danh sách combo</h1>
        <button
          className="btn-primary"
          onClick={() => setShowModalAddCombo(!showModalAddCombo)}
        >
          Thêm combo
        </button>
      </div>

      <div className="">
        <Table
          columns={columns}
          dataSource={combos}
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
      </div>

      <ModalAddCombo
        showModalAddCombo={showModalAddCombo}
        setShowModalAddCombo={setShowModalAddCombo}
        setCombos={setCombos}
      />

      <ModalEditCombo
        showModalEditCombo={showModalEditCombo}
        setShowModalEditCombo={setShowModalEditCombo}
        comboEdit={comboEdit}
        setCombos={setCombos}
        combos={combos}
      />
    </div>
  );
};
export default ManageCombo;
