import { Button, Form, Input, Modal, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./ModalEditProduct.module.css";
import { toggle } from "@redux/features/toggle/toggleSlice";
import UploadImage from "@components/Common/UploadImage/UploadImage";
import { admin_updateProduct } from "@services/api";
import { convertToSlug, getRawPrice, formatPrice } from "@utils/function";

const ModalEditProduct = ({ productEdit, setProducts, setProductEdit }) => {
  const dispatch = useDispatch();
  const { modalEditProduct } = useSelector((state) => state.toggle);
  const [loading, setLoading] = useState(false);
  const [imgs, setImgs] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      console.log("values", values);

      if (loading) return;
      setLoading(true);
      let dataProduct = {
        ...values,
        imgs: imgs,
        price: getRawPrice(values.price),
        price_sale: getRawPrice(values.price_sale),
        link: convertToSlug(values.name),
      };

      const res = await admin_updateProduct(productEdit._id, dataProduct);
      if (res.vcode != 0) {
        return message.error(res.msg);
      }

      setProducts((pre) =>
        pre.map((p) =>
          p._id === productEdit._id ? { ...p, ...dataProduct } : p
        )
      );
      message.success(res.msg);
      dispatch(toggle("modalEditProduct"));
      form.resetFields();
    } catch (error) {
      console.error("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modalEditProduct) {
      form.setFieldsValue(productEdit);
      setImgs(productEdit.imgs);
    } else {
      form.resetFields();
      setImgs([]);
      setProductEdit(null);
    }
  }, [modalEditProduct]);

  return (
    <Modal
      title="Cập nhật sản phẩm"
      open={modalEditProduct}
      onCancel={() => dispatch(toggle("modalEditProduct"))}
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
            <Button htmlType="submit">Cập nhật sản phẩm</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalEditProduct;
