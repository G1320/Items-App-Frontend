import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../common/buttons/genericButton';
import { setLocalUser } from '../../services/user-service';
import { getUserBySub } from '../../services/user-service';
import { register, login } from '../../services/auth-service';

import { useUserContext } from '../../contexts/UserContext';

const loginButton = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const { setUser: setContextUser } = useUserContext();

  const handleClick = async (e) => {
    loginWithRedirect();
  };

  useEffect(() => {
    const handleUserLogin = async () => {
      if (isAuthenticated && user) {
        const { name, sub, nickname, picture } = user;
        try {
          const dbUser = await getUserBySub(sub);
          if (!dbUser) {
            const loggedInUserObj = await register({
              name,
              sub,
              nickname,
              picture,
              username: nickname,
            });
            setLocalUser(loggedInUserObj.user);
            setContextUser(loggedInUserObj.user);
          } else {
            const loggedInUser = await login({ nickname: user.nickname, sub: user.sub });
            setLocalUser(loggedInUser);
            setContextUser(loggedInUser);
          }
        } catch (error) {
          if (error.code === 11000 && error.keyPattern && error.keyValue) {
            console.error(`User with username '${error.keyValue.username}' already exists.`);
          } else {
            console.error('Error during login or registration:', error);
          }
        }
      }
    };

    if (isAuthenticated && user) {
      handleUserLogin();
    }
  }, [user, isAuthenticated]);

  return !isAuthenticated && <Button onClick={handleClick}>Sign in</Button>;
};

export default loginButton;
