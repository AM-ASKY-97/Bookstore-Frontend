import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { LinkBank } from './LinkBank';
import { FaShoppingCart } from 'react-icons/fa';

import logo from './logo.png';

const Navbar = () => {
    const [navbar, setNavbar] = useState("navbar");
    const [activeLink, setActiveLink] = useState('');
    const [offcanvasOpen, setOffcanvasOpen] = useState(false); // State to manage offcanvas menu visibility
    const [cartItems, setCartItems] = useState([]);

    const handleClick = (link) => {
        setActiveLink(link);
        // Close the offcanvas menu when a link is clicked
        setOffcanvasOpen(false);
    };

    useEffect(() => {
        setActiveLink('Home');

        const handleScroll1 = () => {
            const scrollPosition = window.scrollY;
            const sectionHeight = 100; // Update with your desired height

            LinkBank.map((linkBank) => {
                const element = document.getElementById(linkBank.linkName);
                if (element) {
                    const elementOffsetTop = element.offsetTop;
                    if (scrollPosition >= elementOffsetTop - sectionHeight) {
                        setActiveLink(linkBank.linkName);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll1);

        const handleScroll = () => {
            setNavbar('navbar');

            if (window.scrollY > 100) {
                setNavbar("navbar scrolled");
            } else {
                setNavbar("navbar");
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup for both scroll event listeners
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScroll1);
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            setCartItems(storedCartItems);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const itemCount = cartItems.length;

    return (
        <nav className={`${navbar} navbar-expand-lg navbar-dark fixed-top`}>
            <div className="container">
                <RouterLink to="/" className=''>
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="" className='logo' />
                    </a>
                </RouterLink>
                <div className={`offcanvas offcanvas-end text-bg-dark ${offcanvasOpen ? 'show' : ''}`} tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <RouterLink to="/">
                            <a className="navbar-brand" href="#">
                                <img src={logo} alt="" className='logo' />
                            </a>
                        </RouterLink>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setOffcanvasOpen(false)}></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {LinkBank.map((linkBank) => (
                                <li key={linkBank.id} className="nav-item">
                                    <ScrollLink
                                        to={linkBank.linkName}
                                        spy={true}
                                        smooth={true}
                                        offset={-70}
                                        duration={500}
                                        className={`nav-link us-nav mx-lg-2 ${activeLink === linkBank.linkName ? 'active' : 'notactive'}`}
                                        onClick={() => handleClick(linkBank.linkName)}
                                    >
                                        {linkBank.linkName}
                                    </ScrollLink>
                                </li>
                            ))}
                            <RouterLink to="/login" className="login-button ms-md-5" onClick={() => setOffcanvasOpen(false)}>Login</RouterLink>
                        </ul>
                    </div>
                </div>
                <button className="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" onClick={() => setOffcanvasOpen(!offcanvasOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <button type="button" className="btn position-relative">
                    <FaShoppingCart className="fs-4 text-light" />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {itemCount >= 0 && <span>{itemCount}</span>}
                    </span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
