import React from 'react'
import './Categories.css'
import { CategoriesBank } from './CategoriesBank'
import { LazyLoadImage } from "react-lazy-load-image-component";

const Categories = () => {
    return (
        <div className='container' id='Categories'> 
            <h1 className="heading" data-aos-duration="2000" data-aos="zoom-in-down">Book <span>Categories</span></h1>

            <div className='pro-scrolling-wrapper row flex-row flex-nowrap pb-2'>
                {
                    CategoriesBank.map((CategoriesBank) => (
                        <div className='col-3 cat-col' key={CategoriesBank.id}>
                            <div className="card shadow h-100 categories">
                                <div className='cat-inner'>
                                    <LazyLoadImage src={CategoriesBank.logo} className="card-img-top" alt="..." effect="blur" />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title cat-title">{CategoriesBank.tittle}</h5>
                                    <p className="card-text para">{CategoriesBank.para}</p>
                                    <a href="#" className="btn btn-block pro-bt">Go somewhere</a>
                                </div>
                                <div className="card-footer text-center">
                                    <small className="text-body-secondary">Last updated 3 mins ago</small>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories