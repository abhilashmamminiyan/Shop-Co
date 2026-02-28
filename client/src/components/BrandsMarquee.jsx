

export default function BrandsMarquee({ brands }) {
  return (
    <div className="brands-marquee">
      <div className="brands-track">
        {[...brands, ...brands].map((brand, index) => (
          <div className="brand-item" key={index}>
            <img
              src={brand.logo}
              alt={brand.name}
              className="brand-logo"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
