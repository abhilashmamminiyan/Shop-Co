import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Breadcrumbs = () => {
    const location = useLocation();
    const categories = useSelector((state) => state.category.categories);
    const product = useSelector((state) => state.products.currentProduct);
    
    // Split the path into segments and filter out empty strings
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Don't show breadcrumbs on the home page or admin pages
    if (pathnames.length === 0 || pathnames[0] === 'admin') {
        return null;
    }

    // Custom breadcrumb for Product Details
    if (pathnames[0] === 'products' && pathnames[1] && product) {
        const category = categories.find(c => c.id === product.categoryId);
        return (
            <div className="container mt-3">
                <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "''", "--bs-breadcrumb-item-padding-x": "0" }}>
                    <ol className="breadcrumb align-items-center">
                        <li className="breadcrumb-item">
                            <Link to="/" className="text-decoration-none text-dark">Home</Link>
                        </li>
                        <li className="breadcrumb-item d-flex align-items-center px-0 mx-0">
                            <i className="bi bi-chevron-right text-muted me-1" style={{ fontSize: '0.8rem' }}></i>
                            <Link to="/shop" className="text-decoration-none text-dark">Shop</Link>
                        </li>
                         {category && (
                            <li className="breadcrumb-item d-flex align-items-center px-0 mx-0">
                                <i className="bi bi-chevron-right text-muted me-1" style={{ fontSize: '0.8rem' }}></i>
                                <Link to={`/category/${category.id}`} className="text-decoration-none text-dark">{category.name}</Link>
                            </li>
                        )}
                        {product.type && (
                             <li className="breadcrumb-item active d-flex align-items-center px-0 mx-0" aria-current="page">
                                <i className="bi bi-chevron-right text-muted me-1" style={{ fontSize: '0.8rem' }}></i>
                                {product.type}
                            </li>
                        )}
                    </ol>
                </nav>
            </div>
        );
    }

    return (
        <div className="container mt-3">
            <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "''", "--bs-breadcrumb-item-padding-x": "0" }}>
                <ol className="breadcrumb align-items-center">
                    <li className="breadcrumb-item mx-0">
                        <Link to="/" className="text-decoration-none text-dark">Home</Link>
                    </li>
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        
                        let displayName = value.charAt(0).toUpperCase() + value.slice(1);

                        // If the previous segment was "category", try to find the category name
                        if (index > 0 && pathnames[index - 1] === "category") {
                            const category = categories.find(c => c.id === value);
                            if (category) {
                                displayName = category.name;
                            }
                        }

                        return isLast ? (
                            <li className="breadcrumb-item active d-flex align-items-center" aria-current="page" key={to}>
                                <i className="bi bi-chevron-right text-muted mx-1" style={{ fontSize: '0.8rem' }}></i>
                                {displayName}
                            </li>
                        ) : (
                            <li className="breadcrumb-item d-flex align-items-center" key={to}>
                                <i className="bi bi-chevron-right text-muted mx-1" style={{ fontSize: '0.8rem' }}></i>
                                <Link to={to} className="text-decoration-none text-dark">{displayName}</Link>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumbs;
