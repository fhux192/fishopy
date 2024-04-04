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
import { callUpdateProduct, callUploadImgFish } from "../../../../services/api";

const ModalEditProduct = ({
  isOpen,
  setShowModalEditProduct,
  fish,
  setSelectedFish,
  setProducts,
}) => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [thumb, setThumb] = useState([]); // Biến này hiển thị UI
  const [slider, setSlider] = useState([]); // Biến này hiển thị UI
  const [dataEditProduct, setDataEditProduct] = useState({
    name: "",
    description: "",
    introduction: "",
    thumb: "",
    slider: [],
  });

  useEffect(() => {
    if (fish) {
      form.setFieldsValue({
        name: fish.name,
        price: fish.price,
        description: fish.description,
        introduction: fish.introduction,
        thumb: fish.thumb,
        slider: fish.slider,
      });
      setDataEditProduct((prev) => ({
        ...prev,
        thumb: fish.thumb,
        slider: fish.slider,
      }));
      setThumb([
        {
          uid: "-1",
          name: fish.thumb,
          status: "done",
          thumbUrl:
            import.meta.env.VITE_BASE_URL + "/images/fish/" + fish.thumb,
        },
      ]);

      setSlider(
        fish.slider.map((img, index) => ({
          uid: index,
          name: img,
          status: "done",
          thumbUrl: import.meta.env.VITE_BASE_URL + "/images/fish/" + img,
        }))
      );
    }
  }, [fish]);

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
      const urlImg = `${import.meta.env.VITE_BASE_URL}/images/fish/${
        res.data.fileUploaded
      }`;
      const newFile = {
        ...file,
        status: "done",
        thumbUrl: urlImg,
        preview: urlImg,
      };
      setThumb([...thumb, newFile]);
      setDataEditProduct({
        ...dataEditProduct,
        thumb: res.data.fileUploaded,
      });
    } else {
      message.error("Upload ảnh thất bại");
    }
  };

  const handleUploadSlider = async ({ file }) => {
    const res = await callUploadImgFish(file);
    if (res.vcode == 0) {
      const fileUploadedUrl = `${import.meta.env.VITE_BASE_URL}/images/fish/${
        res.data.fileUploaded
      }`;
      setDataEditProduct((pre) => ({
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

  const handleRemoveImage = (file, type) => {
    if (type == "thumb") {
      setThumb([]);
      setDataEditProduct((pre) => ({
        ...pre,
        thumb: "",
      }));
    }

    if (type == "slider") {
      setSlider((pre) => pre.filter((item) => item.uid !== file.uid));
      setDataEditProduct((pre) => ({
        ...pre,
        slider: pre.slider.filter(
          (item) =>
            item !== file.thumbUrl.substring(file.thumbUrl.lastIndexOf("/") + 1)
        ),
      }));
    }
  };

  const onFinish = async (values) => {
    const { name, price, description, introduction } = values;
    const data = {
      name,
      price,
      description,
      introduction,
      thumb: dataEditProduct.thumb,
      slider: dataEditProduct.slider,
    };

    const res = await callUpdateProduct(fish._id, data);
    if (res.vcode == 0) {
      setProducts((pre) => {
        return pre.map((item) => {
          if (item._id === fish._id) {
            return {
              ...item,
              name,
              price,
              description,
              introduction,
              thumb: dataEditProduct.thumb,
              slider: dataEditProduct.slider,
            };
          }
          return item;
        });
      });
      //reset form
      form.resetFields();
      setThumb([]);
      setSlider([]);
      setDataEditProduct({
        name: "",
        thumb: "",
        slider: [],
        description: "",
        introduction: "",
      });
      //close modal
      setShowModalEditProduct((pre) => (pre = !pre));
      message.success("Cập nhật sản phẩm thành công");
    } else {
      message.error("Cập nhật sản phẩm thất bại");
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Modal
      title="Cập nhật sản phẩm"
      open={isOpen}
      onCancel={() => {
        setSelectedFish(null);
        setShowModalEditProduct((pre) => (pre = !pre));
      }}
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
          <Button className="bg-primaryTeal" type="primary" htmlType="submit">
            Cập nhật
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
export default ModalEditProduct;
