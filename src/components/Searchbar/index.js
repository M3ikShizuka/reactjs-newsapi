import React from "react";
import "./Searchbar.scss";

class Searchbar extends React.Component {
    constructor(props) {
        super(props)
    }

    handleOnSelectElement = (event) => {
        this.handleInputTextOnChange(event, false, true)
    }

    handleInputTextOnClick = (event) => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
        })
    }

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
        return (
            <input 
                value={this.state.filterText}
                aria-autocomplete="list" 
                autoComplete="off" 
                styleName="search" 
                tabIndex={0} type="text"
                onChange={this.handleInputTextOnChange} 
                onClick={this.handleInputTextOnClick}
            />
        );
    };
}

export default Searchbar;