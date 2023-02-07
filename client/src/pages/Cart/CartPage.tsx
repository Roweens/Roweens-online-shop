import {
  Paper,
  Container,
  Typography,
  Divider,
  Card,
  Box,
  CardContent,
  CardMedia,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectCartProducts } from '../../store/cart/selectors/selectCartProducts';
import { cartAPI } from '../../services/cartService';
import { selectUser } from '../../store/auth/selectors/selectUser';
import { useMemo } from 'react';

const CartPage = () => {
  const cartProducts = useTypedSelector(selectCartProducts);
  const user = useTypedSelector(selectUser);

  const sumPrice = useMemo(() => {
    return cartProducts.reduce(
      (acc, next) => (acc += next.price * next.quantity),
      0
    );
  }, [cartProducts]);

  const [addToCart] = cartAPI.useAddToCartMutation();
  const [deleteFromCart] = cartAPI.useDeleteFromCartMutation();

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <Paper
        elevation={5}
        sx={{
          height: '90%',
          bgcolor: 'primary',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Divider sx={{ pt: 5 }} variant="middle">
          {' '}
          <Typography variant="h4" component="h2">
            Your Cart
          </Typography>
        </Divider>
        {cartProducts.map((product) => {
          return (
            <Card
              sx={{
                display: 'flex',
                m: 3,
                p: 3,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              key={product.id}
            >
              <Box sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={process.env.REACT_APP_STATIC_URL! + product?.img}
                  alt="Live from space album cover"
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {`${product.price}$`}
                  </Typography>
                </CardContent>
              </Box>
              <Paper
                elevation={3}
                sx={{ alignSelf: 'center', justifySelf: '' }}
              >
                <Button>
                  <RemoveIcon
                    onClick={(e) =>
                      deleteFromCart({ userId: user?.id, deviceId: product.id })
                    }
                  />
                </Button>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="span"
                >
                  {product.quantity}
                </Typography>
                <Button>
                  <AddRoundedIcon
                    onClick={(e) =>
                      addToCart({ userId: user?.id, deviceId: product.id })
                    }
                  />
                </Button>
              </Paper>
              <Tooltip title="Delete">
                <IconButton
                  onClick={(e) =>
                    deleteFromCart({
                      userId: user?.id,
                      deviceId: product.id,
                      completeDelete: true,
                    })
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Card>
          );
        })}
        <Box
          sx={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
            mr: 3,
          }}
        >
          <Divider variant="fullWidth" flexItem />
          <Typography
            variant="body1"
            sx={{ mt: 2, mb: 2 }}
          >{`Total: ${sumPrice}$`}</Typography>
          <Button variant="contained">Checkout</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CartPage;
