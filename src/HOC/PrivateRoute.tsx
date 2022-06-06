import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';

interface Props {
  component: React.ComponentType;
}
const PrivateRoute: FC<Props> = ({ component: RouteComponent }) => {
  const { isAuth } = useAuth();
  return isAuth ? <RouteComponent /> : <Navigate to="/sign-in" />;
};

export { PrivateRoute };
