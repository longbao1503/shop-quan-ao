import AuthForm from "./AuthForm";

function Header({
  currentUser,
  handleLogout,
  showAuth,
  setShowAuth,
  isRegister,
  setIsRegister,
  authForm,
  handleAuthChange,
  handleLogin,
  handleRegister,
  showAdmin,
  setShowAdmin,
  setAdminView,
  fetchOrders,
}) {
  return (
    <header className="header">
      <div className="header-overlay">
        <p className="header-tag">Bộ sưu tập thời trang mới</p>
        <h1>Shop Quần Áo Online</h1>
        <p>Website bán quần áo, giày dép và phụ kiện trực tuyến cơ bản</p>

        <button className="header-btn">Mua sắm ngay</button>

        <div className="auth-area">
          {currentUser ? (
            <>
              <p className="user-info">
                Xin chào, <strong>{currentUser.name}</strong> (
                {currentUser.role === "admin" ? "Admin" : "Khách hàng"})
              </p>

              <button className="logout-btn" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <button
              className="login-toggle-btn"
              onClick={() => {
                setShowAuth(!showAuth);
                setIsRegister(false);
              }}
            >
              Đăng nhập
            </button>
          )}

          {currentUser?.role === "admin" && (
            <button
              className="admin-toggle-btn"
              onClick={() => {
                setShowAdmin(!showAdmin);
                setAdminView("products");
                fetchOrders();
              }}
            >
              {showAdmin ? "Ẩn quản lý" : "Quản lý admin"}
            </button>
          )}
        </div>

        {showAuth && !currentUser && (
          <AuthForm
            isRegister={isRegister}
            authForm={authForm}
            handleAuthChange={handleAuthChange}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            setIsRegister={setIsRegister}
          />
        )}
      </div>
    </header>
  );
}

export default Header;