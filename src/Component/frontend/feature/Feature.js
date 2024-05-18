import React from 'react'
import './Feature.css'
import { FeatureBank } from './FeatureBank'

const Feature = () => {
    return (
        <section className='container' id='Features'>
            <h1 className="heading" data-aos-duration="2000" data-aos="zoom-in-down">our <span>features</span></h1>
            <div className='scrolling-wrapper row flex-row flex-nowrap pb-2'>
                {
                    FeatureBank.map((Feature) => (
                        <div className='col-4' key={Feature.id}>
                            <div className="card shadow h-100 feature">
                                <div className='inner'>
                                    <img src={Feature.logo} className="card-img-top" alt="..." />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title title">{Feature.tittle}</h5>
                                    <p className="card-text para">{Feature.para}</p>
                                    <a href="#" className="btn btn-primary btn-block">Go somewhere</a>
                                </div>
                                <div className="card-footer text-center">
                                    <small className="text-body-secondary">Last updated 3 mins ago</small>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Feature