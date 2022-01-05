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
function Contracts() {

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
        const totalFieldsContract = 12;
        let emptyFieldsContract = 0;
        let completedFieldContract = 0;
         //if (!formData.lname || !formData.fname) return;
         // alert(`Creating new user- ${formData.fname}`);
         if(formData.primaryDentist =="") {
          emptyFieldsContract++;
         }
         if(formData.primaryDentistPhone =="") {
          emptyFieldsContract++;
         }
         if(formData.primaryDentistEmail =="") {
          emptyFieldsContract++;
         }
         if(formData.secondaryDentist =="") {
          emptyFieldsContract++;
         }
         if(formData.secondaryDentistPhone =="") {
          emptyFieldsContract++;
         }
         if(formData.secondaryDentistEmail =="") {
          emptyFieldsContract++;
         }
         if(formData.lawyerName =="") {
          emptyFieldsContract++;
         }
         if(formData.lawyerPhone =="") {
          emptyFieldsContract++;
         }
         if(formData.lawyerEmail =="") {
          emptyFieldsContract++;
         }
         if(formData.accountantName =="") {
          emptyFieldsContract++;
         }
         if(formData.accountantPhone =="") {
          emptyFieldsContract++;
         }
         if(formData.accountantPhone =="") {
          emptyFieldsContract++;
         }
         if(formData.accountantEmail =="") {
          emptyFieldsContract++;
         }


         completedFieldContract = totalFieldsContract - emptyFieldsContract;

        console.log("completed Calculation",completedFieldContract )

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
              completedFieldContracts: completedFieldContract,
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
        <>    

          <div className="videos-container">
          <Container>
                <Col align="center" sm={12} className="video-left-container">
                 <h5  className="video-heading">
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
            </div>


        <Container className="top-space">   
        <Form onSubmit={submitHandler}>
        <Collapsible trigger="Personal Data" open>
        <div className="contracts">
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
          </div>
        </Collapsible>
        <Collapsible trigger="Contracts Data" open>
          <div className="contracts">
          <Row>
            <Col sm={6}>
            <Form.Group as={Row} controlId="primaryDentistcontrol">
                      <Form.Label className="custom-form-label">Primary Dentist Name</Form.Label>
                      <div class="col-sm-12">
                        <input
                          class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                          onChange={e => setFormData({ ...formData, 'primaryDentist': e.target.value })}
                          placeholder="Primary Dentist Name"
                          value={formData?.primaryDentist}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group as={Row} controlId="primaryDentistPhonecontrol">
                      <Form.Label className="custom-form-label">Primary Dentist Phone </Form.Label>
                      <div class="col-sm-12">
                        <input
                          class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                          onChange={e => setFormData({ ...formData, 'primaryDentistPhone': e.target.value })}
                          placeholder="primaryDentistPhone"
                          value={formData?.primaryDentistPhone}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group as={Row} controlId="primaryDentistEmailcontrol">
                      <Form.Label className="custom-form-label">Primary dentist Email</Form.Label>
                      <div class="col-sm-12">
                        <input
                          class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                          onChange={e => setFormData({ ...formData, 'primaryDentistEmail': e.target.value })}
                          placeholder="primaryDentistEmail"
                          value={formData?.primaryDentistEmail}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group as={Row} controlId="secondaryDentistcontrol">
                      <Form.Label className="custom-form-label">Secondary Dentist</Form.Label>
                      <div class="col-sm-12">
                        <input
                          class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                          onChange={e => setFormData({ ...formData, 'secondaryDentist': e.target.value })}
                          placeholder="Professional License Name"
                          value={formData?.secondaryDentist}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group as={Row} controlId="secondaryDentistPhonecontrol">
                      <Form.Label className="custom-form-label"> Secondary Dentist Phone</Form.Label>
                      <div class="col-sm-12">
                        <input
                          class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                          onChange={e => setFormData({ ...formData, 'secondaryDentistPhone': e.target.value })}
                          placeholder="Secondary Dentist Phone"
                          value={formData?.secondaryDentistPhone}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group as={Row} controlId="secondaryDentistEmailcontrol">
                      <Form.Label className="custom-form-label">Secondary Dentist Email</Form.Label>
                      <div class="col-sm-12">
                        <input
                          class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                          onChange={e => setFormData({ ...formData, 'secondaryDentistEmail': e.target.value })}
                          placeholder="Secondary Dentist Email"
                          value={formData?.secondaryDentistEmail}
                        />
                      </div>
                    </Form.Group>
            </Col>
            <Col sm={6}>
            <Form.Group as={Row} controlId="lawyerNamecontrol">
                      <Form.Label className="custom-form-label">Lawyer Name</Form.Label>
                      <div class="col-sm-12">
                        <input
                          class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                          onChange={e => setFormData({ ...formData, 'lawyerName': e.target.value })}
                          placeholder="Lawyer Name"
                          value={formData?.lawyerName}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group as={Row} controlId="lawyerPhonecontrol">
                      <Form.Label className="custom-form-label">Lawyer Phone</Form.Label>
                      <div class="col-sm-12">
                        <input
                          class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                          onChange={e => setFormData({ ...formData, 'lawyerPhone': e.target.value })}
                          placeholder="Lawyer Phone"
                          value={formData?.lawyerPhone}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group as={Row} controlId="lawyerEmailcontrol">
                      <Form.Label className="custom-form-label">Lawyer Email</Form.Label>
                      <div class="col-sm-12">
                        <input
                          class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                          onChange={e => setFormData({ ...formData, 'lawyerEmail': e.target.value })}
                          placeholder="Lawyer Email"
                          value={formData?.lawyerEmail}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group as={Row} controlId="accountantNamecontrol">
                      <Form.Label className="custom-form-label">Accountant Name</Form.Label>
                      <div class="col-sm-12">
                        <input
                          class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                          onChange={e => setFormData({ ...formData, 'accountantName': e.target.value })}
                          placeholder="Accountant Name"
                          value={formData?.accountantName}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group as={Row} controlId="accountantPhonecontrol">
                      <Form.Label className="custom-form-label">Accountant Phone</Form.Label>
                      <div class="col-sm-12">
                        <input
                          class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                          onChange={e => setFormData({ ...formData, 'accountantPhone': e.target.value })}
                          placeholder="Accountant Phone"
                          value={formData?.accountantPhone}
                        />
                      </div>
                    </Form.Group>
                    <Form.Group as={Row} controlId="accountantEmailcontrol">
                      <Form.Label className="custom-form-label">Accountant Email</Form.Label>
                      <div class="col-sm-12">
                        <input
                          class={createProspect ? "form-control" : 'form-control form-control-plaintext'}
                          onChange={e => setFormData({ ...formData, 'accountantEmail': e.target.value })}
                          placeholder="Accountant Email"
                          value={formData?.accountantEmail}
                        />
                      </div>
                    </Form.Group>
            </Col>
          </Row>
          </div>
        </Collapsible>
        <div className="btn-align">
        <button class="btn btn-primary" onClick={handleUpdateContracts} 
                      // disabled={
                      //   !( // formData.lname &&
                      //       // formData.fname &&
                      //       formData.primaryDentist && 
                      //       formData.primaryDentistPhone &&
                      //       formData.primaryDentistEmail &&
                      //       formData.secondaryDentist &&
                      //       formData.secondaryDentistPhone &&
                      //       formData.secondaryDentistEmail &&                                  
                      //       formData.lawyerName &&
                      //       formData.lawyerPhone &&
                      //       formData.lawyerEmail &&
                      //       formData.accountantName &&
                      //       formData.accountantPhone &&
                      //       formData.accountantEmail
                      //     // isLoaded
                      //     ) 
                      // }
                  > Save and Continue</button>
        </div>
        </Form>
        </Container>     
        </>
    )

};

export default withAuthenticator(Contracts)
