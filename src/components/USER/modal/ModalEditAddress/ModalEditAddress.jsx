import { Button, Form, Input, message, Modal, Select, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callEditAddress, callGetCity, callGetDistrict, callGetWard } from "../../../../services/api";
import { toggle } from '../../../../redux/features/toggle/toggleSlice'
import { setAddress, updateAccount } from "../../../../redux/features/user/userSlice";

const ModalEditAddress = ({address}) => {
    const { modalEditAddress } = useSelector((state) => state.toggle);
    const { user } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    useEffect(() => {
        if(address.name) {
          form.setFieldsValue({
              name: address.name,
              phone: address.phone,
              province: address.city,
              district: address.district,
              ward: address.ward,
              address: address.address,
              active: address.active
          })
          getCities(); 
        } 
        
    }, [address]);

    const getCities = async () => {
        const res = await callGetCity();
        const dataCities = res.results.map((item) => {
          return {
              value: item.province_id,
              label: item.province_name,
          };
          })
        setProvinces(dataCities);
        handleChangeProvice(dataCities.find((item) => item.label === address.city || item.value === address.city).value);
    };

    const handleChangeProvice = async (idProvince) => {
      const res = await callGetDistrict(idProvince);
      const dataDistricts = res.results.map((item) => {
        return {
            value: item.district_id,
            label: item.district_name,
        };
      })
      setDistricts(dataDistricts);
      handleChangeDistrict(dataDistricts.find((item) => item.label === address.district).value);
    };

    const handleChangeDistrict = async (idDistrict) => {
      const res = await callGetWard(idDistrict);
      setWards(
        res.results.map((item) => {
        return {
            value: item.ward_id,
            label: item.ward_name,
        };
        })
      );
    };

    const onFinish = async (values) => {
      if (user) {
        try {
          const data = {
              city: provinces.find((item) => item.value === values.province || item.label == values.province)?.label,
              district: districts.find((item) => item.value === values.district || item.label == values.district).label,
              ward: wards.find((item) => item.value === values.ward || item.label == values.ward).label,
              name: values.name,
              phone: values.phone,
              address: values.address,
              active: values.active
          };

          const res = await callEditAddress(address._id, data);
          if (res.vcode == 0) {
              dispatch(updateAccount({ addresses: res.data }));
              dispatch(toggle('modalEditAddress'));
              message.success(res.message);
          } else message.error(res.message);
        } catch (error) {
          console.error("error", error.message);
        }
      } else {
          const data = {
          city: provinces.find((item) => item.value === values.province).label,
          district: districts.find((item) => item.value === values.district).label,
          ward: wards.find((item) => item.value === values.ward).label,
          name: values.name,
          phone: values.phone,
          address: values.address,
          };
          
          localStorage.setItem("address", JSON.stringify(data));
          dispatch(setAddress(data));
          dispatch(toggleModalAddAddress());
          message.success("Thêm địa chỉ thành công");
      }
    };

    return (
        <Modal open={modalEditAddress} title="Cập nhật địa chỉ" onCancel={() => dispatch(toggle('modalEditAddress'))} footer={null}>
            <Form form={form} labelCol={24} onFinish={onFinish} autoComplete="off">
                <Form.Item
                    label="Tên người nhận"
                    labelCol={{ span: 24 }}
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên người nhận!" }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    labelCol={{ span: 24 }}
                    name="phone"
                    rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                    label="Thành phố "
                    labelCol={{ span: 24 }}
                    name="province"
                    rules={[{ required: true, message: "Vui lòng chọn thành phố!" }]}
                >
                <Select options={provinces} onChange={() => {
                  form.setFieldsValue({district: '', ward: ''});
                  handleChangeProvice(provinces.find((item) => item.value === form.getFieldValue('province')).value);
                }} />
                </Form.Item>

                <Form.Item
                    label="Quận/huyện"
                    labelCol={{ span: 24 }}
                    name="district"
                    rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
                >
                <Select options={districts} onChange={() => {
                  form.setFieldsValue({ward: ''});
                  handleChangeDistrict(districts.find((item) => item.value === form.getFieldValue('district')).value);
                }} />
                </Form.Item>
                <Form.Item
                    label="Xã/phường"
                    labelCol={{ span: 24 }}
                    name="ward"
                    rules={[{ required: true, message: "Vui lòng chọn xã/phường!" }]}
                >
                    <Select options={wards} />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ nhận hàng"
                    name="address"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: "Vui lòng nhập địa chỉ nhận hàng!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Đặt làm địa chỉ mặc định"
                    name="active"
                    labelCol={{ span: 24 }}
                >
                    <Switch />
                </Form.Item>

                <Form.Item>
               
                    <Button type="primary" htmlType="submit">
                        Cập nhật địa chỉ
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalEditAddress;