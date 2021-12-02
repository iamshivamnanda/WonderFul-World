import React, { useState, useCallback, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import User from "./user/pages/User";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlaces from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";

let logoutTimer;

function App() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(false);
    const [tokenExperationData,settokenExperationData ] = useState(false);

    const login = useCallback((userId, tok,expDate) => {
        setUserId(userId);
        setToken(tok);
        const tokenExperationData = expDate || new Date(
            new Date().getTime() + 1000 * 60 * 60
        );
        settokenExperationData(tokenExperationData);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: userId,
                token: tok,
                experation: tokenExperationData.toISOString(),
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        settokenExperationData(null);
        localStorage.removeItem("userData");
    }, []);

    useEffect(()=>{
      if(token && tokenExperationData){
        const remaningtime = tokenExperationData.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout,remaningtime);
      }else{
        clearTimeout(logoutTimer);
      }
    },[token,logout,tokenExperationData]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (storedData && storedData.token && new Date(storedData.experation) > new Date()) {
            login(storedData.userId, storedData.token,new Date(storedData.experation));
        }
    }, [login]);
    let routes;

    if (token) {
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
            value={{
                isLoggedIn: !!token,
                token: token,
                id: userId,
                login: login,
                logout: logout,
            }}
        >
            <Router>
                <MainNavigation />
                <main>{routes}</main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
