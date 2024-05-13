// contexts/AuthContext.js
import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  toggleLogin: () => {},
});

export default AuthContext;