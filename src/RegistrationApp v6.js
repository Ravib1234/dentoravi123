import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from './logo.svg';
import LeadsApp from "./LeadsApp";
import './Leads.css';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Routes, Route, Switch, Navigate, NavLink, withRouter,  Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API, Storage, Auth } from "aws-amplify";
import { Navbar, Nav, Container, Tab, Tabs, Form, Row, Col, Button, ListGroup, Card } from 'react-bootstrap';
import { listBizOwners } from './graphql/queries';
import { createBizOwner as createBizOwnerMutation, deleteBizOwner as deleteBizOwnerMutation, updateBizOwner } from './graphql/mutations';

import { listRegistrationQnss } from './graphql/queries';
import { createRegistrationQns as createRegistrationQnsMutation, deleteRegistrationQns as deleteRegistrationQnsMutation, updateRegistrationQns } from './graphql/mutations';

import Image from 'react-bootstrap/Image';
import bannerImage from './assets/banner-image-1.jpg';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";


/*
async function fetchBizOwner(){

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
  status: 0.0,
  lname: "",
  fname: "",
  businessName: "",
  businessDBAName: "",
  street: "",
  unit: "",
  city: "",
  state: "",
  zip: "",

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

function RegistrationApp() {
  let history = useNavigate();
  const [bizowner, setBizOwner] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  const [questionnaire, setRegistrationQns] = useState([]);
  const [qualifyFormData, setQualifyFormData] = useState(initialQualifyFormState);

  const [createProspect, setCreateProspect] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isVideoOneON, setVideoOneON ] = useState(true);
  const [isVideoTwoON, setVideoTwoON ] = useState(false);
  const [isVideoThreeON, setVideoThreeON ] = useState(false);

  useEffect(() => {
    // fetchBizOwner();
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
  async function fetchBizOwner() {
    const apiData = await API.graphql({ query: listBizOwners });
    setBizOwner(apiData.data.listBizOwners.items);
    setFormData(apiData.data.listBizOwners.items[0])
  }
  async function fetchRegistrationQns() {
    const apiData = await API.graphql({ query: listRegistrationQnss });
    setRegistrationQns(apiData.data.listRegistrationQnss.items);
    setFormData(apiData.data.listRegistrationQnss.items[0])
  }
  async function handleCreateRegistration() {
    setIsLoaded(false);
    setCreateProspect(!createProspect);
    //if (!formData.lname || !formData.fname) return;
    
    // BELOW ownerID needs to be set to be equal to BizOwners username so that it is UNIQUE
    //setFormData({ ...formData, 'ownerID': formData.lname+formData.fname});
    formData.ownerID = formData.lname + formData.fname;

    statusCode = 1; 
    await API.graphql({ query: createBizOwnerMutation, variables: { input: formData } });
    setBizOwner([...bizowner, formData]);

    qualifyFormData.questionnaireId= formData.ownerID; 

    await API.graphql({ query: createRegistrationQnsMutation, variables: { input: qualifyFormData } });

   alert(`Updated RegistrationQns for user - ${qualifyFormData.questionnaireId}`);

   setFormData(initialFormState);
   setQualifyFormData(initialQualifyFormState);
  }

  async function gotoLeadsPage(){
    <Navigate to="/leadshome" />
  }
 
  return (
    <div className="App">
      <div class="container-body">
        <div>
          <Routes>
              <Route path="/leadshome" element={<LeadsApp />} />
              <Route path="/registration" element={<RegistrationApp />} />
          </Routes>
             
            <AppBar position="fixed" color="#fff">
                  <Toolbar className="logo-header">
                    {/*} <img class="logo_style" src={logo} alt="..." /> */}
                    <h3 className="register-logo-header" color="#fff">WELCOME TO MOBILE DENTISTRY</h3>
                    <nav role="navigation">
                      <ul id="d-menu">
                        <li> <Link to='/leadshome'> Login</Link></li>
                       {/* <li> <a onClick={() => gotoLeadsPage()}>GOTO Leads Page</a></li> */}

                       {/*}   <li> <a onClick={() => history.push('excel-imports') }>Prescreen-Upload</a> </li> */}
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
                                    value={formData.fname}
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
                                placeholder="BizOwner Last Name"
                                value={formData?.lname}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                  
                          <Form.Group as={Row} controlId="streetControl">
                            <Form.Label column sm={4}>Street</Form.Label>
                            <div class="col-sm-8">
                              <input
                                //class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
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
                            <Form.Label column sm={4}>1. ARE YOU ÜBER PASSIONATE ABOUT YOUR BUSINESS IDEA’S SUBJECT MATTER?</Form.Label>
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
                        <button class="btn btn-primary" onClick={handleCreateRegistration}
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