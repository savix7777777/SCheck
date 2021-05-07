import React from 'react';
import PropTypes from 'prop-types';


const Button = ({className, onClick, children}) => {
    return(
        <button className={className} onClick={onClick}>{children}</button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
};


Button.defaultProps = {
    children: 'Button',
    onClick: () => {},
    className: 'button',
};


export default Button;
