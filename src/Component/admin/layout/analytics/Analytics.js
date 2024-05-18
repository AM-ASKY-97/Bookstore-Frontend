import React from 'react'

const Analytics = () => {
    return (
        <div>
            <div className='bg-primary p-3 mb-3 d-flex flex-row-reverse text-white mt-3 mt-lg-0'>Home / Analytics</div>

            <div className="card shadow">
                <h5 className="card-header py-4 fw-bold text-white bg-secondary">
                    <div className='admin-text fw-bold fs-3'><i class='bx bxs-doughnut-chart'></i> Analytics</div>
                </h5>
                <div className="card-body d-flex justify-content-center">
                    <div className='col-12 col-md-6'>
                        <div className="alert alert-danger text-center" role="alert">
                            This Component Is Currently Under Development And Will Soon Be Released In Its Full Version
                        </div>

                        <div className='d-flex justify-content-center mt-5'>
                            <div className="spinner-border text-warning text-center" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics