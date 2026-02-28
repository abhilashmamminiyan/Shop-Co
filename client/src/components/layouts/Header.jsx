import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/auth';
import { fetchCategories } from "../../store/category/categoryThunk";
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OfferStrip from "../OfferStrip";

export default function Header() {
  const { items } = useSelector(state => state.cart);
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const categories = useSelector(state => state.category.categories || []);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  if (location.pathname.startsWith('/admin')) {
      return null;
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <>
      <OfferStrip />
      <div className="header container py-3" style={{ borderBottom: '2px solid #d1d5db' }}>
        <Link className="navbar-brand order-1 order-md-0" to="/">
          SHOP.CO
        </Link>
        <div className="d-flex align-items-center gap-3 order-1 order-md-2">
          <div className="d-flex d-md-none align-items-center ms-3">
            <button
              type="button"
              className="btn p-0 border-0 bg-transparent"
              aria-label="Search"
            >
              <img
                className='icons'
                src="/icons/search-icon.svg"
                alt="search-icon"
              />
            </button>
          </div>
          <Link to="/cart" className="text-dark fs-5 position-relative">
            <img
              className='icons'
              src="/icons/cart-icon.svg"
              alt="cart-icon"
            />
            {items.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6em' }}>
                {items.length}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="dropdown">
              <button className="btn p-0 border-0 bg-transparent" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img className='icons' src="/icons/user-icon.svg" alt="user-icon" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><span className="dropdown-item-text fw-bold">Hi, {user?.username || 'User'}</span></li>
                <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="text-dark fs-5">
              <img
                className='icons'
                src="/icons/user-icon.svg"
                alt="user-icon"
              />
            </Link>
          )}

        </div>
        <nav className="navbar navbar-expand-lg order0 order-md-1">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav gap-5 mx-5 w-100">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle custom-caret"
                    to="/shop"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Shop
                  </Link>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link className="dropdown-item" to="/shop">
                        All Products
                      </Link>
                      <div className="dropdown-divider"></div>
                      {categories.map((cat) => (
                        <Link key={cat.id} className="dropdown-item" to={`/category/${cat.id}`}>
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/shop">
                    On Sale
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/shop">
                    New Arrivals
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/shop">
                    Brands
                  </Link>
                </li>
              </ul>
              <form className="d-flex align-items-center me-3 w-50 d-none d-md-block">
                <div className="input-group rounded-pill bg-light px-3">
                  <span className="input-group-text bg-transparent border-0">
                    <img
                      className='icons'
                      style={{ height: '1.2em' }}
                      src="/icons/search-icon.svg"
                      alt="cart-icon"
                    />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-transparent border-0"
                    placeholder="Search for products..."
                  />
                </div>
              </form>
            </div>
          </div>
        </nav>
        <hr className="my-1 text-secondary" />
      </div>
    </>
  )
}
