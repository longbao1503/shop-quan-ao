import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [adminSearchText, setAdminSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [cart, setCart] = useState([]);

  const [orders, setOrders] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminView, setAdminView] = useState("products");
  const [editingProductId, setEditingProductId] = useState(null);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [showAuth, setShowAuth] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const [orderInfo, setOrderInfo] = useState({
    customerName: "",
    phone: "",
    address: "",
    note: "",
  });

  useEffect(() => {
    fetch("https://back-end-shop-quan-ao.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("Lỗi lấy sản phẩm:", error);
      });
  }, []);

  const fetchOrders = () => {
    fetch("https://back-end-shop-quan-ao.onrender.com/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log("Lỗi lấy đơn hàng:", error);
      });
  };

  const handleAuthChange = (e) => {
    const { name, value } = e.target;

    setAuthForm({
      ...authForm,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!authForm.email || !authForm.password) {
      alert("Vui lòng nhập email và mật khẩu!");
      return;
    }

    try {
      const res = await fetch("https://back-end-shop-quan-ao.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authForm.email,
          password: authForm.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Đăng nhập thành công!");

        setCurrentUser(data.user);
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        setShowAuth(false);
        setAuthForm({
          name: "",
          email: "",
          password: "",
        });

        if (data.user.role === "admin") {
          fetchOrders();
        }
      } else {
        alert(data.message || "Đăng nhập thất bại!");
      }
    } catch (error) {
      console.log("Lỗi đăng nhập:", error);
      alert("Không thể kết nối đến server!");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!authForm.name || !authForm.email || !authForm.password) {
      alert("Vui lòng nhập đầy đủ họ tên, email và mật khẩu!");
      return;
    }

    try {
      const res = await fetch("https://back-end-shop-quan-ao.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: authForm.name,
          email: authForm.email,
          password: authForm.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Đăng ký thành công! Bạn có thể đăng nhập.");

        setIsRegister(false);
        setAuthForm({
          name: "",
          email: "",
          password: "",
        });
      } else {
        alert(data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.log("Lỗi đăng ký:", error);
      alert("Không thể kết nối đến server!");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setShowAdmin(false);
    alert("Đã đăng xuất!");
  };

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa sản phẩm này không?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const res = await fetch(`https://back-end-shop-quan-ao.onrender.com/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Xóa sản phẩm thành công!");

        const updatedProducts = products.filter(
          (product) => product._id !== productId
        );

        setProducts(updatedProducts);
      } else {
        alert(data.message || "Xóa sản phẩm thất bại!");
      }
    } catch (error) {
      console.log("Lỗi xóa sản phẩm:", error);
      alert("Không thể kết nối đến server!");
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;

    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    });

    setEditingProductId(null);
  };

  const startEditProduct = (product) => {
    setEditingProductId(product._id);

    setProductForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
    });

    setAdminView("products");
  };

  const addOrUpdateProduct = async (e) => {
    e.preventDefault();

    if (currentUser?.role !== "admin") {
      alert("Chỉ admin mới được quản lý sản phẩm!");
      return;
    }

    if (
      !productForm.name ||
      !productForm.price ||
      !productForm.category ||
      !productForm.image ||
      !productForm.description
    ) {
      alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
      return;
    }

    const productData = {
      name: productForm.name,
      price: Number(productForm.price),
      category: productForm.category,
      image: productForm.image,
      description: productForm.description,
    };

    try {
      let res;

      if (editingProductId) {
        res = await fetch(
          `https://back-end-shop-quan-ao.onrender.com/api/products/${editingProductId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          }
        );
      } else {
        res = await fetch("https://back-end-shop-quan-ao.onrender.com/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
      }

      const data = await res.json();

      if (res.ok) {
        if (editingProductId) {
          alert("Cập nhật sản phẩm thành công!");

          const updatedProducts = products.map((product) =>
            product._id === editingProductId ? data.product : product
          );

          setProducts(updatedProducts);
        } else {
          alert("Thêm sản phẩm thành công!");
          setProducts([data.product, ...products]);
        }

        resetProductForm();
      } else {
        alert(data.message || "Thao tác thất bại!");
      }
    } catch (error) {
      console.log("Lỗi thêm/cập nhật sản phẩm:", error);
      alert("Không thể kết nối đến server!");
    }
  };

  const categories = [
    "Tất cả",
    "Áo thun",
    "Áo sơ mi",
    "Áo khoác",
    "Quần jean",
    "Váy",
    "Đầm",
    "Giày",
    "Dép",
    "Phụ kiện",
  ];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchCategory =
      selectedCategory === "Tất cả" || product.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const filteredAdminProducts = products.filter((product) => {
    const keyword = adminSearchText.toLowerCase();

    return (
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)
    );
  });

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrderChange = (e) => {
    const { name, value } = e.target;

    setOrderInfo({
      ...orderInfo,
      [name]: value,
    });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Vui lòng đăng nhập trước khi đặt hàng!");
      setShowAuth(true);
      setIsRegister(false);
      return;
    }

    if (cart.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }

    if (!orderInfo.customerName || !orderInfo.phone || !orderInfo.address) {
      alert("Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ!");
      return;
    }

    const orderData = {
      customerName: orderInfo.customerName,
      phone: orderInfo.phone,
      address: orderInfo.address,
      note: orderInfo.note,
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalPrice: totalPrice,
    };

    try {
      const res = await fetch("https://back-end-shop-quan-ao.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Đặt hàng thành công!");

        setCart([]);

        setOrderInfo({
          customerName: "",
          phone: "",
          address: "",
          note: "",
        });

        fetchOrders();
      } else {
        alert(data.message || "Đặt hàng thất bại!");
      }
    } catch (error) {
      console.log("Lỗi đặt hàng:", error);
      alert("Không thể kết nối đến server!");
    }
  };

  return (
    <div className="app">
      <Header
        currentUser={currentUser}
        handleLogout={handleLogout}
        showAuth={showAuth}
        setShowAuth={setShowAuth}
        isRegister={isRegister}
        setIsRegister={setIsRegister}
        authForm={authForm}
        handleAuthChange={handleAuthChange}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
        setAdminView={setAdminView}
        fetchOrders={fetchOrders}
      />

      <section className="product-section">
        <ProductList
          filteredProducts={filteredProducts}
          searchText={searchText}
          setSearchText={setSearchText}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addToCart={addToCart}
        />

        <Cart
          cart={cart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
          totalPrice={totalPrice}
          orderInfo={orderInfo}
          handleOrderChange={handleOrderChange}
          handleOrderSubmit={handleOrderSubmit}
        />

        {currentUser?.role === "admin" && showAdmin && (
          <AdminDashboard
            adminView={adminView}
            setAdminView={setAdminView}
            fetchOrders={fetchOrders}
            adminSearchText={adminSearchText}
            setAdminSearchText={setAdminSearchText}
            productForm={productForm}
            handleProductChange={handleProductChange}
            addOrUpdateProduct={addOrUpdateProduct}
            editingProductId={editingProductId}
            resetProductForm={resetProductForm}
            filteredAdminProducts={filteredAdminProducts}
            startEditProduct={startEditProduct}
            deleteProduct={deleteProduct}
            orders={orders}
          />
        )}
      </section>
    </div>
  );
}

export default App;