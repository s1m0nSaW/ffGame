import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

import HandshakeIcon from '@mui/icons-material/Handshake';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

function BottomNav() {
    const navigate = useNavigate()
    const [value, setValue] = React.useState('main');
    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(newValue)
      };
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
            value={value}
            onChange={handleChange}
        >
            <BottomNavigationAction label="Главная" value='main' icon={<MonetizationOnIcon/>}/>
            <BottomNavigationAction label="Сделки" value='property' icon={<HandshakeIcon/>}/>
            <BottomNavigationAction label="Банк" value='bank' icon={<AccountBalanceIcon/>}/>
            <BottomNavigationAction label='Профиль' value='profile' icon={<HomeIcon/>}/>

        </BottomNavigation></Paper>
    )
}

export default BottomNav