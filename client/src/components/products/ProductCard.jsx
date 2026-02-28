import { Link } from 'react-router-dom';
import StarRating from '../common/StarRating';

export default function ProductCard({ product }) {

  return (
    <div className="card h-100 border-0 w-100">
      <Link
          to={`/products/${product.id}`}
          className="text-decoration-none text-dark"
        >
      <img
        src={product.image}
        style={{ width:'100%', height: 'auto'}}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body d-flex flex-column">
        <h5 
        className="card-title text-start text-satoshi" 
        style={{fontSize:"1.3em", fontWeight: "900"}}
        >
          {product.name}
        </h5>
        <div className="d-flex flex-column align-items-start mt-1">
         <div className='mb-1'>
          {StarRating(product.rating)} {product.rating ?? 0}/5
        </div>
        <p className="card-text">${product.price}</p>
        </div>
      </div>
      </Link>
    </div>
  );
}
