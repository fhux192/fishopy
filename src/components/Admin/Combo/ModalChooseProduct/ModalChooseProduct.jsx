import { Button, Checkbox, Modal, Switch, Table } from "antd";
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
  const [productSelected, setProductSelected] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalChooseProduct) {
      setProductSelected(productChoosed);
    } else {
      setProducts([]);
      setProductSelected([]);
      setPage(1);
      setLimit(5);
      setTotal(1);
    }
  }, [modalChooseProduct]);

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
          checked: productSelected.some((e) => e._id === item._id),
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
      title: "Chọn",
      render: (_, record) => (
        <Checkbox
          checked={record.checked}
          onChange={() => {
            console.log("record", record);
            record.checked = !record.checked;
            const index = productSelected.findIndex(
              (item) => item._id === record._id
            );
            if (index === -1) {
              setProductSelected([...productSelected, record]);
            } else {
              setProductSelected(
                productSelected.filter((item) => item._id !== record._id)
              );
            }
          }}
        >
          Checkbox
        </Checkbox>
      ),
    },
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
