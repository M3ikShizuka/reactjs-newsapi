import React from 'react';
import "./mazip.scss";

function Button(props) {
    return (
        <div styleName="mazip_button">
            <a 
                href="#"
                onClick={props.handleSearchButton}
            >{props.name}</a>
        </div>
	);
}

export default Button;