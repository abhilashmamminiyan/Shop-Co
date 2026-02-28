import { useState, useEffect } from "react";
import FilterSidebar from "../components/category/FilterSideBar";
import ProductList from "../components/products/ProductList";
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setDraftCategory } from "../store/slices/filterSlice";
import { fetchCategories } from "../store/category/categoryThunk"; // Ensure correct path
import { Drawer, IconButton, Box, useTheme, useMediaQuery } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';

export default function CategoryPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);

  const category = categories.find(c => c.id === id);

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (category) {
      dispatch(setDraftCategory(category.id));
    }
  }, [category, dispatch]);

  if (status === 'loading') {
    return (
      <div className="container">
        <div className="row container">
          <div className="col-0 col-md-3 d-flex align-items-center text-center"> Loading...</div>
          <div className="col-12 col-md-9">
            <div
              className="d-flex flex-column justify-content-center align-items-center text-center"
              style={{ minHeight: "50vh" }}
            >
              <h2 className="mb-3">Products Loading</h2>
              <Link to="/" className="btn btn-outline-dark">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{ minHeight: "50vh" }}
      >
        <h2 className="mb-3">Category Not Found</h2>
        <Link to="/" className="btn btn-outline-dark">
          Back to Home
        </Link>
      </div>

    )
  }

  return (
    <div className="container position-relative">

      <div className="row">
         {/* Page Header */}
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <h2 className="fw-bold m-0">{category.name}</h2>
            
            {/* Mobile Filter Button */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton 
                onClick={handleDrawerToggle}
                sx={{ 
                  backgroundColor: '#f0f0f0', 
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  '&:hover': { backgroundColor: '#e0e0e0' }
                }}
              >
                <img
            className="icons"
            src="/icons/filter-icon.svg"
            alt="filter-icon"
            style={{ filter: 'brightness(0) saturate(100%) invert(65%)' }}
            />
              </IconButton>
            </Box>
         </Box>

        <div className="col-0 col-md-3 d-none d-md-block">
          <FilterSidebar />
        </div>

        {/* Mobile Drawer */}
        <Drawer
          anchor="bottom"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: '100%',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              maxHeight: '80vh' 
            },
          }}
        >
           <Box sx={{ p: 2, pt: 4 }}>
            <Box sx={{ width: '40px', height: '4px', bgcolor: '#e0e0e0', borderRadius: '2px', mx: 'auto', mb: 2 }} />
            <FilterSidebar onApply={handleDrawerToggle} onClose={handleDrawerToggle} />
          </Box>
        </Drawer>

        <div className="col-12 col-md-9">
          <ProductList category={category} />
        </div>
      </div>
    </div>
  )
}
