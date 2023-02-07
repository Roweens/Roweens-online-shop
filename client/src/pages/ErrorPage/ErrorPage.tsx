import { Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RouteNames } from '../../router/routeNames';

export const ErrorPage: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: '800' }}>
        Page Not Found
      </Typography>
      <Button
        component={RouterLink}
        to={RouteNames.SHOP}
        variant="contained"
        sx={{ mt: 5 }}
      >
        Go home
      </Button>
    </Container>
  );
};
