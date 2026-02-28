import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart, updateItemQuantityAsync } from "../store/slices/cart";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/common/Alert";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, cartTotalAmount, status } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [alertState, setAlertState] = useState({ show: false, type: 'info', title: '', message: '' });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = (id, currentQuantity, change, size = '', color = '') => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      dispatch(updateItemQuantityAsync({ productId: id, quantity: newQuantity, size, color }));
    }
  };

  const handleRemove = (id, size = '', color = '') => {
    dispatch(removeFromCart({ productId: id, size, color }));
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };



  if (status === 'loading') return <p className="container mt-5">Loading cart...</p>;

  if (items.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Your Cart is Empty</h2>
        <Link to="/shop" className="btn btn-dark mt-3">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-uppercase mb-4" style={{ fontFamily: 'IntegralCF', fontWeight: 'bold' }}>Your Cart</h1>
      <div className="row">
        <div className="col-md-8">
          {items.map((item) => (
            <div key={`${item.id}-${item.CartItem.size}-${item.CartItem.color || ''}`} className="card mb-3 border rounded-4 p-3">
              <div className="row g-0 align-items-center">
                <div className="col-md-2">
                  <img
                    src={item.image}
                    className="img-fluid rounded-3"
                    alt={item.name}
                    style={{ height: '100px', width: '100px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{item.name}</h5>
                    <p className="card-text mb-1">
                        Size: <span className="text-secondary">{item.CartItem.size || 'No Size'}</span>
                    </p>
                    {item.CartItem.color && (
                        <p className="card-text mb-1 d-flex align-items-center gap-2">
                           Color: 
                           <span 
                             className="d-inline-block rounded-circle border" 
                             style={{ 
                                 width: '16px', 
                                 height: '16px', 
                                 backgroundColor: item.CartItem.color 
                             }} 
                             title={item.CartItem.color}
                           />
                        </p>
                    )}
                    <p className="fw-bold fs-5 mt-2">${item.price}</p>
                  </div>
                </div>
                <div className="col-md-2 text-end">
                  <div className="d-flex flex-column align-items-end gap-3">
                    <button className="btn text-danger" onClick={() => handleRemove(item.id, item.CartItem.size, item.CartItem.color)}>
                      <i className="bi bi-trash"></i>
                    </button>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-light border rounded-circle"
                        onClick={() => handleQuantityChange(item.id, item.CartItem.quantity, -1, item.CartItem.size, item.CartItem.color)}
                        disabled={item.CartItem.quantity <= 1}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <div className="bg-light rounded-pill px-3 py-1 fw-bold">
                        {item.CartItem.quantity}
                      </div>
                      <button
                        className="btn btn-sm btn-light border rounded-circle"
                        onClick={() => handleQuantityChange(item.id, item.CartItem.quantity, 1, item.CartItem.size, item.CartItem.color)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card border rounded-4 p-4">
            <h4 className="mb-3 fw-bold">Order Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span className="fw-bold">${cartTotalAmount}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Discount (-20%)</span>
              <span className="text-danger">-$0 (Mock)</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Delivery Fee</span>
              <span>$15</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-5">Total</span>
              <span className="fw-bold fs-5">${cartTotalAmount + 15}</span>
            </div>
            <button className="btn btn-dark w-100 rounded-pill py-2" onClick={handleCheckout}>
              Go to Checkout <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
      <Alert
        show={alertState.show}
        onHide={() => setAlertState({ show: false, type: 'info', title: '', message: '' })}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
      />
    </div>
  );
}
