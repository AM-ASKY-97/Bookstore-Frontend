import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faBox } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../../../../App';

const InvoicePage = () => {

    const navigate = useNavigate();

    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [customerName, setCustomerName] = useState();
    const [customerID, setCustomerID] = useState();
    const [invoiceDate, setInvoiceDate] = useState();
    const [products, setProducts] = useState([]);

    let totalAmount = 0;

    const { invoiceNumber } = useParams();

    useEffect(() => {
        axios.get(BASE_URL + "/invoice/" + invoiceNumber).then(res => {
            console.log(res.data)
            setCustomerName(res.data[0].userName)
            setCustomerID(res.data[0].userID)
            setInvoiceDate(res.data[0].date);
            setProducts(res.data);
        });
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleDownloadPDF = () => {
        const element = document.getElementById('invoice-container');
        if (element) {
            const opt = {
                margin: 0.5,
                filename: `${invoiceNumber}_invoice.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'A4', orientation: 'landscape' }
            };

            html2pdf(element, opt);
        }
    };

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>

            <div className='bg-light p-3 mb-3 d-flex flex-row-reverse text-muted mt-3 mt-lg-0'>Home / Create Invoice</div>

            <div className='row'>
                <div className="col">
                    <button type="button" className="btn btn-primary float-end" onClick={goBack}><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Go Back</button>
                </div>
            </div>

            <div className='container mt-2 bg-light p-4 rounded'>
                <div id="invoice-container">
                    <div className="row">
                        <div className="col-6">
                            <h2 className="fw-bold text-primary">Tech Tribe</h2>
                            <p className="text-muted">Sri Lanka, Colombo</p>
                            <p className="text-muted">+94775311974</p>
                        </div>
                        <div className="col-6 text-end">
                            <h1 className="fw-bold text-success">INVOICE</h1>
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <div className="col-12 col-md-6">
                            <table className="table table-bordered text-center table-info">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">CUSTOMER NAME</th>
                                        <th className="fw-bold">CUSTOMER ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{customerName}</td>
                                        <td>{customerID}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 col-md-6">
                            <table className="table table-bordered text-center table-info">
                                <thead>
                                    <tr>
                                        <th className="fw-bold">#INVOICE NUMBER</th>
                                        <th className="fw-bold">ORDER DATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{invoiceNumber}</td>
                                        <td>{invoiceDate}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="table-responsive mt-3">
                        <table className="table table-striped table-bordered table-hover table-success">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Description</th>
                                    <th scope="col" className="text-center">
                                        QTY
                                    </th>
                                    <th scope="col" className="text-center">
                                        UNIT PRICE
                                    </th>
                                    <th scope="col" className="text-center">
                                        AMOUNT
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => {
                                    totalAmount += product.qty * product.price;
                                    return (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{product.name}</td>
                                            <td className="text-center">{product.qty}</td>
                                            <td className="text-end">
                                                {product.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            </td>
                                            <td className="text-end">
                                                {(product.qty * product.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            </td>
                                        </tr>
                                    );
                                })}

                                <tr>
                                    <td colSpan={3}></td>
                                    <td className="text-center">-</td>
                                    <td className="text-center">-</td>
                                </tr>

                                <tr>
                                    <td colSpan={2} className="text-center font-monospace fst-italic">
                                        Thank you for your business!
                                    </td>
                                    <td colSpan={2} className="font-monospace fw-bold">
                                        Total
                                    </td>
                                    <td className="text-end text-primary">
                                        Rs {totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className="mt-4 text-end">
                        <p className="fw-light font-monospace text-muted">{currentDateTime.toLocaleString()}</p>
                    </div>

                    <div className="text-lowercase text-center mt-2 font-monospace text-secondary">
                        If you have any questions about this invoice, please contact <br /> [techtribe@gmail.com]
                    </div>
                </div>
            </div>

            <div className="text-end mt-2">
                <button className="btn btn-success" onClick={handleDownloadPDF}>
                    <FontAwesomeIcon icon={faBox} className="me-1" /> Download Invoice{' '}
                    <FontAwesomeIcon icon={faDownload} />
                </button>
            </div>
        </div>
    );
};

export default InvoicePage;
