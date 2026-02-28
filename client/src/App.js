
import { Routes, Route } from "react-router-dom";
import Breadcrumbs from "./components/common/Breadcrumbs";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import OrdersPage from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import CategoryDetails from "./pages/CategoryPage";
import Products from './pages/Products';

function App() {
  return (
    <>
      <Breadcrumbs />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:id" element={<CategoryDetails />} />
      <Route path="/shop" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  );
}

export default App;