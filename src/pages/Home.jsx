import React from 'react';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/sections/FeaturedCategories';
import SpecialOffer from '../components/sections/SpecialOffer';
import Testimonials from '../components/sections/Testimonials';
import Newsletter from '../components/sections/Newsletter';

const Home = () => {
    return (
        <div className="space-y-10 pb-20">
            <Hero />
            <FeaturedCategories />
            <SpecialOffer />
            <Testimonials />
            <Newsletter />
        </div>
    );
};

export default Home;

