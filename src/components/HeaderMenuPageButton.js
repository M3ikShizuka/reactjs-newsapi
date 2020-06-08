import React from 'react'
import './header.scss';

function HeaderMenuPageButton(props) {
    return (
        <div styleName="header_table">
            <a styleName="header_menu_button_page" href={props.url} alt={props.name}>
                {props.name}
            </a>
        </div>
    );
}

export default HeaderMenuPageButton;