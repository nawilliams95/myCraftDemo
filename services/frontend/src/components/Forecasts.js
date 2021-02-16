import React, {useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faBolt,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
  faCloudSun
} from '@fortawesome/free-solid-svg-icons';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import device from '../responsive/Device';
import TenDayCast from './TenDayCast'; //TenDayCast
import BigLabel from './styles/BigLabel';
import MediumLabel from './styles/MediumLabel';
import SmallLabel from './styles/SmallLabel';
import FontStyles from './styles/FontStyles'; //FontStyles
import ForecastContainer from './styles/ForecastContainer'; //Results
import CurrentWeatherWrapper from './styles/CurrentWeatherWrapper'; //CurrentWeatherWrapper
import WeatherIcon from './styles/WeatherIcon'; //WeatherIcon
import Temperature from './styles/Temperature'; //Temperature
import WeatherDetailsWrapper from './styles/WeatherDetailsWrapper'; //WeatherDetailsWrapper
import Forecast from './styles/Forecast'; //Forecast


const LocationWrapper = styled.div`
  flex-basis: 100%;
`;

const TemperatureWrapper = styled.div``;

const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media ${device.laptop} {
    padding: 20px 10px;
  }
`;

const ForecastWrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow-y: hidden;
`;




export default function Forecasts(props) {
    let selectedLocation = JSON.parse(localStorage.getItem('location'));
    let lID = selectedLocation.id;

    const {
        endpoint,
        setForecasts,
        today,
        setToday,
        tenDay,
        setTenDay
    } = props


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
            console.log(data)
            const forecast = data.data;
            setForecasts(forecast);
            setToday(forecast[0]);
            let temp = makeTenDay(forecast);
            setTenDay(temp);
        } catch (err) {
            console.error(err);
        }
    }

console.log(tenDay);
console.log(today)

    useEffect(async () => {
        getForecast(lID);
    }, [])

    const tenDayResult = tenDay.map(item => ( //forecasts
        <TenDayCast
            key={item.id}
            highTemp={item.highTemp}
            lowTemp={item.lowTemp}
            date={item.date}
            day={item.day}
            shortCast={item.shortCast}
        />
    ));
    

    let weatherIcon = null;

    if (today.shortCast.indexOf('Sunny') !== -1) {
        weatherIcon = <FontAwesomeIcon icon={faCloudSun} />;
    } else if (today.shortCast.indexOf('Rain') !== -1) {
        weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (today.shortCast.indexOf('Cloudy') !== -1) {
        weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else if (today.shortCast.indexOf('Snow') !== -1) {
        weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (today.shortCast.indexOf('Clear') !== -1) {
        weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else if (today.shortCast.indexOf('Thunderstorm') !== -1) {
        weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else {
        weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    };

    return (
        <ForecastContainer>
            <LocationWrapper>
                <BigLabel>
                    {selectedLocation.cityName}, {selectedLocation.state}
                </BigLabel>
                <SmallLabel weight='400'>{today.day}</SmallLabel>
                <SmallLabel weight='400'>{today.date}</SmallLabel>
            </LocationWrapper>
            <CurrentWeatherWrapper>
                <WeatherIcon>{weatherIcon}</WeatherIcon>
                <TemperatureWrapper>
                    <Temperature> {today.highTemp}&#176;</Temperature>
                    <SmallLabel weight='400'>
                        {today.shortCast}
                    </SmallLabel>
                </TemperatureWrapper>
            </CurrentWeatherWrapper>
            <WeatherDetailsWrapper>
                <WeatherDetail>
                    <SmallLabel align='center' weight='400'>
                        {today.highTemp}&#176;
            </SmallLabel>
                    <FontStyles align='center'>High</FontStyles>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel align='center' weight='400'>
                    {today.lowTemp}&#176;
            </SmallLabel>
                    <FontStyles align='center'>Low</FontStyles>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel align='center' weight='400'>
                        {today.longCast}
                    </SmallLabel>
                    <FontStyles align='center'>Detail</FontStyles>
                </WeatherDetail>
            </WeatherDetailsWrapper>
            <ForecastWrapper>
                <MediumLabel weight='400'>10-Day Forecast</MediumLabel>
                <Forecast>
                    {tenDayResult}
                </Forecast>
            </ForecastWrapper>
        </ForecastContainer>
    )
}