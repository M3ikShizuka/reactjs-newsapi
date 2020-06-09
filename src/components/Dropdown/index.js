import React from "react";
import onClickOutside from "react-onclickoutside";
import "./Dropdown.scss";

class Dropdown extends React.Component {
    constructor(props) {
        super(props)
// props = {
        // placeholder='Select Country'
        // defaultValue={defaultCountryObject.value}
        // onChange={props.handleFilterCountryChange}
        // objectsArray={optionsCountry}
        // }

        const defaultValue = props.defaultValue;
        this.objectArray = props.objectsArray;

        // Find default object text.
        const defaultObject = this.objectArray.find((element) => {
            if (element.value == defaultValue) {
                return true;
            }
        })

        // State
        this.state = {
            isMenuOpen: false,
            objectArrayFiltered: this.objectArray,
            filterText: "",
            filterTextHolder: defaultObject.text
        };

        this.selectedValue = defaultValue;
        this.selectedText = defaultObject.text;
    }

    handleOnSelectElement = (event) => {
        this.handleInputTextOnChange(event, false, true)
    }

    handleInputTextOnClick = (event) => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
        })
    }

    handleClickOutside = evt => {
        if (this.state.isMenuOpen === true) {
            this.handleMenuOnClose();
        }
    };

    handleInputTextOnChange = (event, setMenuOpen = true, isItemSelected = false) => {
        const text = isItemSelected ? event.target.innerText : event.target.value;
        let value = isItemSelected ? event.target.attributes.value.value : "";
        let isSetNewItem = isItemSelected;

        let filteredArray = this.objectArray.filter((element) => {
            if (element.text.search(text) != -1) {
                return true;
            }
        });

        let filterTextHolderNew = "";
        if (filteredArray.length > 0) {
            filterTextHolderNew = filteredArray[0].text;

            if (
                isSetNewItem === false &&
                filteredArray[0].text === text
            ) {
                value = filteredArray[0].value;
                isSetNewItem = true;
            }
        }

        this.setState({
            isMenuOpen: setMenuOpen,
            objectArrayFiltered: filteredArray,
            filterTextHolder: filterTextHolderNew,
            filterText: text
        })

        if (isSetNewItem) {
            this.selectedValue = value;
            this.selectedText = text;
            this.setNewItem();
        }
    }

    handleMenuOnClose = () => {
        if (this.state.filterTextHolder === this.state.filterText) {
            this.setNewItem();
        }
        else {
            this.clearInputField()
        }
    }

    setNewItem = () => {
        this.props.onChange(event, this.selectedValue)
        this.clearInputField();
    }

    clearInputField = () => {
        this.setState({
            filterText: "",
            filterTextHolder: this.selectedText,
            objectArrayFiltered: this.objectArray,
            isMenuOpen: false
        })
    }

    render() {
        const menuClass = "menu".concat(this.state.isMenuOpen ? " visible" : "");

        return (
            <div styleName="visible search dropdown">
                <input 
                    value={this.state.filterText}
                    styleName="search" 
                    type="text"
                    onChange={this.handleInputTextOnChange} 
                    onClick={this.handleInputTextOnClick}
                />
                <div styleName="text">
                    {this.state.filterTextHolder}
                </div>
                <div styleName={menuClass}>
                    {
                        this.state.objectArrayFiltered.map((element) => {
                            return (
                                <div 
                                    key={element.value} 
                                    value={element.value}
                                    styleName="item" 
                                    onClick={this.handleOnSelectElement}
                                >
                                    <span styleName="text">{element.text}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    };
}

export default onClickOutside(Dropdown);