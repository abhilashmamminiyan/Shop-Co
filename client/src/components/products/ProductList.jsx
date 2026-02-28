import { useEffect } from 'react';
import ProductCard from './ProductCard';
import './productList.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectFilteredProducts } from '../../store/slices/productSlice';
import { useParams } from 'react-router-dom';
import { setDraftCategory, applyFilters } from '../../store/slices/filterSlice';

export default function ProductList() {
  const dispatch = useDispatch();
  const { id: categoryId } = useParams();

  // We can use the selector, but we also need to ensure URL category is applied
  const filteredProducts = useSelector(selectFilteredProducts);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Sync URL category to filters
  useEffect(() => {
    if (categoryId) {
      dispatch(setDraftCategory(categoryId));
      dispatch(applyFilters());
    } else {
      // If no category in URL, maybe clear it? 
      // depends on specific logic, but for "Shop" page usually we want all or previous state.
      // Let's clear it if we are on /shop (no id) to avoid stuck filters
      dispatch(setDraftCategory(null));
      dispatch(applyFilters());
    }
  }, [categoryId, dispatch]);

  if (status === 'loading' && filteredProducts.length === 0) return <p>Loading products...</p>;
  if (status === 'failed') return <p>Error: {error && error.message ? error.message : "Unknown error"}</p>;

  return (
    <div className="product-list-container">
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="col-md-4 col-6 mb-4">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center mt-5">
            <p>No products found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
