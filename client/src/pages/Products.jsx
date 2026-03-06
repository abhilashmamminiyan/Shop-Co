import { useState } from "react";
import FilterSidebar from "../components/category/FilterSideBar";
import ProductList from "../components/products/ProductList";
import { Drawer, IconButton, Box } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Products() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="container position-relative">
      <div className="row">
         {/* Page Header */}
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <h2 className="fw-bold m-0">Shop</h2>
            
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
                <FilterListIcon fontSize="small" />
              </IconButton>
            </Box>
         </Box>

        {/* Desktop Sidebar */}
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
              maxHeight: '80vh' // Don't take full height
            },
          }}
        >
          <Box sx={{ p: 2, pt: 4 }}> {/* Increased top padding for handle/grip visual */}
            <Box sx={{ width: '40px', height: '4px', bgcolor: '#e0e0e0', borderRadius: '2px', mx: 'auto', mb: 2 }} /> {/* Handle bar */}
            <FilterSidebar onApply={handleDrawerToggle} onClose={handleDrawerToggle} />
          </Box>
        </Drawer>

        <div className="col-12 col-md-9">
          <ProductList />
        </div>
      </div>
    </div>
  )
}
