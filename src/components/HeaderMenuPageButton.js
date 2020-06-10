import React from 'react'
import { Link } from "react-router-dom";
import './header.scss';

function HeaderMenuPageButton(props) {
    return (
        <div styleName="header_table">
            <Link 
                styleName="header_menu_button_page" 
                to={props.url} 
                alt={props.name}
                onClick={props.handleOnClickPage}
            >
                {props.name}
            </Link>
        </div>
    );
}

export default HeaderMenuPageButton;