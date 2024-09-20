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
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import DescProduct from "../../Admin/components/DescProduct/DescProduct";
import styles from "./ModalEditProduct.module.css";
import DetailDescProduct from "../../Admin/components/DetailDescProduct/DetailDescProduct";
import { callCreateProduct, callEditProduct, callUploadImg } from "../../../services/api";
import { toggleModalEditProduct } from "../../../redux/features/toggle/toggleSlice";
import DiscountText from "../../Admin/components/DiscountText/DiscountText";
import formatPrice from "../../../utils/formatPrice";
import { useForm } from "antd/es/form/Form";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const ModalEditProduct = ({ productEdit, setProducts }) => {
  const { modalEditProduct } = useSelector((state) => state.toggle);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [descProductValue, setDescProductValue] = useState("");
  const [detailDescProductValue, setDetailDescProductValue] = useState("");
  const [discountText, setDiscountText] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleChange = async ({ file }) => {
    setLoading(true);
    try {
      const res = await callUploadImg(file, "fish");
      if (res.vcode == 0) {
        setFileList((pre) => [
          ...pre,
          {
            uid: file.uid,
            name: file.name,
            status: "done",
            url: res.data.fileUploaded,
          },
        ]);
      } else message.error(res.message);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    if (!productEdit?._id) {
      return;
    }
    const formattedFileList = productEdit.images.map((item) => ({
      uid: item,
      name: item,
      status: "done",
      url: item,
    }));
    setFileList(formattedFileList);
    form.setFieldsValue({
      ...productEdit,
      price: formatPrice(productEdit.price.toString()),
      discountedPrice: formatPrice(productEdit.discountedPrice.toString()),
      fileList: formattedFileList,
    });
  }, [productEdit]);

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.error("Vui lòng thêm ảnh sản phẩm");
      return;
    }
    setLoading(true);
    try {
      const res = await callEditProduct({
        ...values,
        price: Number(values.price.replace(/,/g, "")),
        discountedPrice: Number(values.discountedPrice.replace(/,/g, "")),
        desc: descProductValue,
        detailDesc: detailDescProductValue,
        discountText,
        images: fileList.map((item) => item.url),
        _id: productEdit._id,
      });
      if (res.vcode == 0) {
        message.success(res.message);
        setProducts((pre) => pre.map((item) => (item._id == productEdit._id ? res.data : item)));
        dispatch(toggleModalEditProduct());
      } else message.error(res.message);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Chỉnh sửa sản phẩm"
      open={modalEditProduct}
      onCancel={() => dispatch(toggleModalEditProduct())}
      footer={null}
      centered
      style={{
        minWidth: "80%",
      }}
    >
      <Form className={styles.form} form={form} onFinish={onFinish}>
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
          <Tabs style={{ width: "100%" }} defaultActiveKey="1" items={items} />
        </Form.Item>

        <div className="text-right mt-2">
          <Form.Item>
            <Button htmlType="submit">Cập nhật</Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
export default ModalEditProduct;
