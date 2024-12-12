import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { admin_getProducts_byFields } from "@services/api";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@redux/features/toggle/toggleSlice";

const ModalChooseProduct = ({ productChoosed, setProductChoosed }) => {
  const { modalChooseProduct } = useSelector((state) => state.toggle);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [productSelected, setProductSelected] = useState([]);
  const dispatch = useDispatch();

  const getProducts = async (query, sort, limit, page) => {
    try {
      setLoading(true);
      const res = await admin_getProducts_byFields(query, sort, limit, page);
      if (res.vcode != 0) {
        return console.error(res.msg);
      }
      setProducts(
        res.data.map((item) => ({
          ...item,
          key: item._id,
          quantity: 1,
        }))
      );
      setTotal(res.total);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "imgs",
      render: (imgs) => <img width={50} src={imgs?.[0]} />,
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
    dispatch(toggle("modalChooseProduct"));
  };

  const onSelectChange = (newSelectedRowKeys, newSelectedRow) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    console.log("newSelectedRow ", newSelectedRow);
    setSelectedRowKeys(newSelectedRowKeys);
    setProductSelected(newSelectedRow);
  };

  console.log("productSelected", productSelected);

  return (
    <Modal
      open={modalChooseProduct}
      onCancel={() => dispatch(toggle("modalChooseProduct"))}
      footer={null}
      width={1200}
      title="Chọn sản phẩm"
    >
      <div className="flex justify-end items-center mb-4">
        <Button onClick={() => getProducts({}, {}, limit, page)}>Xem</Button>
      </div>

      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
              key: "odd",
              text: "Select Odd Row",
              onSelect: (changeableRowKeys) => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                  if (index % 2 !== 0) {
                    return false;
                  }
                  return true;
                });
                setSelectedRowKeys(newSelectedRowKeys);
              },
            },
            {
              key: "even",
              text: "Select Even Row",
              onSelect: (changeableRowKeys) => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                  if (index % 2 !== 0) {
                    return true;
                  }
                  return false;
                });
                setSelectedRowKeys(newSelectedRowKeys);
              },
            },
          ],
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
            getProducts({}, {}, pageSize, page);
          },
        }}
      />
      <div className="text-right">
        <button onClick={handleSave}>Lưu</button>
      </div>
    </Modal>
  );
};
export default ModalChooseProduct;
