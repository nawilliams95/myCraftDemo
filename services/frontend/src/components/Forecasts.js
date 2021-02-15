import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Forecasts(props) {

    // const [forecasts, setForecasts] = useState([]);
    // const {endpoint} = props;


    // let location = JSON.parse(localStorage.getItem('location'));
    // let id = location.id
    
    // const getForecast = async (id) => {
    //     try {
    //         const response = await axios.get(`${endpoint}/forecast/${id}`);
    //         const data = response.data;
    //         setForecasts(data.data);
    //         console.log(forecasts)
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // useEffect(async () => {
    //     getForecast(id);
    // }, [])
    
    return (
        <>
            <h3>for casts to go here</h3>
        </>
    )
}