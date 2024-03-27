import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { message, Upload, Modal, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { callUploadImgeFish } from "../../../services/api";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ModalAddProduct = ({
  visible,
  onOk,
  onCancel,
  data,
  setData,
  thumb,
  setThumb,
  slider,
  setSlider,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    console.log("check data", data);
  }, [data]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChangeThumb = async ({ fileList: newFileList }) => {
    setThumb(newFileList);
  };

  const handleUploadThumb = async () => {
    try {
      const res = await callUploadImgeFish(thumb[0].originFileObj);
      if (res.vcode == 0) {
        setThumb([
          {
            ...thumb[0],
            status: "done",
          },
        ]);
        message.success("Upload ảnh thành công");
        setData({
          ...data,
          thumb: res.data.fileUploaded,
        });
        return;
      }
      message.error("Upload ảnh lỗi");
      setThumb([]);
      return;
    } catch (error) {
      console.error("Error fetching file name:", error);
    }
  };

  const handleChangeSlider = ({ fileList: newFileList }) => {};

  const handleUploadSlider = async ({ file, onSuccess, onError }) => {
    try {
      const res = await callUploadImgeFish(file);
      if (res.vcode == 0) {
        setSlider((pre) => [
          ...pre,
          {
            ...file,
            thumbUrl:
              import.meta.env.VITE_BASE_URL +
              "/images/fish/" +
              res.data.fileUploaded,
            status: "done",
            name: file.name,
            preview:
              import.meta.env.VITE_BASE_URL +
              "/images/fish/" +
              res.data.fileUploaded,
          },
        ]);
        setData((pre) => ({
          ...pre,
          slider: [...pre.slider, res.data.fileUploaded],
        }));
        message.success("Upload ảnh thành công");
        return;
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Modal open={visible} onOk={onOk} onCancel={onCancel} width={800}>
      <h1 className="text-2xl">Thêm sản phẩm</h1>

      <div className="flex  gap-4 mt-4">
        <div className="flex flex-1 flex-col gap-4">
          <label htmlFor="title">
            *Tên sản phẩm:
            <Input
              type="text"
              id="title"
              placeholder="Tên sản phẩm"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </label>
          <label htmlFor="price">
            *Giá sản phẩm:
            <InputNumber
              type="number"
              className="block w-full"
              id="price"
              placeholder="Giá sản phẩm"
              value={data.price}
              onChange={(value) => setData({ ...data, price: value })}
            />
          </label>
        </div>
        <div className="flex flex-1 flex-col gap-4 ">
          <label htmlFor="introduction">
            *Giới thiệu:
            <Input
              type="text"
              id="introduction"
              placeholder="Giới thiệu"
              value={data.introduction}
              onChange={(e) =>
                setData({ ...data, introduction: e.target.value })
              }
            />
          </label>
          <label htmlFor="description">
            *Mô tả:
            <TextArea
              rows={4}
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </label>
        </div>
      </div>
      <div className="flex  mt-4">
        <div className="flex flex-1 flex-col gap-4">
          <span>Ảnh bìa:</span>
          <Upload
            listType="picture-card"
            fileList={thumb}
            onPreview={handlePreview}
            onChange={handleChangeThumb}
            customRequest={handleUploadThumb}
            multiple={false}
            onRemove={() => {
              setThumb([]);
              setData({ ...data, thumb: "" });
            }}
          >
            {thumb?.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={() => setPreviewOpen(false)}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <span>Ảnh phụ:</span>
          <Upload
            listType="picture-card"
            fileList={slider}
            onPreview={handlePreview}
            onChange={handleChangeSlider}
            customRequest={handleUploadSlider}
            multiple={true}
            onRemove={(file) => {
              setSlider((pre) => {
                return pre.filter((item) => item.uid !== file.uid);
              });
              setData({
                ...data,
                slider: data.slider.filter(
                  (item) =>
                    item !==
                    file.thumbUrl.substring(file.thumbUrl.lastIndexOf("/") + 1)
                ),
              });
            }}
          >
            {thumb?.length >= 3 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={() => setPreviewOpen(false)}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
      </div>
    </Modal>
  );
};
export default ModalAddProduct;
