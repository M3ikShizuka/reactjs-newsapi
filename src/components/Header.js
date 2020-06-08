import React from 'react'
import HeaderPageButton from './HeaderPageButton.js'
import HeaderMenuPageButton from './HeaderMenuPageButton.js'
import "./header.scss";

function Header(props) {
    return(
        <header>
            <div styleName="header_wrapper">
                <div styleName="header_content">
                    <div styleName="header_menu_button">
                        <div></div>
                    </div>
                    <nav styleName="header_buttons_content">
                        <ul>
                            {props.pages.map((pageName) => {
                                return (<HeaderPageButton key={pageName.toLowerCase()}  name={pageName.toUpperCase()} url={`/${pageName.toLowerCase()}`}/>);
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
            <div styleName="header_menu">
                <div styleName="header_menu_content">
                    <nav styleName="header_menu_buttons_content">
                        {props.pages.map((pageName) => {
                            return (<HeaderMenuPageButton key={pageName.toLowerCase()} name={pageName.toUpperCase()} url={`/${pageName.toLowerCase()}`}/>);
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;