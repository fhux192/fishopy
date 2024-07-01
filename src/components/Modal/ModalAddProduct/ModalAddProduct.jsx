import { Col, Form, Input, Modal, Row, Tabs, Upload, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalAddProduct } from "../../../redux/features/toggle/toggleSlice";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import DescProduct from "../../Admin/components/DescProduct/DescProduct";
import styles from "./ModalAddProduct.module.css";
import DetailDescProduct from "../../Admin/components/DetailDescProduct/DetailDescProduct";
import { callUploadImgFish } from "../../../services/api";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const ModalAddProduct = () => {
  const dispatch = useDispatch();
  const { modalAddProduct } = useSelector((state) => state.toggle);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = async ({ file }) => {
    console.log("file", file);
    const res = await callUploadImgFish(file);
    if (res.vcode == 0) {
      setImageUrl("http://localhost:3000/images/fish/" + res.data.fileUploaded);
    } else message.error(res.message);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Mô tả",
      children: <DescProduct />,
    },
    {
      key: "2",
      label: "Chi tiết",
      children: <DetailDescProduct />,
    },
  ];
  return (
    <Modal
      title="Thêm sản phẩm"
      open={modalAddProduct}
      onCancel={() => dispatch(toggleModalAddProduct())}
      footer={null}
      style={{
        minWidth: "80%",
      }}
    >
      <Form className={styles.form}>
        <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
          <div style={{ textAlign: "center" }}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (``
                uploadButton
              )}
            </Upload>
          </div>
        </Form.Item>

        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Form.Item label="Tên sản phẩm" labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Giá bán" labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Form.Item label="Tình trạng" labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Giá khuyến mãi" labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Tabs style={{ width: "100%" }} defaultActiveKey="1" items={items} onChange={onChange} />
        </Row>
      </Form>
    </Modal>
  );
};
export default ModalAddProduct;
