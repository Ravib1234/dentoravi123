import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from './logo.svg';
import './Leads.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API, Storage, Auth } from "aws-amplify";
import { Navbar, Nav, Container, Tab, Tabs, Form, Row, Col, Button, ListGroup, Card } from 'react-bootstrap';
import { listBizOwners } from './graphql/queries';
import { createBizOwner as createBizOwnerMutation, deleteBizOwner as deleteBizOwnerMutation, updateBizOwner } from './graphql/mutations';

import { listRegistrationQnss } from './graphql/queries';
import { createRegistrationQns as createRegistrationQnsMutation, deleteRegistrationQns as deleteRegistrationQnsMutation, updateRegistrationQns } from './graphql/mutations';

import Image from 'react-bootstrap/Image';
import bannerImage from './assets/banner-image-1.jpg';


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
  status: 2,
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

let statusCode = 1;
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
  async function handleCreateProspect() {
    setIsLoaded(false);
    setCreateProspect(!createProspect);
    //if (!formData.lname || !formData.fname) return;
    
    // BELOW BizOwnerID needs to be set to be equal to BizOwners username so that it is UNIQUE
    setFormData({ ...formData, 'ownerID': formData.lname+formData.fname})

    qualifyDisabled = false;
    statusCode = 1; 
    await API.graphql({ query: createBizOwnerMutation, variables: { input: formData } });
    setBizOwner([...owner, formData]);
    // setFormData(initialFormState);
    alert(`Created ${formData.fname}`);
  }

  async function handleUpdateQualify() {
    setIsLoaded(false);
    setCreateProspect(!createProspect);
    //if (!formData.lname || !formData.fname) return;

  jumpstartDisabled = false;
  statusCode = 2; 
   alert(`Updating Qualify Questions for user - ${formData.fname}`);

    await API.graphql({
      query: createRegistrationQnsMutation,
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
  alert("Qualify information updated");
  } // setState(initialState);

  async function handleUpdateJumpstart() {
    setIsLoaded(false);
    setCreateProspect(!createProspect);
    //if (!formData.lname || !formData.fname) return;
   // alert(`Creating new user- ${formData.fname}`);
    licenseDisabled = false;
    statusCode = 3; 
  await API.graphql({
    query: updateBizOwner,
    variables: {
      input: {
        id: owner.id,
        businessName: formData.businessName,
        businessDBAName: formData.businessDBAName,
        businessPhone: formData.businessPhone,
        businessEmail: formData.businessEmail,
        businessURL: formData.businessURL
      },
    },
  });
  alert("Jumpstart information updated");
 } // setState(initialState);

async function handleUpdateLicenses(){
  setIsLoaded(false);
  setCreateProspect(!createProspect);
   //if (!formData.lname || !formData.fname) return;
   licenseDisabled = false;
   statusCode = 4; 
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
        professionalLicenseExpiryDate: formData.professionalLicenseExpiryDate
      },
    },
  });

  alert(`License Information updated for - ${formData.fname}`);
 // alert("License information updated");
  
} //License updates handled

async function handleUpdateContracts(){
  setIsLoaded(false);
  setCreateProspect(!createProspect);
   //if (!formData.lname || !formData.fname) return;
   // alert(`Creating new user- ${formData.fname}`);
   statusCode = 5; 
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
        accountantEmail: formData.accountantEmail
      }
    }
  });
 alert("Contract information updated");
  
} //Contract updates handled

async function handleUpdateMarketing() {
  setIsLoaded(false);
  setCreateProspect(!createProspect);
  //if (!formData.lname || !formData.fname) return;
 // alert(`Creating new user- ${formData.fname}`);
  licenseDisabled = false;
  statusCode = 6; 
await API.graphql({
  query: updateBizOwner,
  variables: {
    input: {
      id: owner.id,
      targetMarket: formData.targetMarket,
      socialMediaMarketing: formData.socialMediaMarketing,
      oldfashionedMarketing: formData.oldfashionedMarketing,
      businessReviewsURL: formData.businessReviewsURL
    },
  },
});
alert("Marketing information updated");
} // setState(initialState);

  return (
    <div className="App">
      <div class="container-body">
        <div>
          <Tabs defaultActiveKey="welcome">
            <Tab eventKey="welcome" title="Welcome">
              <Image src={bannerImage} fluid />
            </Tab>
            {/*
            <Tab eventKey="registration" title="0: REGISTRATION">
              <Container>
                <div class="register-container card">
                  <Row>
                    <Col sm={9}>
                      <Form onSubmit={submitHandler}>
                        <Row className="mb-3">
                          <Form.Group as={Row} controlId="fnameControl">
                            <Form.Label column sm={4}>First Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'fname': e.target.value })}
                                placeholder="BizOwner First Name"
                                value={formData?.fname}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                          
                          <Form.Group as={Row} controlId="lnameControl">
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
                        </Row>
                        <button class="btn btn-primary" onClick={handleCreateProspect}
                          disabled={
                            !(  formData.lname &&
                                formData.fname &&
                                formData.street &&
                                formData.city &&
                                formData.state &&
                                formData.zip &&
                                isLoaded
                              ) 
                          }
                        > Save and Continue</button>
                      </Form>
                    </Col>
                    <Col sm={3}>
                    {isVideoOneON}
                    <Form.Check
                        type="radio"
                        defaultChecked={isVideoOneON}
                        label="First Video"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        onChange= {() => selectVideo("1")}
                      />
                      {isVideoTwoON}
                      <Form.Check
                        type="radio"
                        defaultChecked={isVideoTwoON}
                        label="Second Video"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        onChange= {() => selectVideo("2")}
                      />
                      {isVideoThreeON}
                      <Form.Check
                        type="radio"
                        defaultChecked={isVideoThreeON}
                        label="Third Video"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        onChange= {() => selectVideo("3")}
                      />
                      {isVideoOneON ? <div class="lead-sidebar card">
                        <span class='description'>Please click on the video1 to watch the fundamentals of starting mobile dentistry</span>
                        <iframe width="100%"  src="https://youtu.be/7poSoylCwD0">
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
            </Tab>
              */ }

            <Tab eventKey="qualify" title="1: Qualify" disabled={statusCode < 1}>
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
                                placeholder="BizOwner First Name"
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
                                placeholder="BizOwner Last Name"
                                value={formData?.lname}
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
                                disabled={isLoaded}
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
                                disabled={isLoaded}
                              />
                            </div>
                          </Form.Group>
                         
                          <Form.Group as={Row} controlId="planBcontrol">
                            <Form.Label column sm={4}>WHAT IS YOUR PLAN B (AND MAYBE C)?</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setQualifyFormData({ ...qualifyFormData, 'planB': e.target.value })}
                                placeholder="Plan B?"
                                value={qualifyFormData?.planB}
                                disabled={isLoaded}
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
                                disabled={isLoaded}
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
                                disabled={isLoaded}
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
                                disabled={isLoaded}
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
                                disabled={isLoaded}
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
                                disabled={isLoaded}
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
                                disabled={isLoaded}
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
                                disabled={isLoaded}
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
                                disabled={isLoaded}
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
                                disabled={isLoaded}
                              />
                            </div>
                          </Form.Group>

                          </Row>
                        <button class="btn btn-primary" onClick={handleUpdateQualify}
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
                                qualifyFormData.additionalNotes2
                              ) 
                          }
                        > Save and Continue</button>
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
                        <iframe width="100%"  src="https://youtu.be/7poSoylCwD0">
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
            </Tab>
          
            <Tab eventKey="jumpstart" title="2: JUMP START" disabled={statusCode < 2}>
              <Container>    
              <div class="jumpstart-tab">   
              <Row>
                    <Col sm={9}>
                      <Form onSubmit={submitHandler}>
                        <Row className="mb-3">
                          <Form.Group as={Row} controlId="fnameControl">
                            <Form.Label column sm={4}>First Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'fname': e.target.value })}
                                placeholder="BizOwner First Name"
                                value={formData?.fname}
                                disabled={!isLoaded}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="lnameControl">
                            <Form.Label column sm={4}>Last Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'lname': e.target.value })}
                                placeholder="BizOwner Last Name"
                                value={formData?.lname}
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
                              />
                            </div>
                          </Form.Group>
                         
                          <Form.Group as={Row} controlId="businessNamecontrol">
                            <Form.Label column sm={4}>Business Legal Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'businessName': e.target.value })}
                                placeholder="BizOwner Business Name"
                                value={formData?.businessName}
                                disabled={false}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group as={Row} controlId="bizdbaControl">
                            <Form.Label column sm={4}>Doing Business As (DBA) Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'businessDBAName': e.target.value })}
                                placeholder="BizOwner DBA (Doing Business As) Name"
                                value={formData?.businessDBAName}
                               // disabled={isLoaded}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group as={Row} controlId="zipControl">
                            <Form.Label column sm={4}>Business URL</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'businessURL': e.target.value })}
                                placeholder="Enter Business URL Address"
                                value={formData?.businessURL}
                                disabled={isLoaded}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group as={Row} controlId="phoneControl">
                            <Form.Label column sm={4}>Business Phone</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'businessPhone': e.target.value })}
                                placeholder="Enter Business Phone"
                                value={formData?.businessPhone}
                                disabled={isLoaded}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="emailControl">
                            <Form.Label column sm={4}>Business Email</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'businessEmail': e.target.value })}
                                placeholder="Enter Business Email"
                                value={formData?.businessEmail}
                                disabled={isLoaded}
                              />
                            </div>
                          </Form.Group>


                        </Row>
                        <button class="btn btn-primary" onClick={handleUpdateJumpstart}
                          disabled={
                            !(  formData.lname &&
                                formData.fname &&
                                formData.street &&
                                formData.city &&
                                formData.state &&
                                formData.zip &&

                                formData.businessName &&
                                formData.businessDBAName &&
                                formData.businessURL
                               // isLoaded
                              ) 
                          }
                        > Save and Continue</button>
                      </Form>
                    </Col>
                    <Col sm={3}>
                    {isVideoOneON}
                    <Form.Check
                        type="radio"
                        defaultChecked={isVideoOneON}
                        label="First Video"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        onChange= {() => selectVideo("1")}
                      />
                      {isVideoTwoON}
                      <Form.Check
                        type="radio"
                        defaultChecked={isVideoTwoON}
                        label="Second Video"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        onChange= {() => selectVideo("2")}
                      />
                      {isVideoThreeON}
                      <Form.Check
                        type="radio"
                        defaultChecked={isVideoThreeON}
                        label="Third Video"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        onChange= {() => selectVideo("3")}
                      />
                      {isVideoOneON ? <div class="lead-sidebar card">
                        <span class='description'>Please click on the video1 to watch the fundamentals of starting mobile dentistry</span>
                        <iframe width="100%"  src="https://youtu.be/7poSoylCwD0">
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
            </Tab>

            <Tab eventKey="license" title="3: LICENSES" disabled={statusCode < 3}>
              <Container>    
              <div class="license-tab">   

                  <Row>
                    <Col sm={9}>
                      <Form onSubmit={submitHandler}>
                        <Row className="mb-3">
                          <Form.Group as={Row} controlId="fnameControl">
                            <Form.Label column sm={4}>First Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'fname': e.target.value })}
                                placeholder="BizOwner First Name"
                                value={formData?.fname}
                                disabled={true}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="lnameControl">
                            <Form.Label column sm={4}>Last Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'lname': e.target.value })}
                                placeholder="BizOwner Last Name"
                                value={formData?.lname}
                                disabled={true}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="businessLicenseNumbercontrol">
                            <Form.Label column sm={4}>Business License Number</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'businessLicenseNumber': e.target.value })}
                                placeholder="Business License Number"
                                value={formData?.businessLicenseNumber}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="businessLicenseAcquiredDatecontrol">
                            <Form.Label column sm={4}>Acquired Date</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'businessLicenseAcquiredDate': e.target.value })}
                                placeholder="Business License Acquired Date"
                                value={formData?.businessLicenseAcquiredDate}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="businessLicenseExpiryDatecontrol">
                            <Form.Label column sm={4}>Expiry Date</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'businessLicenseExpiryDate': e.target.value })}
                                placeholder="Busienss License Expiry Date"
                                value={formData?.businessLicenseExpiryDate}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="professionalLicenseNamecontrol">
                            <Form.Label column sm={4}>Professional License Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'professionalLicenseName': e.target.value })}
                                placeholder="Professional License Name"
                                value={formData?.professionalLicenseName}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="professionalLicenseNumbercontrol">
                            <Form.Label column sm={4}>Professional License Number</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'professionalLicenseNumber': e.target.value })}
                                placeholder="Professional License Number"
                                value={formData?.professionalLicenseNumber}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="professionalLicenseAcquiredDatecontrol">
                            <Form.Label column sm={4}>Acquired Dated</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'professionalLicenseAcquiredDate': e.target.value })}
                                placeholder="Professional License Acquired Date"
                                value={formData?.professionalLicenseAcquiredDate}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="professionalLicenseExpiryDatecontrol">
                            <Form.Label column sm={4}>Expiry Dated</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'professionalLicenseExpiryDate': e.target.value })}
                                placeholder="Professional License Expiry Date"
                                value={formData?.professionalLicenseExpiryDate}
                              />
                            </div>
                          </Form.Group>
                        </Row>
                        <button class="btn btn-primary" onClick={handleUpdateLicenses}
                            disabled={
                              !( // formData.lname &&
                                  // formData.fname &&
                                  
                                  formData.businessLicenseNumber &&
                                  formData.businessLicenseAcquiredDate &&
                                  formData.businessLicenseExpiryDate &&                                  
                                  formData.professionalLicenseName &&
                                  formData.professionalLicenseNumber &&
                                  formData.professionalLicenseAcquiredDate &&
                                  formData.professionalLicenseExpiryDate
                                // isLoaded
                                ) 
                            }
                        > Save and Continue</button>
                      </Form>
                    </Col>
                  </Row>
              </div>
              </Container>
            </Tab>
            {/*}
            <Tab eventKey="dentist" title="3: DENTIST" disabled={dentistDisabled}>
              <Container>    
              <div class="dentist-tab">   
              </div>
              </Container>
            </Tab>
                        */}
            <Tab eventKey="contracts" title="4: Contracts" disabled={statusCode < 4}>
              <Container>    
              <div class="contracts-tab">   

              <Row>
                    <Col sm={9}>
                      <Form onSubmit={submitHandler}>
                        <Row className="mb-3">
                          <Form.Group as={Row} controlId="fnameControl">
                            <Form.Label column sm={4}>First Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'fname': e.target.value })}
                                placeholder="BizOwner First Name"
                                value={formData?.fname}
                                disabled={true}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="lnameControl">
                            <Form.Label column sm={4}>Last Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'lname': e.target.value })}
                                placeholder="BizOwner Last Name"
                                value={formData?.lname}
                                disabled={true}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="primaryDentistcontrol">
                            <Form.Label column sm={4}>Primary Dentist Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'primaryDentist': e.target.value })}
                                placeholder="Primary Dentist Name"
                                value={formData?.primaryDentist}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="primaryDentistPhonecontrol">
                            <Form.Label column sm={4}>Primary Dentist Phone </Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'primaryDentistPhone': e.target.value })}
                                placeholder="primaryDentistPhone"
                                value={formData?.primaryDentistPhone}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="primaryDentistEmailcontrol">
                            <Form.Label column sm={4}>Primary dentist Email</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'primaryDentistEmail': e.target.value })}
                                placeholder="primaryDentistEmail"
                                value={formData?.primaryDentistEmail}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="secondaryDentistcontrol">
                            <Form.Label column sm={4}>Secondary Dentist</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'secondaryDentist': e.target.value })}
                                placeholder="Professional License Name"
                                value={formData?.secondaryDentist}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="secondaryDentistPhonecontrol">
                            <Form.Label column sm={4}> Secondary Dentist Phone</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'secondaryDentistPhone': e.target.value })}
                                placeholder="Secondary Dentist Phone"
                                value={formData?.secondaryDentistPhone}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="secondaryDentistEmailcontrol">
                            <Form.Label column sm={4}>Secondary Dentist Email</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'secondaryDentistEmail': e.target.value })}
                                placeholder="Secondary Dentist Email"
                                value={formData?.secondaryDentistEmail}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="lawyerNamecontrol">
                            <Form.Label column sm={4}>Lawyer Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'lawyerName': e.target.value })}
                                placeholder="Lawyer Name"
                                value={formData?.lawyerName}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="lawyerPhonecontrol">
                            <Form.Label column sm={4}>Lawyer Phone</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'lawyerPhone': e.target.value })}
                                placeholder="Lawyer Phone"
                                value={formData?.lawyerPhone}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="lawyerEmailcontrol">
                            <Form.Label column sm={4}>Lawyer Email</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'lawyerEmail': e.target.value })}
                                placeholder="Lawyer Email"
                                value={formData?.lawyerEmail}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="accountantNamecontrol">
                            <Form.Label column sm={4}>Accountant Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'accountantName': e.target.value })}
                                placeholder="Accountant Name"
                                value={formData?.accountantName}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="accountantPhonecontrol">
                            <Form.Label column sm={4}>Accountant Phone</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'accountantPhone': e.target.value })}
                                placeholder="Accountant Phone"
                                value={formData?.accountantPhone}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="accountantEmailcontrol">
                            <Form.Label column sm={4}>Accountant Email</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'accountantEmail': e.target.value })}
                                placeholder="Accountant Email"
                                value={formData?.accountantEmail}
                              />
                            </div>
                          </Form.Group>
                          
                        </Row>
                        <button class="btn btn-primary" onClick={handleUpdateContracts}
                            disabled={
                              !( // formData.lname &&
                                  // formData.fname &&
                                  formData.primaryDentist && 
                                  formData.primaryDentistPhone &&
                                  formData.primaryDentistEmail &&
                                  formData.secondaryDentist &&
                                  formData.secondaryDentistPhone &&
                                  formData.secondaryDentistEmail &&                                  
                                  formData.lawyerName &&
                                  formData.lawyerPhone &&
                                  formData.lawyerEmail &&
                                  formData.accountantName &&
                                  formData.accountantPhone &&
                                  formData.accountantEmail
                                // isLoaded
                                ) 
                            }
                        > Save and Continue</button>
                      </Form>
                    </Col>
                  </Row>
              </div>     
              </Container>
            </Tab>

            <Tab eventKey="marketing" title="5: MARKETING" disabled={statusCode <5}>
              <Container> 
                <div class="marketing-tab">   

                  <Row>
                    <Col sm={9}>
                      <Form onSubmit={submitHandler}>
                        <Row className="mb-3">
                          <Form.Group as={Row} controlId="fnameControl">
                            <Form.Label column sm={4}>First Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'fname': e.target.value })}
                                placeholder="BizOwner First Name"
                                value={formData?.fname}
                                disabled={true}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="lnameControl">
                            <Form.Label column sm={4}>Last Name</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'lname': e.target.value })}
                                placeholder="BizOwner Last Name"
                                value={formData?.lname}
                                disabled={true}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="targetMarketcontrol">
                            <Form.Label column sm={4}>Target Market</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'targetMarket': e.target.value })}
                                placeholder="What is your Target Market"
                                value={formData?.targetMarket}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="socialMediaMarketingcontrol">
                            <Form.Label column sm={4}>Social Media Marketing Preferences</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'socialMediaMarketing': e.target.value })}
                                placeholder="Social Media Marketing Preferences"
                                value={formData?.socialMediaMarketing}
                                
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="oldfashionedMarketing">
                            <Form.Label column sm={4}>Traditional Marketing Preferences</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'oldfashionedMarketing': e.target.value })}
                                placeholder="Traditional Marketing Preferences"
                                value={formData?.oldfashionedMarketing}
                                
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="businessReviewsURLcontrol">
                            <Form.Label column sm={4}>Business Reviews Website URL</Form.Label>
                            <div class="col-sm-8">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'businessReviewsURL': e.target.value })}
                                placeholder="Business Reviews Website URL"
                                value={formData?.businessReviewsURL}
                              />
                            </div>
                          </Form.Group>
                          </Row>
                          <button class="btn btn-primary" onClick={handleUpdateMarketing}
                            disabled={
                              !(  // formData.lname &&
                                  // formData.fname &&
                                  formData.targetMarket &&
                                  formData.socialMediaMarketing &&
                                  formData.oldfashionedMarketing &&
                                  formData.businessReviewsURL
                                // isLoaded
                                ) 
                            }
                          > Save and Continue</button>

                      </Form>
                    </Col>
                  </Row>
                </div>
              </Container>
            </Tab>
            
            
          </Tabs>
        </div>
      </div>
     
    </div>

  );
}



//export default LeadsApp;
// <AmplifySignOut /> 
export default withAuthenticator(LeadsApp)