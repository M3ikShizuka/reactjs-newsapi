import React from 'react'
import { Link } from "react-router-dom";
import './header.scss';

function HeaderPageButton(props) {
    return (
        <li>
            <div styleName="header_link">
                <Link to={props.url} alt={props.name}>
                    {props.name}
                    <div styleName="link_down_border"></div>
                </Link>
            </div>
        </li>
    );
}

export default HeaderPageButton;