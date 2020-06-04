import React from 'react'

function HeaderPageButton(props) {
    return (
        <li>
            <div className="header_link">
                <a href={props.url} alt={props.name}>
                    {props.name}
                    <div className="link_down_border"></div>
                </a>
            </div>
        </li>
    );
}

export default HeaderPageButton;