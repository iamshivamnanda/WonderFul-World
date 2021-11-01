import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  id:null,
  login: () => {},
  logout: () => {}
});
