import React from 'react'
import Navbar from '../navbar/Navbar'
import Hero from '../hero/Hero'

import './Home.css';

const Home = () => {
    return (
        <div className='home'>
            <Navbar />
            <Hero />
        </div>
    )
}

export default Home