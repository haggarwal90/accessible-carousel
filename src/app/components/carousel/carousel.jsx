import React, { PureComponent } from "react";
import Hammer from 'react-hammerjs';

import "./carousel.scss";

const LEFT = "-1";
const RIGHT = "9999";
const DISABLED = "#dddddd";

export const Slide = (props) => props.children;    

class Carousel extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            'selected': props.goToSlideIndex || 0,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
    }

    componentDidMount() {
        const { options, children: listData } = this.props;
        const { autoSlide } = options;
        const { selected } = this.state;

        let nextValue = selected + 1;

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

    componentDidUpdate(prevProps) {
        const { options, children: listData, goToSlideIndex: newSelectedIndex } = this.props;
        const { goToSlideIndex: oldSelectedIndex } = prevProps;
        const { autoSlide } = options;
        const { selected } = this.state;

        let nextValue = selected + 1;

        if (nextValue === listData.length) {
            nextValue = 0;
        }

        // Props changed index more priority over autoSlide change index
        if (oldSelectedIndex !== newSelectedIndex) {
            this.setState({
                'selected': newSelectedIndex,
            });
        } else {
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
    }

    handleClick(event) {
        const { selected } = this.state;
        const { children: listData, onPrevious, onNext, onSlideChange } = this.props;
        const lastDataIndex = listData.length - 1;
        let newSelectedValue = parseInt(event.currentTarget.value);

        switch(event.currentTarget.value) {
            case LEFT:
                newSelectedValue = selected === 0 ? 0 : selected - 1;
                onPrevious();
                break; 
            case RIGHT:
                newSelectedValue = selected === lastDataIndex ? selected : selected + 1;
                onNext();
                break;
        }

        if (selected !== newSelectedValue) {
            onSlideChange();
            this.setState({
                'selected': newSelectedValue,
            });
        }
    }

    handleSwipe(event) {
        const { selected } = this.state;
        const { children: listData, onPrevious, onNext, onSlideChange } = this.props;
        const lastDataIndex = listData.length - 1;
        let newSelectedValue;

        switch(event.direction) {
            case 4: // Left
                newSelectedValue = selected === 0 ? 0 : selected - 1;
                onPrevious();
                break; 
            case 2: // Right
                newSelectedValue = selected === lastDataIndex ? selected : selected + 1;
                onNext();
                break;
        }

        if (selected !== newSelectedValue) {
            onSlideChange();
            this.setState({
                'selected': newSelectedValue,
            });
        }
    }
    
    render() {
        const { children: listData, options } = this.props;
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
            <Hammer onSwipe={this.handleSwipe}>
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
            </Hammer>
        )
    }

    componentWillUnmount() {
        if (this.carouselTimeout) {
            clearTimeout(this.carouselTimeout);
        }
    }
}

Carousel.defaultProps = {
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