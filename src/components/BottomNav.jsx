import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

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
            <BottomNavigationAction label="Главная" value='main' icon={<MonetizationOnOutlinedIcon/>}/>
            <BottomNavigationAction label="Магазин" value='property' icon={<ShoppingCartOutlinedIcon/>}/>
            <BottomNavigationAction label="Банк" value='bank' icon={<AccountBalanceOutlinedIcon/>}/>
            <BottomNavigationAction label='Профиль' value='home' icon={<HomeOutlinedIcon/>}/>

        </BottomNavigation></Paper>
    )
}

export default BottomNav