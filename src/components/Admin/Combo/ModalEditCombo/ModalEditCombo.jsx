import { Button, Form, Input, message, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { admin_addCombo } from "@services/api";
import ModalChooseProduct from "../ModalChooseProduct/ModalChooseProduct";
import UploadImage from "@components/Common/UploadImage/UploadImage";
import { toggle } from "@redux/features/toggle/toggleSlice";
import { convertToSlug, getRawPrice, formatPrice } from "@utils/function";
import { admin_updateCombo } from "../../../../services/api";

const ModalEditCombo = ({ comboEdit, setCombos }) => {
  const { modalEditCombo } = useSelector((state) => state.toggle);
  const [productChoosed, setProductChoosed] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imgs, setImgs] = useState([]);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

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
      dataIndex: "imgs",
      render: (imgs) => <img width={50} src={imgs[0]} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      with: 100,
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
      title: "Thao tác",
      fixed: "right",
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

  useEffect(() => {
    if (modalEditCombo && comboEdit) {
      setImgs(comboEdit.imgs);
      form.setFieldsValue({
        name: comboEdit.name,
        price: formatPrice(comboEdit.price),
        price_sale: formatPrice(comboEdit.price_sale),
      });

      setProductChoosed(
        comboEdit.products.map((item) => ({
          ...item,
          name: item.id_product?.name,
          imgs: item.id_product?.imgs || [],
          key: item.id_product?._id,
        }))
      );
    } else {
      form?.resetFields();
      setImgs([]);
      setProductChoosed([]);
    }
  }, [modalEditCombo]);

  const onFinish = async (values) => {
    if (loading) return;
    setLoading(true);
    try {
      if (productChoosed.length === 0) {
        message.error("Hãy chọn sản phẩm cho combo");
        return;
      }
      const data = {
        name: values.name,
        price: getRawPrice(values.price),
        price_sale: getRawPrice(values.price_sale),
        imgs: imgs,
        link: convertToSlug(values.name),
        products: productChoosed.map((item) => ({
          id_product: item.id_product._id,
          quantity: item.quantity,
        })),
      };

      const res = await admin_updateCombo(comboEdit._id, data);
      if (res.vcode !== 0) {
        return message.error(res.msg);
      }

      setCombos((pre) =>
        pre.map((p) =>
          p._id === comboEdit._id
            ? {
                ...res.data,
                products: productChoosed.map((e) => {
                  return {
                    ...e,
                    name: e.id_product?.name,
                    imgs: e.id_product?.imgs || [],
                  };
                }),
                key: res.data._id,
              }
            : p
        )
      );
      message.success(res.msg);
      dispatch(toggle("modalEditCombo"));
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={modalEditCombo}
      footer={null}
      title="Cập nhật combo"
      onCancel={() => dispatch(toggle("modalEditCombo"))}
      width={1000}
    >
      <Form name="editCombo" onFinish={onFinish} autoComplete="off" form={form}>
        <UploadImage
          multiple={true}
          dataImage={imgs}
          onChange={setImgs}
          uploadType={"fish"}
        />
        <Form.Item
          label="Tên "
          name="name"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Hãy nhập tên combo!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá bán(đ)"
          name="price"
          getValueFromEvent={(e) => formatPrice(e.currentTarget.value)}
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Hãy nhập giá!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá khuyến mãi(đ)"
          name="price_sale"
          getValueFromEvent={(e) => formatPrice(e.currentTarget.value)}
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Hãy nhập giá khuyến mãi!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="text-right">
          <Button onClick={() => dispatch(toggle("modalChooseProduct"))}>
            Thêm sản phẩm
          </Button>

          <div>Giá gốc: {formatPrice(totalPrice)}đ</div>
        </div>

        <Table
          scroll={{
            x: 500,
          }}
          columns={columns}
          dataSource={productChoosed}
          className="mb-4"
          pagination={false}
        />
        <Form.Item wrapperCol={24} className="text-right">
          <Button htmlType="submit">Cập nhật combo</Button>
        </Form.Item>
      </Form>

      <ModalChooseProduct
        productChoosed={productChoosed}
        setProductChoosed={setProductChoosed}
      />
    </Modal>
  );
};
export default ModalEditCombo;
