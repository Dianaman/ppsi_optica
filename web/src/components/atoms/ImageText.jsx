import React from 'react';

export function ImageText(props) {
    const {image, text} = props;

    return (
        <figure className="figure">
            <img src={image} className="figure-img img-fluid rounded image-text image" alt={text} />
            <figcaption className="image-text text">{text}</figcaption>
        </figure>
    )
}
