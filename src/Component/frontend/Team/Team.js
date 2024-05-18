// noinspection JSValidateTypes

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';
import './Team.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'; // Assuming this is the icon for your portfolio website

import { TeamBank } from './TeamBank';

const Team = () => {
    const getSocialIcon = (platform) => {
        switch (platform) {
            case 'LinkedIn':
                return { icon: faLinkedin, color: '#0077B5' };
            case 'Facebook':
                return { icon: faFacebook, color: '#1877F2' };
            case 'Twitter':
                return { icon: faTwitter, color: '#1DA1F2' };
            case 'YouTube':
                return { icon: faYoutube, color: '#FF0000' };
            case 'Portfolio':
                return { icon: faGlobe, color: '#YourColorCode' }; // Set the color for your portfolio website
            default:
                return null;
        }
    };

    return (
        <section className="team container" id="Developers" data-aos-duration="2000" data-aos="zoom-in-down">
            <h1 className="heading">Our <span>Team</span></h1>

            <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {TeamBank.map((Team) => (
                    <SwiperSlide key={Team.id}>
                        <div className="team-slider">
                            <div className="swiper-slide slide">
                                <i className="fas fa-quote-right"></i>
                                <div className="user">
                                    <img src={Team.logo} alt="" />
                                    <p>{Team.para}</p>
                                </div>
                                <div className="user">
                                    <div className="user-info">
                                        <h3>{Team.tittle}</h3>
                                        <div className="stars">
                                            {Team.socialMedia.map((socialIcon, index) => {
                                                const { icon, color } = getSocialIcon(socialIcon.platform);
                                                return (
                                                    <a
                                                        key={index}
                                                        href={socialIcon.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="social-link"
                                                        title={socialIcon.platform}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={icon}
                                                            className="social-icon"
                                                            style={{ color: color, marginRight: '10px' }}
                                                        />
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Team;
