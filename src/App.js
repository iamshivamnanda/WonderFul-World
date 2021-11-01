import React,{useState,useCallback} from 'react';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import NewPlace from "./places/pages/NewPlace";
import User from './user/pages/User';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlaces from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from "./shared/components/Navigation/MainNavigation/MainNavigation";
import { AuthContext } from './shared/context/auth-context';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const login = useCallback((userId) => {
    setUserId(userId);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlaces />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
  <AuthContext.Provider
  value={{ isLoggedIn: isLoggedIn,id:userId  ,login: login, logout: logout }}
>
  <Router>
    <MainNavigation />
    <main>{routes}</main>
  </Router>
</AuthContext.Provider>);
}

export default App;
