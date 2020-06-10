import React from 'react'
import HeaderPageButton from './HeaderPageButton.js'
import HeaderMenuPageButton from './HeaderMenuPageButton.js'
import "./header.scss";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpen: false
        }

        this.menuChangeScreenWidth = 768;
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }
    
    updateWindowDimensions = () => {
        if (window.innerWidth >= this.menuChangeScreenWidth) {
            this.controlMenu(false);
        }
    }

    handleMenuButtonOnClick = () => {
        this.controlMenu(!this.state.isMenuOpen);
    }

    handleMenuClose = () => {
        this.controlMenu(false);
    }

    controlMenu(isMenuOpenNew) {
        if (isMenuOpenNew) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }

        this.setState({isMenuOpen: isMenuOpenNew});
    }

    drawMenu = () => {
        return (
            <div styleName="header_menu">
                <div styleName="header_menu_content">
                    <nav styleName="header_menu_buttons_content">
                        {
                            this.props.pages.map((pageName) => {
                                return (
                                    <HeaderMenuPageButton 
                                        key={pageName.toLowerCase()} 
                                        name={pageName.toUpperCase()} 
                                        url={`/${pageName.toLowerCase()}`}
                                        handleOnClickPage={this.handleMenuClose}
                                    />
                                );
                            })
                        }
                    </nav>
                </div>
            </div>
        );
    }

    render() {
        return(
            <header>
                <div styleName="header_wrapper">
                    <div styleName="header_content">
                        <div 
                            styleName="header_menu_button"
                            onClick={this.handleMenuButtonOnClick}
                        >
                            <div></div>
                        </div>
                        <nav styleName="header_buttons_content">
                            <ul>
                                {this.props.pages.map((pageName) => {
                                    return (
                                        <HeaderPageButton 
                                            key={pageName.toLowerCase()}  
                                            name={pageName.toUpperCase()} 
                                            url={`/${pageName.toLowerCase()}`}
                                            handleOnClickPage={this.handleMenuClose}
                                        />
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                </div>
                {this.state.isMenuOpen ? this.drawMenu() : null}
            </header>
        );
    }
}

export default Header;