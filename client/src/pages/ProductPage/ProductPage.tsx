import {
  Grid,
  Container,
  Box,
  Paper,
  Typography,
  Rating,
  Stack,
  Divider,
  Button,
} from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productAPI } from '../../services/productService';
import { Product } from '../../store/products/types/product';
import { useBrandById } from '../../hooks/useBrandById';
import { ratingAPI } from '../../services/ratingService';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectUser } from '../../store/auth/selectors/selectUser';
import { RouteNames } from '../../router/routeNames';
import { cartAPI } from '../../services/cartService';

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [rating, setRating] = useState(0);

  const user = useTypedSelector(selectUser);

  const { id } = useParams();
  const navigate = useNavigate();

  const [addToCart] = cartAPI.useAddToCartMutation();
  const [createRating] = ratingAPI.useCreateRatingMutation();

  const { data, isLoading } = productAPI.useFetchProductQuery({
    deviceId: parseInt(id!),
    userId: user ? user.id : undefined,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setProduct(data.response);
      setRating(data.response.rating);
      console.log(data.isRated);
    }
  }, []);

  const handleRating = async (newValue: number | null) => {
    if (!!data?.isRated) return;
    if (newValue) {
      if (user) {
        await createRating({
          userId: user.id,
          deviceId: Number(id),
          rate: newValue,
        });
        setRating(newValue);
      } else {
        navigate(RouteNames.LOGIN);
      }
    }
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (user) {
      return addToCart({ userId: user.id, deviceId: product?.id });
    }
    navigate(RouteNames.LOGIN);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Grid container>
        <Grid item xs={5}>
          <Box
            component="img"
            sx={{
              maxHeight: { xs: 233, md: 600 },
              maxWidth: { xs: 350, md: 600 },
              pl: 6,
              pt: 5,
            }}
            alt="Product Image"
            src={process.env.REACT_APP_STATIC_URL! + product?.img}
          />
        </Grid>
        <Grid item xs={7}>
          <Paper
            elevation={3}
            sx={{ maxWidth: '65%', m: '0 auto', mt: 5, p: 3 }}
          >
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography gutterBottom variant="h6">
                {product?.name}
              </Typography>
              <Typography variant="h6">{product?.price}$</Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography gutterBottom variant="body1">
                {useBrandById(parseInt(id!))?.name}
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => handleRating(newValue)}
                disabled={!!data?.isRated}
              />
            </Stack>
            <Button
              size="large"
              variant="contained"
              endIcon={<AddToPhotosIcon />}
              sx={{ mt: 5 }}
              onClick={(e) => handleAddToCart(e)}
            >
              Add to cart
            </Button>
          </Paper>
          <Paper
            elevation={3}
            sx={{ maxWidth: '65%', m: '0 auto', mt: 5, p: 3 }}
          >
            <Typography gutterBottom variant="h6" sx={{ mb: 3 }}>
              Specifications
            </Typography>
            {product?.info.map((desc, i) => {
              return (
                <>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: 'space-between',
                      bgcolor: i % 2 === 0 ? 'lightgray' : 'transparent',
                      mb: 1,
                      p: 1,
                      borderRadius: '2px',
                    }}
                    key={desc.number}
                  >
                    <Typography
                      gutterBottom
                      variant="body1"
                      sx={{ mt: '0.35em' }}
                    >
                      {desc.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body1"
                      sx={{ mt: '0.35em' }}
                    >
                      {desc.description}
                    </Typography>
                  </Stack>
                </>
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
