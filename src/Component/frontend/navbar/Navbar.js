import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { LinkBank } from './LinkBank';
import { FaShoppingCart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import logo from './logo.png';

const Navbar = () => {
    const [navbar, setNavbar] = useState("navbar");
    const [activeLink, setActiveLink] = useState('');
    const [offcanvasOpen, setOffcanvasOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = (link) => {
        setActiveLink(link);
        setOffcanvasOpen(false);
    };

    useEffect(() => {
        setActiveLink('Home');

        const handleScroll1 = () => {
            const scrollPosition = window.scrollY;
            const sectionHeight = 100;

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

    const handleCartButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const removeFromCart = (productId) => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = storedCartItems.filter(item => item.id !== productId);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);

        Swal.fire('Success', 'Product removed from cart', 'success');
    };

    const increaseQuantity = (productId) => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = storedCartItems.map(item => {
            if (item.id === productId) {
                return { ...item, productQY: item.productQY + 1 };
            }
            return item;
        });
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
    };

    const decreaseQuantity = (productId) => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = storedCartItems.map(item => {
            if (item.id === productId && item.productQY > 1) {
                return { ...item, productQY: item.productQY - 1 };
            }
            return item;
        });
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
    };

    const itemCount = cartItems.length;

    return (
        <>
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
                    <button type="button" className="btn position-relative" onClick={handleCartButtonClick}>
                        <FaShoppingCart className="fs-4 text-light" />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {itemCount >= 0 && <span>{itemCount}</span>}
                        </span>
                    </button>

                    <button className="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" onClick={() => setOffcanvasOpen(!offcanvasOpen)}>
                        <span className="navbar-toggler-icon"> </span>
                    </button>
                </div>
            </nav>

            {/* Modal */}
            <div className={`modal fade ${isModalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cart Items</h5>
                            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            {cartItems.length > 0 ? (
                                <div class="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-nowrap text-truncate">Title</th>
                                                <th scope="col" className="text-nowrap text-truncate">Price</th>
                                                <th scope="col" className="text-nowrap text-truncate">Quantity</th>
                                                <th scope="col" className="text-nowrap text-truncate">Total</th>
                                                <th scope="col" className="text-nowrap text-truncate">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="text-nowrap text-truncate">{item.tittle}</td>
                                                    <td className="text-nowrap text-truncate">LKR {item.newPrice}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <button className="btn btn-secondary btn-sm me-2 p-1" onClick={() => decreaseQuantity(item.id)}>-</button>
                                                            <span className="d-md-inline">{item.productQY}</span>
                                                            <button className="btn btn-secondary btn-sm ms-2 p-1" onClick={() => increaseQuantity(item.id)}>+</button>
                                                        </div>
                                                    </td>
                                                    <td className="text-nowrap text-truncate">LKR {item.newPrice * item.productQY}</td>
                                                    <td>
                                                        <button className="btn btn-danger btn-sm p-1" onClick={() => removeFromCart(item.id)}>Remove</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className='text-center'>
                                    <p className='text-danger'>No items in cart.</p>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
