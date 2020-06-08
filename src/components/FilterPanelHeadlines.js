import React from 'react';
import Dropdown from './Dropdown';
import Button from './Button.js';
import "./FilterPanel.scss";
import styleElements from "./FilterPanelElements.scss";

function FilterPanel(props) {
    let filterConfig = props.filterConfig;
    let optionsCountry = filterConfig.optionsCountry;
    let indexOfDefaultCountry = filterConfig.indexOfDefaultCountry;
    let defaultCountryObject = optionsCountry[indexOfDefaultCountry];

	return (
        <div styleName="filter-panel">
            <div styleName="wrap_dropdown">
                <Dropdown
                    placeholder='Select Country'
                    defaultValue={defaultCountryObject.value}
                    onChange={props.handleFilterCountryChange}
                    objectsArray={optionsCountry}
                />
            </div>
            <div styleName="wrap_button_search">
                <Button 
                    customStyles={styleElements}
                    name="Search"
                    handleSearchButton={props.handleSearchButton}
                />
            </div>
        </div>
	);
}

export default FilterPanel;