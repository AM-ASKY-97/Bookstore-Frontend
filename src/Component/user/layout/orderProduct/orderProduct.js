import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../App';
import './OrderProduct.css';

const OrderProduct = () => {
    const [query, setQuery] = useState("");
    const [availableBooks, setAvailableBooks] = useState([]);
    const [count, setCount] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    const [inputs, setInputs] = useState({
        id: "",
        bookName: "",
        price: "",
        productQY: ""
    });

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const handleModalClose = () => {
        setCount(true);
        setQuery('');
        setAvailableBooks([]);
    };

    const handleSearch = (event) => {
        const getUserData = event.target.value;
        console.log(getUserData);
        setQuery(getUserData);

        if (getUserData.trim().length > 0) {
            axios.get(BASE_URL + '/auth/search/' + getUserData).then(res => {
                if (res.data.status === 200) {
                    console.log("success");
                    setAvailableBooks(res.data.book);
                }
            });
        } else {
            setAvailableBooks([]); // Clearing availableBooks state
        }
    }

    const handleAddToCart = () => {
        const newItem = {
            id: inputs.id,
            book_name: inputs.bookName,
            selling_price: inputs.price,
            productQY: inputs.productQY
        };

        // Get existing cart items from local storage
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Merge existing items with the new one
        const updatedCartItems = [...existingCartItems, newItem];

        // Save the updated cart items to local storage
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        // Update state to reflect the changes in UI
        setCartItems(updatedCartItems);

        // Show a confirmation message
        Swal.fire('Success', 'Product added to cart', 'success');

        // Clear cart item after 2 hours
        setTimeout(() => {
            const updatedCartItems = JSON.parse(localStorage.getItem('cartItems')).filter(item => item.id !== inputs.id);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            setCartItems(updatedCartItems);
            Swal.fire('Warning', 'Cart item has been removed due to inactivity', 'warning');
        }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds

        // Close the modal
        handleModalClose();
    }

    const handlegetBook = (bookId) => {
        axios.get(BASE_URL + '/auth/searchBookName/' + bookId).then(res => {
            if (res.data.status === 200) {
                const bookData = res.data.bookName[0];
                if (bookData) {
                    setCount(false);
                    setInputs({
                        bookName: bookData.book_name,
                        price: bookData.selling_price,
                        id: bookData.id
                    });
                } else {
                    // Handle case where bookData is undefined
                    console.error("Book data is undefined");
                }
            } else {
                // Handle other status codes
                console.error("Error fetching book data:", res.data.status);
            }
        }).catch(error => {
            // Handle error
            console.error("Error fetching book data:", error);
        });
    }

    const handleQuantityChange = (index, type) => {
        const updatedCartItems = [...cartItems];
        if (type === 'increment') {
            updatedCartItems[index].productQY++;
        } else if (type === 'decrement' && updatedCartItems[index].productQY > 1) {
            updatedCartItems[index].productQY--;
        }
        setCartItems(updatedCartItems);
        updateLocalStorage(updatedCartItems);
    };

    const updateLocalStorage = (updatedCartItems) => {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handleRemoveCartItem = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1); // Remove the item at the specified index
        setCartItems(updatedCartItems);
        updateLocalStorage(updatedCartItems);
    };

    const generateInvoiceNumber = () => {
        const timestamp = Date.now().toString();
        const randomNumber = Math.floor(Math.random() * 10000).toString();
        const invoiceNumber = `INV-${timestamp}-${randomNumber}`;
        return invoiceNumber;
    };


    const handleSubmitAllProducts = async () => {
        try {
            const invoiceNumber = generateInvoiceNumber();

            const orderData = {
                orderProducts: cartItems.map(item => ({
                    qty: item.productQY,
                    book_id: item.id,
                    invoice: invoiceNumber
                }))
            };

            const response = await axios.post(`${BASE_URL}/auth/addOrderProduct`, orderData);
            if (response.status === 201 || response.status === 200) {

                localStorage.removeItem('cartItems');
                setCartItems([]);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Your order was successfully added",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while submitting your order. Please try again later.'
            });
        }
    };



    return (
        <div>
            <div className='d-flex flex-row-reverse mt-4'>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Add Product
                </button>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add your favorite books</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
                        </div>
                        <div className="modal-body">
                            {count ? (
                                <div>
                                    <input className="form-control mt-2" type="search" value={query} onChange={(e) => handleSearch(e)} placeholder="Book Name" aria-label="default input example" />
                                    {availableBooks.length > 0 ? (
                                        <div className='mt-2'>
                                            <ul className="list-group">
                                                {availableBooks.map((book) => {
                                                    // Check if the book is already in the cart
                                                    const isInCart = cartItems.some(item => item.id === book.id);
                                                    // If not in cart, display the book
                                                    if (!isInCart) {
                                                        return (
                                                            <li key={book.id} className="list-group-item" onClick={() => handlegetBook(book.book_name)}>
                                                                <input
                                                                    className='cur'
                                                                    defaultValue={book.book_name}
                                                                    placeholder={book.book_name}
                                                                    readOnly
                                                                />
                                                            </li>
                                                        );
                                                    } else {
                                                        return null;
                                                    }
                                                })}
                                            </ul>
                                        </div>
                                    ) : (
                                        <h6 className='text-danger mt-3'>Search your book by book name...</h6>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Book Name</label>
                                        <input className="form-control" type="text" name='id' value={inputs.id} placeholder="Book Name" aria-label="default input example" hidden />
                                        <input className="form-control" type="text" name='bookName' value={inputs.bookName} placeholder="Book Name" aria-label="default input example" readOnly />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Book Price</label>
                                        <input className="form-control" type="text" name='price' value={inputs.price} placeholder="Price" aria-label="default input example" readOnly />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Quantity</label>
                                        <input className="form-control" type="text" name='productQY' value={inputs.productQY} placeholder="Quantity" aria-label="default input example" onChange={(e) => setInputs({ ...inputs, productQY: e.target.value })} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleModalClose}>Close</button>
                            {
                                count ? (
                                    null
                                ) : (
                                    <button type="button" className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            {
                cartItems.length > 0 ? (
                    <div className="table-responsive mt-5">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Description</th>
                                    <th scope="col" className='text-center'>QTY</th>
                                    <th scope="col" className='text-center'>UNIT PRICE</th>
                                    <th scope="col" className='text-center'>AMOUNT</th>
                                    <th scope="col" className='text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.book_name}</td>
                                        <td className='text-center'>
                                            <div className="btn-group" role="group" aria-label="Quantity">
                                                <button type="button" className="btn btn-secondary" onClick={() => handleQuantityChange(index, 'decrement')}>-</button>
                                                <span className="btn btn-light">{item.productQY}</span>
                                                <button type="button" className="btn btn-secondary" onClick={() => handleQuantityChange(index, 'increment')}>+</button>
                                            </div>
                                        </td>
                                        <td className='text-end'>{(item.selling_price).toFixed(2)}</td>
                                        <td className='text-end'>{(item.selling_price * item.productQY).toFixed(2)}</td>
                                        <td className='text-center'>
                                            <button className="btn btn-danger" onClick={() => handleRemoveCartItem(index)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={2} className='text-center font-monospace fst-italic'>Thank you for your business!</td>
                                    <td colSpan={2} className='font-monospace'>Total</td>
                                    <td className='text-end'>{cartItems.reduce((total, item) => total + (item.selling_price * item.productQY), 0).toFixed(2)}</td>
                                    <td></td> {/* Empty cell for consistency */}
                                </tr>
                            </tbody>
                        </table>
                        <button className='float-end btn btn-success' onClick={handleSubmitAllProducts}>Submit All Product</button>
                    </div>
                ) : (
                    <div class="alert alert-danger fw-bold mt-5" role="alert">
                        your cart is empty...!
                    </div>

                )
            }
        </div>
    );
};

export default OrderProduct;
