import React, { PureComponent } from "react";

import "./carousel.scss";

const LEFT = "-1";
const RIGHT = "9999";

class Carousel extends PureComponent {
    constructor() {
        super();
        this.state = {
            'selected': 0,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const { selected } = this.state;
        const { listData } = this.props;
        const lastDataIndex = listData.length - 1;;
        let newSelectedValue = parseInt(event.currentTarget.value);

        switch(event.currentTarget.value) {
            case LEFT:
                newSelectedValue = selected === 0 ? 0 : selected - 1;
                break; 
            case RIGHT:
                newSelectedValue = selected === lastDataIndex ? selected : selected + 1;
                break;
        }

        if (selected !== newSelectedValue) {
            this.setState({
                'selected': newSelectedValue,
            });
        }
    }
    
    render() {
        const { listData } = this.props;
        const { selected } = this.state; 

        if (!listData.length) {
            return null;
        }

        return (
            <div id="savi-carousel" className="carousel-container"> 
                <div className="carousel-inner">
                    {listData.find((ele, index) => index === this.state.selected)}
                </div>
                <div className="carousel-controls">
                    <button 
                        className="left" 
                        value={LEFT} 
                        disabled={selected === 0}
                        onClick={this.handleClick}
                    >
                        <span className="label">Previous</span>
                    </button>
                    {listData.map((ele, index) => {
                        const itemClass = index === selected ? "item-current" : "item";
                        return (
                            <button 
                                key={`event_${ele.name}_${index}`} 
                                className={itemClass} 
                                value={index} 
                                disabled={selected === index}
                                onClick={this.handleClick}
                            >
                                <span className="label"></span>
                            </button>
                        )
                    })}
                    <button 
                        className="right" 
                        value={RIGHT} 
                        disabled={selected === listData.length - 1}
                        onClick={this.handleClick}
                    >
                        <span className="label">Next</span>
                    </button>
                </div>
            </div>
        )
    }
}

export default Carousel;