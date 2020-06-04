import React from 'react'

function HeaderMenuPageButton(props) {
    return (
        <div className="header_table">
            <a className="header_menu_button_page" href={props.url} alt={props.name}>
            {props.name}
            </a>
        </div>
    );
}

export default HeaderMenuPageButton;