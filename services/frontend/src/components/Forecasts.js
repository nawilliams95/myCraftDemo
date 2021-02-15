import React, { useState, useEffect } from 'react';
import axios from 'axios';



export default function Forecasts(props) {
    let selectedLocation = JSON.parse(localStorage.getItem('location'));
    let lID = selectedLocation.id;

    const {endpoint} = props

    let [forecasts, setForecasts] = useState([]);
    const [today, setToday] = useState();
    
    const getForecast = async (id) => {
        try {
            console.log('somthing is happening..')
            const response = await axios.get(`${endpoint}/forecast/${id}`);
            const data = response.data;
            console.log(data)
            forecasts = data.data;
            setForecasts(forecasts)
            setToday(forecasts[0])
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(async () => {
        getForecast(lID);
    }, [])

    console.log(today)
    return (
        <>
            
            <h2>weather goes here....</h2>
        </>
    )
}