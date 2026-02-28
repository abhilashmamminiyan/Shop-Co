import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/slices/order';
import { Link } from 'react-router-dom';

export default function OrdersPage() {
    const dispatch = useDispatch();
    const { orders, status, error } = useSelector((state) => state.orders);
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchOrders());
        }
    }, [isLoggedIn, dispatch]);

    if (!isLoggedIn) {
        return (
            <div className="container mt-5 text-center">
                <h2>Please Login to View Orders</h2>
                <Link to="/login" className="btn btn-dark mt-3">Login</Link>
            </div>
        )
    }

    if (status === 'loading') return <div className="container mt-5 text-center">Loading orders...</div>;
    if (status === 'failed') return <div className="container mt-5 text-center text-danger">Error: {error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 fw-bold">My Orders</h2>
            {orders.length === 0 ? (
                <div className="text-center">
                    <p>No orders found.</p>
                    <Link to="/shop" className="btn btn-dark">Start Shopping</Link>
                </div>
            ) : (
                <div className="d-flex flex-column gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="card border rounded-4 shadow-sm">
                            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                                <div>
                                    <span className="text-muted small">ORDER ID</span>
                                    <div className="fw-bold">#{order.id.slice(0, 8)}</div>
                                </div>
                                <div>
                                    <span className="text-muted small">DATE</span>
                                    <div className="fw-bold">{new Date(order.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div>
                                    <span className="text-muted small">TOTAL</span>
                                    <div className="fw-bold">${order.totalAmount}</div>
                                </div>
                                <div>
                                    <span className="badge bg-success rounded-pill px-3">{order.status}</span>
                                </div>
                            </div>
                            <div className="card-body">
                                {order.Products.map((product) => (
                                    <div key={product.id} className="d-flex align-items-center mb-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="rounded"
                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                        />
                                        <div className="ms-3 flex-grow-1">
                                            <h6 className="mb-0 fw-bold">{product.name}</h6>
                                            <div className="text-muted small">
                                                Size: {product.OrderItem.size || 'N/A'} 
                                                {product.OrderItem.color && (
                                                    <>
                                                        {' | '} 
                                                        Color: <span className="d-inline-block rounded-circle border" style={{ width: '12px', height: '12px', backgroundColor: product.OrderItem.color, verticalAlign: 'middle' }}></span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="text-muted small">Qty: {product.OrderItem.quantity} × ${product.OrderItem.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
