import React from 'react'
import { Link } from "react-router-dom";

function HeaderPageButton(props) {
    return (
        <li>
            <div className="header_link">
                <Link to={props.url} alt={props.name}>
                    {props.name}
                    <div className="link_down_border"></div>
                </Link>
            </div>
        </li>
    );
}

export default HeaderPageButton;