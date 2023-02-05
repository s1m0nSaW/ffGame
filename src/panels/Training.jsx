import { Toolbar, Typography, Button, Stack, Paper } from '@mui/material'
import { Panel } from '@vkontakte/vkui'
import React from 'react'
import { useRouter } from '@happysanta/router'
import { PAGE_MAIN, PAGE_REGISTER } from '../routers'

function Training() {
    const router = useRouter()
    return (
        <Paper sx={{ width: '100vw', height: '100%', minHeight: '100vh', borderRadius:0 }}>
            <Stack
            sx={{ width: '100vw', height: '100vh' }}
            direction={'column'}
            alignItems='center'
            justifyContent='center'
            spacing={1}>
            <Typography>Здесь будет материал для обучения</Typography>
            <Button onClick={()=>router.pushPage(PAGE_MAIN)}>Играть</Button>
            <Button onClick={()=>router.pushPage(PAGE_REGISTER)}>Начать заново</Button>
            <Toolbar/>
            </Stack>
        </Paper>
    )
}

export default Training