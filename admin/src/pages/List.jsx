import axios from "axios";
import { toast } from "react-toastify";
import { backenUrl } from "../App";
import { useEffect, useState } from "react";

const List = () => {
  const [listData, setListData] = useState([]);
  const currency = "$";
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backenUrl}/api/products/list`);
      if (response.data.success) {
        console.log(response.data);
        setListData(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${backenUrl}/api/products/remove/${productId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product list */}
        {listData.map((product, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm"
            key={index}
          >
            <img className="w-12" src={product.image[0]} alt="" />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>
              {currency}
              {product.price}
            </p>
            <p
              onClick={() => removeProduct(product._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
