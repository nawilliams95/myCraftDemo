import React from 'react';
import Dropdown from './Dropdown';

export default function LocationBar(props) {

    const {locationInfo, isSelectionMade, test} = props
    return(
        <>
            <Dropdown
            test={test} 
            isSelectionMade={isSelectionMade}
            items={locationInfo} />
        </>
    )
}