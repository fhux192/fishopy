import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Upload,
} from "antd";
import React from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, updateAccount } from "@redux/features/user/userSlice";
import { user_updateAccount, user_uploadImage } from "@services/api";

const Profile = () => {
  const { user, isLoading: loading } = useSelector((state) => state.account);

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      values.avatar = user.avatar;
      const res = await user_updateAccount(user._id, values);
      if (res.vcode == 0) {
        dispatch(setCredentials({ ...user, ...res.data }));
        message.success(res.msg);
      } else message.error(res.msg);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChangeImg = async ({ file }) => {
    try {
      const res = await user_uploadImage(file, "avatar", user.avatar);
      if (res.vcode != 0) {
        return message.error(res.msg);
      }
      dispatch(updateAccount({ avatar: res.data.fileUploaded }));
    } catch (error) {
      console.error(error.message);
    }
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

  return (
    <Card style={{ width: "100%" }} className="bg-Black text-white">
      <h1>Hồ sơ của tôi</h1>
      <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      <Divider />
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col
          xs={{
            order: 2,
          }}
          sm={{
            order: 0,
          }}
        >
          <Form
            labelCol={{
              span: 24,
            }}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{
              name: user?.name || "",
              email: user?.email || "",
              phone: user?.phone || "",
            }}
          >
            <Form.Item
              label={<span className="text-white"> Họ tên</span>}
              name="name"
              rules={[
                {
                  required: true,
                  msg: "Vui lòng nhập họ tên!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {user.phone && (
              <Form.Item
                label={<span className="text-white"> Số điện thoại</span>}
                name="phone"
                disabled
                rules={[
                  {
                    required: true,
                    msg: "Vui lòng nhập số điện thoại!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            )}

            {user.email && (
              <Form.Item
                name="email"
                label={<span className="text-white">Email</span>}
              >
                <input disabled className="bg-white" />
              </Form.Item>
            )}

            <Form.Item xs={24}>
              <Button htmlType="submit" className="text-white">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col
          xs={{
            span: 0,
          }}
          sm={{
            span: 1,
          }}
        >
          <Divider type={"vertical"} style={{ height: "100%" }} />
        </Col>
        <Col
          xs={{
            span: 24,
          }}
          sm={{
            span: 10,
          }}
          style={{ textAlign: "center" }}
        >
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={handleChangeImg}
            multiple={false}
            maxCount={1}
          >
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Col>
      </Row>
    </Card>
  );
};
export default Profile;
