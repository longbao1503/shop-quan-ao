import AdminProductManager from "./AdminProductManager";
import AdminOrderManager from "./AdminOrderManager";

function AdminDashboard({
  adminView,
  setAdminView,
  fetchOrders,
  adminSearchText,
  setAdminSearchText,
  productForm,
  handleProductChange,
  addOrUpdateProduct,
  editingProductId,
  resetProductForm,
  filteredAdminProducts,
  startEditProduct,
  deleteProduct,
  orders,
}) {
  return (
    <div className="admin-section">
      <h2>Khu vực quản trị</h2>

      <div className="admin-menu">
        <button
          className={
            adminView === "products"
              ? "admin-menu-btn active"
              : "admin-menu-btn"
          }
          onClick={() => setAdminView("products")}
        >
          🛍️ Quản lý sản phẩm
        </button>

        <button
          className={
            adminView === "orders"
              ? "admin-menu-btn active"
              : "admin-menu-btn"
          }
          onClick={() => {
            setAdminView("orders");
            fetchOrders();
          }}
        >
          📦 Quản lý đơn hàng
        </button>
      </div>

      {adminView === "products" && (
        <AdminProductManager
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
        />
      )}

      {adminView === "orders" && <AdminOrderManager orders={orders} />}
    </div>
  );
}

export default AdminDashboard;