import { Toolbar, Box, Tab, Tabs, Typography, Button, Stack, Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Training({fetchedUser}) {
    const navigate = useNavigate()
    return (
        <Container disableGutters>
            <Toolbar/>
            <Toolbar/>
            <Toolbar/>
            <Stack
            direction={'column'}
            alignItems='center'
            justifyContent='center'
            spacing={1}>
            <Typography>Здесь будет материал для обучения</Typography>
            <Button onClick={()=>navigate('/register')}>Играть</Button>
            <Toolbar/>
            </Stack>
        </Container>
    )
}

export default Training