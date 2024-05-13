// contexts/UserContext.js
import { createContext } from 'react';

const UserContext = createContext({ isLoggedIn: false, toggleLogin: () => {} });

export default UserContext;