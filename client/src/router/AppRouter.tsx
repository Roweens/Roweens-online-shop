import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { RouteNames } from './routeNames';
import Auth from '../pages/Auth';
import AdminPage from '../pages/Admin';
import CartPage from '../pages/Cart';
import Shop from '../pages/Shop';
import ProductPage from '../pages/ProductPage';
import { selectUser } from '../store/auth/selectors/selectUser';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

interface RouteProps {
  children: JSX.Element;
}

export const AppRouter = () => {
  const user = useTypedSelector(selectUser);
  const LoggedRoute = ({ children }: RouteProps) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: RouteNames.LOGIN,
          element: <Auth />,
        },
        {
          path: RouteNames.REGISTER,
          element: <Auth />,
        },
        {
          path: RouteNames.PRODUCT + '/:id',
          element: <ProductPage />,
        },
        {
          path: RouteNames.SHOP,
          element: <Shop />,
        },
        {
          path: RouteNames.ADMIN,
          element: (
            <LoggedRoute>
              <AdminPage />
            </LoggedRoute>
          ),
        },
        {
          path: RouteNames.CART,
          element: (
            <LoggedRoute>
              <CartPage />
            </LoggedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
