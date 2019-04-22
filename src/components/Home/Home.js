import React, {Component} from 'react';

import Header from './HomeComponents/Header/Header';
import About from './HomeComponents/About/About';
import Brands from './HomeComponents/Brands/Brands';
import Contact from './HomeComponents/Contact/Contact';
import Footer from '../shared/Footer/Footer';

class Home extends Component {
    render() {
        return(
            <div>
                <Header />
                <About />
                <Brands />
                <Contact />
                <Footer />
            </div>
        );
    };
};

export default Home;