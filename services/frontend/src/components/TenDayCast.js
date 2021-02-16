import React from 'react';
import styled from 'styled-components'

import TenDayForecastWrapper from './styles/TenDayforecastWrapper';
import SmallLabel from './styles/SmallLabel';
import FontStyles from './styles/FontStyles';


const WeatherIcon = styled.img`
    display: block;
    height: 50px;
    width: 50px;
    margin: 0 auto;
`;

export default function TenDayCast(props) {
    const { date, day, higTemp, lowTemp, shortCast } = props;

    let icon = 'YkbqVpN/none';

    if (shortCast.indexOf('Sunny') !== -1) {
        icon = 'dk6TCbc/sunny'
    } else if (shortCast.indexOf('Rain') !== -1) {
        icon = '0FyZMQW/rain'
    } else if (shortCast.indexOf('Cloudy') !== -1) {
        icon = 'qMsQMpm/cloudy'
    } else if (shortCast.indexOf('Snow') !== -1) {
        icon = 'YptH7vM/snow'
    } else if (shortCast.indexOf('Clear') !== -1) {
        icon = 'wYq9Qbs/clear'
    } else if (shortCast.indexOf('Thunderstorm') !== -1) {
        icon = '2s6dnr9/thunderstorm'
    } else {
        icon = 'JyCfvzB/other'
    };

    const iconUrl = `https://i.ibb.co/${icon}.png`

    return (
        <TenDayForecastWrapper>
            <FontStyles align="center">
                {day}
            </FontStyles>
            <FontStyles align="center">{date}</FontStyles>
            <WeatherIcon src={iconUrl} />
            <SmallLabel align="center" weight="400">
               H: {higTemp}&#176;
            </SmallLabel>
            <SmallLabel align="center" weight="400">
               L: {lowTemp}&#176;
            </SmallLabel>
        </TenDayForecastWrapper>

    )

}