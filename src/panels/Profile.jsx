import { Toolbar, Paper, Tab, Tabs, Container, Badge, Typography } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Home from './profile/Home'
import Friends from './profile/Friends'
import { Header } from '../components/Header'
import BottomNav from '../components/BottomNav'
import bridge from '@vkontakte/vk-bridge';
import { PAGE_PROFILE } from '../routers'
import { setFriends } from '../redux/slices/userSlice';

function Profile({fetchedUser}) {
  const [ value, setValue ] = React.useState("one")
  const greetings = useSelector((state) => state.user.greetings)
  const dispatch = useDispatch()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  async function fetchFriends() {
    const response = await bridge.send('VKWebAppGetAuthToken', {
      app_id: 51483243,
      scope: 'friends'
    })


    const data = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'friends.get',
      params: {
        order: "hints",
        fields: 'photo_100',
        v: '5.131',
        access_token: response.access_token
      }
    })

    dispatch(setFriends(data.response.items))
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
        <Tab value="one" label={<Typography variant="body2">Собственность</Typography>} />
        
          <Tab onClick={()=>fetchFriends()} value="two" label={<Badge color="secondary" variant="dot" invisible={!greetings}><Typography variant="body2">Друзья</Typography></Badge>} />
        
      </Tabs>
      
      {value === 'one'&&<Home/>}
      {value === 'two'&&<Friends/>}
      <Toolbar/>
      <BottomNav value={PAGE_PROFILE}/>
      </Container>
    </Paper>
  )
}

export default Profile