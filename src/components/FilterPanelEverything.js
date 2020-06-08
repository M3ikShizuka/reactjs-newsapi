import React from 'react';
import Button from './Button.js';
import "./FilterPanel.scss";
import styleElements from "./FilterPanelElements.scss";

function FilterPanelEverything(props) {
	return (
        <div styleName="filter-panel">
            <div styleName="wrap_input_search">
                <input 
                    value={props.defaultValue}
                    className={styleElements.search}
                    placeholder="Input search text"
                    onChange={props.handleInputTextSearchOnChange} 
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

export default FilterPanelEverything;