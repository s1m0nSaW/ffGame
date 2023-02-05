import { Button, Paper, Stack } from '@mui/material'
import { Panel } from '@vkontakte/vkui'
import React from 'react'
import { useDispatch } from 'react-redux'
import axios from '../axios.js'
import { setUser } from '../redux/slices/userSlice.js'
import { useRouter } from '@happysanta/router'
import { PAGE_MAIN, PAGE_REGISTER, PAGE_TRAINING, PAGE_SETTINGS } from '../routers.js'

function Intro({fetchedUser}) {
    const dispatch = useDispatch()
    const router = useRouter()
    const [firstTime, setFirstTime] = React.useState(true)

    const getPlayer = async () => {
        await axios.get(`/auth/me/${fetchedUser.id}`).then(({data}) => {
          dispatch(setUser(data))
          setFirstTime(false)
        }).catch(() =>{
          console.log('user not found')
        })
    }
     
    if(fetchedUser){
        getPlayer()
    }
    
    
    return (
      <Panel centered>
        <Paper sx={{ width: '100vw', height: '100%', minHeight: '100vh', borderRadius:0 }}>
          <Stack
            sx={{ width: '100vw', height: '100vh' }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Button disabled={firstTime} onClick={() => router.pushPage(PAGE_MAIN)}>Играть</Button>
            <Button disabled={firstTime} onClick={() => router.pushPage(PAGE_REGISTER)}>Новая игра</Button>
            <Button onClick={() => router.pushPage(PAGE_TRAINING)}>Обучение</Button>
            <Button onClick={() => router.pushPage(PAGE_SETTINGS)}>Настройки</Button>
          </Stack>
        </Paper>
      </Panel>
    )
}

export default Intro