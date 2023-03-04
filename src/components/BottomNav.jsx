import { Badge, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from '@happysanta/router'
import { PAGE_MAIN, PAGE_PROPERTY, PAGE_BANK, PAGE_PROFILE } from '../routers';

import HandshakeIcon from '@mui/icons-material/Handshake';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

function BottomNav({value}) {
    const router = useRouter()
    const debts = useSelector((state) => state.user.debts)
    const greetings = useSelector((state) => state.user.greetings)
    const handleChange = (event, newValue) => {
        router.pushPage(newValue)
      };
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
            value={value}
            onChange={handleChange}
        >
            <BottomNavigationAction label="Главная" value={PAGE_MAIN} icon={<MonetizationOnIcon/>}/>
            <BottomNavigationAction label="Сделки" value={PAGE_PROPERTY} icon={<HandshakeIcon/>}/>
            <BottomNavigationAction label="Банк" value={PAGE_BANK} icon={
                <Badge color="secondary" variant="dot" invisible={!debts}>
                    <AccountBalanceIcon/>
                </Badge>
            }/>
            <BottomNavigationAction label='Профиль' value={PAGE_PROFILE} icon={
                <Badge color="secondary" variant="dot" invisible={!greetings}>
                    <AccountCircleIcon/>
                </Badge>
            }/>

        </BottomNavigation>
        </Paper>
    )
}

export default BottomNav