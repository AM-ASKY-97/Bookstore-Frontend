import React from 'react'

import ClipLoader from "react-spinners/ClipLoader";
import './LoadingPage.css'

const LoadingPage = () => {
    return (
        <div className='loading'>
            <div className='load'>
                <ClipLoader
                    size={100}
                    color='#d60707'
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}

export default LoadingPage