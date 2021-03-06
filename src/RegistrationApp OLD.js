import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from './logo.svg';
import LeadsApp from "./LeadsApp";
import './Leads.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Route, Routes, Switch, Navigate, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API, Storage, Auth } from "aws-amplify";
import { Navbar, Nav, Container, Tab, Tabs, Form, Row, Col, Button, ListGroup, Card } from 'react-bootstrap';
import { listOwners } from './graphql/queries';
import { createOwner as createOwnerMutation, deleteOwner as deleteOwnerMutation, updateOwner } from './graphql/mutations';

import { listQuestionnaires } from './graphql/queries';
import { createQuestionnaire as createQuestionnaireMutation, deleteQuestionnaire as deleteQuestionnaireMutation, updateQuestionnaire } from './graphql/mutations';

import Image from 'react-bootstrap/Image';
import bannerImage from './assets/banner-image-1.jpg';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";


/*
async function fetchOwner(){

}
*/
const initialQualifyFormState = {
  questionnaireId: "",
  passion: "",
  othersInterest: "",
  planB: "",
  pricePoint: "",
  competition: "",
  growBusiness: "",
  insuranceNeeds: "",
  costOfEntry: "",
  monthlyLivingExpenses: "",
  readyAndDriven: "",
  additionalNotes1: "",
  additionalNotes2: ""
};

const initialFormState = {
  ownerID: "",
  status: 0,
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
  businessReviewsURL: ""
};

function submitHandler(e) {
  e.preventDefault();
}

let statusCode = 0.0;
let jumpstartDisabled = true;
let licenseDisabled = true;
let dentistDisabled = true;
let relationsDisabled = true;
let marketingDisabled = true;
let qualifyDisabled = true;

function RegistrationApp() {
  let history = useHistory();
  const [owner, setOwner] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  const [questionnaire, setQuestionnaire] = useState([]);
  const [qualifyFormData, setQualifyFormData] = useState(initialQualifyFormState);

  const [createProspect, setCreateProspect] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isVideoOneON, setVideoOneON ] = useState(true);
  const [isVideoTwoON, setVideoTwoON ] = useState(false);
  const [isVideoThreeON, setVideoThreeON ] = useState(false);

  useEffect(() => {
    // fetchOwner();
  }, []);

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
  async function fetchOwner() {
    const apiData = await API.graphql({ query: listOwners });
    setOwner(apiData.data.listOwners.items);
    setFormData(apiData.data.listOwners.items[0])
  }
  async function fetchQuestionnaire() {
    const apiData = await API.graphql({ query: listQuestionnaires });
    setQuestionnaire(apiData.data.listQuestionnaires.items);
    setFormData(apiData.data.listQuestionnaires.items[0])
  }
  async function handleCreateProspect() {
    setIsLoaded(false);
    setCreateProspect(!createProspect);
    //if (!formData.lname || !formData.fname) return;
    
    // BELOW ownerID needs to be set to be equal to owners username so that it is UNIQUE
    //setFormData({ ...formData, 'ownerID': formData.lname+formData.fname});
    formData.ownerID = formData.lname + formData.fname;

    qualifyDisabled = false;
    statusCode = 1; 
    await API.graphql({ query: createOwnerMutation, variables: { input: formData } });
    setOwner([...owner, formData]);
    // setFormData(initialFormState);
    //alert(`Created ${formData.fname}`);

    qualifyFormData.questionnaireId= formData.ownerID; 

    await API.graphql({ query: createQuestionnaireMutation, variables: { input: qualifyFormData } });

   alert(`Updated Questionnaire for user - ${qualifyFormData.questionnaireId}`);

   setFormData(initialFormState);
   setQualifyFormData(initialQualifyFormState);

   /* await API.graphql({
      query: createQuestionnaireMutation,
      variables: {
        input: {
          id: questionnaire.id,
          questionnaireId: formData.ownerID + "questions",
          passion: qualifyFormData.passion,
          othersInterest: qualifyFormData.othersInterest,
          planB: qualifyFormData.planB,
          pricePoint: qualifyFormData.pricePoint,
          competition: qualifyFormData.competition,
          growBusiness: qualifyFormData.growBusiness,
          insuranceNeeds: qualifyFormData.insuranceNeeds,
          costOfEntry: qualifyFormData.costOfEntry,
          monthlyLivingExpenses: qualifyFormData.monthlyLivingExpenses,
          readyAndDriven: qualifyFormData.readyAndDriven,
          additionalNotes1: qualifyFormData.additionalNotes1,
          additionalNotes2: qualifyFormData.additionalNotes2
        },
      },
    }); 
    
  alert("Questionnaire information updated");*/

  } // setState(initialState);

  async function handleLogin(){

    alert("Redirecting to login page");

    <Router>
      <Routes>
        <Route path="/leadshome" element={LeadsApp} />
      </Routes>
        <Navigate to="/leadshome" />
    </Router>

  }



  return (
    <div className="App">
      <div class="container-body">
        <div>
           <AppBar position="fixed" color="#fff">
              <Toolbar className="logo-header">
                {/*} <img class="logo_style" src={logo} alt="..." /> */}
                <h5 className="register-logo-header" color="#fff">WELCOME TO MOBILE DENTISTRY</h5>
                <nav role="navigation" class="desktop">
                  <ul id="d-menu">
                      <li> <a onClick={() => history.push('leadshome') }>Login</a> </li>
                      {/* <li> <a onClick={() => history.push('excel-imports') }>Prescreen-Upload</a> </li> */}
                  </ul>
                </nav>
              </Toolbar>
            </AppBar>

              <Image src={bannerImage} fluid />
         
              <Container>    
              <div class="qualify-tab">   
              <Row>
                    <Col sm={9}>
                      <Form onSubmit={submitHandler}>
                        <Row className="mb-3">
                          <Form.Group as={Row} controlId="fnamecontrol">
                            <Form.Label column sm={4}>First Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'fname': e.target.value })}
                                placeholder="Owner First Name"
                                value={formData?.fname}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                          
                          <Form.Group as={Row} controlId="lnamecontrol">
                            <Form.Label column sm={4}>Last Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'lname': e.target.value })}
                                placeholder="Owner Last Name"
                                value={formData?.lname}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                  
                          <Form.Group as={Row} controlId="streetControl">
                            <Form.Label column sm={4}>Street</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'street': e.target.value })}
                                placeholder="Enter Street Address"
                                value={formData?.street}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group as={Row} controlId="cityControl">
                            <Form.Label column sm={4}>City</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'city': e.target.value })}
                                placeholder="Enter City Name"
                                value={formData?.city}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group as={Row} controlId="stateControl">
                            <Form.Label column sm={4}>State</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'state': e.target.value })}
                                placeholder="Enter State"
                                value={formData?.state}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group as={Row} controlId="zipControl">
                            <Form.Label column sm={4}>Zip</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'zip': e.target.value })}
                                placeholder="Enter Zipcode"
                                value={formData?.zip}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group> 
                          <Form.Group as={Row} controlId="businessPhonecontrol">
                            <Form.Label column sm={4}>Phone</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'businessPhone': e.target.value })}
                                placeholder="Phone Number"
                                value={formData?.businessPhone}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group> 
                          <Form.Group as={Row} controlId="businessEmailcontrol">
                            <Form.Label column sm={4}>Email</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'businessEmail': e.target.value })}
                                placeholder="Email"
                                value={formData?.businessEmail}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group> 

                          <Form.Group as={Row} controlId="passioncontrol">
                            <Form.Label column sm={4}>1. ARE YOU ??BER PASSIONATE ABOUT YOUR BUSINESS IDEA???S SUBJECT MATTER?</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'passion': e.target.value })}
                                placeholder="Passion Question"
                                value={qualifyFormData?.passion}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group as={Row} controlId="othersinterestcontrol">
                            <Form.Label column sm={4}>2. ARE OTHER PEOPLE INTERESTED IN YOUR PRODUCT OR SERVICE?</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'othersInterest': e.target.value })}
                                placeholder="Others Interested in your product?"
                                value={qualifyFormData?.othersInterest}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                         
                          <Form.Group as={Row} controlId="planBcontrol">
                            <Form.Label column sm={4}>3. WHAT IS YOUR PLAN B (AND MAYBE C)?</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'planB': e.target.value })}
                                placeholder="Plan B?"
                                value={qualifyFormData?.planB}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="pricePointcontrol">
                            <Form.Label column sm={4}>4. WHAT IS YOUR PRICE POINT COMPARED TO COMPETITORS?</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'pricePoint': e.target.value })}
                                placeholder="pricePoint?"
                                value={qualifyFormData?.pricePoint}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group as={Row} controlId="competitioncontrol">
                            <Form.Label column sm={4}>5. WHAT IS YOUR COMPETITION DOING IN EVERY ASPECT OF THEIR BUSINESS?</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'competition': e.target.value })}
                                placeholder="competition?"
                                value={qualifyFormData?.competition}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="growBusinesscontrol">
                            <Form.Label column sm={4}>6. HOW CAN YOU GROW YOUR BUSINESS SUSTAINABLY OR ON A LARGER SCALE?</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'growBusiness': e.target.value })}
                                placeholder="growBusiness?"
                                value={qualifyFormData?.growBusiness}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="insuranceNeedscontrol">
                            <Form.Label column sm={4}>7. WHAT INSURANCE NEEDS DO YOU HAVE?</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'insuranceNeeds': e.target.value })}
                                placeholder="insuranceNeeds?"
                                value={qualifyFormData?.insuranceNeeds}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="costOfEntrycontrol">
                            <Form.Label column sm={4}>8. WHAT IS YOUR COST OF ENTRY?</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'costOfEntry': e.target.value })}
                                placeholder="costOfEntry?"
                                value={qualifyFormData?.costOfEntry}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="monthlyLivingExpensescontrol">
                            <Form.Label column sm={4}>9. WHAT IS YOUR BUDGET FOR YOUR CURRENT LIVING EXPENSES?</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'monthlyLivingExpenses': e.target.value })}
                                placeholder="monthlyLivingExpenses?"
                                value={qualifyFormData?.monthlyLivingExpenses}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="readyAndDrivencontrol">
                            <Form.Label column sm={4}>10. ARE YOU READY AND DRIVEN?</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'readyAndDriven': e.target.value })}
                                placeholder="readyAndDriven?"
                                value={qualifyFormData?.readyAndDriven}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="additionalNotes1control">
                            <Form.Label column sm={4}>11. Please Enter Additional Comments.</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'additionalNotes1': e.target.value })}
                                placeholder="additionalNotes1?"
                                value={qualifyFormData?.additionalNotes1}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="additionalNotes2control">
                            <Form.Label column sm={4}>11. Please Enter Additional Comments.</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'additionalNotes2': e.target.value })}
                                placeholder="additionalNotes2?"
                                value={qualifyFormData?.additionalNotes2}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>

                          </Row>
                        <button class="btn btn-primary" onClick={handleCreateProspect}
                          disabled={
                            !(  
                                qualifyFormData.passion &&
                                qualifyFormData.othersInterest &&
                                qualifyFormData.planB &&
                                qualifyFormData.pricePoint &&
                                qualifyFormData.competition &&
                                qualifyFormData.growBusiness &&
                                qualifyFormData.insuranceNeeds &&
                                qualifyFormData.costOfEntry &&
                                qualifyFormData.monthlyLivingExpenses &&
                                qualifyFormData.readyAndDriven &&
                                qualifyFormData.additionalNotes1 &&
                                qualifyFormData.additionalNotes2 &&
                                isLoaded
                              ) 
                          }
                        > Submit</button>

                      </Form>
                    </Col>
              
                    <Col sm={3}>
                    {isVideoOneON}
                    <Form.Check
                        type="radio"
                        defaultChecked={isVideoOneON}
                        label="First Video"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios4"
                        onChange= {() => selectVideo("1")}
                      />
                      {isVideoTwoON}
                      <Form.Check
                        type="radio"
                        defaultChecked={isVideoTwoON}
                        label="Second Video"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios5"
                        onChange= {() => selectVideo("2")}
                      />
                      {isVideoThreeON}
                      <Form.Check
                        type="radio"
                        defaultChecked={isVideoThreeON}
                        label="Third Video"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios6"
                        onChange= {() => selectVideo("3")}
                      />
                      {isVideoOneON ? <div class="lead-sidebar card">
                        <span class='description'>Please click on the video1 to watch the fundamentals of starting mobile dentistry</span>
                        <iframe width="100%"  src="https://www.youtube.com/embed/7poSoylCwD0">
                        </iframe>
                      </div> :""
                      }
                      {isVideoTwoON ? <div class="lead-sidebar card">
                        <span class='description'>Please click on the video2 to watch the fundamentals of starting mobile dentistry</span>
                        <iframe width="100%"  src="https://www.youtube.com/embed/7poSoylCwD0">
                        </iframe>
                      </div> :""
                      }
                      {isVideoThreeON ? <div class="lead-sidebar card">
                        <span class='description'>Please click on the video3 to watch the fundamentals of starting mobile dentistry</span>
                        <iframe width="100%"  src="https://www.youtube.com/embed/7poSoylCwD0">
                        </iframe>
                      </div>:""
                      }
                    </Col>
                  </Row>
                </div>

              </Container>

        </div>
      </div>
    </div>

  );
}



export default RegistrationApp;