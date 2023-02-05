import { Toolbar, Paper, Tab, Tabs, Container } from '@mui/material'
import React from 'react'

import BizList from './shop/BizList';
import CarList from './shop/CarList';
import HouseList from './shop/HouseList';

import { Header } from '../components/Header';
import BottomNav from '../components/BottomNav';
import { PAGE_PROPERTY } from '../routers';
import { Panel } from '@vkontakte/vkui';

function Property({fetchedUser}) {
    const [ value, setValue ] = React.useState("one")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Paper sx={{ width: '100vw', height: '100%', minHeight: '100vh', borderRadius:0 }}>
            <Container>
            <Header fetchedUser={fetchedUser}/>
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
            <BottomNav value={PAGE_PROPERTY}/>
            </Container>
        </Paper>
    )
}

export default Property