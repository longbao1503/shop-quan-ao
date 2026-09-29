function AdminProductManager({
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
}) {
  return (
    <div className="admin-product-section">
      <h2>Quản lý sản phẩm</h2>

      <div className="admin-search-box">
        <input
          type="text"
          placeholder="Tìm sản phẩm cần sửa hoặc xóa..."
          value={adminSearchText}
          onChange={(e) => setAdminSearchText(e.target.value)}
        />
      </div>

      <form className="product-form" onSubmit={addOrUpdateProduct}>
        <h3>{editingProductId ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</h3>

        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={productForm.name}
          onChange={handleProductChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Giá sản phẩm"
          value={productForm.price}
          onChange={handleProductChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Danh mục, ví dụ: Áo thun, Giày, Dép..."
          value={productForm.category}
          onChange={handleProductChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Link ảnh sản phẩm"
          value={productForm.image}
          onChange={handleProductChange}
        />

        <textarea
          name="description"
          placeholder="Mô tả sản phẩm"
          value={productForm.description}
          onChange={handleProductChange}
        ></textarea>

        <button type="submit" className="add-product-btn">
          {editingProductId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </button>

        {editingProductId && (
          <button
            type="button"
            className="cancel-edit-btn"
            onClick={resetProductForm}
          >
            Hủy sửa
          </button>
        )}
      </form>

      <div className="admin-product-list">
        {filteredAdminProducts.length > 0 ? (
          filteredAdminProducts.map((product) => (
            <div className="admin-product-item" key={product._id}>
              <img src={product.image} alt={product.name} />

              <div>
                <h3>{product.name}</h3>
                <p>Danh mục: {product.category}</p>
                <p>Giá: {product.price.toLocaleString("vi-VN")} đ</p>
              </div>

              <div className="admin-product-actions">
                <button
                  className="edit-product-btn"
                  onClick={() => startEditProduct(product)}
                >
                  Sửa
                </button>

                <button
                  className="delete-product-btn"
                  onClick={() => deleteProduct(product._id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-product">
            Không tìm thấy sản phẩm trong phần quản lý.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminProductManager;