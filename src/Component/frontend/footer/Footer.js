import React from 'react'

import './Footer.css';

import footerLogo from './payment (2).png';


const Footer = () => {
    return (
        <section className='container-fluid bg-dark bg-gradient footer'>
            <div className='container'>
                <div className='row gx-4'>
                    <div className='col-12 col-md-6 col-xl-3'>
                        <h1 className='footer-title fw-bold'>Tech <span>Tribe</span></h1>

                        <p>Welcome to Bookworm Haven, a visionary team passionate about literature. Our groundbreaking approach revolutionizes the way you access books, reducing delivery times by up to 85%. We prioritize sourcing from local authors and swiftly dispatch through seamless logistics, ensuring your favorite reads reach you in eco-conscious packaging.</p>
                    </div>

                    <div className='col-12 col-md-6 col-xl-3 contact'>
                        <h1 className='footer-title fw-bold'>Contact Info</h1>

                        <a href="" className="links"><i className="fas fa-phone"></i>+94775311974</a>
                        <a href="" className="links"><i className="fas fa-phone"></i>+94751311974</a>
                        <a href="" className="links"><i className="fas fa-envelope"></i>techtribe@gmail.com</a>
                        <a href="" className="links"><i className="fas fa-map-marker-alt"></i>Sri lanka, sammanthurai</a>
                    </div>

                    <div className='col-12 col-md-6 col-xl-3 contact'>
                        <h1 className='footer-title fw-bold'>Quick Links</h1>

                        <a href="" className="links"><i className="fas fa-arrow-right"></i>Home</a>
                        <a href="" className="links"><i className="fas fa-arrow-right"></i>Features</a>
                        <a href="" className="links"><i className="fas fa-arrow-right"></i>Gallery</a>
                        <a href="" className="links"><i className="fas fa-arrow-right"></i>Categories</a>
                        <a href="" className="links"><i className="fas fa-arrow-right"></i>Review</a>
                        <a href="" className="links"><i className="fas fa-arrow-right"></i>Blog</a>
                        <a href="" className="links"><i className="fas fa-arrow-right"></i>Contact</a>
                    </div>

                    <div className='col-12 col-md-6 col-xl-3'>
                        <h1 className='footer-title fw-bold'>Newsletter</h1>

                        <p>Sign up to get 10% off your first order and stay up to date on the latest books releases, special offers and news.</p>
                        <input type="email" name="" id="" placeholder="your email" className="email" />
                        <input type="submit" value="subscribe" className="btn btn-primary sub-btn my-2" /><br />
                        <img src={footerLogo} className="payment-img" alt="" />
                    </div>
                </div>
            </div>

            <div className="credit">Created By <span><a href="#"><b>TEAM <b>TECH </b>TRIBE</b></a></span> | ©
                2024 All rights reserved.
            </div>
        </section>
    )
}

export default Footer