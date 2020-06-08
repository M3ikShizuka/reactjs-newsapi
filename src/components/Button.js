import React from 'react';
import styleDefault from "./mazip.scss";

function Button(props) {
    let customStyles = props.customStyles;
    let mazip_button = null;
    
    if (customStyles) {
        mazip_button = customStyles.mazip_button;
    }
    else {
        mazip_button = styleDefault.mazip_button;
    }

    return (
        <div className={mazip_button}>
            <a 
                href="#"
                onClick={props.handleSearchButton}
            >{props.name}</a>
        </div>
	);
}

export default Button;