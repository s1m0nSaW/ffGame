import { Paper, Tab, Tabs, Container, Typography } from '@mui/material'
import React from 'react'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

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

  const Info = (
    <>
      <AccountBalanceIcon />
      <Typography>
        На вкладке <b>БАНК</b> можно<br/>
        - посмотреть информацию о личных финансах<br/>
        - оформить кредит<br/>
        - сделать вклад<br/>
        - оплатить задолженности
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