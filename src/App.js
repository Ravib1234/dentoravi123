import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";

import LeadsApp from "./LeadsApp";
import RegistrationApp from './RegistrationApp';
import ContactUs from './Components/ContactUs';
import DashboardMenu from './Components/DashboardMenu'
import Support24Hrs from './Components/Support24Hrs';
import LiveCoaching from './Components/LiveCoaching';
import About from './Components/About';
import Services from './Components/Services';
        


function App() {
  const [userType, setUserType] = useState("");

  let currentUserGroup = ``;

  useEffect(() => {
    async function fetchCurrentUserGroup() {
      Auth.currentAuthenticatedUser().then((authuser) => {
        console.log("AuthUser: ",authuser);
        currentUserGroup =
          authuser.signInUserSession.idToken.payload["cognito:groups"][0];
        setUserType(currentUserGroup);
        console.log(
          currentUserGroup,
          "this is the currentuser in useEffect",
          currentUserGroup.length
        );
      });
    }

    fetchCurrentUserGroup();
    console.log(
      currentUserGroup,
      "this is the currentuser after fetchuserGroup method",
      { fetchCurrentUserGroup }.length
    );
  }, []);

  async function fetchCurrentUserGroup() {
    Auth.currentAuthenticatedUser().then((authuser) => {
     
      currentUserGroup =
        authuser.signInUserSession.idToken.payload["cognito:groups"][0];
      console.log(
        currentUserGroup,
        "this is the currentuser in fetchFunction",
        currentUserGroup.length
      );
      return currentUserGroup;
    });
  }

  Auth.currentAuthenticatedUser().then((authuser) => {
    currentUserGroup =
      authuser.signInUserSession.idToken.payload["cognito:groups"][0];
    console.log(
      currentUserGroup,
      "this is the currentuser rightafter fetching it",
      currentUserGroup.length
    );
  });

  console.log(
    currentUserGroup,
    "this is the currentuser before return",
    currentUserGroup.length
  );

/*
async function fetchCurrentUserGroup() {
  setUserType('Leads');
  return 'Leads';
}
*/
return (
  <div className="App">
    <Router>
         {/* <NavBar/> */}
        <Route path="/leadshome" component={LeadsApp} />
        <Route path="/registration" component={RegistrationApp} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/services" component={Services} />
        <Route path="/support-24hrs" component={Support24Hrs} />
        <Route path="/live-coaching" component={LiveCoaching} />
        <Route path="/about" component={About} />
        <Route path="/dashboard-menu" component={DashboardMenu} />
        
        
        
        {fetchCurrentUserGroup}
        {
          userType === "Leads" ? 
          (
            <Redirect to="/registration" />
          ) : 
                  (
                    <Redirect to="/registration" /> 
                    )
              
        }
        {/*}
        <AmplifySignOut />  */}
    </Router>
  </div>
);
}

export default App;

