import { Backdrop, Badge, BottomNavigation, BottomNavigationAction, CircularProgress, Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from '@happysanta/router'
import { PAGE_MAIN, PAGE_PROPERTY, PAGE_BANK, PAGE_PROFILE } from '../routers';
import axios from '../axios.js'
import bridge from '@vkontakte/vk-bridge'

import HandshakeIcon from '@mui/icons-material/Handshake';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

let arr = [];

function BottomNav({ value }) {
    const router = useRouter()
    const debts = useSelector((state) => state.user.debts)
    const greetings = useSelector((state) => state.user.greetings)
    const user = useSelector((state) => state.user.user)
    const [open, setOpen] = React.useState(false);

    const save = async (data) => {
        await axios.patch(`/auth/${user._id}`, data)
    }

    const handleChange = (event, newValue) => {
        arr.push(newValue)
        if (arr.length == 4) {
            bridge.send('VKWebAppCheckNativeAds', { ad_format: 'interstitial' });
        }
        if (arr.length == 5) {
            setOpen(true)
            arr.length = 0
            setTimeout(() => {
                setOpen(false)
                bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
                    .then((data) => {
                        if (data.result) {
                            console.log('Реклама показана');
                            save(user)
                            router.pushPage(newValue)
                        }
                        else
                            console.log('Ошибка при показе');
                    })
                    .catch((error) => { console.log(error); });
            }, 1000)
        } else {
            save(user)
            router.pushPage(newValue)
        }
        
    };

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <BottomNavigation
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction label="Главная" value={PAGE_MAIN} icon={<MonetizationOnIcon />} />
                <BottomNavigationAction label="Сделки" value={PAGE_PROPERTY} icon={<HandshakeIcon />} />
                <BottomNavigationAction label="Банк" value={PAGE_BANK} icon={
                    <Badge color="secondary" variant="dot" invisible={!debts}>
                        <AccountBalanceIcon />
                    </Badge>
                } />
                <BottomNavigationAction label='Профиль' value={PAGE_PROFILE} icon={
                    <Badge color="secondary" variant="dot" invisible={!greetings}>
                        <AccountCircleIcon />
                    </Badge>
                } />

            </BottomNavigation>
        </Paper>
    )
}

export default BottomNav