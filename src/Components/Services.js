import React from 'react'
import { Navbar, Nav, Container, Tab, Tabs, Form, Row, Col, Button, ListGroup, Card, Image, Dropdown } from 'react-bootstrap';

import NavBar from "./NavBar";
import './ContactUs.css';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { AiOutlineMail,AiFillFacebook,AiFillTwitterSquare } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Footer from './Footer';
import computerTeeth from '../assets/computer-teeth.png';
import oneTeeth from '../assets/one-teeth.png';
import ttteeth from '../assets/32teeth.png';
import { AiOutlineLink,AiOutlineDown} from 'react-icons/ai';


const Services = () => {
    return (
        <>
            <NavBar/>
      <div class="container-body top-space-for-nav">
        
          <Container>
              <h2 className='GetinTouch'>Services We Offer</h2>
              <div className='GetinTouch-btm-line'></div>
              <Row>
              <Col align="center" sm={6} >
                    <p className='support-content mt-3' align="left">
                        <b> We offer guidence and coaching through various means, including Live One-On-One Sessions, and make the entire process easier to follow and reduce overhead. </b>
                   </p>
                  
                </Col>

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
                </Row>
          </Container>
      </div>


      
      <Footer/>
      </>
    )
}

export default Services;
