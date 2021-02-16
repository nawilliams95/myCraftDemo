import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Dropdown from './Dropdown';
import Forecasts from './Forecasts';
import AppHeader from './styles/AppHeader';
import AppContainer from './styles/ForecastContainer';

export default function GuestDash(props) {
    const [locationInfo, setLocationInfo] = useState([]);
    const [isSelectionMade, setIsSeletionMade] = useState(false);
    let [forecasts, setForecasts] = useState([]);
    let [today, setToday] = useState({
        "id": 0,
        "number": 0,
        "date": " ",
        "lastUpdated": " ",
        "day": " ",
        "highTemp": 0,
        "lowTemp": 0,
        "shortCast": " ",
        "longCast": " ",
        "createdAt": " ",
        "updatedAt": " ",
        "LocationId": " "
    });
    let [tenDay, setTenDay] = useState([]);
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
            <AppHeader showLabel={(isSelectionMade === true) && true}>Weather app</AppHeader>
            <AppContainer>
                <AppHeader secondary showResult={(isSelectionMade === true) && true}>
                    Crafty Weather
                </AppHeader>

                <Dropdown
                    test={test}
                    isSelectionMade={isSelectionMade}
                    items={locationInfo}
                    showResult={(isSelectionMade === true) && true}
                    forecasts={forecasts}
                    setForecasts={setForecasts}
                    today={today}
                    setToday={setToday}
                    tenDay={tenDay}
                    setTenDay={setTenDay}
                    endpoint={endpoint} />


                {isSelectionMade === true && <Forecasts
                    endpoint={endpoint}
                    forecasts={forecasts}
                    setForecasts={setForecasts}
                    today={today}
                    setToday={setToday}
                    tenDay={tenDay}
                    setTenDay={setTenDay} />}
            </AppContainer>

        </>
    )
}