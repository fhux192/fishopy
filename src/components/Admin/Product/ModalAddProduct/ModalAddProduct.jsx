import { Button, Form, Input, Modal, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styles from "./ModalAddProduct.module.css";
import { toggle } from "@redux/features/toggle/toggleSlice";
import UploadImage from "@components/Common/UploadImage/UploadImage";
import { admin_addProduct } from "@services/api";
import { convertToSlug, getRawPrice, formatPrice } from "@utils/function";

const ModalAddProduct = ({ setProducts }) => {
  const dispatch = useDispatch();
  const { modalAddProduct } = useSelector((state) => state.toggle);
  const [loading, setLoading] = useState(false);
  const [imgs, setImgs] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (loading) return;
    setLoading(true);
    let dataProduct = {
      ...values,
      imgs: imgs,
      price: getRawPrice(values.price),
      price_sale: getRawPrice(values.price_sale),
      link: convertToSlug(values.name),
    };

    try {
      const res = await admin_addProduct(dataProduct);
      if (res.vcode != 0) {
        return message.error(res.msg);
      }

      message.success(res.msg);
      dispatch(toggle("modalAddProduct"));
      form.resetFields();
      setImgs([]);
      setProducts((pre) => [
        ...pre,
        {
          ...res.data,
          key: res.data._id,
        },
      ]);
    } catch (error) {
      console.error("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm sản phẩm"
      open={modalAddProduct}
      onCancel={() => dispatch(toggle("modalAddProduct"))}
      footer={null}
    >
      <Form
        className={styles.form}
        form={form}
        onFinish={onFinish}
        initialValues={{
          status: true,
        }}
      >
        <UploadImage
          multiple={true}
          dataImage={imgs}
          onChange={setImgs}
          uploadType={"fish"}
        />
        <Form.Item label="Tên sản phẩm" name="name" labelCol={{ span: 24 }}>
          <Input />
        </Form.Item>
        <Form.Item label="Tình trạng" name="status" labelCol={{ span: 24 }}>
          <Select
            style={{ width: "100%" }}
            options={[
              { value: true, label: "Còn hàng" },
              { value: false, label: "Hết hàng" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Giá bán(đ)"
          getValueFromEvent={(e) => formatPrice(e.currentTarget.value)}
          name="price"
          labelCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá khuyến mãi(đ)"
          name="price_sale"
          getValueFromEvent={(e) => formatPrice(e.currentTarget.value)}
          labelCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end">
            <Button htmlType="submit">Thêm sản phẩm</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalAddProduct;
