import { Paper, Tab, Tabs, Container } from '@mui/material'
import React from 'react'

import Report from './bank/Report.jsx';
import Credit from './bank/Credit.jsx';
import Deposit from './bank/Deposit.jsx';
import { Header } from '../components/Header.jsx';
import BottomNav from '../components/BottomNav.jsx';
import { Panel } from '@vkontakte/vkui';
import { PAGE_BANK } from '../routers.js';

function Bank({fetchedUser}) {
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
        <Tab value="one" label="Бухгалтерия" />
        <Tab value="two" label="Кредиты" />
        <Tab value="three" label="Вклады" />
      </Tabs>
      
      {value === 'one'&&<Report/>}
      {value === 'two'&&<Credit/>}
      {value === 'three'&&<Deposit/>}
      
      <BottomNav value={PAGE_BANK}/>
      </Container>
    </Paper>
  )
}

export default Bank