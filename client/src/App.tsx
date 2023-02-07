import { AppRouter } from './router/AppRouter';
import './index.css';
import { useEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { authAPI } from './services/authService';
import jwt_decode from 'jwt-decode';
import { useTypedDispatch } from './hooks/useTypedDispatch';
import { setAuth, setUser } from './store/auth/auth-slice';
import { productAPI } from './services/productService';
import { useTypedSelector } from './hooks/useTypedSelector';
import { selectPage } from './store/products/selectors/selectPage';
import { selectCurrentType } from './store/products/selectors/selectCurrentType';
import { selectCurrentBrand } from './store/products/selectors/selectCurrentBrand';
import { cartAPI } from './services/cartService';
import { User } from './store/auth/types/User';
import { useIsLoading } from './hooks/useIsLoading';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeCustomProvider } from './theme/ThemeProvider';

function App() {
  const [loading, setLoading] = useState(true);

  const selectedType = useTypedSelector(selectCurrentType);
  const selectedBrand = useTypedSelector(selectCurrentBrand);
  const page = useTypedSelector(selectPage);

  productAPI.useFetchBrandsQuery();
  productAPI.useFetchTypesQuery();
  productAPI.endpoints.fetchProducts.useQuerySubscription(
    {
      typeId: selectedType ? selectedType.id : undefined,
      brandId: selectedBrand ? selectedBrand.id : undefined,
      page,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [verify] = authAPI.useLazyVerifyQuery();
  const [getCart] = cartAPI.useLazyGetCardQuery();
  const dispatch = useTypedDispatch();
  const isLoading = useIsLoading();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      verify(false)
        .unwrap()
        .then((res) => {
          const data: User = jwt_decode(res.token);
          localStorage.setItem('token', res.token);
          dispatch(setUser(data));
          dispatch(setAuth(true));
          getCart({ userId: data?.id });
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading || isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <ThemeCustomProvider>
      <CssBaseline />
      <AppRouter />
    </ThemeCustomProvider>
  );
}

export default App;
