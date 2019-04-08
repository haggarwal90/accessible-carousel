import React, { PureComponent } from "react";

import "./carousel.scss";

class Carousel extends PureComponent {
    render() {
        return (
            <div id="savi-carousel" className="carousel-container"> 
                <div className="carousel-inner">
                    <div className="carousel-caption active">
                        <h3>Chicago</h3>
                        <p>Thank you, Chicago!</p>
                    </div>
                    <div className="carousel-caption">
                        <h3>New York</h3>
                        <p>We love the Big Apple!</p>
                    </div>
                    <div className="carousel-caption">
                        <h3>Los Angeles</h3>
                        <p>LA is always so much fun!</p>
                    </div>
                </div>
                <div className="carousel-controls">
                    <button className="left">
                        <span className="label">Previous</span>
                    </button>
                    <button className="item current" value="1">
                        <span className="label"></span>
                    </button>
                    <button className="item" value="2">
                        <span className="label"></span>
                    </button>
                    <button className="item" value="3">
                        <span className="label"></span>
                    </button>
                    <button className="right">
                        <span className="label">Next</span>
                    </button>
                </div>
            </div>
        )
    }
}

export default Carousel;