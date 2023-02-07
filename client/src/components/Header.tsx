import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Badge,
  Typography,
  Chip,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { selectUser } from '../store/auth/selectors/selectUser';
import { RouteNames } from '../router/routeNames';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { removeUser } from '../store/auth/auth-slice';
import { selectCart } from '../store/cart/selectors/selectCart';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeSwitcher } from './ThemeSwitcher';

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
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              ml: 5,
              alignItems: 'center',
            }}
          >
            <Chip
              icon={<HomeIcon />}
              label="Home"
              variant="outlined"
              component={RouterLink}
              to={RouteNames.SHOP}
              sx={{ cursor: 'pointer', ml: 2 }}
              color="secondary"
            />
            <Chip
              icon={<AdminPanelSettingsIcon />}
              label="Admin panel"
              variant="outlined"
              component={RouterLink}
              to={RouteNames.ADMIN}
              sx={{ cursor: 'pointer', ml: 4, mr: 2 }}
              color="secondary"
            />
            <ThemeSwitcher />
          </Box>

          {!user ? (
            <Chip
              icon={<AccountCircleIcon />}
              label="Login"
              variant="outlined"
              component={RouterLink}
              to={RouteNames.LOGIN}
              color="secondary"
            />
          ) : (
            <>
              <Typography variant="h6" sx={{ mr: 2 }}>
                {user?.email}
              </Typography>
              <Chip
                icon={<AccountCircleIcon />}
                label="Logout"
                variant="outlined"
                onClick={handleLogout}
                color="secondary"
              />
            </>
          )}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            component={RouterLink}
            to={RouteNames.CART}
            sx={{ ml: 4 }}
          >
            <Badge
              badgeContent={cart?.length}
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
