import React, { useEffect, useState } from 'react';
import './Book.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from 'axios';
import { BASE_URL } from '../../../App';
import Swal from 'sweetalert2';
import { ProductsBank } from './BookBank';

const Product = () => {
    const [getProduct, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchBooks();
        const interval = setInterval(fetchBooks, 10000); // Adjusted interval to 10 seconds for better performance
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    useEffect(() => {
        setFilteredProducts(
            getProduct.filter(product =>
                product.book_name.toLowerCase().includes(searchQuery.toLowerCase())
            ).concat(ProductsBank.filter(product =>
                product.tittle.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        );
    }, [searchQuery, getProduct]);

    const fetchBooks = () => {
        axios.get(BASE_URL + '/auth/books')
            .then(response => {
                setProduct(response.data.book);
                setLoading(false);
            }).catch(error => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    };

    const addToCart = (product) => {
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const isProductInCart = existingCartItems.some(item => item.id === product.id);

        if (!isProductInCart) {
            const newCartItem = { ...product, productQY: 1 };
            const updatedCartItems = [...existingCartItems, newCartItem];
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            setCartItems(updatedCartItems);

            Swal.fire('Success', 'Product added to cart', 'success');
        } else {
            const updatedCartItems = existingCartItems.filter(item => item.id !== product.id);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            setCartItems(updatedCartItems);

            Swal.fire('Success', 'Product removed from cart', 'success');
        }
    };

    const calculateTimeDifference = (lastUpdated) => {
        const currentTime = new Date();
        const updatedTime = new Date(lastUpdated);
        const differenceInMilliseconds = currentTime - updatedTime;
        const seconds = Math.round(differenceInMilliseconds / 1000);
        const minutes = Math.round(seconds / 60);
        const hours = Math.round(minutes / 60);
        const days = Math.round(hours / 24);
        const months = Math.round(days / 30); // Approximate
        const years = Math.round(months / 12); // Approximate

        if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const isProductInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    return (
        <section className='container' id='Gallery'>
            <h1 className="heading" data-aos-duration="2000" data-aos="zoom-in-down">Book <span>Gallery</span></h1>

            <div className='row g-1 g-lg-3' style={{ padding: '5px' }}>
                {
                    loading ? (
                        <div className='text-center mt-4'>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div className='col-6 col-lg-3 pb-1' key={product.id}>
                                <div className="card shadow h-100">
                                    <span className="discount">{product.discount}</span>
                                    <div className='pro-inner'>
                                        <LazyLoadImage src={product.logo} className="card-img-top pro-img" alt="..." effect="blur" />
                                    </div>
                                    <div className="card-body text-center">
                                        <h5 className="card-title pro-title">{product.tittle}</h5>
                                        <div className="stars">
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                        </div>
                                        <div className="card-text my-3">LKR {product.newPrice} / 1Kg</div>
                                        <button
                                            className={`btn pro-btn ${isProductInCart(product.id) ? 'btn-primary' : ''}`}
                                            onClick={() => addToCart(product)}
                                        >
                                            {isProductInCart(product.id) ? 'Remove From Cart' : 'Add To Cart'}
                                        </button>
                                    </div>
                                    <div className="card-footer text-center pro-footer">
                                        <small className="text-body-secondary">Last updated {calculateTimeDifference(product.updated_at)}</small>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-danger text-center py-5 fs-3 font-weight-bold'>
                            No data in database
                        </div>
                    )
                }
            </div>
        </section>
    );
}

export default Product;
