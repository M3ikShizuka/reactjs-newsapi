import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import Button from './Button.js';
import './FilterPanel.scss';
import './dropdown.scss';

function FilterPanel(props) {
    let filterConfig = props.filterConfig;
    let optionsCountry = filterConfig.optionsCountry;
    let options = filterConfig.options;
    let indexOfDefaultCountry = filterConfig.indexOfDefaultCountry;
    let defaultCountryObject = optionsCountry[indexOfDefaultCountry];

	return (
        <div className="filter-panel">
             <Dropdown
                placeholder='Select Country'
                fluid
                search
                selection
                defaultValue={defaultCountryObject.value}
                onChange={props.handleFilterCountryChange}
                options={optionsCountry}
            />
            <Button 
                name="Search"
                handleSearchButton={props.handleSearchButton}
                // onClick={props.handleSearchButton}
            />
        </div>
	);
}

export default FilterPanel;