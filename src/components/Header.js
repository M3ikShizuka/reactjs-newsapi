import React from 'react'
import HeaderPageButton from './HeaderPageButton.js'
import HeaderMenuPageButton from './HeaderMenuPageButton.js'
import "./header.scss";

function Header(props) {

    return(
        <header>
            <div className="header_wrapper">
                <div className="header_content">
                    <div className="header_menu_button">
                        <div></div>
                    </div>
                    <nav className="header_buttons_content">
                        <ul>
                            {props.pages.map((pageName) => {
                                return (<HeaderPageButton name={pageName.toUpperCase()} url={`/${pageName.toLowerCase()}`}/>);
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="header_menu">
                <div className="header_menu_content">
                    <nav className="header_menu_buttons_content">
                        {props.pages.map((pageName) => {
                            return (<HeaderMenuPageButton name={pageName.toUpperCase()} url={`/${pageName.toLowerCase()}`}/>);
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;