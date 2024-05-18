import React from 'react';
import { Link } from 'react-scroll';
import './Hero.css';
import logo from './21426-removebg-preview.png';

const Hero = () => {
    return (
        <section className='hero' id='Home'>
            <div className='container'>
                <div className='row g-0 mt-5'>
                    <div className='col-md-7 d-flex align-items-center'>
                        <div className='copy'>
                            <div className='text-hero-bold'>
                                Redefine Your Library: Books That Inspire
                            </div>
                            <div className='text-hero-regular'>
                                Experience the Perfect Blend of Knowledge and Entertainment with Our Curated Titles. Start Your Reading Revolution Today!
                            </div>
                            <div className='cta'>
                                <a href='#' className='btn btn-hero btn-primar shadow-none'>Explore now</a>
                                <a href='#' className='btn btn-hero btn-secondary shadow-none ms-md-3'>See Pricing</a>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6 d-none'>
                        <img src={logo} alt='img' className='w-100 img-fluid' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;
