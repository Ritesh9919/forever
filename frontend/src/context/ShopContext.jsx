import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/carts/add`,
          { itemId, size },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const getCartsCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.put(
          `${backendUrl}/api/carts/update`,
          { itemId, size, quantity },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalPrice = 0;
    for (let items in cartItems) {
      const product = products.find((item) => item._id === items);
      if (!product) continue;
      const price = product.price;
      // sum quantity of all sizes
      const quantity = Object.values(cartItems[items]);
      const totalItems = quantity.reduce((sum, qty) => sum + qty, 0);
      totalPrice += price * totalItems;
    }
    return totalPrice;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.get(`${backendUrl}/api/carts/get`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    getCartsCount,
    updateQuantity,
    getCartAmount,
    setCartItems,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
