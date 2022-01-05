import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './Leads.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API, Storage, Auth, graphqlOperation } from "aws-amplify";
import { Navbar, Nav, Container, Tab, Tabs, Form, Row, Col, Button, ListGroup, Card } from 'react-bootstrap';
import { listBizOwners, getBizOwner } from './graphql/queries';
import { createBizOwner as createBizOwnerMutation, deleteBizOwner as deleteBizOwnerMutation, updateBizOwner } from './graphql/mutations';

import { listRegistrationQnss } from './graphql/queries';
import { createRegistrationQns as createRegistrationQnsMutation, deleteRegistrationQns as deleteRegistrationQnsMutation, updateRegistrationQns } from './graphql/mutations';

import Image from 'react-bootstrap/Image';
import bannerImage from './assets/banner-image-1.jpg';
import { AiOutlineLink,AiOutlineDown} from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { BsFillExclamationTriangleFill} from 'react-icons/bs';
import Collapsible from 'react-collapsible';


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
    businessReviewsURL: ""
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
function Marketing() {

    const [formData, setFormData] = useState(initialFormState);
    const [createProspect, setCreateProspect] = useState(true);
    const [isVideoOneON, setVideoOneON ] = useState(true);
    const [isVideoTwoON, setVideoTwoON ] = useState(false);
    const [isVideoThreeON, setVideoThreeON ] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const [statusCode, setStatusCode] = useState(1);
    const [owner, setBizOwner] = useState([]);
    const [tabState, setTabState] = useState("welcome");
  
    const { register, handleSubmit, reset, formState} = useForm({mode:'onChange'});
    const { touchedFields, errors, isDirty, isValid } = formState;
    const touched = Object.keys(touchedFields);

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

      useEffect(() => {
        fetchBizOwner();
      }, [isLoaded, tabState]);

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
      alert("Jumpstart information updated");
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
        alert(`License Information updated for - ${formData.fname}`);
       // alert("License information updated");
        
      }

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
      }


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
       alert("Contract information updated");
      } 


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

      


    return (
        <Container> 
             <div className="videos-container">
                <Col align="left" sm={6} className="video-left-container">
                 <h5  className="video-heading">
                  Please Review the videos and complete the details below.
                 </h5>
                    <div className="video-radio-buttons">
                    {isVideoOneON}
                    <Form.Check
                        type="radio"
                        defaultChecked={isVideoOneON}
                        label="First Video"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios4"
                        className="onvideo"
                        onChange= {() => selectVideo("1")}
                      />
                      {isVideoTwoON}
                      <Form.Check
                        type="radio"
                        defaultChecked={isVideoTwoON}
                        label="Second Video"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios5"
                        className="onvideo"
                        onChange= {() => selectVideo("2")}
                      />
                      {isVideoThreeON}
                      <Form.Check
                        type="radio"
                        defaultChecked={isVideoThreeON}
                        label="Third Video"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios6"
                        className="onvideo"
                        onChange= {() => selectVideo("3")}
                      />
                      </div>
                      
                      {isVideoOneON ? <div class="lead-sidebar card">
                        <span class='description'>Please click on the video1 to watch Good and Bad of Mobile Dentistry</span>
                        <iframe width="100%" height="250px" src="https://www.youtube.com/embed/_187nwVlMRQ">
                        </iframe>
                      </div> :""
                      }
                      {isVideoTwoON ? <div class="lead-sidebar card">
                        <span class='description'>Please click on the video2 to watch the fundamentals of starting mobile dentistry</span>
                        <iframe width="100%" height="250px"  src="https://www.youtube.com/embed/Wzmacu2TgFg">
                        </iframe>
                      </div> :""
                      }
                      {isVideoThreeON ? <div class="lead-sidebar card">
                        <span class='description'>Please click on the video3 to watch the fundamentals of starting mobile dentistry</span>
                        <iframe width="100%" height="250px"  src="https://www.youtube.com/embed/7poSoylCwD0">
                        </iframe>
                      </div>:""
                      }
                </Col>
                <Col align="left" sm={6} className="video-right-container">
                  <div className="video-links-container">
                    <h5  className="video-link-heading">
                      Please Review the videos Link below.
                    </h5>
                    <div className="video-links">
                    <a className="link" href="https://youtu.be/_187nwVlMRQ">
                      <AiOutlineLink className="link-icon"/>Link One 
                    </a>
                    <a className="link" href="https://youtu.be/Wzmacu2TgFg">
                      <AiOutlineLink className="link-icon"/>Link Two 
                    </a>
                    <a className="link" href="https://youtu.be/7poSoylCwD0">
                      <AiOutlineLink className="link-icon"/>Link Three 
                    </a>
                    </div>
                  </div>
                </Col>
            </div>

                <div class="marketing-tab">   
                <Form onSubmit={submitHandler}>
                <Collapsible trigger={<b> Demographic Data </b>} open>
                    <Row>
                        <Col sm={6}>
                        <Form.Group as={Row} controlId="fnameControl">
                            <Form.Label className="custom-form-label">First Name</Form.Label>
                            <div class="col-sm-12">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'fname': e.target.value })}
                                placeholder="Owner First Name"
                                value={formData?.fname}
                                disabled={true}
                              />
                            </div>
                          </Form.Group>
                        </Col>
                        <Col sm={6}>
                        <Form.Group as={Row} controlId="lnameControl">
                            <Form.Label className="custom-form-label">Last Name</Form.Label>
                            <div class="col-sm-12">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'lname': e.target.value })}
                                placeholder="Owner Last Name"
                                value={formData?.lname}
                                disabled={true}
                              />
                            </div>
                          </Form.Group>
                        </Col>
                    </Row>
                 </Collapsible>
                 <Collapsible trigger={<b> Marketing Data </b>} open>
                    <Row>
                        <Col sm={6}>
                        <Form.Group as={Row} controlId="targetMarketcontrol">
                            <Form.Label className="custom-form-label">Target Market</Form.Label>
                            <div class="col-sm-12">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'targetMarket': e.target.value })}
                                placeholder="What is your Target Market"
                                value={formData?.targetMarket}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="socialMediaMarketingcontrol">
                            <Form.Label className="custom-form-label">Social Media Marketing Preferences</Form.Label>
                            <div class="col-sm-12">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'socialMediaMarketing': e.target.value })}
                                placeholder="Social Media Marketing Preferences"
                                value={formData?.socialMediaMarketing}
                                
                              />
                            </div>
                          </Form.Group>

                        </Col>
                        <Col sm={6}>
                        <Form.Group as={Row} controlId="oldfashionedMarketing">
                            <Form.Label className="custom-form-label">Traditional Marketing Preferences</Form.Label>
                            <div class="col-sm-12">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'oldfashionedMarketing': e.target.value })}
                                placeholder="Traditional Marketing Preferences"
                                value={formData?.oldfashionedMarketing}
                                
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Row} controlId="businessReviewsURLcontrol">
                            <Form.Label className="custom-form-label">Business Reviews Website URL</Form.Label>
                            <div class="col-sm-12">
                              <input
                                class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                                onChange={e => setFormData({ ...formData, 'businessReviewsURL': e.target.value })}
                                placeholder="Business Reviews Website URL"
                                value={formData?.businessReviewsURL}
                              />
                            </div>
                          </Form.Group>
                        </Col>
                    </Row>
                    
                 </Collapsible>
                 <div className="btn-align">
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
                  </div>
                </Form>

                  
                </div>
              </Container>
    )

};

export default withAuthenticator(Marketing)
