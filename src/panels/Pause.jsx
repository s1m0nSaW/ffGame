import { Button, Container, CssBaseline, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../axios.js'
import { setUser } from '../redux/slices/userSlice.js'
import PauseIcon from '@mui/icons-material/Pause';

function Pause({fetchedUser}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user)

    const play = () => {
        const fields = {
            ...user,
            onGame: true,
            energy: user.maxEnergy,
        }
        dispatch(setUser(fields))
        save(fields)
        navigate('/main/main')
    }

    const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)
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
                <PauseIcon sx={{ fontSize: 40 }} />
                <Typography variant='h6'>ПАУЗА</Typography>
                <Typography variant='caption'>Необходима для восстановления энергии</Typography>
                <Button onClick={()=>play()}>Играть</Button>
            </Stack>
        </Container>
    )
}

export default Pause