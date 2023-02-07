import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { TextField, Container, Button, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { RouteNames } from '../../router/routeNames';
import { authAPI } from '../../services/authService';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { setAuth, setUser } from '../../store/auth/auth-slice';
import { cartAPI } from '../../services/cartService';
import { User } from '../../store/auth/types/User';

const Auth = () => {
  const { pathname } = useLocation();
  const isLogin = pathname === RouteNames.LOGIN;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn] = authAPI.useSignInMutation();
  const [signUp] = authAPI.useSignUpMutation();
  const [getCart] = cartAPI.useLazyGetCardQuery();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handleAuth = async () => {
    let data;
    if (isLogin) {
      await signIn({ email, password })
        .unwrap()
        .then(async (res) => {
          data = jwt_decode<User>(res.token);
          localStorage.setItem('token', res.token);
          await getCart({ userId: data?.id });
        });
    } else {
      await signUp({ email, password, role: 'USER' })
        .unwrap()
        .then(async (res) => {
          data = jwt_decode<User>(res.token);
          localStorage.setItem('token', res.token);
          await getCart({ userId: data?.id });
        });
    }

    dispatch(setUser(data));
    dispatch(setAuth(true));
    navigate('/');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box sx={{ p: 8 }} component="form">
        <Typography variant="h6">{isLogin ? 'Login' : 'Register'}</Typography>
        <TextField
          id="outlined-basic"
          type="text"
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ mt: 4 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          sx={{ mt: 4, mb: 4 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: '50%', margin: '0 auto', display: 'flex' }}
          onClick={handleAuth}
        >
          {isLogin ? 'Login' : 'Register'}
        </Button>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Button
          variant="outlined"
          sx={{ width: '50%', margin: '0 auto', display: 'flex' }}
          component={RouterLink}
          to="/signup"
        >
          {isLogin ? 'Register' : 'Login'}
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;
