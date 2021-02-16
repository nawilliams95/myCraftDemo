import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import axios from 'axios';

import StyledDropmenu from './styles/StyledDropmenu';


function Dropdown({ setForecasts, setToday, setTenDay, isSelectionMade, showResult, endpoint, test, items, multiSelect = false }) {

    const [open, setOpen] = useState(false);
    let [selection, setSelection] = useState([]);
    const [title, setTitle] = useState([
        'Select Location....'
    ]);
    const toggle = () => setOpen(!open);
    Dropdown.handleClickOutside = () => setOpen(false);

    // if (isSelectionMade === true) {
    //     var location = JSON.parse(localStorage.getItem('location'));
    // }
    const makeTenDay = (data) => {
        const exceptIndex = 0;
        const filteredItems = data.filter((value, index) => exceptIndex !== index);
        return filteredItems;
    };

    const getForecast = async (id) => {
        try {
            console.log('somthing is happening..')
            const response = await axios.get(`${endpoint}/forecast/${id}`);
            const data = response.data;
            const forecast = data.data;
            setForecasts(forecast);
            setToday(forecast[0]);
            let temp = makeTenDay(forecast);
            setTenDay(temp);
        } catch (err) {
            console.error(err);
        }
    }


    const handleOnClick = (item) => {
        if (!selection.length > 0) {
            if (!multiSelect) {
                selection = [item];
                if (selection.length > 0) {
                    localStorage.setItem('location', JSON.stringify(selection[0]));
                }
                test();
                console.log(localStorage.location);
                let location = JSON.parse(localStorage.getItem('location'));
                let locationID = location.id
                setTitle(`${location.cityName}, ${location.state}`);
                getForecast(locationID);
            } else if (multiSelect) {
                setSelection([...selection, item]);
            }
        } else {
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.id !== item.id
            );
            setSelection([...selectionAfterRemoval]);
        }
    }

    const isItemSelected = (item) => {
        if (selection.find(current => current.id === item.id)) {
            return true;
        } else {
            return false;
        }
    }




    return (
        <>
            <StyledDropmenu showResult={showResult}>
                <div
                    tabIndex={0}
                    className='dd-header'
                    role='button'
                    onKeyPress={() => toggle(!open)}
                    onClick={() => toggle(!open)}>
                    <div className='dd-header__title'>
                        {/* <p className='dd-header__title--bold'>{ isSelectionMade ? `${location.cityName}, ${location.state}` : `${title}`}</p> */}
                        <p className='dd-header__title--bold'>{title}</p>
                    </div>
                    <div className='dd-header_action'>
                        <p>{open ? 'Close' : 'Open'}</p>
                    </div>
                </div>
                {open && (
                    <ul className='dd-list'>
                        {items.map(item => (
                            <li className='dd-list-item' key={item.id} value={item}>
                                <button type='button' onClick={() => handleOnClick(item)}>
                                    <span>{`${item.cityName}, ${item.state}`}</span>
                                    <span>{isItemSelected(item) && 'Selected'} </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </StyledDropmenu>
        </>
    );

}

const clickOutsidrConfig = {
    handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsidrConfig);
