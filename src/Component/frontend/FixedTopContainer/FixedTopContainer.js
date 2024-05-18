import React from 'react';
import CartIcon from '../card/CartIcon'
import Navbar from '../navbar/Navbar'

const FixedTopContainer = () => {
    return (
        <div className="fixed-top">
            <div className="row">
                <div className="col">
                    <Navbar />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <CartIcon />
                </div>
            </div>
        </div>
    );
}

export default FixedTopContainer;
