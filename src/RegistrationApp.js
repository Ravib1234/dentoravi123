import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import LeadsApp from "./LeadsApp";
import './Leads.css';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Route, Switch, Navigate, NavLink, withRouter,  Redirect, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API, Storage, Auth } from "aws-amplify";
import { Navbar, Nav, Container, Tab, Tabs, Form, Row, Col, Button, ListGroup, Card } from 'react-bootstrap';
import { listBizOwners } from './graphql/queries';
import { createBizOwner as createBizOwnerMutation, deleteBizOwner as deleteBizOwnerMutation, updateBizOwner } from './graphql/mutations';

import { listRegistrationQnss } from './graphql/queries';
import { createRegistrationQns as createRegistrationQnsMutation, deleteRegistrationQns as deleteRegistrationQnsMutation, updateRegistrationQns } from './graphql/mutations';

import Image from 'react-bootstrap/Image';
import bannerImage from './assets/hero-image.jpg';
import dentovationlogo from './assets/dentovation-logo-blue.jpg';
import contImage from './assets/cont-image.jpg';
import computerTeeth from './assets/computer-teeth.png';
import oneTeeth from './assets/one-teeth.png';
import ttteeth from './assets/32teeth.png';
import logoDentovistion from './assets/logoDentovistion.jpeg';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { AiOutlineLink,AiOutlineDown} from 'react-icons/ai';
import { BsFillExclamationTriangleFill} from 'react-icons/bs';
import { GiHamburgerMenu} from 'react-icons/gi';
import { GrClose} from 'react-icons/gr';
import { useForm } from 'react-hook-form';
import Collapsible from 'react-collapsible';
import Footer from "./Components/Footer";


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
  status: 1,
  lname: "",
  fname: "",
  username:"user1",
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
  let history = useHistory();
  const [bizowner, setBizOwner] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  const [questionnaire, setRegistrationQns] = useState([]);
  const [qualifyFormData, setQualifyFormData] = useState(initialQualifyFormState);

  const [createProspect, setCreateProspect] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isVideoOneON, setVideoOneON ] = useState(true);
  const [isVideoTwoON, setVideoTwoON ] = useState(false);
  const [isVideoThreeON, setVideoThreeON ] = useState(false);
  const [mobileNav, setMobileNav ] = useState(false);

  const { register, handleSubmit, reset, formState} = useForm({mode:'onChange'});
  const { touchedFields, errors, isDirty, isValid } = formState;
  const touched = Object.keys(touchedFields);

  useEffect(() => {
    // fetchBizOwner();
  }, []);

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
    qualifyFormData.status = 1;

    await API.graphql({ query: createRegistrationQnsMutation, variables: { input: qualifyFormData } });

   alert(`Updated RegistrationQns for user - ${qualifyFormData.questionnaireId}`);

   setFormData(initialFormState);
   setQualifyFormData(initialQualifyFormState);
  }

   const onSubmit = (data) => {
     console.log(data)
   };
   console.log(errors);
  return (
    <div className="App">
      <div class="container-body">
        <div>
              <Route path="/leadshome" element={<LeadsApp />} />
              <Route path="/registration" element={<RegistrationApp />} />
            <AppBar position="fixed" color="#fff">
                  <Toolbar className="logo-header">
                    <nav role="navigation" className="desktop">
                      <ul id="d-menu">
                         {/*} <h2 className="register-logo-header" color="#fff">Welcome to DentoVation</h2> */}
                          <Image src={dentovationlogo} className="dentovationlogo"/>
                          <div className={mobileNav ? "mobile-signup active": "mobile-signup" }>
                          <li className="register-menu-header"> <a href="#registration" className="nav-links">Home</a> </li>
                          <li className="register-menu-header"> <a onClick={() => history.push('contact-us')} className="nav-links">Contact Us </a> </li>
                          <li className="register-menu-header"> <a onClick={() => history.push('about')} className="nav-links">About Us </a> </li>
                          <li className="register-menu-header"> <a onClick={() => history.push('services')} className="nav-links">Services </a> </li>
                         
                          <li className="register-menu-header"> <a onClick={() => history.push('contact-us')} className="nav-links">Sign Up </a> </li>
                          <li className="register-menu-header"> <a onClick={() => history.push('leadshome') } className="nav-links"> Log In</a> </li>
                          </div>
                      </ul>
                      <div onClick={ClickToOpenNav} className="menu-icon">
                        {mobileNav ? <GrClose className="hamburger"/>:<GiHamburgerMenu className="hamburger"/>}
                      </div>
                    </nav>
                  </Toolbar>
            </AppBar>
         
        <div className="heroImg-container">
          <Image src={bannerImage} fluid className="heroImage"/>
          <div className="welcome-note">
          <div align="left" className="welcome-note-inner" >
            <div className="content-back-ground">
            <h1 className="welcome-msg"><span className="dental-care-text">Welcome to the world of Mobile Dentistry!</span></h1>
            <span className="hero-heading">
            This is your opportunity to leverage our decades of mobile dental experience and the latest in technology to serve your community and their dental needs!
            </span>
            </div>
            </div>
          </div>
        </div>


        <Container>
          <div className="page-instructions"> 
            <div className="page-instructions-lhs">
              <Image src={contImage} className="contentImage"/>
            </div>

            <div className="page-instructions-rhs">
             <p> <span className="first-letter">F</span>irst step in starting your own busienss should include educating yourself regarding 
             three key aspects of a small business: feasibility of your business idea, suitability of your business idea to your life style 
             and the mechanics of owning a business. Please review the videos and links below to educate yourself on the basics of starting your own 
             Mobile Dental business and complete the registration form below by answering a few basic questions. A mobile dental coach from 
             Dentovation will contact you within 48 hours to provide a FREE CONSULTANTION to help you decide and get started with your dream 
             of becoming your own boss by starting a Mobile Dental Business. </p>
           </div>

          </div>
          </Container>

            <div className="videos-container">
            <Container>
                <Col align="center" sm={12} className="video-left-container">
                  <div className="user-steps-container">
                    <span className='user-steps'>Step 1 : Watch the video</span>
                  </div>
                 <h5  className="video-heading">
                   Please Review the videos and complete <br/>the details below.
                 </h5>
                    {/* <div className="video-radio-buttons">
                    {isVideoOneON}
                    <Form.Check
                        type="radio"
                        defaultChecked={isVideoOneON}
                        label="Feasibility"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios4"
                        className="onvideo"
                        onChange= {() => selectVideo("1")}
                      />
                      {isVideoTwoON}
                      <Form.Check
                        type="radio"
                        defaultChecked={isVideoTwoON}
                        label="Suitability"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios5"
                        className="onvideo"
                        onChange= {() => selectVideo("2")}
                      />
                      {isVideoThreeON}
                      <Form.Check
                        type="radio"
                        defaultChecked={isVideoThreeON}
                        label="Mechanics"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios6"
                        className="onvideo"
                        onChange= {() => selectVideo("3")}
                      />
                      </div> */}
                      
                      {isVideoOneON ? <div class="lead-sidebar ">
                        <iframe width="80%" height="500px" src="https://www.youtube.com/embed/ceY2Jb6Ps1E">
                        </iframe>
                      </div> :""
                      }
                      {/* {isVideoTwoON ? <div class="lead-sidebar card">
                        <iframe width="100%" height="300px"  src="https://www.youtube.com/embed/Yi6AjzQqRTU">
                        </iframe>
                      </div> :""
                      }
                      {isVideoThreeON ? <div class="lead-sidebar card">
                        <iframe src="https://cheddar.com/media/the-mechanics-of-a-small-business/player?autoplay=false" width="560" height="300" frameborder="0" allowfullscreen></iframe>
                      </div>:""
                      } */}
                </Col>
                </Container>
                
                <Col align="center" sm={12} className="video-right-container">
                  <div className="web-links-container">
                <Container>
                   {/*} <h3 className="web-link-heading">
                      Click on the below links to view three key aspects of starting a small business 
                    </h3> */}
                    <div className="user-steps-container">
                    <span className='user-steps'>Step 2 : Use these links as a reference</span>
                  </div>
                    <div className="web-links">
                      
                   
                      <div className="circle-container">
                    {/*} <div className="circle-container-inner">
                          <Image src={computerTeeth}  className="teethpngIcons"/>
                        </div>
                        <h4>Equipment & Supplies</h4>
                  */}
                        <a className="link" target="_blank" href="https://www.inc.com/guides/201101/top-10-reasons-to-run-your-own-business.html" rel="noreferrer">
                          <span><AiOutlineLink className="link-icon"/>Top 10 reasons to Own your own business</span>
                        </a>
                        </div>
                      <div className="circle-container">
                      {/*} 
                      <div className="circle-container-inner">
                          <Image src={oneTeeth}className="teethpngIcons" />
                        </div>
                        <h4>Equipment & Supplies</h4>
                */}
                        <a className="link" target="_blank" href="https://sba.thehartford.com/business-management/what-not-to-do-as-sbo/" rel="noreferrer">
                         <AiOutlineLink className="link-icon"/>20 Common Small Business Mistakes 
                        </a>
                        </div>
                      <div className="circle-container">
                       {/*} 
                      <div className="circle-container-inner">
                         <Image src={ttteeth} className="teethpngIcons"/>
                        </div>
                        <h4>Equipment & Supplies</h4>
              */}
                        <a className="link" target="_blank" href="https://www.forbes.com/sites/forbesfinancecouncil/2018/09/07/three-overlooked-challenges-faced-by-small-businesses/?sh=3d4466fd445d" rel="noreferrer">
                          <AiOutlineLink className="link-icon"/>Forbes: 3 Overlooked Challenges
                        </a>
                        </div>
                    </div>
                </Container>
                  </div>
                </Col>
                
            </div>
            

          

          
            <div className="register-text-container">
            <Container>
              <div className="user-steps-container">
                <span className='user-steps'>Step 3 : Fill out the fields below</span>
              </div>
            
              <div className="section-header" >
              
                 <span> REGISTRATION</span>
              </div>
              </Container>
            </div>
          
            
             <div class="qualify-tab border-line" >   
             <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                
                  <Collapsible trigger="Personal Data" open > 
                    <div className="registration" >
                      
                  <Row>
                    <Col sm={6}>
                    <Form.Group as={Row} controlId="fnamecontrol ">
                            <Form.Label className="custom-form-label">First Name</Form.Label>
                            <div class="col-sm-12">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}                                
                                name="firstname"
                                {...register("firstname",{required:true})}
                                placeholder="Owner First Name"
                              />
                            </div>
                            <div className="error-container">
                             {errors.firstname && touched.includes("firstname") && (
                             <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/> First Name Should Not be empty</div>)}
                             {errors.firstname && !touched.includes("firstname") && (
                             <div className="error-msg"> <BsFillExclamationTriangleFill className="error-icon"/>First Name Should Not be empty</div>)}
                            </div>
                      </Form.Group>
                      <Form.Group as={Row} controlId="lnamecontrol">
                        <Form.Label className="custom-form-label" sm={4}>Last Name</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="lastname"
                            {...register("lastname",{required:true})}
                            placeholder="BizOwner Last Name"
                          />
                        </div>
                        <div className="error-container">
                        {errors.lastname && touched.includes("lastname") && (
                        <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Last Name Should Not be empty</div>)}
                        {errors.lastname && !touched.includes("lastname") && (
                        <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Last Name Should Not be empty</div>)}
                        </div>
                      </Form.Group>
                      <Form.Group as={Row} controlId="streetControl">
                        <Form.Label className="custom-form-label" sm={4}>Street</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="street"
                            {...register("street",{required:true})}
                            placeholder="Enter Street Address"
                          />
                        </div>
                            <div className="error-container">
                            {errors.street && touched.includes("street") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Street Should Not be empty</div>)}
                            {errors.street && !touched.includes("street") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Street Should Not be empty</div>)}
                            </div>
                      </Form.Group>
                      <Form.Group as={Row} controlId="cityControl">
                        <Form.Label className="custom-form-label" sm={4}>City</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="city"
                            {...register("city",{required:true})}
                            placeholder="Enter City Name"
                          />
                        </div>
                        <div className="error-container">
                            {errors.city && touched.includes("city") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>City Should Not be empty</div>)}
                            {errors.city && !touched.includes("city") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>City Should Not be empty</div>)}
                        </div>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                    <Form.Group as={Row} controlId="stateControl">
                        <Form.Label className="custom-form-label" sm={4}>State</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="state"
                            {...register("state",{required:true})}
                            placeholder="Enter State"
                          />
                        </div>
                        <div className="error-container">
                            {errors.state && touched.includes("state") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>State Should Not be empty</div>)}
                            {errors.state && !touched.includes("state") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>State Should Not be empty</div>)}
                        </div>
                      </Form.Group>

                      <Form.Group as={Row} controlId="zipControl">
                        <Form.Label className="custom-form-label" >Zip</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="zip"
                            {...register("zip",{required:true, minLength:5, maxLength:5})}
                            placeholder="Enter Zipcode"
                            type="number"
                          />
                        </div>
                        <div className="error-container">
                            {errors.zip && !touched.includes("zip") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Zip Should Not be empty</div>)}
                            {errors.zip && errors.zip.type === "maxLength" && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Please Enter a Valid Zip Code</div>)}
                            {errors.zip && errors.zip.type === "minLength" && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Please Enter a Valid Zip Code</div>)}
                        </div>
                      </Form.Group> 

                      <Form.Group as={Row} controlId="businessPhonecontrol">
                        <Form.Label className="custom-form-label" >Phone</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="phone"
                            {...register("phone",{required:true,minLength:10,maxLength:10})}
                            placeholder="Phone Number"
                            type="number"
                          />
                        </div>
                        <div className="error-container">
                            {errors.phone && !touched.includes("phone") &&  (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Contact No Should not be empty</div>)}
                            {errors.phone && errors.phone.type === "maxLength" && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Please Enter A Valid Phone Number</div>)}
                            {errors.phone && errors.phone.type === "minLength" && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Please Enter A Valid Phone Number</div>)}
                        </div>
                      </Form.Group> 
                      <Form.Group as={Row} controlId="businessEmailcontrol">
                        <Form.Label className="custom-form-label" >Email</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="email"
                            {...register("email",{required:"Please Enter Your Valid Email-id", pattern: {
                              value: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}/,
                              message: "Please enter a valid email address"
                            }})}
                            placeholder="Email"
                          />
                        </div>
                        <div className="error-container">
                            {errors.email && touched.includes("email") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>{errors.email.message}</div>)}
                            {errors.email && !touched.includes("email") &&(
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Email Should Not be empty</div>)}
                        </div>
                      </Form.Group> 
                    </Col>
                    </Row>
                    </div>
                  </Collapsible>

                  <Collapsible trigger="Additional Comments" open>
                  <div className="registration">
                  <Row>
                    <Col sm={6}>
                    <Form.Group as={Row} controlId="passioncontrol">
                        <Form.Label className="custom-form-label" >1. Are You Über Passionate About Your Bussiness Idea's Subject Matter?</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="one_input_data"
                            {...register("one_input_data",{required:true})}
                            placeholder="Passion Question"
                          />
                        </div>
                        <div className="error-container">
                            {errors.one_input_data && touched.includes("one_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>
                            Feild Should Not be empty</div>)}
                            {errors.one_input_data && !touched.includes("one_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>
                            Feild Should Not be empty</div>)}
                        </div>
                      </Form.Group>
                      <Form.Group as={Row} controlId="othersinterestcontrol">
                        <Form.Label className="custom-form-label" >2. Are Other People Inetrested In Tour Product Or Service?</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="two_input_data"
                            {...register("two_input_data",{required:true})}
                            placeholder="Others Interested in your product?"
                          />
                        </div>
                        <div className="error-container">
                            {errors.two_input_data && touched.includes("two_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>
                            Feild Should Not be empty</div>)}
                            {errors.two_input_data && !touched.includes("two_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>
                            Feild Should Not be empty</div>)}
                        </div>
                      </Form.Group>
                      <Form.Group as={Row} controlId="planBcontrol">
                        <Form.Label className="custom-form-label" >3. What Is Your Plan B (And Maybe C)?</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="three_input_data"
                            {...register("three_input_data",{required:true})}
                            placeholder="Plan B?"
                          />
                        </div>
                        <div className="error-container">
                            {errors.three_input_data && touched.includes("three_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                            {errors.three_input_data && !touched.includes("three_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                        </div>
                      </Form.Group>
                      <Form.Group as={Row} controlId="pricePointcontrol">
                        <Form.Label className="custom-form-label" >4. What Is Your Price Point Compared To Competitors?</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="four_input_data"
                            {...register("four_input_data",{required:true})}
                            placeholder="pricePoint?"
                          />
                        </div>
                        <div className="error-container">
                            {errors.four_input_data && touched.includes("four_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                            {errors.four_input_data && !touched.includes("four_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                        </div>
                      </Form.Group>
                      
                      <Form.Group as={Row} controlId="competitioncontrol">
                        <Form.Label className="custom-form-label" >5. What is Your Competition Doing In Every Aspect Of Their Business?</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="five_input_data"
                            {...register("five_input_data",{required:true})}
                            placeholder="competition?"
                          />
                        </div>
                        <div className="error-container">
                            {errors.five_input_data && touched.includes("five_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                            {errors.five_input_data && !touched.includes("five_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                        </div>
                      </Form.Group>

                      <Form.Group as={Row} controlId="growBusinesscontrol">
                        {/* <Form.Label className="custom-form-label" >6. HOW CAN YOU GROW YOUR BUSINESS SUSTAINABLY OR ON A LARGER SCALE?</Form.Label> */}
                        <Form.Label className="custom-form-label" >6. How Can You Grow Your Bussiness Sustainably Or On A Larger Scale?</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="six_input_data"
                            {...register("six_input_data",{required:true})}
                            placeholder="growBusiness?"
                          />
                        </div>
                        <div className="error-container">
                            {errors.six_input_data && touched.includes("six_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                            {errors.six_input_data && !touched.includes("six_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                        </div>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group as={Row} controlId="insuranceNeedscontrol">
                        <Form.Label className="custom-form-label" >7. What Insurance Needs Do You Have?</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="seven_input_data"
                            {...register("seven_input_data",{required:true})}
                            placeholder="insuranceNeeds?"
                          />
                        </div>
                        <div className="error-container">
                            {errors.seven_input_data && touched.includes("seven_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                            {errors.seven_input_data && !touched.includes("seven_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                        </div>
                      </Form.Group>
                      <Form.Group as={Row} controlId="costOfEntrycontrol">
                        <Form.Label className="custom-form-label" >8. What IS Your Cost Of Entry?</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="eight_input_data"
                            {...register("eight_input_data",{required:true})}
                            placeholder="costOfEntry?"
                          />
                        </div>
                        <div className="error-container">
                            {errors.eight_input_data && touched.includes("eight_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                            {errors.eight_input_data && !touched.includes("eight_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                        </div>
                      </Form.Group>
                      <Form.Group as={Row} controlId="monthlyLivingExpensescontrol">
                        <Form.Label className="custom-form-label" >9. What Is Your Budget For Your Current Living Expenses?</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="nine_input_data"
                            {...register("nine_input_data",{required:true})}
                            placeholder="monthlyLivingExpenses?"
                          />
                        </div>
                        <div className="error-container">
                            {errors.nine_input_data && touched.includes("nine_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                            {errors.nine_input_data && !touched.includes("nine_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                        </div>
                      </Form.Group>

                      <Form.Group as={Row} controlId="readyAndDrivencontrol">
                        <Form.Label className="custom-form-label" >10.Are You Ready and Driven?</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="ten_input_data"
                            {...register("ten_input_data",{required:true})}
                            placeholder="readyAndDriven?"
                          />
                        </div>
                        <div className="error-container">
                            {errors.ten_input_data && touched.includes("ten_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                            {errors.ten_input_data && !touched.includes("ten_input_data") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                        </div>
                      </Form.Group>
                      <Form.Group as={Row} controlId="additionalNotes2control">
                        <Form.Label className="custom-form-label" >11. Please Enter Additional Comments.</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="add_commentone"
                            {...register("add_commentone",{required:true})}
                            placeholder="additionalNotes1?"
                          />
                        </div>
                        <div className="error-container">
                            {errors.add_commentone && touched.includes("add_commentone") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                            {errors.add_commentone && !touched.includes("add_commentone") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                        </div>
                      </Form.Group>

                      <Form.Group as={Row} controlId="additionalNotes1control">
                        <Form.Label className="custom-form-label" >11. Please Enter Additional Comments.</Form.Label>
                        <div class="col-sm-12">
                          <input
                            class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                            name="add_commenttwo"
                            {...register("add_commenttwo",{required:true})}
                            placeholder="additionalNotes2?"
                          />
                        </div>
                        <div className="error-container">
                            {errors.add_commenttwo && touched.includes("add_commenttwo") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                            {errors.add_commenttwo && !touched.includes("add_commenttwo") && (
                            <div className="error-msg"><BsFillExclamationTriangleFill className="error-icon"/>Feild Should Not be empty</div>)}
                        </div>
                           
                      </Form.Group>
                    </Col>
                    </Row>
                    </div>
                  </Collapsible>

                  <Row>
                    <Col sm={12} className="submit-button">
                        <button class="btn btn-primary " type="submit" disabled={!isDirty || !isValid}>Submit</button> 
                    </Col>
                   </Row>
                </Form>
                </Container>
                </div>
              <Footer/>
        </div>
      </div>
    </div>

  );
}

export default RegistrationApp;