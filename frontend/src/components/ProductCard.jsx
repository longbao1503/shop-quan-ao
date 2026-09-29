function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="description">{product.description}</p>
        <p className="price">{product.price.toLocaleString("vi-VN")} đ</p>

        <button onClick={() => addToCart(product)}>Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
}

export default ProductCard;