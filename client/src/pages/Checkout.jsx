import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, clearCart } from "../store/slices/cart";
import { placeOrder } from "../store/slices/order";
import { useNavigate } from "react-router-dom";
import Alert from "../components/common/Alert";

export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, cartTotalAmount, status } = useSelector((state) => state.cart);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [alertState, setAlertState] = useState({ show: false, type: 'info', title: '', message: '' });
    const orderStatus = useSelector((state) => state.orders.status);
    const isPlacingOrder = orderStatus === 'loading';

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: '/checkout' } });
            return;
        }
        dispatch(fetchCart());
    }, [isLoggedIn, navigate, dispatch]);

    const handlePlaceOrder = async () => {
        try {
            const resultAction = await dispatch(placeOrder());
            if (placeOrder.fulfilled.match(resultAction)) {
                setAlertState({
                    show: true,
                    type: 'success',
                    title: 'Success',
                    message: 'Order placed successfully!'
                });
                dispatch(clearCart());
                dispatch(fetchCart());
                navigate('/order-success');
            } else {
                 if (resultAction.payload) {
                    const errorMessage = resultAction.payload.message || 'Order placement failed. Please try again.';
                    setAlertState({
                        show: true,
                        type: 'error',
                        title: 'Order Failed',
                        message: errorMessage
                    });
                 } else {
                     setAlertState({
                        show: true,
                        type: 'error',
                        title: 'Order Failed',
                        message: resultAction.error.message
                    });
                 }
            }
        } catch (error) {
            console.error("Order placement failed", error);
            setAlertState({
                show: true,
                type: 'error',
                title: 'Order Failed',
                message: 'An unexpected error occurred.'
            });
        }
    };

    if (status === 'loading') return <p className="container mt-5">Loading checkout...</p>;

    if (items.length === 0 && !isPlacingOrder) {
        return (
            <div className="container mt-5 text-center">
                <h2>Your Cart is Empty</h2>
                <button className="btn btn-dark mt-3" onClick={() => navigate('/shop')}>Start Shopping</button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-uppercase mb-4" style={{ fontFamily: 'IntegralCF', fontWeight: 'bold' }}>Checkout</h1>
            <div className="row">
                <div className="col-md-7">
                    <h4 className="mb-3">Order Items</h4>
                    {items.map((item) => (
                        <div key={`${item.id}-${item.CartItem.size}`} className="card mb-3 border rounded-4 p-3">
                            <div className="row g-0 align-items-center">
                                <div className="col-md-2">
                                    <img
                                        src={item.image}
                                        className="img-fluid rounded-3"
                                        alt={item.name}
                                        style={{ height: '60px', width: '60px', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="col-md-10">
                                    <div className="card-body py-0">
                                        <h6 className="card-title fw-bold">{item.name}</h6>
                                        <p className="card-text mb-0"><small>Size: {item.CartItem.size || 'N/A'} | Qty: {item.CartItem.quantity}</small></p>
                                        <p className="fw-bold mb-0">${item.price * item.CartItem.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-5">
                    <div className="card border rounded-4 p-4">
                        <h4 className="mb-3 fw-bold">Order Summary</h4>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span className="fw-bold">${cartTotalAmount}</span>
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
                        <button 
                            className="btn btn-dark w-100 rounded-pill py-2" 
                            onClick={handlePlaceOrder}
                            disabled={isPlacingOrder}
                        >
                            {isPlacingOrder ? "Placing Order..." : <><i className="bi bi-check-circle me-2"></i>Place Order</>} 
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
