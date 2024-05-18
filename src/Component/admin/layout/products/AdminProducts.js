import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Error_page from '../../../error/Error_page';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../App';

// Decryption function
const decryptData = (encryptedData) => {
    // Perform decryption here, this is just a placeholder
    return atob(encryptedData);
};

const AdminProducts = () => {
    const [getProduct, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorLoading, setErrorLoading] = useState(true);

    var encryptedRole = localStorage.getItem('role');
    var decryptedRole = decryptData(encryptedRole);

    useEffect(() => {
        axios.get(BASE_URL + '/auth/books')
            .then(res => {
                setProduct(res.data.book);
                setLoading(false);
                setErrorLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);

    const deleteProduct = (e, id) => {
        const clickBtn = e.currentTarget;
        clickBtn.innerText = 'Deleting';

        axios.delete(BASE_URL + '/auth/delete-book/' + id)
            .then(res => {
                if (res.data.status === 200) {
                    setProduct(prevProducts => prevProducts.filter(product => product.id !== id));
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.error('Error deleting product:', err);
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'An error occurred while deleting the product.',
                    button: 'Ok'
                });
            })
            .finally(() => {
                clickBtn.innerText = 'Delete';
            });
    };

    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / My Store</div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='admin-text fw-bold fs-3'><i className="fa fa-cart-plus" aria-hidden="true"></i> Book Gallery</div>
                </h5>
                <div className="card-body">

                    <div className='row'>
                        <div className="col-12 col-md-6 pb-3">
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table align-middle table-hover table-bordered">
                            <thead>
                                <tr className='fw-bold text-center' >
                                    <th scope="col">#</th>
                                    <th scope="col">Cover img</th>
                                    <th scope="col">Book name</th>
                                    {
                                        decryptedRole == 1 ? (
                                            <>
                                                <th scope="col">Purchase price</th>
                                                <th scope="col">Selling price</th>
                                                <th scope="col" colSpan={3} className='text-center'>Action</th>
                                            </>
                                        ) : (
                                            <>
                                                <th scope="col">Price</th>
                                                <th scope="col">Description</th>
                                            </>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {loading
                                    ? <tr className='text-center'>
                                        <td colSpan={7}>
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                    : getProduct.length > 0
                                        ? getProduct.map((product, index) => (
                                            <tr key={product.id} >
                                                <th scope="row">{index + 1}</th>
                                                <td className='text-center'><img src={'http://localhost:8000/upload/books/' + product.avatar} className='img-fluid' alt={`${product.productName} Logo`} width="50px" /></td>
                                                <td>{product.book_name}</td>
                                                {
                                                    decryptedRole == 1 ? (
                                                        <>
                                                            <td className='text-end'>{product.pur_price}.00</td>
                                                            <td className='text-end'>{product.selling_price}.00</td>
                                                            <td className='text-center'>
                                                                <Link to={`/auth/view-product/${product.id}`} className='btn btn-warning btn-table'>
                                                                    <i className='bx bx-show'></i> View
                                                                </Link>
                                                            </td>
                                                            <td className='text-center'>
                                                                <Link to={`/auth/update-product/${product.id}`} className='btn btn-success btn-table'>
                                                                    <i className='bx bxs-edit'></i> Update
                                                                </Link>
                                                            </td>
                                                            <td className='text-center'>
                                                                <button onClick={(e) => deleteProduct(e, product.id)} className='btn btn-danger btn-table'>
                                                                    <i className='bx bxs-message-square-x'></i> Delete
                                                                </button>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td className='text-end'>{product.selling_price}.00</td>
                                                            <td className='text-lowercase'>{product.description}</td>
                                                        </>
                                                    )
                                                }
                                            </tr>
                                        ))
                                        : <tr><td colSpan={6} className='text-center text-danger py-5'>No data in database</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {errorLoading && <Error_page />}
            </div>
        </div>
    );
};

export default AdminProducts;
