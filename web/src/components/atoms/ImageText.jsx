import React from 'react';

export function ImageText(props) {
    const {image, text} = props;

    return (
        <div style={{'backgroundImage': image}}>
            <div>{text}</div>
        </div>
    )
}