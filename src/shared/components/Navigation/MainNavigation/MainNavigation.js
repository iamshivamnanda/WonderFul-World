import React,{useState} from 'react';
import MainHeader from "../MainHeader/MainHeader";
import NavLink from "../NavLink/NavLink";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../../Backdrop/Backdrop";
import { Link } from "react-router-dom";
import "./MainNavigation.css"

const MainNavigation = () => {
    const [openDrawer,changeopenDrawer] = useState(false);

    const openDrawerhandler = ()=>{
        changeopenDrawer(true);
    }
    const closeDrawerhandler = ()=>{
        changeopenDrawer(false);
    }
    return (
        <React.Fragment>
        {openDrawer && <Backdrop onClick={closeDrawerhandler} />}
        <SideDrawer show={openDrawer} onClick={closeDrawerhandler}>
            <nav className="main-navigation__drawer-nav ">
            <NavLink />
            </nav>
        </SideDrawer>
       <MainHeader>
           <button className="main-navigation__menu-btn" onClick={openDrawerhandler}>
               <span />
               <span />
               <span />
           </button>
           <h1 className='main-navigation__title'>
              <Link to='/'> WonderFul World</Link>
           </h1>
           <nav className="main-navigation__header-nav">
               <NavLink />
           </nav>
       </MainHeader>
       </React.Fragment>
    )
}

export default  MainNavigation;