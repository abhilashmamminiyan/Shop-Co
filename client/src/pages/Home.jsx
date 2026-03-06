import ProductCard from "../components/products/ProductCard";
import styles from '../styles/Home.module.css';
import BrandsMarquee from "../components/BrandsMarquee";
import TestimonialCarousel from '../components/TestimonialCarousel';
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from '../store/category/categoryThunk';
import { fetchProducts } from '../store/slices/productSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories || []);
  const { list: products } = useSelector((state) => state.products);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [categories.length, products.length, dispatch]);

  const brands = [
    { name: "versace", logo: "/images/brand-versace.png" },
    { name: "zara", logo: "/images/brand-zara.png" },
    { name: "gucci", logo: "/images/brand-gucci.png" },
    { name: "prada", logo: "/images/brand-prada.png" },
    { name: "calvin-klein", logo: "/images/brand-calvin-klein.png" }
  ]

  const stats = [
    {
      title: '200+',
      description: 'International Brands',
      col: 6
    },
    {
      title: '2000+',
      description: 'High-Quality Products',
      col: 6
    },
    {
      title: '30,000+',
      description: 'Happy Customers',
      col: 12
    },
  ]

  const testimonials = [
    {
      name: "Emily R.",
      message: "\"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.\""
    },
    {
      name: 'Sarah M',
      message: "\"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.\""
    },
    {
      name: 'Alex K',
      message: "\"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.\""
    },
    {
      name: "James L.",
      message: "\"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.\""
    },
    {
      name: "Mooen",
      message: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
    }
  ]

  // Improve logic for new arrivals / top sale if possible. For now, just slice.
  const newArrivalProducts = products.slice(0, 4);
  const topSaleProducts = products.slice(4, 8);

  return (
    <>
      {/* Hero Section */}
      <section id="hero-section" className="bg-light">
        <div className="container">
          <div className="row ">
            <div className="col-12 col-md-6 mb-4 mb-md-0 pt-5 mt-md-5">
              <h1 className={styles.heroTitle} >
                FIND CLOTHES <br />
                THAT MATCHES <br />
                YOUR STYLE
              </h1>
              <p className={styles.heroDescription}>
                Browse through our diverse range of meticulously crafted garments,
                designed to bring out your individuality and cater to your sense of style.
              </p>
              <Link to="/shop">
                <button className={`btn btn-dark rounded-5 px-md-5 py-md-2 ${styles.heroBtn}`}>
                  Shop Now
                </button>
              </Link>
              <div className="row text-center py-3 py-md-5">
                {stats.map((stat, index) => (
                  <div key={index} className={`col-${stat.col} col-md-4`}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.5em' }} >
                      {stat.title}
                    </span>
                    <p style={{ fontSize: '0.7em' }}>
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className={styles.heroImageWrapper}>
                <img
                  className={`${styles.heroImage}`}
                  src="/images/hero-img.png"
                  alt="hero-image"
                />
                <img
                  src="/images/hero-star.png"
                  alt="hero-star"
                  className={styles.heroStar}
                />
                <img
                  src="/images/hero-star.png"
                  alt="hero-star"
                  className={styles.heroStar2}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Brand Section */}
        <BrandsMarquee brands={brands} />
      </section>

      {/* new Arrival Section */}
      <section className="mt-5 container">
        <h1 className={`mb-5 text-center ${styles.textTitle}`}>New Arrivals</h1>
        <div className="row g-4 mt-3">
          {newArrivalProducts.map((product) => (
            <div key={product.id} className="col-md-3 col-6">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/shop">
            <button className={`btn btn-outline-secondary rounded-5 px-5 ${styles.viewBtn}`}>View All</button>
          </Link>
        </div>
      </section>

      {/* Top Sale Section */}
      <section className={`my-5 container pt-5 ${styles.sectionBorder}`}>
        <h1
          className={`mb-5 text-center ${styles.textTitle}`}
        >Top Selling</h1>
        <div className="row g-4 mt-3">
          {topSaleProducts.map((product) => (
            <div key={product.id} className="col-md-3 col-6">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/shop">
            <button className={`btn btn-outline-secondary rounded-5 px-5 ${styles.viewBtn}`}>View All</button>
          </Link>
        </div>
      </section>

      {/* Category Section */}
      <section className="container border-3 rounded-5 p-5 text-center" style={{ backgroundColor: '#F0F0F0' }}>
        <h1 className={`mb-4 text-center ${styles.textTitle} text-uppercase`}>
          Browse By Dress Style
        </h1>
        <div className="row g-4 mt-2 p-3">
          {categories && categories.map((category, i) => (
            <div key={category.id} className={i % 4 === 1 || i % 4 === 2 ? 'col-12 col-md-8' : 'col-12 col-md-4'}>
              <Link to={`/category/${category.id}`} style={{ textDecoration: 'none' }}>
                <img
                  src={category.image}
                  alt={category.name}
                  className={`img-fluid rounded-4 ${styles.categoryImage}`}
                />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="container-fluid px-0 pt-3">
        <TestimonialCarousel testimonials={testimonials} />
      </section>
    </>
  );
}
