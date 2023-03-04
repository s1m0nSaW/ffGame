import { Toolbar, Typography, Button, Stack, Paper, ImageList, ImageListItem } from '@mui/material'
import { Panel } from '@vkontakte/vkui'
import React from 'react'
import { useRouter } from '@happysanta/router'
import { PAGE_MAIN, PAGE_REGISTER } from '../routers'
import bank from '../img/bank.png'
import choose from '../img/choose.png'
import deals from '../img/deals.png'
import header from '../img/header.png'
import main from '../img/main.png'
import profile from '../img/profile.png'

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
            <ImageList cols={1}>
                <ImageListItem>
                    <img src={choose}/>
                </ImageListItem>
                <ImageListItem>
                    <img src={header}/>
                </ImageListItem>
                <ImageListItem>
                    <img src={main}/>
                </ImageListItem>
                <ImageListItem>
                    <img src={deals}/>
                </ImageListItem>
                <ImageListItem>
                    <img src={bank}/>
                </ImageListItem>
                <ImageListItem>
                    <img src={profile}/>
                </ImageListItem>
                <Toolbar/>
                <Button onClick={()=>router.popPage()}>Назад</Button>
                <Toolbar/>
            </ImageList>
            </Stack>
        </Paper>
    )
}

export default Training