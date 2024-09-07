import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Tabs,
  Upload,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import DescProduct from "../../Admin/components/DescProduct/DescProduct";
import styles from "./ModalAddProduct.module.css";
import DetailDescProduct from "../../Admin/components/DetailDescProduct/DetailDescProduct";
import { callCreateProduct, callUploadImg } from "../../../services/api";
import { toggleModalAddProduct } from "../../../redux/features/toggle/toggleSlice";
import DiscountText from "../../Admin/components/DiscountText/DiscountText";
import formatPrice from "../../../utils/formatPrice";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const ModalAddProduct = ({ setProducts }) => {
  const dispatch = useDispatch();
  const { modalAddProduct } = useSelector((state) => state.toggle);
  const [loading, setLoading] = useState(false);
  const [descProductValue, setDescProductValue] = useState("");
  const [detailDescProductValue, setDetailDescProductValue] = useState("");
  const [discountText, setDiscountText] = useState("");
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const handleChange = async ({ file }) => {
    const res = await callUploadImg(file, "fish");
    if (res.vcode == 0) {
      setFileList((pre) => [
        ...pre,
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: import.meta.env.VITE_BASE_URL + "/images/fish/" + res.data.fileUploaded,
        },
      ]);
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
      children: (
        <Form.Item name="descProduct">
          <DescProduct onDescChange={setDescProductValue} />
        </Form.Item>
      ),
    },
    {
      key: "2",
      label: "Chi tiết",
      children: (
        <Form.Item name="detailDescProduct">
          <DetailDescProduct onDetailDescChange={setDetailDescProductValue} />
        </Form.Item>
      ),
    },
    {
      key: "3",
      label: "Khuyến mãi",
      children: (
        <Form.Item name="discountText">
          <DiscountText setDiscountText={setDiscountText} />
        </Form.Item>
      ),
    },
  ];

  const onFinish = async (values) => {
    setLoading(true);
    let dataProduct = {
      images: fileList.map((item) => item?.url?.substring(item?.url.lastIndexOf("/") + 1)),
      name: form.getFieldValue("name"),
      price: Number(form.getFieldValue("price").replace(/,/g, "")),
      status: form.getFieldValue("status"),
      discountedPrice: Number(form.getFieldValue("discountedPrice").replace(/,/g, "")),
      desc: descProductValue,
      video: form.getFieldValue("video"),
      discountText: discountText,
      detailDesc: detailDescProductValue,
    };

    try {
      const res = await callCreateProduct(dataProduct);

      if (res.vcode == 0) {
        setProducts((pre) => [
          ...pre,
          {
            ...res.data,
            image: import.meta.env.VITE_BASE_URL + "/images/fish/" + res.data.image,
            key: res.data._id,
          },
        ]);
        message.success(res.message);
        dispatch(toggleModalAddProduct());
        form.resetFields();
        setDescProductValue("");
        setDetailDescProductValue("");
        setImageUrl("");
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
      onCancel={() => dispatch(toggleModalAddProduct())}
      footer={null}
      centered
      style={{
        minWidth: "80%",
        
      }}
    >
      <Form
        className={styles.form}
        form={form}
        onFinish={onFinish}
        initialValues={{
          status: true,
        }}
      >
        <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
          <div style={{ textAlign: "center" }}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              fileList={fileList}
              customRequest={handleChange}
              multiple={true}
              onRemove={(file) => {
                setFileList((pre) => pre.filter((item) => item.uid !== file.uid));
              }}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </div>
        </Form.Item>

        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Form.Item label="Tên sản phẩm" name="name" labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
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
          <Col span={12}>
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
          <Col span={12}>
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

        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Form.Item label="Url video" name="video" labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Tabs style={{ width: "100%" }} defaultActiveKey="1" items={items} onChange={onChange} />
        </Form.Item>

        <div className="text-right mt-2">
          <Form.Item>
            <Button htmlType="submit">Thêm sản phẩm</Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
export default ModalAddProduct;
