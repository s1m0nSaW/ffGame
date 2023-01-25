import { Toolbar, Box, Tab, Tabs } from '@mui/material'
import React from 'react'

import Report from './bank/Report.jsx';
import Credit from './bank/Credit.jsx';
import Deposit from './bank/Deposit.jsx';

function Bank() {
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
        <Tab value="one" label="Бухгалтерия" />
        <Tab value="two" label="Кредиты" />
        <Tab value="three" label="Вклады" />
      </Tabs>
      
      {value === 'one'&&<Report/>}
      {value === 'two'&&<Credit/>}
      {value === 'three'&&<Deposit/>}
      <Toolbar/>
    </Box>
  )
}

export default Bank