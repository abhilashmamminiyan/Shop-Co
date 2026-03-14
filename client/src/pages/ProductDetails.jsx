import { useEffect, useState } from "react";
import '../styles/ProductDetails.css'
import { getImageUrl } from '../utils/imageUrl';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import StarRating from "../components/common/StarRating";
import Alert from "../components/common/Alert";
import Toast from "../components/common/Toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../store/slices/productSlice";
import { addToCart, fetchCart } from "../store/slices/cart";
import ProductReviews from "../components/product/ProductReviews";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.currentProduct);
  const cartItems = useSelector((state) => state.cart.items);
  const [activeImage, setActiveImage] = useState("");
  const [alertState, setAlertState] = useState({ show: false, type: 'info', title: '', message: '' });
  const [toastState, setToastState] = useState({ show: false, message: '' });
  // Removed isAdded state
  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [showSizeError, setShowSizeError] = useState(false);
  const [showColorError, setShowColorError] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const isItemInCart = product && cartItems.some(item => 
    item.id === product.id && 
    (!activeSize || item.CartItem.size === activeSize) &&
    (!activeColor || item.CartItem.color === activeColor)
  );


  const handleIncrement = () => {
    setQuantity(prev => (prev < 10 ? prev + 1 : 10));
  };

  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (isItemInCart) {
      navigate('/cart');
      return;
    }

    if (product) {
       let hasError = false;
       if (product.sizes && product.sizes.length > 0 && !activeSize) {
        setShowSizeError(true);
        hasError = true;
      }
      if (product.colors && product.colors.length > 0 && !activeColor) {
        setShowColorError(true);
        hasError = true;
      }

      if (hasError) return;

      dispatch(addToCart({ 
        productId: product.id, 
        quantity: quantity, 
        size: activeSize,
        color: activeColor 
      })).then((result) => {
        if (result.type === addToCart.fulfilled.type) {
           // setIsAdded(true); // No longer needed
           setToastState({
             show: true,
             message: `${product.name} - ${quantity} added to cart`
           });
        } else if (result.type === addToCart.rejected.type) {
          setAlertState({
            show: true,
            type: 'error',
            title: 'Failed',
            message: 'Failed to add product to cart: ' + (result.payload?.message || 'Please try again')
          });
        }
      }).catch(err => {
        setAlertState({
          show: true,
          type: 'error',
          title: 'Error',
          message: 'Error adding to cart: ' + err.message
        });
      });
    }
  }

  if (!product) return <p className="container mt-5">Loading or Product not found...</p>;

  const images = product.images || (product.image ? [product.image] : []);

  return (
    <>
    <div className="container mt-5">

      <div className="row">


        {images.length > 0 ? (
          <div className="col-md-6 d-flex flex-column flex-md-row gap-3">
             {/* thumbnails */}
            <div className="d-flex flex-row flex-md-column gap-2 order-2 order-md-1 overflow-auto" 
                 style={{ maxHeight: '500px', width: 'fit-content' }}> {/* Limit height for vertical scroll if needed */}
              {images.map((image, index) => (
                <img
                  key={index}
                  src={getImageUrl(image)}
                  alt={`thumbnail-${index}`}
                  className={`img-fluid rounded thumbnail
                    ${activeImage === image ? "active-thumb" : ""}`
                  }
                  style={{ cursor: "pointer", objectFit: 'cover', width: '80px', height: '80px', flexShrink: 0 }}
                  onMouseEnter={() => setActiveImage(image)}
                  onClick={() => setActiveImage(image)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-grow-1 mb-3 mb-md-0 order-1 order-md-2">
              <img
                src={getImageUrl(activeImage || product.image)}
                alt={product.name}
                className="img-fluid rounded w-100"
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </div>
          </div>
        ) : (
          <div className="col-md-6 mb-3 mb-md-0 order-1 col-md-6">
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="img-fluid rounded w-100"
            />
          </div>
        )}

        {/* Product Details */}
        <div className="col-md-6 order-2">
          <h2
            className="text-satoshi"
            style={{ fontSize: "2em", fontWeight: 'bold' }}
          >{product.name}</h2>

          <div className="d-flex align-items-center mb-3">
            {StarRating(product.rating || 0)}
            <span className="ms-2">{product.rating}/5</span>
          </div>

          <h4 className="text-dark fw-bold display-6">${product.price}</h4>

          <p className="mt-3 text-secondary">{product.description}</p>

          <div className="d-flex flex-column gap-3 mt-4">
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className={`mb-2 ${showSizeError ? 'text-danger fw-bold' : 'text-secondary'}`}>
                  {showSizeError ? 'Please select a size' : 'Choose Size'}
                </p>
                <div className={`d-flex gap-2 p-1 rounded ${showSizeError ? 'border border-danger' : ''}`} style={{ width: 'fit-content' }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`btn ${activeSize === size ? 'btn-dark' : 'btn-outline-dark'} rounded-pill px-3 py-1`}
                      onClick={() => {
                        setActiveSize(size);
                        setShowSizeError(false);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
                <div>
                  <p className={`mb-2 ${showColorError ? 'text-danger fw-bold' : 'text-secondary'}`}>
                    {showColorError ? 'Please select a color' : 'Choose Color'}
                  </p>
                  <div className={`d-flex gap-2 p-1 rounded ${showColorError ? 'border border-danger' : ''}`} style={{ width: 'fit-content' }}>
                    {product.colors.map(color => (
                      <button
                        key={color}
                        className={`btn rounded-circle p-0`}
                        style={{
                            width: '30px', 
                            height: '30px', 
                            backgroundColor: color, 
                            border: activeColor === color ? '2px solid black' : '1px solid #ccc',
                            boxShadow: activeColor === color ? '0 0 0 2px white, 0 0 0 4px black' : 'none'
                        }}
                        onClick={() => {
                          setActiveColor(color);
                          setShowColorError(false);
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
            )}
          </div>
          <hr className="my-4" />
          <div className="d-flex gap-3">
            <div className="input-group" style={{ width: '120px' }}>
              <button className="btn btn-outline-secondary" onClick={handleDecrement}>-</button>
              <input type="text" className="form-control text-center" value={quantity} readOnly />
              <button className="btn btn-outline-secondary" onClick={handleIncrement}>+</button>
            </div>
            <button className="btn btn-dark rounded-pill px-5 flex-grow-1" onClick={handleAddToCart}>
              {isItemInCart ? "Go to Cart" : "Add to Cart"}
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
      <Toast
        show={toastState.show}
        message={toastState.message}
        onClose={() => setToastState({ ...toastState, show: false })}
      />
    </div>
    <div className="container-fluid mt-5 px-0 px-md-4 w-100"> 
       <Box sx={{ width: '100%' }}>
          <ProductReviews product={product} />
       </Box>
    </div>
    </>
  );
}
