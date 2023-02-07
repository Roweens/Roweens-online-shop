import { Product } from '../store/products/types/product';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Badge,
} from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../router/routeNames';
import { useBrandById } from '../hooks/useBrandById';
import { cartAPI } from '../services/cartService';
import { selectUser } from '../store/auth/selectors/selectUser';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const navigate = useNavigate();

  const [addToCart] = cartAPI.useAddToCartMutation();
  const user = useTypedSelector(selectUser);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (user) {
      return addToCart({ userId: user.id, deviceId: product.id });
    }
    navigate(RouteNames.LOGIN);
  };

  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{ cursor: 'pointer' }}
      onClick={() => navigate(RouteNames.PRODUCT + '/' + product.id)}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="180"
          image={process.env.REACT_APP_STATIC_URL + product.img}
          sx={{ objectFit: 'fill' }}
        />

        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography gutterBottom variant="h6" component="div">
              {useBrandById(product.brandId)!.name}
            </Typography>
            <Badge badgeContent={product.rating} color="primary" sx={{ mr: 2 }}>
              <StarOutlineIcon />
            </Badge>
          </Box>
          <Typography variant="h5" sx={{ flexWrap: 1 }}>
            {product.name}
          </Typography>
        </CardContent>

        <CardActions sx={{ ml: 1 }}>
          <Button
            size="small"
            variant="contained"
            onClick={(e) => handleAddToCart(e)}
          >
            В корзину
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
