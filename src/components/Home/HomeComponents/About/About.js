import React, {Component} from 'react';

import './About.scss';
import saltLake from '../../../../images/Salt Lake Valley.jpg';
import staff from '../../../../images/AFI-Staff.jpg';

class About extends Component {
    render() {
        return(
            <div className="about-home-parent">
                
                <h1 className="about-title">ABOUT AFI PAINT & SUPPLY</h1>

                <div className="about-parent-box">
                    <div className="about-box">
                        <img src={saltLake} alt="salt lake valley"/>
                        <h4>We are a family ran buisness located in Salt Lake City. We were founded in 2004 and take pride in helping in the local economy.</h4>
                    </div>

                    <div className="about-box">
                        <img src={staff} alt="salt lake valley"/>
                        <h4>We supply buisnesses across the Salt Lake Valley and more. We carry paint tools and supplies for automotive, industrial, and fleet.</h4>
                    </div>

                    <div className="about-store3-box">

                    </div>
                </div>
            </div>
        );
    };
};

export default About;