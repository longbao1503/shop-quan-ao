function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  totalPrice,
  orderInfo,
  handleOrderChange,
  handleOrderSubmit,
}) {
  return (
    <div className="cart-section">
      <h2>Giỏ hàng của bạn</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Giỏ hàng đang trống.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>{item.price.toLocaleString("vi-VN")} đ</p>

                  <div className="quantity-box">
                    <button onClick={() => decreaseQuantity(item._id)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item._id)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-actions">
                  <p>
                    {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                  </p>
                  <button onClick={() => removeFromCart(item._id)}>Xóa</button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="total-price">
            Tổng tiền: {totalPrice.toLocaleString("vi-VN")} đ
          </h3>

          <form className="order-form" onSubmit={handleOrderSubmit}>
            <h2>Thông tin đặt hàng</h2>

            <input
              type="text"
              name="customerName"
              placeholder="Nhập họ tên"
              value={orderInfo.customerName}
              onChange={handleOrderChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={orderInfo.phone}
              onChange={handleOrderChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Nhập địa chỉ nhận hàng"
              value={orderInfo.address}
              onChange={handleOrderChange}
            />

            <textarea
              name="note"
              placeholder="Ghi chú nếu có"
              value={orderInfo.note}
              onChange={handleOrderChange}
            ></textarea>

            <button type="submit" className="order-btn">
              Đặt hàng
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Cart;