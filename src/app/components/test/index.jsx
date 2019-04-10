import React from 'react';

import Carousel, { Slide } from './../carousel';

export default class Test extends React.PureComponent {
    
    render() {
        return (
            <Carousel
                goToSlideIndex={2}
                onPrevious={() => console.log('previous clicked')}
                onNext={() => console.log('next clicked')}
                onSlideChange={() => console.log('slide changed')}
            >
                <Slide>
                    <h1>Hello 1 !</h1>
                </Slide>
                <Slide>
                    <h1>Hello 2 !</h1>
                </Slide>
                <Slide>
                    <h1>Hello 3 !</h1>
                </Slide>
                <Slide>
                    <h1>Hello 4 !</h1>
                </Slide>
            </Carousel>
        )
    }
}