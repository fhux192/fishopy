import { useEffect, useState } from "react";
import ModalAddCombo from "../../components/Admin/ModalAddCombo/ModalAddCombo";
import { DeleteOutlined } from "@ant-design/icons";
import { message, Popconfirm, Table } from "antd";
import { callDeleteComboAdmin, callGetCombosAdmin } from "../../services/api";

const ManageCombo = () => {
  const [showModalAddCombo, setShowModalAddCombo] = useState(false);
  const [combos, setCombos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(1);

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "imgs",
      render: (imgs) => <img width={50} src={imgs?.[0]} />,
    },
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
        <Popconfirm
          title="Xóa combo này?"
          onConfirm={() => handleDeleteCombo(record._id)}
          okText="Có"
          cancelText="Không"
          className="ml-4 cursor-pointer p-2"
        >
          <DeleteOutlined style={{ color: "red" }} />
        </Popconfirm>
      ),
    },
  ];

  const handleDeleteCombo = async (id) => {
    try {
      const res = await callDeleteComboAdmin(id);
      if (res.vcode === 0) {
        setCombos(combos.filter((item) => item._id !== id));
        message.success(res.message);
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
      setCombos(res.data);
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
    </div>
  );
};
export default ManageCombo;
