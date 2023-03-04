import { Toolbar, Paper, Tab, Tabs, Container, Typography } from '@mui/material'
import React from 'react'

import HandshakeIcon from '@mui/icons-material/Handshake';

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

    const Info = (
    <>
        <HandshakeIcon />
        <Typography>
            На вкладке <b>СДЕЛКИ</b> можно купить бизнес, транспорт, недвижимость.<br/><br/>
            В начале для покупки бизнеса, помимо денег, <b>необходимо</b> наличие свободного времени.<br/>
            При <b>покупке</b> бизнеса ценой более 20 000 К и 50 000 К <b>деятельность</b> игрока меняется на <b>'Средний бизнес'</b> и <b>'Крупный бизнес'</b> соответственно.<br/><br/>
            Если у игрока деятельность <b>'Средний бизнес', 'Крупный бизнес' и 'Инвестор'</b> для покупки бизнеса наличие свободного времени не требуется.<br/><br/>
            Недвижимость <b>увеличивает</b> максимальное количество энергии.<br/><br/>
            Транспорт <b>увеличивает</b> время и максимальную энергию.
        </Typography>
    </>
    )

    return (
        <Paper sx={{ width: '100vw', height: '100%', minHeight: '100vh', borderRadius:0 }}>
            <Container>
            <Header fetchedUser={fetchedUser} info={Info}/>
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