import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Badge,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { selectUser } from '../store/auth/selectors/selectUser';
import { RouteNames } from '../router/routeNames';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { removeUser } from '../store/auth/auth-slice';
import { selectCart } from '../store/cart/selectors/selectCart';

const Header = () => {
  const user = useTypedSelector(selectUser);
  const cart = useTypedSelector(selectCart);

  const dispatch = useTypedDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(removeUser());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Online shop</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 5 }}>
            <Button
              sx={{ color: 'white' }}
              component={RouterLink}
              to={RouteNames.SHOP}
            >
              Home
            </Button>
            <Button
              sx={{ color: 'white' }}
              component={RouterLink}
              to={RouteNames.ADMIN}
            >
              Admin panel
            </Button>
          </Box>
          {!user ? (
            <Button
              color="inherit"
              sx={{ mr: 3 }}
              component={RouterLink}
              to={RouteNames.LOGIN}
            >
              Login
            </Button>
          ) : (
            <>
              <Typography variant="h6" sx={{ mr: 2 }}>
                {user?.email}
              </Typography>
              <Button sx={{ color: 'white', mr: 2 }} onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            component={RouterLink}
            to={RouteNames.CART}
          >
            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={!user}
            >
              <ShoppingCartIcon color="inherit" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
