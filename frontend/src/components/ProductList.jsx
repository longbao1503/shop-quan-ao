import ProductCard from "./ProductCard";

function ProductList({
  filteredProducts,
  searchText,
  setSearchText,
  categories,
  selectedCategory,
  setSelectedCategory,
  addToCart,
}) {
  return (
    <>
      <h2>Danh sách sản phẩm</h2>

      <div className="filter-box">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className="category-list">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p className="no-product">Không tìm thấy sản phẩm phù hợp.</p>
        )}
      </div>
    </>
  );
}

export default ProductList;