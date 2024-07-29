import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useVerifyTokenQuery } from '../features/auth/authApi';
import { userLoggedIn } from '../features/auth/authSlice';

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const { data, isError, isLoading } = useVerifyTokenQuery();

  useEffect(() => {
    if (!isLoading) {
      if (!isError && data && data.accessToken) {
        dispatch(
          userLoggedIn({
            accessToken: data.accessToken,
            user: data.user,
          })
        );
      }
      setAuthChecked(true);
    }
  }, [isLoading, data, dispatch]);

  return authChecked;
}
