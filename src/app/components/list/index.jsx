import React from 'react';

export default class List extends React.PureComponent {
    render() {
        const { name, desc } = this.props;
        return (
            <div className="carousel-caption">
                {this.props.children}
            </div>
        )
    }
}