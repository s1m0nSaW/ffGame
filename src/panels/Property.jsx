import { Toolbar, Box, Tab, Tabs } from '@mui/material'
import React from 'react'

import BizList from './shop/BizList';
import CarList from './shop/CarList';
import HouseList from './shop/HouseList';

function Property() {
    const [ value, setValue ] = React.useState("one")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ width: '100%' }} >
            <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            >
                <Tab value="one" label="Бизнес" />
                <Tab value="two" label="Транспорт" />
                <Tab value="three" label="Недвижимость" />
            </Tabs>
            
            {value === 'one'&&<BizList/>}
            {value === 'two'&&<CarList/>}
            {value === 'three'&&<HouseList/>}
            <Toolbar/>
        </Box>
    )
}

export default Property