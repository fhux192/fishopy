import { useRef, useState, memo } from "react";
import styles from "./UploadImage.module.css";
import { Button, Dropdown, Input, Popover } from "antd";
import {
  CloseCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { user_uploadImage, user_deleteImage } from "@services/api";

const UploadImage = ({ multiple = false, dataImage, onChange, uploadType }) => {
  const fileInputRef = useRef();
  const textInputRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    const inputValue = textInputRef.current.input.value;
    onChange(multiple ? [...dataImage, inputValue] : inputValue);
  };

  const content = (
    <div>
      <Input ref={textInputRef} type="text" placeholder="Nhập đường dẫn ảnh" />
      <div style={{ textAlign: "right", marginTop: "8px" }}>
        <Button onClick={handleConfirm}>Xác nhận</Button>
      </div>
    </div>
  );

  const handleUploadImage = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    try {
      const res = await user_uploadImage(file, uploadType, dataImage);
      if (res.vcode == 0) {
        if (multiple) {
          onChange([...dataImage, res.data.fileUploaded]);
        } else {
          onChange(res.data.fileUploaded);
        }
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteImage = async (e, index) => {
    e.stopPropagation();
    setLoading(true);
    if (multiple) {
      if (dataImage[index].includes("FISH_WEB")) {
        try {
          const res = await user_deleteImage(dataImage[index]);
          if (res.vcode == 0) {
            const newdataImage = dataImage.filter((_, idx) => idx !== index);
            onChange(newdataImage);
          }
        } catch (error) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        const newdataImage = dataImage.filter((_, idx) => idx !== index);
        onChange(newdataImage);
        setLoading(false);
      }
    } else {
      if (dataImage.includes("FISH_WEB")) {
        try {
          const res = await user_deleteImage(dataImage);
          if (res.vcode == 0) {
            onChange("");
          }
        } catch (error) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        onChange("");
        setLoading(false);
      }
    }

    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (textInputRef && textInputRef.current) {
      textInputRef.current.input.value = "";
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <div>
          <label
            htmlFor="upload-input"
            style={{ width: "100%", display: "inline-block" }}
          >
            Tải ảnh lên
          </label>
          <input
            ref={fileInputRef}
            onChange={handleUploadImage}
            type="file"
            hidden
            id="upload-input"
          />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <Popover content={content} trigger="click">
          <div>Đường dẫn ảnh</div>
        </Popover>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap",
      }}
    >
      {multiple &&
        dataImage.map((item, index) => (
          <div key={index} className={styles.imgContainer}>
            <img src={item} className={styles.img} />
            <CloseCircleOutlined
              onClick={(e) => handleDeleteImage(e, index)}
              style={{
                position: "absolute",
                right: "5px",
                top: "5px",
                color: "red",
                fontSize: "20px",
              }}
            />
          </div>
        ))}
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        placement="top"
      >
        <div className={styles.imgContainer}>
          {loading ? (
            <LoadingOutlined />
          ) : multiple ? (
            <PlusOutlined />
          ) : (
            <>
              {dataImage ? (
                <img
                  className={styles.img}
                  src={dataImage}
                  alt=""
                  onError={(e) => {
                    e.target.src =
                      "https://test-sales.web.app/assets/root/images/system/icons/image_default.svg";
                  }}
                />
              ) : (
                <PlusOutlined />
              )}
              {dataImage && (
                <CloseCircleOutlined
                  onClick={handleDeleteImage}
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    color: "red",
                    fontSize: "20px",
                  }}
                />
              )}
            </>
          )}
        </div>
      </Dropdown>
    </div>
  );
};
export default memo(UploadImage);
