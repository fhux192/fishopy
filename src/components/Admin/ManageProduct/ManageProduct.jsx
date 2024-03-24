import { Card, Button, message, Popover } from "antd";
import { useEffect, useState } from "react";
import ModalAddProduct from "../ModalAddProduct/ModalAddProduct";
import {
  callCreateProduct,
  callDeleteProduct,
  callGetAllProduct,
} from "../../../services/api";
import { toast } from "react-toastify";
const fishes = Array.from({ length: 20 }, (v, i) => ({
  id: i + 1,
  name: `Fish ${i + 1}`,
  species: `Species ${i + 1}`,
  size: `${i + 1} inches`,
  weight: `${i + 1} lbs`,
  location: `Location ${i + 1}`,
}));

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activePopover, setActivePopover] = useState(null);
  const [thumb, setThumb] = useState([]); // Biến này cập nhật UI
  const [slider, setSlider] = useState([]); // Biến này cập nhật UI
  const [data, setData] = useState({
    name: "",
    thumb: "",
    slider: [],
    description: "",
    introduction: "",
  });

  const [isModalOpen, setIsModalOpen] = useState({
    addProduct: false,
    editProduct: false,
    deleteProduct: false,
  });

  const getAllProducts = async () => {
    try {
      const res = await callGetAllProduct();
      if (res.vcode == 0) {
        setProducts(res.data);
      } else {
        toast.error("Lấy danh sách sản phẩm thất bại");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleOk = async () => {
    try {
      const res = await callCreateProduct(data);
      if (res.vcode == 0) {
        setProducts((pre) => {
          return [res.data, ...pre];
        });
        message.success("Thêm sản phẩm thành công");
        setIsModalOpen(false);
        setData({
          name: "",
          thumb: "",
          slider: [],
          description: "",
          introduction: "",
        });
        setThumb([]);
        setSlider([]);
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await callDeleteProduct(id);
      if (res.vcode == 0) {
        setProducts((pre) => {
          return pre.filter((product) => product._id !== id);
        });
        message.success("Xóa sản phẩm thành công");
        // close Popover
        setShowPopover(false);
      } else {
        toast.error("Xóa sản phẩm thất bại");
        return;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className=" p-10">
      <h1>Quản lý sản phẩm</h1>

      <Button
        type="primary"
        className="text-black bg-primaryTeal"
        onClick={() =>
          setIsModalOpen((pre) => {
            return {
              ...pre,
              addProduct: true,
            };
          })
        }
      >
        Thêm sản phẩm
      </Button>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {products.map((fish) => (
          <Card
            key={fish.id}
            extra={
              <div className="flex gap-4">
                <Button
                  type="primary"
                  className="text-black bg-primaryTeal"
                  onClick={() => alert("t chưa làm sửa ")}
                >
                  Sửa
                </Button>
                <Popover
                  open={activePopover === fish._id}
                  content={
                    <div className="flex justify-end gap-2">
                      <Button className="text-black bg-primaryTeal">Hủy</Button>
                      <Button
                        className="text-black bg-primaryTeal"
                        onClick={() => handleDeleteProduct(fish._id)}
                      >
                        Có
                      </Button>
                    </div>
                  }
                  title={`Bạn có muốn xóa ${fish.name} không?`}
                  trigger="click"
                >
                  <Button
                    className="text-black bg-primaryTeal"
                    onClick={() => setActivePopover(fish._id)}
                  >
                    Xóa
                  </Button>
                </Popover>
              </div>
            }
          >
            <img
              width={150}
              height={50}
              src={import.meta.env.VITE_BASE_URL + "/images/fish/" + fish.thumb}
              alt=""
            />
            <p>Name: {fish.name}</p>
            <p>Price: {fish.price}</p>
          </Card>
        ))}
      </div>

      <ModalAddProduct
        visible={isModalOpen.addProduct}
        onOk={handleOk}
        onCancel={handleCancel}
        setData={setData}
        data={data}
        thumb={thumb}
        setThumb={setThumb}
        slider={slider}
        setSlider={setSlider}
      />
    </div>
  );
};
export default ManageProduct;
