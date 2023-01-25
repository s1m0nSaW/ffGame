import { Box, TextField, Typography, Stack, Button, Input, ListItem, ListItemText, List } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import axios from '../../axios.js'

function Deposit() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user)
    const [amount, setAmount] = React.useState(0)
    const [withdrawAmount, setWithdrawAmount] = React.useState(0)
    const [disabled, setDisabled] = React.useState(true)
    const [disabledWithdraw, setDisabledWithdraw] = React.useState(true)

    React.useEffect(()=>{
        if(amount>user.balance) setDisabled(true)
        if(amount<=user.balance) setDisabled(false)
        if(amount<=0) setDisabled(true)
    },[ amount, user ])

    React.useEffect(()=>{
        if(withdrawAmount>user.deposit.amount) setDisabledWithdraw(true)
        if(withdrawAmount<=user.deposit.amount) setDisabledWithdraw(false)
        if(withdrawAmount<=0) setDisabledWithdraw(true)
    },[ withdrawAmount, user ])

    const handleInvestChange = (event) => {
        setAmount(event.target.value)
    }

    const handleWithdrawChange = (event) => {
        setWithdrawAmount(event.target.value)
    }
    
    const invest = () => {
        const newDeposit = {
            amount: user.deposit.amount + Number(amount),
            date: +new Date + 120000,
        }

        const newBalance = user.balance - Number(amount)

        const fields = {
			...user,
            balance: newBalance,
            deposit: newDeposit,
		}
		dispatch(setUser(fields))
		save(fields)
    }

    const withdraw = () => {
        const newDeposit = {
            amount: user.deposit.amount - Number(withdrawAmount),
            date: +new Date + 120000,
        }

        const newBalance = user.balance + Number(withdrawAmount)

        const fields = {
			...user,
            balance: newBalance,
            deposit: newDeposit,
		}
		dispatch(setUser(fields))
		save(fields)
    }

    const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)
    }

    return (
        <Box sx={{ width: '100%' }} >
            <Stack direction={'column'} spacing={1}>
                <List>
                <ListItem 
                    disablePadding
                    secondaryAction={
                    <Typography variant="body1">{user.deposit.amount} K</Typography>}>
                    <ListItemText primary="Вклад" />
                </ListItem></List>
                <Typography variant="subtitle1">Вложить</Typography>
                <TextField
                    id="outlined-number"
                    label="Сумма"
                    type="number"
                    onChange={handleInvestChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Typography variant="caption">Дивидендная доходность ~13% в год</Typography>
                <Button sx={{ marginTop: '15px'}} disabled={disabled} size="small" variant="contained" onClick={()=>invest()}>Вложить</Button>
                
                <Typography variant="subtitle1">Снять</Typography>
                <TextField
                    id="outlined-number"
                    label="Сумма"
                    type="number"
                    onChange={handleWithdrawChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button sx={{ marginTop: '15px'}} disabled={disabledWithdraw} size="small" variant="contained" onClick={()=>withdraw()}>Снять</Button>
            </Stack>
        </Box>
    )
}

export default Deposit