import React, { Component } from 'react';

// SCSS //
import './Brands.scss'


// BRAND LOGOS //
import NorthStar from '../../../../images/brands/NorthStar.png'
import GenTec from '../../../../images/brands/GenTec.png'
import LixX from '../../../../images/brands/LixX.png'
import GenRock from '../../../../images/brands/GenRock.png'
import Gen20 from '../../../../images/brands/Gen20.png'
import SunMight from '../../../../images/brands/SunMight.jpg'
import PlioGrip from '../../../../images/brands/PlioGrip.jpg'
import Anest from '../../../../images/brands/Anest.jpg'
import USC from '../../../../images/brands/USC.jpg'
import AutomotiveArt from '../../../../images/brands/Automotive-Art.png'
import AFI from '../../../../images/brands/AFI.png'

class Brands extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayProducts: false
        }
    }
    render() {
        return(
            <div className="product-lines-box">

                <h1 className="product-title">PRODUCT LINES</h1>


                {this.state.displayProducts ? (
                <div className="product-display-tablet">
                <div className="product-parent-box">
                
                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={NorthStar} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={GenTec} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={LixX} alt="brand-logo" />
                        </div>
                        
                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={GenRock} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={Gen20} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={SunMight} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={PlioGrip} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">
                        <div className="product-img-box">
                            <img src={Anest} alt="brand-logo" />
                        </div>  
                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={USC} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={AutomotiveArt} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={AFI} alt="brand-logo" />
                        </div>

                    </div>
                </div>
                    <div className="toggle-product-lines hide-display">
                        <p className="arrow down" onClick={() => this.setState({ displayProducts: false })}>&#8593;</p>
                    </div>
                </div>
                ) : (
                <div className="toggle-product-lines product-display-tablet">
                    <p className="arrow down" onClick={() => this.setState({ displayProducts: true })}>&#x2193;</p>
                </div>
            )}
            
            <div className="product-display-desktop">
            <div className="product-parent-box">
                
                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={NorthStar} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={GenTec} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={LixX} alt="brand-logo" />
                        </div>
                        
                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={GenRock} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={Gen20} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={SunMight} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={PlioGrip} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">
                        <div className="product-img-box">
                            <img src={Anest} alt="brand-logo" />
                        </div>  
                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={USC} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={AutomotiveArt} alt="brand-logo" />
                        </div>

                    </div>

                    <div className="product-box">

                        <div className="product-img-box">
                            <img src={AFI} alt="brand-logo" />
                        </div>

                    </div>
                </div>
                </div>
            </div>
        );
    };
};

export default Brands;