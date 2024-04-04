import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  message,
  Upload,
  Modal,
  Input,
  InputNumber,
  Form,
  Row,
  Col,
  Button,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  callCreateProduct,
  callDeleteImgFish,
  callUploadImgFish,
} from "../../../../services/api";

const ModalAddProduct = ({ isOpen, setShowModalAddProduct, setProducts }) => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [thumb, setThumb] = useState([]); // Biến này hiển thị UI
  const [slider, setSlider] = useState([]); // Biến này hiển thị UI
  const [dataAddProduct, setDataAddProduct] = useState({
    name: "",
    thumb: "",
    slider: [],
    description: "",
    introduction: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.thumbUrl && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.thumbUrl || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.thumbUrl.substring(file.thumbUrl.lastIndexOf("/") + 1)
    );
  };

  const handleUploadThumb = async ({ file }) => {
    const res = await callUploadImgFish(file);
    if (res.vcode == 0) {
      const fileUploadedUrl = `${import.meta.env.VITE_BASE_URL}/images/fish/${
        res.data.fileUploaded
      }`;
      setDataAddProduct((pre) => ({
        ...pre,
        thumb: res.data.fileUploaded,
      }));
      setThumb([
        {
          ...file,
          status: "done",
          thumbUrl: fileUploadedUrl,
          preview: fileUploadedUrl,
        },
      ]);
    }
  };

  const handleRemoveImage = (file, type) => {
    if (type == "thumb") {
      setThumb([]);
      setDataAddProduct((pre) => ({
        ...pre,
        thumb: "",
      }));
    }

    if (type == "slider") {
      setSlider((pre) => pre.filter((item) => item.uid !== file.uid));
      setDataAddProduct((pre) => ({
        ...pre,
        slider: pre.slider.filter(
          (item) =>
            item !== file.thumbUrl.substring(file.thumbUrl.lastIndexOf("/") + 1)
        ),
      }));
    }
  };

  const handleUploadSlider = async ({ file }) => {
    const res = await callUploadImgFish(file);
    if (res.vcode == 0) {
      const fileUploadedUrl = `${import.meta.env.VITE_BASE_URL}/images/fish/${
        res.data.fileUploaded
      }`;
      setDataAddProduct((pre) => ({
        ...pre,
        slider: [...pre.slider, res.data.fileUploaded],
      }));
      setSlider((pre) => [
        ...pre,
        {
          ...file,
          status: "done",
          thumbUrl: fileUploadedUrl,
          preview: fileUploadedUrl,
        },
      ]);
    }
  };

  const onFinish = async (values) => {
    const { name, price, thumb, slider, description, introduction } = values;
    let data = {
      name,
      price,
      thumb,
      slider,
      description,
      introduction,
      thumb: dataAddProduct.thumb,
      slider: dataAddProduct.slider,
    };

    setIsLoading(true);
    const res = await callCreateProduct(data);
    setTimeout(() => {
      if (res.vcode == 0) {
        message.success("Thêm sản phẩm thành công");
        setProducts((pre) => [...pre, res.data]);

        //reset form
        form.resetFields();
        setThumb([]);
        setSlider([]);
        setDataAddProduct({
          name: "",
          thumb: "",
          slider: [],
          description: "",
          introduction: "",
        });
        //close modal
        setShowModalAddProduct((pre) => (pre = !pre));
        setIsLoading(false);
      } else {
        message.error("Thêm sản phẩm thất bại");
      }
    }, 500);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Modal
      title="Thêm sản phẩm"
      open={isOpen}
      onCancel={() => setShowModalAddProduct((pre) => (pre = !pre))}
      width={800}
      footer={null}
    >
      <Form
        name="EditProduct"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên cá:"
              name="name"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Vui lòng nhập tên cá!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Giá:"
              name="price"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
            >
              <InputNumber
                step={1000}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                addonAfter={<span>vnđ</span>}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Giới thiệu:"
              name="introduction"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Vui lòng nhập giới thiệu!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Mô tả:"
              name="description"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <TextArea style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ảnh chính:"
              name="thumb"
              labelCol={{ span: 24 }}
              getValueFromEvent={(e) => e.fileList}
              rules={[
                {
                  required: true,
                  message: "Vui lòng tải lên ít nhất một ảnh!",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={thumb}
                onPreview={handlePreview}
                multiple={false}
                customRequest={handleUploadThumb}
                onRemove={(file) => handleRemoveImage(file, "thumb")}
                maxCount={1}
              >
                {thumb.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Ảnh phụ:"
              name="slider"
              labelCol={{ span: 24 }}
              getValueFromEvent={(e) => e.fileList}
              rules={[{ required: true, message: "Vui lòng upload ảnh phụ!" }]}
            >
              <Upload
                listType="picture-card"
                fileList={slider}
                onPreview={handlePreview}
                customRequest={handleUploadSlider}
                onRemove={(file) => handleRemoveImage(file, "slider")}
                multiple={true}
                maxCount={3}
              >
                {slider.length >= 3 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ textAlign: "right" }}>
          <Button
            loading={isLoading}
            className="bg-primaryTeal"
            type="primary"
            htmlType="submit"
          >
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Modal>
  );
};
export default ModalAddProduct;
