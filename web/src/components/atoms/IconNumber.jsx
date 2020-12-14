import React from 'react';

export function IconNumber(props) {
    const {icon, number} = props;

    return (
        <div className="icon-number">
            <img src={icon} alt={icon}/>
            {
                number > 0 && 
                <div className="popup-number">
                    {number}
                </div>
            }
        </div>
    );
}