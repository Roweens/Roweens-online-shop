import Header from '../components/Header';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { RouteNames } from './routeNames';
import { selectUser } from '../store/auth/selectors/selectUser';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AuthPageAsync } from '../pages/Auth/AuthPage.async';
import { ProductPageAsync } from '../pages/ProductPage/ProductPage.async';
import { ShopPageAsync } from '../pages/Shop/ShopPage.async';
import { AdminPageAsync } from '../pages/Admin/AdminPage.async';
import { CartPageAsync } from '../pages/Cart/CartPage.async';
import { Suspense } from 'react';
import { PageLoader } from '../components/PageLoader';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';

const AppLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
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
      errorElement: <ErrorPage />,
      children: [
        {
          path: RouteNames.LOGIN,
          element: <AuthPageAsync />,
        },
        {
          path: RouteNames.REGISTER,
          element: <AuthPageAsync />,
        },
        {
          path: RouteNames.PRODUCT + '/:id',
          element: <ProductPageAsync />,
        },
        {
          path: RouteNames.SHOP,
          element: <ShopPageAsync />,
        },
        {
          path: RouteNames.ADMIN,
          element: (
            <LoggedRoute>
              <AdminPageAsync />
            </LoggedRoute>
          ),
        },
        {
          path: RouteNames.CART,
          element: (
            <LoggedRoute>
              <CartPageAsync />
            </LoggedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
