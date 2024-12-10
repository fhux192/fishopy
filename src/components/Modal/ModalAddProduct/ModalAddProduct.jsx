import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styles from "./ModalAddProduct.module.css";
import { toggle } from "@redux/features/toggle/toggleSlice";
import formatPrice from "@utils/formatPrice";
import UploadImage from "@components/Common/UploadImage";
import { admin_addProduct } from "@services/api";

const ModalAddProduct = ({ setProducts }) => {
  const dispatch = useDispatch();
  const { modalAddProduct } = useSelector((state) => state.toggle);
  const [loading, setLoading] = useState(false);
  const [descProductValue, setDescProductValue] = useState("");
  const [detailDescProductValue, setDetailDescProductValue] = useState("");
  const [images, setImages] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (loading) return;
    setLoading(true);
    let dataProduct = {
      images: fileList.map((item) => item?.url),
      name: form.getFieldValue("name"),
      price: Number(form.getFieldValue("price").replace(/,/g, "")),
      status: form.getFieldValue("status"),
      discountedPrice: Number(
        form.getFieldValue("discountedPrice").replace(/,/g, "")
      ),
      desc: descProductValue,
      video: form.getFieldValue("video"),
      discountText: discountText,
      detailDesc: detailDescProductValue,
    };

    try {
      const res = await admin_addProduct(dataProduct);

      if (res.vcode == 0) {
        message.success(res.message);
        dispatch(toggle());
        form.resetFields();
      } else {
        message.error(res.message);
      }
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
      onCancel={() => dispatch(toggle())}
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
          dataImage={images}
          onChange={setImages}
          uploadType={"fish"}
        />

        <Row gutter={[16, 24]}>
          <Col sm={24} lg={12}>
            <Form.Item label="Tên sản phẩm" name="name" labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item
              label="Giá bán(đ)"
              getValueFromEvent={(e) => formatPrice(e)}
              name="price"
              labelCol={{ span: 24 }}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col sm={24} lg={12}>
            <Form.Item label="Tình trạng" name="status" labelCol={{ span: 24 }}>
              <Select
                style={{ width: "100%" }}
                options={[
                  { value: true, label: "Còn hàng" },
                  { value: false, label: "Hết hàng" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item
              label="Giá khuyến mãi(đ)"
              name="discountedPrice"
              getValueFromEvent={(e) => formatPrice(e)}
              labelCol={{ span: 24 }}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalAddProduct;
