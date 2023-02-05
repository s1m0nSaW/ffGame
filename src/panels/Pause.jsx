import { Button, Paper, CssBaseline, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from '@happysanta/router'
import axios from '../axios.js'
import { setUser } from '../redux/slices/userSlice.js'
import PauseIcon from '@mui/icons-material/Pause'
import { PAGE_MAIN } from '../routers.js'
import { Panel } from '@vkontakte/vkui'

function Pause() {
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector((state) => state.user.user)

    const play = () => {
        const fields = {
            ...user,
            onGame: true,
            energy: user.maxEnergy,
        }
        dispatch(setUser(fields))
        save(fields)
        router.pushPage(PAGE_MAIN)
    }

    const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)
    }

    return (
        <Paper sx={{ width: '100vw', height: '100%', minHeight: '100vh', borderRadius:0 }}>
            <Stack
            sx={{ width: '100vw', height: '100vh' }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            >
                <PauseIcon sx={{ fontSize: 40}} />
                <Typography variant='h6'>ПАУЗА</Typography>
                <Typography variant='caption'>Необходима для восстановления энергии</Typography>
                <Button onClick={()=>play()}>Играть</Button>
            </Stack>
        </Paper>
    )
}

export default Pause