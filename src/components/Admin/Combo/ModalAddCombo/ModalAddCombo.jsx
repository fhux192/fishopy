import { Button, Form, Input, message, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { callCreateComboAdmin } from "@services/api";
import { DeleteOutlined } from "@ant-design/icons";
import ModalChooseProduct from "../../ModalChooseProduct/ModalChooseProduct";

const ModalAddCombo = ({
  showModalAddCombo,
  setShowModalAddCombo,
  setCombos,
}) => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModalChooseProduct, setShowModalChooseProduct] = useState();
  const [productChoosed, setProductChoosed] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityChange = (key, value) => {
    const updatedData = productChoosed.map((item) =>
      item.key === key ? { ...item, quantity: value } : item
    );
    setProductChoosed(updatedData);
    calcTotalPrice();
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "images",
      render: (images) => <img width={50} src={images[0]} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (quantity, record) => (
        <Input
          style={{ width: 100 }}
          value={record.quantity}
          onChange={(e) => handleQuantityChange(record.key, e.target.value)}
        />
      ),
    },
    {
      title: "Giá khuyến mãi",
      dataIndex: "price",
      render: (discountedPrice, record) => (
        <span>{discountedPrice * record.quantity}đ</span>
      ),
    },
    {
      title: "Thao tác",
      render: (record) => (
        <div className="ml-4 cursor-pointer p-2">
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() =>
              setProductChoosed(
                productChoosed.filter((item) => item._id != record._id)
              )
            }
          />
        </div>
      ),
    },
  ];

  const calcTotalPrice = () => {
    const total = productChoosed.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calcTotalPrice();
  }, [productChoosed]);

  const onFinish = async (values) => {
    if (productChoosed.length === 0) {
      message.error("Hãy chọn sản phẩm cho combo");
      return;
    }
    const data = {
      name: values.name,
      price: Number(values.price),
      products: productChoosed.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
    };

    const res = await callCreateComboAdmin(data);
    if (res.vcode === 0) {
      setCombos((pre) => [...pre, res.data]);
      message.success("Thêm combo thành công");
      setShowModalAddCombo(false);
    } else message.error(res.msg);
  };

  return (
    <Modal
      open={showModalAddCombo}
      footer={null}
      title="Thêm combo"
      onCancel={() => setShowModalAddCombo(false)}
      width={1000}
    >
      <Form name="addCombo" onFinish={onFinish} autoComplete="off">
        <div className="flex flex-wrap justify-between">
          <Form.Item
            label="Tên "
            name="name"
            labelCol={{ span: 24 }}
            style={{ width: "48%" }}
            rules={[
              {
                required: true,
                msg: "Hãy nhập tên combo!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá "
            name="price"
            labelCol={{ span: 24 }}
            style={{ width: "48%" }}
            rules={[
              {
                required: true,
                msg: "Hãy nhập giá!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="text-right">
          <button onClick={() => setShowModalChooseProduct(true)}>
            Thêm sản phẩm
          </button>

          <div>{totalPrice}đ</div>
        </div>

        <div>
          <Table columns={columns} dataSource={productChoosed} />
        </div>
        <Form.Item wrapperCol={24} className="text-right">
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>

      <ModalChooseProduct
        showModalChooseProduct={showModalChooseProduct}
        setShowModalChooseProduct={setShowModalChooseProduct}
        productChoosed={productChoosed}
        setProductChoosed={setProductChoosed}
      />
    </Modal>
  );
};
export default ModalAddCombo;
