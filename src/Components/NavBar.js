import React, { useState, useEffect } from "react";
import '../Leads.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import dentovationlogo from '../assets/dentovation-logo-lightblue.jpg';
import Image from 'react-bootstrap/Image';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { GiHamburgerMenu} from 'react-icons/gi';
import { GrClose} from 'react-icons/gr';

function LeadsApp() {
    const [mobileNav, setMobileNav ] = useState(false);
  let history = useHistory();

  
  const ClickToOpenNav = () => {
    setMobileNav(!mobileNav);
  }

  return (
        <AppBar position="fixed" color="#fff">
          <Toolbar className="logo-header">
            <nav role="navigation" className="desktop">
              <ul id="d-menu">
                <Image src={dentovationlogo} fluid className="dentovationlogo"/>
                <div className={mobileNav ? "mobile-signup active" : "mobile-signup"}>
                  <li className="register-menu-header"> <a onClick={() => history.push('Registration') } className="nav-links">Home </a> </li>
                  <li className="register-menu-header"><a onClick={() => history.push('leadshome')} className="nav-links">Dashboard Menu</a></li>
                  <li className="register-menu-header"><a onClick={() => history.push('contact-us')}className="nav-links">Contact Us</a></li>
                  <li className="register-menu-header"><a onClick={() => history.push('about')} className="nav-links">About Us</a></li>
                  <li className="register-menu-header"><a onClick={() => history.push('support-24hrs')} className="nav-links">24 hour Support</a></li>
                  <li className="register-menu-header"><a onClick={() => history.push('live-coaching')} className="nav-links">One-on-One Coaching</a></li>
                  <li><AmplifySignOut className="logout-button"/></li>
                </div>
              </ul>
              <div onClick={ClickToOpenNav} className="menu-icon">
                {mobileNav ? <GrClose className="hamburger" /> : <GiHamburgerMenu className="hamburger" />}
              </div>
            </nav>
          </Toolbar>
          
        </AppBar>
  );
  
}



// export default LeadsApp;
export default withAuthenticator(LeadsApp)
//<AmplifySignOut /> 