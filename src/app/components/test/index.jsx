import React from 'react';

import List from './../list';
import Carousel from './../carousel';

const data = [
    {
        name: 'Chicago',
        desc: 'Test Chicago',
    },
    {
        name: 'New_York',
        desc: 'Test New York',
    },
    {
        name: 'Los_Angeles',
        desc: 'Test Los Angeles',
    }
]

export default class Test extends React.PureComponent {
    
    render() {
        const myList = data.map((ele, index) => <List key={`key_${ele.name}_${index}`} name={ele.name} desc={ele.desc} />)
        return (
            <Carousel
                listData={myList}
                options={{
                    previous: 'PREV',
                    next: 'NEXT',
                    autoSlide: 2000,
                }}
            />
        )
    }
}