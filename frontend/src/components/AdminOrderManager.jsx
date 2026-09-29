function AdminOrderManager({ orders }) {
  return (
    <div className="admin-order-section">
      <h2>Quản lý đơn hàng</h2>

      {orders.length === 0 ? (
        <p className="empty-cart">Chưa có đơn hàng nào.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h3>Đơn hàng của {order.customerName}</h3>

              <p>
                <strong>Số điện thoại:</strong> {order.phone}
              </p>

              <p>
                <strong>Địa chỉ:</strong> {order.address}
              </p>

              {order.note && (
                <p>
                  <strong>Ghi chú:</strong> {order.note}
                </p>
              )}

              <p>
                <strong>Trạng thái:</strong> {order.status}
              </p>

              <p>
                <strong>Ngày đặt:</strong>{" "}
                {new Date(order.createdAt).toLocaleString("vi-VN")}
              </p>

              <div className="order-products">
                <strong>Sản phẩm:</strong>

                {order.items.map((item, index) => (
                  <div className="order-product" key={index}>
                    <img src={item.image} alt={item.name} />

                    <div>
                      <p>{item.name}</p>
                      <span>
                        {item.price.toLocaleString("vi-VN")} đ x{" "}
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="order-total">
                Tổng tiền: {order.totalPrice.toLocaleString("vi-VN")} đ
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrderManager;