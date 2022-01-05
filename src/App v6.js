import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Switch, Navigate, Routes, Link} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";

import LeadsApp from "./LeadsApp";
import RegistrationApp from './RegistrationApp';
/*
import AdminApp from './AdminApp';
import OwnersApp from "./OwnersApp";
import MobileDentalReportsApp from './MobileDentalReportsApp';
import MobileDentalDefaultApp from './MobileDentalDefaultApp';
import OwnersProfileApp from './OwnersProfileApp';
import ProspectApp from './ProspectApp';
import ProspectDetailsApp from './ProspectDetailsApp';
import StateInfoApp from './StateInfoApp';
import StatewiseFiles from './StatewiseFiles';
*/        


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
    WELCOME !!
    <Router>
      <Routes>
          <Route path="/leadshome" element={<LeadsApp />} />
          <Route path="/registration" element={<RegistrationApp />} />
      </Routes>
      <Navigate to="/registration" />
 
{/*}
        {fetchCurrentUserGroup}
        {
          userType === "Leads" ? 
          (<Navigate to="/registrationddd" />) : (<Navigate to="/registration" /> )    
        }
        
      {/*}  <AmplifySignOut />  */}
       {/* } </Routes> */}
    </Router>
  </div>
);
}
// export default withAuthenticator(App);

export default App;
