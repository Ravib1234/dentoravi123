import React, { useState, useEffect } from "react";
import '../Leads.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { API, Storage, Auth, graphqlOperation } from "aws-amplify";
import { Navbar, Nav, Container, Tab, Tabs, Form, Row, Col, Button, ListGroup, Card,Image } from 'react-bootstrap';
import { listBizOwners, getBizOwner } from '../graphql/queries';
import { createBizOwner as createBizOwnerMutation, deleteBizOwner as deleteBizOwnerMutation, updateBizOwner } from '../graphql/mutations';

import { listRegistrationQnss } from '../graphql/queries';
import { createRegistrationQns as createRegistrationQnsMutation, deleteRegistrationQns as deleteRegistrationQnsMutation, updateRegistrationQns } from '../graphql/mutations';

import { AiOutlineLink,AiOutlineDown} from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { BsFillExclamationTriangleFill} from 'react-icons/bs';
import Collapsible from 'react-collapsible';
import computerTeeth from '../assets/computer-teeth.png';
import oneTeeth from '../assets/one-teeth.png';
import ttteeth from '../assets/32teeth.png';


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
function Licenses() {

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
        const totalFieldLicense = 7;
        let emptyFieldLicense = 0;
        let completedFieldLicense = 0;
        

        if( formData.businessLicenseNumber == ""){
            emptyFieldLicense++;
        }
        
        if( formData.businessLicenseAcquiredDate == ""){
          emptyFieldLicense++;
        }
        if(formData.businessLicenseExpiryDate == ""){
          emptyFieldLicense++;
        }
        
        if(formData.professionalLicenseName == ""){
          emptyFieldLicense++;
        }
        if(formData.professionalLicenseNumber == ""){
          emptyFieldLicense++;
        }
        if( formData.professionalLicenseAcquiredDate == ""){
          emptyFieldLicense++;
        }
         if(formData.professionalLicenseExpiryDate == ""){
          emptyFieldLicense++;
        }
         
        completedFieldLicense = totalFieldLicense - emptyFieldLicense;

        console.log("Completed Fields", completedFieldLicense);
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
              emptyFieldLicense: emptyFieldLicense,
              completedFieldLicense: completedFieldLicense,
              // emptyfiledsLicense: 2,
              // comppletedFieldsLicense: 5,
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
        <>
         <Container>
                <Col align="center" sm={12} className="video-left-container">
                <h3 className="video-heading"> Licenses </h3>
                 <h5>
                   Please Review the videos and complete <br/>the details below.
                 </h5>
                      {isVideoOneON ? <div class="lead-sidebar ">
                        <iframe width="70%" height="500px" src="https://www.youtube.com/embed/ceY2Jb6Ps1E">
                        </iframe>
                      </div> :""
                      }
                     
                </Col>
                </Container>
                
                <Col align="center" sm={12} className="video-right-container">
                  <div className="web-links-container">
                <Container>
                   {/*} <h3 className="web-link-heading">
                      Click on the below links to view three key aspects of starting a small business 
                    </h3> */}
                    <div className="web-links">
                      <div className="circle-container">
                        <div className="circle-container-inner">
                          <Image src={computerTeeth}  className="teethpngIcons"/>
                        </div>
                        <h4>Equipment & Supplies</h4>
                        <a className="link" target="_blank" href="https://www.inc.com/guides/201101/top-10-reasons-to-run-your-own-business.html" rel="noreferrer">
                          <span><AiOutlineLink className="link-icon"/>Top 10 reasons to Own your own business</span>
                        </a>
                        </div>
                      <div className="circle-container">
                      <div className="circle-container-inner">
                          <Image src={oneTeeth}className="teethpngIcons" />
                        </div>
                        <h4>Equipment & Supplies</h4>
                        <a className="link" target="_blank" href="https://sba.thehartford.com/business-management/what-not-to-do-as-sbo/" rel="noreferrer">
                         <AiOutlineLink className="link-icon"/>20 Common Small Business Mistakes 
                        </a>
                        </div>
                      <div className="circle-container">
                      <div className="circle-container-inner">
                         <Image src={ttteeth} className="teethpngIcons"/>
                        </div>
                        <h4>Equipment & Supplies</h4>
                        <a className="link" target="_blank" href="https://www.forbes.com/sites/forbesfinancecouncil/2018/09/07/three-overlooked-challenges-faced-by-small-businesses/?sh=3d4466fd445d" rel="noreferrer">
                          <AiOutlineLink className="link-icon"/>Forbes: 3 Overlooked Challenges
                        </a>
                        </div>
                    </div>
                </Container>
                  </div>
                </Col>    
         


        <Container className="top-space">
         <Form onSubmit={submitHandler}>
        {/* 
          <Collapsible trigger="Personal Data" open>
            <div className="licenses-tab">
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
                    disabled={false}
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
                    disabled={false}
                  />
                </div>
              </Form.Group>
              </Col>
            </Row>
            </div>
          </Collapsible> 
        */}

        <Collapsible trigger="License Data" open>
        <div className="licenses-tab">

          <Row>
            <Col sm={6}>
            <Form.Group as={Row} controlId="businessLicenseNumbercontrol">
              <Form.Label className="custom-form-label">Business License Number</Form.Label>
              <div class="col-sm-12">
                <input
                  class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                  onChange={e => setFormData({ ...formData, 'businessLicenseNumber': e.target.value })}
                  placeholder="Business License Number"
                  value={formData?.businessLicenseNumber}
                />
              </div>
            </Form.Group>
            <Form.Group as={Row} controlId="businessLicenseAcquiredDatecontrol">
              <Form.Label className="custom-form-label">Acquired Date</Form.Label>
              <div class="col-sm-12">
                <input
                  class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                  onChange={e => setFormData({ ...formData, 'businessLicenseAcquiredDate': e.target.value })}
                  placeholder="Business License Acquired Date"
                  value={formData?.businessLicenseAcquiredDate}
                />
              </div>
            </Form.Group>
            <Form.Group as={Row} controlId="businessLicenseExpiryDatecontrol">
              <Form.Label className="custom-form-label">Expiry Date</Form.Label>
              <div class="col-sm-12">
                <input
                  class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                  onChange={e => setFormData({ ...formData, 'businessLicenseExpiryDate': e.target.value })}
                  placeholder="Busienss License Expiry Date"
                  value={formData?.businessLicenseExpiryDate}
                />
              </div>
            </Form.Group>
            <Form.Group as={Row} controlId="professionalLicenseNamecontrol">
              <Form.Label className="custom-form-label">Professional License Name</Form.Label>
              <div class="col-sm-12">
                <input
                  class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                  onChange={e => setFormData({ ...formData, 'professionalLicenseName': e.target.value })}
                  placeholder="Professional License Name"
                  value={formData?.professionalLicenseName}
                />
              </div>
            </Form.Group>

            </Col>
            <Col sm={6}>
            <Form.Group as={Row} controlId="professionalLicenseNumbercontrol">
              <Form.Label className="custom-form-label">Professional License Number</Form.Label>
              <div class="col-sm-12">
                <input
                  class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                  onChange={e => setFormData({ ...formData, 'professionalLicenseNumber': e.target.value })}
                  placeholder="Professional License Number"
                  value={formData?.professionalLicenseNumber}
                />
              </div>
            </Form.Group>
            <Form.Group as={Row} controlId="professionalLicenseAcquiredDatecontrol">
              <Form.Label className="custom-form-label">Acquired Dated</Form.Label>
              <div class="col-sm-12">
                <input
                  class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                  onChange={e => setFormData({ ...formData, 'professionalLicenseAcquiredDate': e.target.value })}
                  placeholder="Professional License Acquired Date"
                  value={formData?.professionalLicenseAcquiredDate}
                />
              </div>
            </Form.Group>
            <Form.Group as={Row} controlId="professionalLicenseExpiryDatecontrol">
              <Form.Label className="custom-form-label">Expiry Dated</Form.Label>
              <div class="col-sm-12">
                <input
                  class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                  onChange={e => setFormData({ ...formData, 'professionalLicenseExpiryDate': e.target.value })}
                  placeholder="Professional License Expiry Date"
                  value={formData?.professionalLicenseExpiryDate}
                />
              </div>
            </Form.Group>
            
            
            </Col>
          </Row>
          </div>
        </Collapsible>
        <div className="btn-align">
            <button class="btn btn-primary" onClick={handleUpdateLicenses}
                      // disabled={
                        // !( // formData.lname &&
                            // formData.fname &&
                            
                            // formData.businessLicenseNumber &&
                            // formData.businessLicenseAcquiredDate &&
                            // formData.businessLicenseExpiryDate &&                                  
                            // formData.professionalLicenseName &&
                            // formData.professionalLicenseNumber &&
                            // formData.professionalLicenseAcquiredDate &&
                            // formData.professionalLicenseExpiryDate
                          // isLoaded
                          // ) 
                      // }
                  > Save and Continue</button>
            </div>
        </Form>
        </Container>
        </>
    )

};

export default withAuthenticator(Licenses)
