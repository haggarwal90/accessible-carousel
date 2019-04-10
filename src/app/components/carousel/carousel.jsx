import React, { PureComponent } from "react";

import "./carousel.scss";

const LEFT = "-1";
const RIGHT = "9999";
const DISABLED = "#dddddd";

class Carousel extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            'selected': 0,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const { options, listData } = this.props;
        const { autoSlide } = options;
        const { selected } = this.state;

        let nextValue = 1;

        if (selected === listData.length - 1) {
            nextValue = 0;
        }

        if (autoSlide) {
            this.carouselTimeout = setTimeout(() => {
                this.handleClick({
                    currentTarget: {
                        value: nextValue,
                    }
                });
            }, autoSlide)
        }
    }

    componentDidUpdate() {
        const { options, listData } = this.props;
        const { autoSlide } = options;
        const { selected } = this.state;

        let nextValue = selected + 1;

        if (nextValue === listData.length) {
            nextValue = 0;
        }

        if (autoSlide) {
            this.carouselTimeout = setTimeout(() => {
                this.handleClick({
                    currentTarget: {
                        value: nextValue,
                    }
                });
            }, autoSlide)
        }
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
        const { listData, options } = this.props;
        const { 
            previous,
            next, 
            previousColor, 
            nextColor, 
            activeOptionColor,
            nonActiveOptionColor,
        } = options;
        const { selected } = this.state; 

        if (!listData.length) {
            return null;
        }

        return (
            <div className="carousel-container"> 
                <div className="carousel-inner">
                    {listData.find((ele, index) => index === this.state.selected)}
                </div>
                <div className="carousel-controls">
                    <button 
                        className="action" 
                        value={LEFT} 
                        disabled={selected === 0}
                        onClick={this.handleClick}
                        style={{color: selected === 0 ? DISABLED : previousColor}}
                    >
                        <span className="label">{previous}</span>
                    </button>
                    {listData.map((ele, index) => {
                        const itemStyle = index === selected ? 
                            { borderColor: activeOptionColor, cursor: 'default' } : 
                            { borderColor: "transparent" };
                        return (
                            <button
                                key={`event_${ele.name}_${index}`}
                                className="item"
                                value={index} 
                                disabled={selected === index}
                                onClick={this.handleClick}
                                style={itemStyle}
                            >
                                <span className="label" style={{background: nonActiveOptionColor}}></span>
                            </button>
                        )
                    })}
                    <button 
                        className="action" 
                        value={RIGHT} 
                        disabled={selected === listData.length - 1}
                        onClick={this.handleClick}
                        style={{color: selected === listData.length - 1 ? DISABLED : nextColor}}
                    >
                        <span className="label">{next}</span>
                    </button>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        if (this.carouselTimeout) {
            clearTimeout(this.carouselTimeout);
        }
    }
}

Carousel.defaultProps = {
    listData: [],
    options: {
        previous: 'PREV',
        next: 'NEXT',
        autoSlide: 0,
        previousColor: '#4f9194', // Color of Previous label
        nextColor: '#4f9194', // Color of Next label
        activeOptionColor: '#4f9194', // Color of active option outer circle
        nonActiveOptionColor: '#ffffff', // Color of non active dot 
    },
}

export default Carousel;