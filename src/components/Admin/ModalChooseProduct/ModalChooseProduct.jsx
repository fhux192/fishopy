import { Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { callGetProductsAdmin } from "../../../services/api";

const ModalChooseProduct = ({
  showModalChooseProduct,
  setShowModalChooseProduct,
  productChoosed,
  setProductChoosed,
}) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productSelected, setProductSelected] = useState([]);

  useEffect(() => {
    handleGetProducts();
  }, [page, limit]);

  const handleGetProducts = async () => {
    try {
      setLoading(true);
      const res = await callGetProductsAdmin({}, {}, page, limit);
      if (res.vcode === 0) {
        setProducts(
          res.data.map((item) => ({ ...item, key: item._id, quantity: 1 }))
        );
        setTotal(res.total);
      } else console.error("error", res.msg);
      setLoading(false);
    } catch (error) {
      console.error("error", error.message);
    }
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "images",
      render: (images) => <img width={50} src={images?.[0]} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
  ];

  const handleSave = () => {
    setProductChoosed(productSelected);
    setShowModalChooseProduct(false);
  };

  return (
    <Modal
      open={showModalChooseProduct}
      onCancel={() => setShowModalChooseProduct(false)}
      footer={null}
      width={1200}
      title="Chọn sản phẩm"
    >
      <div className="flex justify-between items-center">
        <h2>Danh sách sản phẩm</h2>
        <button onClick={handleGetProducts}>Xem</button>
      </div>

      <div>
        <Table
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys, selectedRows) => {
              setProductSelected(selectedRows);
            },
          }}
          loading={loading}
          columns={columns}
          dataSource={products}
          pagination={{
            total: total,
            pageSize: limit,
            current: page,
            onChange: (page, pageSize) => {
              setPage(page);
              setLimit(pageSize);
            },
          }}
        />
      </div>
      <div className="text-right">
        <button onClick={handleSave}>Lưu</button>
      </div>
    </Modal>
  );
};
export default ModalChooseProduct;
