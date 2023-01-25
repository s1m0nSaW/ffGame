import { Toolbar, Box, Tab, Tabs } from '@mui/material'
import React from 'react'

import Home from './profile/Home'
import Friends from './profile/Friends'
import Raiting from './profile/Raiting'

function Profile() {
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
        <Tab value="one" label="Собственность" />
        <Tab value="two" label="Друзья" />
        <Tab value="three" label="Рейтинг" />
      </Tabs>
      
      {value === 'one'&&<Home/>}
      {value === 'two'&&<Friends/>}
      {value === 'three'&&<Raiting/>}
      <Toolbar/>
    </Box>
  )
}

export default Profile