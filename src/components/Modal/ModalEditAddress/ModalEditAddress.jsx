import { Button, Form, Input, message, Modal, Select } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../../redux/features/toggle/toggleSlice";
import { setAddress } from "../../../redux/features/user/userSlice";
import { callGetCity, callGetDistrict, callGetWard } from "../../../services/api";

const ModalEditAddress = () => {
    const {modalEditAddress} = useSelector(state => state.toggle)
    const { address } = useSelector((state) => state.account);
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
          address: address.address,
          province: address.city,
          district: address.district,
          ward: address.ward
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
        
        dispatch(setAddress(data));
        dispatch(toggle('modalEditAddress'));
        message.success("Cập nhật địa chỉ thành công");
      } catch (error) {
        console.error(error.message)
      }
    };

    return (
    <Modal open={modalEditAddress} title="Sửa địa chỉ aaa" footer={null} onCancel={() => dispatch(toggle('modalEditAddress'))}>
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
          <Select options={districts}  onChange={() => {
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sửa địa chỉ
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ModalEditAddress