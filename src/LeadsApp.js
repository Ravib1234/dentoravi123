import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './Leads.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API, Storage, Auth, graphqlOperation } from "aws-amplify";
import { Navbar, Nav, Container, Tab, Tabs, Form, Row, Col, Button, ListGroup, Card, Dropdown } from 'react-bootstrap';
import { listBizOwners, getBizOwner } from './graphql/queries';
import { createBizOwner as createBizOwnerMutation, deleteBizOwner as deleteBizOwnerMutation, updateBizOwner } from './graphql/mutations';

import Marketing from "./Components/Marketing";
import Dashboard from "./Components/DashboardMenu";
import JumpStart from "./Components/JumpStart";
import Licenses from "./Components/Licenses";
import Contracts from "./Components/Contracts";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";


  

const initialFormState = {
  ownerID: "",
  status: 1,
  lname: "",
  fname: "",
  businessName: "",
  businessDBAName: "",
  street: "",
  unit: "",
  city: "",
  state: "",
  zip: "",
  primaryDentist: "",
  secondaryDentist: "",
  businessLicenseNumber: "",
  businessLicenseAcquiredDate: "",
  businessLicenseExpiryDate: "",
  professionalLicenseName: "",
  professionalLicenseNumber: "",
  professionalLicenseAcquiredDate: "",
  professionalLicenseExpiryDate: "",
  missionStatement: "",
  visionStatement: "",
  aboutBusiness: "",
  ownerBiodata: "",
  businessEmail: "",
  businessPhone: "",
  businessURL: "",

  primaryDentist: "",
  primaryDentistPhone: "",
  primaryDentistEmail: "",
  secondaryDentist: "",
  secondaryDentistPhone: "",
  secondaryDentistEmail: "", 
  lawyerName: "",
  lawyerPhone: "",
  lawyerEmail: "",
  accountantName: "",
  accountantPhone: "",
  accountantEmail: "",
  targetMarket: "",
  socialMediaMarketing: "",
  oldfashionedMarketing: "",
  businessReviewsURL: "",
  module1ActionsCompleted:  "",
  module2ActionsCompleted:  "",
  module3ActionsCompleted:  "",
  module4ActionsCompleted:  "",
  module5ActionsCompleted:  ""
};

function submitHandler(e) {
  e.preventDefault();
}

let jumpstartDisabled = true;
let licenseDisabled = true;
let dentistDisabled = true;
let relationsDisabled = true;
let marketingDisabled = true;
let qualifyDisabled = true;

function LeadsApp() {
  let history = useHistory();
  const [owner, setBizOwner] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  const [questionnaire, setRegistrationQns] = useState([]);

  const [createProspect, setCreateProspect] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isVideoOneON, setVideoOneON ] = useState(true);
  const [isVideoTwoON, setVideoTwoON ] = useState(false);
  const [isVideoThreeON, setVideoThreeON ] = useState(false);
  const [statusCode, setStatusCode] = useState(1);
  const [tabState, setTabState] = useState("welcome");
  const [mobileNav, setMobileNav ] = useState(false);



  useEffect(() => {
    fetchBizOwner();
  }, [isLoaded, tabState]);

  const ClickToOpenNav = () => {
    setMobileNav(!mobileNav);
  }

 const selectVideo = (val) => {
    setVideoOneON(false);
    setVideoTwoON(false);
    setVideoThreeON(false);
    if(val ==="1") {
      setVideoOneON(true);
    }
    if(val ==="2") {
      setVideoTwoON(true);
    }
    if(val ==="3") {
      setVideoThreeON(true);
    }
  }
  //Fetch business owner that is logged in
  async function fetchBizOwner() {
    let currentUsername = ""; 

    await  Auth.currentAuthenticatedUser().then((authuser) => {
      currentUsername = authuser.username; 
      console.log("Current User Name: ", currentUsername)});
    let filter = {
      username: {
          eq: currentUsername
      }
  };
  const apiDataByLname = await API.graphql(graphqlOperation(listBizOwners, {limit: 100, filter:filter})) ;
  setBizOwner(apiDataByLname.data.listBizOwners.items[0]);
  const sCode = parseInt(apiDataByLname.data.listBizOwners.items[0].status);  
  setStatusCode(sCode);
  console.log("Status Code in the start:", sCode); 
  setFormData(apiDataByLname.data.listBizOwners.items[0]);
}
/*
Prep
Incorporate
Equipment
Marketing
Employees
Finance
Mindset Before you start
Our Services
*/
// async function updatePrepInfo () {}
// async function updateIncorporateInfo () {}
// async function updateEquipmentInfo () {}
// async function updateMarketingInfo () {}
// async function updateEmployeesInfo () {}
// async function updateFinanceInfo () {}
// async function updateMindsetInfo () {}
// async function updateSubscriptionInfo () {}

async function getCurrentOwnerVersion() {
  let currentUsername = ""; 

  await  Auth.currentAuthenticatedUser().then((authuser) => {
    currentUsername = authuser.username; 
    console.log("Current User Name: ", currentUsername)});
  let filter = {
    username: {
        eq: currentUsername
    }
};
const apiDataByLname = await API.graphql(graphqlOperation(listBizOwners, {limit: 100, filter:filter})) ;
let currentOwner = apiDataByLname.data.listBizOwners.items[0];
const sCode = parseInt(apiDataByLname.data.listBizOwners.items[0].status);  
setStatusCode(sCode);
return currentOwner._version;

// setFormData(apiDataByLname.data.listBizOwners.items[0]);
}

  async function handleUpdateJumpstart() {
    setIsLoaded(false);
    setCreateProspect(!createProspect);
    licenseDisabled = false;
    let currentStatus = statusCode;
    if (statusCode < 2) {
      currentStatus = 2;
    }
    console.log("Status Code before updating Jumpstart: ", statusCode);
    await API.graphql({
      query: updateBizOwner,
      variables: {
        input: {
          id: owner.id,
          businessName: formData.businessName,
          businessDBAName: formData.businessDBAName,
          businessPhone: formData.businessPhone,
          businessEmail: formData.businessEmail,
          businessURL: formData.businessURL,
          practiceType: formData.practiceType,
          mobileClinicType: formData.mobileClinicType,
          status: currentStatus,
          _version: owner._version

        },
      },
    });
  setIsLoaded(true);
  handleTabSelection("license");
  alert("Jumpstart information updated");
 } // setState(initialState);
 const handleTabSelection = (key) => {
  setTabState({activeKey : key});
 }
async function handleUpdateLicenses(){
  setIsLoaded(false);
  setCreateProspect(!createProspect);
   //if (!formData.lname || !formData.fname) return;
   let currentStatus = statusCode;
   if (statusCode < 3) {
     currentStatus = 3;
   }
   console.log("Status Code before updating License: ", statusCode);
   licenseDisabled = false;
  await API.graphql({
    query: updateBizOwner,
    variables: {
      input: {
        id: owner.id,
        businessLicenseNumber: formData.businessLicenseNumber,
        businessLicenseAcquiredDate: formData.businessLicenseAcquiredDate,
        businessLicenseExpiryDate: formData.businessLicenseExpiryDate,        
        professionalLicenseName: formData.professionalLicenseName,
        professionalLicenseNumber: formData.professionalLicenseNumber,
        professionalLicenseAcquiredDate: formData.professionalLicenseAcquiredDate,
        professionalLicenseExpiryDate: formData.professionalLicenseExpiryDate,
        status: currentStatus,
        _version: await getCurrentOwnerVersion()
      },
    },
  });
  setIsLoaded(true);
  handleTabSelection("contracts");
  alert(`License Information updated for - ${formData.fname}`);
 // alert("License information updated");
  
} //License updates handled

async function handleUpdateContracts(){
  setIsLoaded(false);
  setCreateProspect(!createProspect);
   //if (!formData.lname || !formData.fname) return;
   // alert(`Creating new user- ${formData.fname}`);
   let currentStatus = statusCode;
   if (statusCode < 4) {
     currentStatus = 4;
   }
  await API.graphql({
    query: updateBizOwner,
    variables: {
      input: {
        id: owner.id,
        primaryDentist: formData.primaryDentist,
        primaryDentistPhone: formData.primaryDentistPhone,
        primaryDentistEmail: formData.primaryDentistEmail,
        secondaryDentist: formData.secondaryDentist,
        secondaryDentistPhone: formData.secondaryDentistPhone,
        secondaryDentistEmail: formData.secondaryDentistEmail,       
        lawyerName: formData.lawyerName,
        lawyerPhone: formData.lawyerPhone,
        lawyerEmail: formData.lawyerEmail,
        accountantName: formData.accountantName,
        accountantPhone: formData.accountantPhone,
        accountantEmail: formData.accountantEmail,
        status: currentStatus,
        _version: await getCurrentOwnerVersion()
      }
    }
  });
  setIsLoaded(true);
  handleTabSelection("marketing");
 alert("Contract information updated");
  
} //Contract updates handled

async function handleUpdateMarketing() {
  setIsLoaded(false);
  setCreateProspect(!createProspect);
  //if (!formData.lname || !formData.fname) return;
 // alert(`Creating new user- ${formData.fname}`);
 let currentStatus = statusCode;
 if (statusCode < 5) {
   currentStatus = 5;
 }
  licenseDisabled = false;
await API.graphql({
  query: updateBizOwner,
  variables: {
    input: {
      id: owner.id,
      targetMarket: formData.targetMarket,
      socialMediaMarketing: formData.socialMediaMarketing,
      oldfashionedMarketing: formData.oldfashionedMarketing,
      businessReviewsURL: formData.businessReviewsURL,
      status: 1,// just for resetting, change to "currentStatus" for get it working as normal.
      _version: await getCurrentOwnerVersion()
    },
  },
});
setIsLoaded(true);
alert("Marketing information updated");
} // setState(initialState);



  return (
      <div class="container-body">
        <NavBar/>
          <Tabs activeKey={tabState.activeKey} onSelect={handleTabSelection} className="tabs">
            <Tab eventKey="welcome" title="Welcome">
              <Dashboard handleToJump = {tabState => setTabState(tabState)}/>
            </Tab>
            <Tab eventKey="jumpstart" title="1: Business Basics">
              <JumpStart/>
            </Tab>
            <Tab eventKey="license" title="2: License" disabled={statusCode < 2}>
              <Licenses/>
            </Tab>
            <Tab eventKey="contracts" title="3: Contracts" disabled={statusCode < 3}>
              <Contracts/>
            </Tab>
            <Tab eventKey="marketing" title="4: Marketing" disabled={statusCode < 4}>
              <Marketing/>
            </Tab>
          </Tabs>
        <Footer/>
      </div>
  );
  
}



// export default LeadsApp;
export default withAuthenticator(LeadsApp)
//<AmplifySignOut /> 