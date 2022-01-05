import React from 'react'
import { Navbar, Nav, Container, Tab, Tabs, Form, Row, Col, Button, ListGroup, Card, Dropdown } from 'react-bootstrap';

import NavBar from "./NavBar";
import './ContactUs.css';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { AiOutlineMail,AiFillFacebook,AiFillTwitterSquare } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Footer from './Footer';


const LiveCoaching = () => {
    return (
        <>
            <NavBar/>
      <div class="container-body top-space-for-nav">
        
          <Container>
              <h2 className='GetinTouch'>Live One-on-One Coaching</h2>
              <div className='GetinTouch-btm-line'></div>
              <Row>
              <Col align="center" sm={6} >
                    <p className='support-content mt-3' align="left">
                        Congratulaions on your continued commitment towards owning your own Mobile Dental Business. Please provide details below so we can scheudule a one-on-one live coaching session with one of our experienced coaches. 
                   </p>
                    <div className='PhoneNumber-Contact-Us'>
                        <BsFillTelephoneFill className='Phone-Icon'/>
                        <span>913.555.1212</span>
                    </div>
                    <div className='Email-Contact-Us'>
                        <AiOutlineMail className='Email-Icon'/>
                        <span>admin@dentovation.com</span>
                    </div>
                    <div className='social-icons-Contact-Us'>
                        <a href=""><AiFillFacebook className='Facebook-icon'/></a>
                        <a href=""><FcGoogle className='google-icon'/></a>
                        <a href=""><AiFillTwitterSquare className='twitter-icon'/></a>
                    </div>
                </Col>
               <Col align="center" sm={6}>
                <Form.Group as={Row} controlId="businessLicenseNumbercontrol">
                    <div class="col-sm-12 mt-3">
                        <input
                        class= "form-control"
                        placeholder="Name"
                        />
                    </div>
                    </Form.Group> 
                    <Form.Group as={Row} controlId="businessLicenseNumbercontrol">
                    <div class="col-sm-12 mt-3">
                        <input
                        class= "form-control"
                        placeholder="Email"
                        />
                    </div>
                  </Form.Group>
                    <Form.Group as={Row} controlId="businessLicenseNumbercontrol">
                    <div class="col-sm-12 mt-3">
                        <input
                        class= "form-control"
                        placeholder="Phone"
                        />
                    </div>
                  </Form.Group>
                    <Form.Group as={Row} controlId="businessLicenseNumbercontrol">
                    <div class="col-sm-12 mt-3">
                        <input
                        class= "form-control"
                        placeholder="Zip Code"
                        />
                    </div>
                  </Form.Group>
                    <Form.Group as={Row} controlId="businessLicenseNumbercontrol">
                    <div class="col-sm-12 mt-3">
                        <input
                        class= "form-control"
                        placeholder="Subject"
                        />
                    </div>
                  </Form.Group>
                    <Form.Group as={Row} controlId="businessLicenseNumbercontrol">
                    <div class="col-sm-12 mt-3">
                        <select class= "form-control">
                            <option>Costomer</option>
                            <option>ental Care Provider</option>
                        </select>
                    </div>
                  </Form.Group>
                  <Form.Group as={Row} controlId="businessLicenseNumbercontrol">
                    <div class="col-sm-12 mt-3">
                    <textarea class= "form-control"  rows={3}>
                        
                        </textarea>
                    </div>
                    
                  </Form.Group>
                  <div className='send-btn-contact-us'>
                        <Button>Send</Button>
                    </div>
                </Col>
                </Row>
          </Container>
      </div>
      <Footer/>
      </>
    )
}

export default LiveCoaching;
