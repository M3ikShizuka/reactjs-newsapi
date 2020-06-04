import React from 'react'
import HeaderPageButton from './HeaderPageButton.js'
import HeaderMenuPageButton from './HeaderMenuPageButton.js'
import "./header.scss";

function Header() {
    let pageHome = "Headlines";

    return(
        <header>
            <div className="header_wrapper">
                <div className="header_content">
                    <div className="header_menu_button">
                        <div></div>
                    </div>
                    <nav className="header_buttons_content">
                        <ul>
                            <HeaderPageButton name={pageHome.toUpperCase()} url={`/${pageHome}`}/>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="header_menu">
                <div className="header_menu_content">
                    <nav className="header_menu_buttons_content">
                        <HeaderMenuPageButton name={pageHome.toUpperCase()} url={`/${pageHome}`}/>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;