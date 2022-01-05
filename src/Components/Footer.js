import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Footer.css'
import { BsFillTelephoneFill } from 'react-icons/bs';
import { AiOutlineMail,AiFillFacebook,AiFillTwitterSquare } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const Footer = () => {
    return (
        <>
        <div className='footer-container'>
            <Container>
                <div className='footer-inner-container'>
                    <div  className='mt-4'>
                        <div className='quick-Links-container'>
                            <h4>QUICK LINKS</h4>
                            <div  className='hr-heading-u-line'></div>
                            <Link to="/Registration" className='footer-Links'>Home</Link>
                            <Link to="/leadshome" className='footer-Links'>Dashboard Menu</Link>
                            <Link to="/contact-us" className='footer-Links'>Contact Us</Link>
                            <Link to="/contact-us" className='footer-Links' >About Us</Link>
                            <Link to="/contact-us" className='footer-Links'>24 hour Support</Link>
                            <Link to="/contact-us" className='footer-Links'>One-on-One Coaching</Link>
                        </div>
                        {/* <div>
                            <Link to="/Registration" className='footer-Links'>Home</Link>
                            <Link to="/leadshome" className='footer-Links'>Dashboard Menu</Link>
                            <Link to="/contact-us" className='footer-Links'>Contact Us</Link>
                            <Link to="/contact-us" >About Us</Link>
                            <Link to="/contact-us" className='footer-Links'>24 hour Support</Link>
                            <Link to="/contact-us" className='footer-Links'>One-on-One Coaching</Link>
                        </div> */}
                    </div>
                    <div  className='mt-4' >
                         <div className='quick-Links-container'>
                            <h4>CONTACT US</h4>
                            <div  className='hr-heading-u-line'></div>
                            <div className='footer-Contact-Us'>
                                <AiOutlineMail className='footer-Email-Icon'/>
                                <span>admin@dentovation.com</span>
                            </div>
                            <div className='footer-Contact-Us'>
                                <BsFillTelephoneFill className='footer-Phone-Icon'/>
                                <span>248-513-7046</span>
                            </div>
                          </div>
                    </div>
                    <div className='mt-4'>
                    <div className='quick-Links-container'>
                            <h4>CONNECT WITH US</h4>
                            <div  className='hr-heading-u-line'></div>
                            <div className='social-icons-Contact-Us'>
                                <a href=""><AiFillFacebook className='Facebook-icon'/></a>
                                <a href=""><FcGoogle className='google-icon'/></a>
                                <a href=""><AiFillTwitterSquare className='twitter-icon'/></a>
                            </div>
                            
                          </div>

                    </div>
                </div>
            </Container>
            <div className='divideline-of-footer'></div>
            <Container>
                <div className="footer-copyright-container">
                <div className="footer-copyright">
                    <span>Copyright © 2022 DentoVation - All Rights Reserved.</span>
                    <span><a className="privacy-policy">PRIVACY POLICY </a> | <a className="termsandcon"> TERMS & CONDITIONS</a></span>
                  </div>
                  <div>

                  </div>
                </div>
            </Container>
        </div>
            
        </>
    )
}

export default Footer
