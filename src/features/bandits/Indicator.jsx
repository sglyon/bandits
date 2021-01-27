import React from 'react';

function Indicator(props) {
    const {number, on} = props
    const color = on ? "green" : "white"
    return (
        <div className="mb-3">
            {Math.round(number* 1000)/1000}
        </div>
    );
}

export default Indicator;
