import { Grid } from '@mui/material';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { selectProducts } from '../store/products/selectors/selectProducts';
import ProductItem from './ProductItem';

const ProductList = () => {
  const products = useTypedSelector(selectProducts);
  return (
    <Grid container spacing={2} sx={{ mt: 5, pl: 4 }}>
      {products?.map((product) => {
        return <ProductItem product={product} key={product.id} />;
      })}
    </Grid>
  );
};

export default ProductList;
