import React from 'react';

function Button(props) {
	return (
        <div className="mazip_button">
            <a 
                href="#"
                onClick={props.handleSearchButton}
            >{props.name}</a>
        </div>
	);
}

export default Button;