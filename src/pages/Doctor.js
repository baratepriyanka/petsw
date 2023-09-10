import { useState } from 'react';
// material
import { Container, Stack, Typography,Button } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
// import Button from '@mui/material/Button';



// ----------------------------------------------------------------------

export default function Doctor() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
      Doctor
        </Typography>
        <Button variant="outlined" direction="row" flexWrap="wrap-reverse"  justifyContent="flex-end" sx={{backgroundColor: '#08670f'}} >
        Add New
      </Button>

  

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}

        {/* <ProductList products={PRODUCTS} /> */}
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
