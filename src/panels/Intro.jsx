import { Backdrop, Button, ButtonGroup, CircularProgress, Container, CssBaseline, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../axios.js'
import { setUser } from '../redux/slices/userSlice.js'

function Intro({fetchedUser}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [firstTime, setFirstTime] = React.useState(true)

    const getPlayer = async () => {
        await axios.get(`/auth/me/${fetchedUser.id}`).then(({data}) => {
          dispatch(setUser(data))
          setFirstTime(false)
          //navigate('/main/main')
        }).catch(() =>{
          console.log('user not found')
          //navigate('/register')
        })
    }
     
    if(fetchedUser){
        getPlayer()
    }
    
    
    return (
      <Container disableGutters>
        <CssBaseline/>
        <Toolbar/>
        <Toolbar/>
        <Toolbar/>
        <Toolbar/>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Button disabled={firstTime} onClick={()=>navigate('/main/main')}>Играть</Button>
          <Button disabled={firstTime} onClick={()=>navigate('/register')}>Начать заново</Button>
          <Button onClick={()=>navigate('/training')}>Обучение</Button>
          <Button onClick={()=>navigate('/settings')}>Настройки</Button>
        </Stack>
      </Container>
    )
}

export default Intro