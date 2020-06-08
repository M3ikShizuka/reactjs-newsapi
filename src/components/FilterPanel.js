import React from 'react';
// import { Dropdown } from 'semantic-ui-react';
import Dropdown from './Dropdown';
import Button from './Button.js';
import './FilterPanel.scss';

function FilterPanel(props) {
    let filterConfig = props.filterConfig;
    let optionsCountry = filterConfig.optionsCountry;
    let options = filterConfig.options;
    let indexOfDefaultCountry = filterConfig.indexOfDefaultCountry;
    let defaultCountryObject = optionsCountry[indexOfDefaultCountry];

	return (
        <div styleName="filter-panel">
             {/* <Dropdown
                styleName="dropdown"
                placeholder='Select Country'
                fluid
                search
                selection
                defaultValue={defaultCountryObject.value}
                onChange={props.handleFilterCountryChange}
                options={optionsCountry}
            /> */}
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
                    name="Search"
                    handleSearchButton={props.handleSearchButton}
                    // onClick={props.handleSearchButton}
                />
            </div>
        </div>
	);
}

export default FilterPanel;