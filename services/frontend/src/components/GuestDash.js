import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Dropdown from './Dropdown';
import Forecasts from './Forecasts'

export default function GuestDash(props) {
    const [locationInfo, setLocationInfo] = useState([]);
    const [isSelectionMade, setIsSeletionMade] = useState(false);
    const { endpoint } = props

    const getLocationInfo = async () => {
        try {
            const response = await axios.get(`${endpoint}/locations`);
            const data = response.data;
            setLocationInfo(data.data);
        } catch (err) {
            console.error(err);
        }

    }



    const test = async () => {
        try {
            if (localStorage.getItem('location')) {
                setIsSeletionMade(true)
            } else {
                setIsSeletionMade(false)
            }
            console.log('it worked??')
            return isSelectionMade;
        } catch (err) {
            console.log("still broke", err);

        }

    };

    useEffect(async () => {
        getLocationInfo();
    }, []);

    useEffect(() => {
        test();
    }, [isSelectionMade])
    return (
        <>
            <div className='wrapper'>
                <h2>
                    this is the guest dash....
                </h2>
                <div>
                    <Dropdown
                        test={test}
                        isSelectionMade={isSelectionMade}
                        items={locationInfo}
                        endpoint={endpoint} />
                </div>
                <div>
                {isSelectionMade === true && <Forecasts endpoint={endpoint} />}
                </div>
            </div>

        </>
    )
}