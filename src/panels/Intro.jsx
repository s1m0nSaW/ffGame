import { Backdrop, Button, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../axios.js'
import { setUser } from '../redux/slices/userSlice.js'

function Intro({fetchedUser}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getPlayer = async () => {
        await axios.get(`/auth/me/${fetchedUser.id}`).then(({data}) => {
          dispatch(setUser(data))
          navigate('/main/main')
        }).catch(() =>{
          navigate('/register')
        })
    }
     
    if(fetchedUser){
        getPlayer()
    }
    
    
    return (
      <Backdrop
        sx={{ color: '#fff' }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
}

export default Intro