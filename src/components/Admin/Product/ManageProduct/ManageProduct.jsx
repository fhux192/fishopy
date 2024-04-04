import { Card, Button, message, Popover } from "antd";
import { useEffect, useState } from "react";
import ModalAddProduct from "../ModalAddProduct/ModalAddProduct";
import { callDeleteProduct, callGetAllProduct } from "../../../../services/api";
import { toast } from "react-toastify";
import ModalEditProduct from "../ModalEditProduct/ModalEditProduct";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [activePopover, setActivePopover] = useState(null);
  const [selectedFish, setSelectedFish] = useState({
    name: "",
    thumb: "",
    slider: [],
    description: "",
    introduction: "",
    price: "",
  });

  const [showModalAddProduct, setShowModalAddProduct] = useState(false);
  const [showModalEditProduct, setShowModalEditProduct] = useState(false);
  const [showPopRemoveProd, setShowPopRemoveProd] = useState(false);

  const fetchProducts = async () => {
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
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      const res = await callDeleteProduct(id);
      if (res.vcode == 0) {
        setProducts((pre) => {
          return pre.filter((product) => product._id !== id);
        });
        message.success("Xóa sản phẩm thành công");
        // close Popover
        setShowPopRemoveProd(false);
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
        onClick={() => setShowModalAddProduct((pre) => (pre = !pre))}
      >
        Thêm sản phẩm
      </Button>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {products.map((fish) => (
          <Card
            key={fish._id}
            extra={
              <div className="flex gap-4">
                <Button
                  type="primary"
                  className="text-black bg-primaryTeal"
                  onClick={() => {
                    setSelectedFish(fish);
                    setShowModalEditProduct((pre) => !pre);
                  }}
                >
                  Sửa
                </Button>
                <Popover
                  open={activePopover === fish._id}
                  content={
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => setActivePopover(null)}
                        className="text-black bg-primaryTeal"
                      >
                        Hủy
                      </Button>
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
        isOpen={showModalAddProduct}
        setShowModalAddProduct={setShowModalAddProduct}
        setProducts={setProducts}
      />

      <ModalEditProduct
        isOpen={showModalEditProduct}
        setShowModalEditProduct={setShowModalEditProduct}
        fish={selectedFish}
        setSelectedFish={setSelectedFish}
        setProducts={setProducts}
      />
    </div>
  );
};
export default ManageProduct;
