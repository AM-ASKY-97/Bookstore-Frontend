import React from 'react'
import Home from '../home/Home'
import Hero from '../hero/Hero'
import Feature from '../feature/Feature'
import Product from '../books/Books'
import Review from '../reviews/Reviews'
import Team from '../Team/Team'
import Contact from '../contact/Contact'
import Categories from '../categories/Categories'
import Footer from '../footer/Footer'

const Main = () => {
    return (
        <div>
            <Home />
            <Feature />
            <Product />
            <Categories />
            <Review />
            <Team />
            <Contact />
            <Footer />
        </div>
    )
}

export default Main