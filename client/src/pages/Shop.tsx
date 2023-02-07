import { Container, Grid } from '@mui/material';
import BrandBar from '../components/BrandBar';
import CatsBar from '../components/CatsBar';
import { Pages } from '../components/Pages';
import ProductList from '../components/ProductList';

const Shop = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CatsBar />
        </Grid>
        <Grid item xs={9}>
          <BrandBar />
          <ProductList />
        </Grid>
      </Grid>
      <Pages />
    </Container>
  );
};

export default Shop;
