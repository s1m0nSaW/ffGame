import { Box, Button, FormControl, Select, MenuItem, InputLabel, Grid, List, ListItem, ListItemText, Typography, Stack, Modal } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import axios from '../../axios.js'

function Credit() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user)
    const [amount, setAmount] = React.useState('');
    const [term, setTerm] = React.useState('');
    const [payment, setPayment] = React.useState(0);
    const [creditAmount, setCreditAmount] = React.useState('');
    const [canCal, setCanCal] = React.useState(false);
    const [calculated, setCalculated] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [creditLimit, setCreditLimit] = React.useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setAmount(event.target.value);
    };
    
    const handleChangeTerm = (event) => {
        setTerm(event.target.value);
    };

    const calculate = () => {
        setPayment(Math.round((((amount*0.18)*(term/12))+amount)/term))
        setCreditAmount((Math.round((((amount*0.18)*(term/12))+amount)/term))*term)
        setCalculated(true)
    }

    const takeCredit = () => {
        if(user.credits.length >= 5){
            setCreditLimit(true)
        } else
        {const date = +new Date
        const terms = {
            id: date,
            amount: creditAmount,
            debt: 0,
            payment: payment,
        }
        const myCredits = [...user.credits, terms]  //погашение кредита, убрать из массива по айди
        const newBalance = user.balance + amount
        const fields = {
			...user,
            balance: newBalance,
            credits: myCredits.sort((x, y) => x.id - y.id),
		}
		dispatch(setUser(fields))
		save(fields)}
    }

    const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)
    }

    const payOff = (_id, summ) => {
        if(summ > user.balance){
            setOpen(true)
        }else{
            const newBalance = user.balance - summ
	        const myCredits = user.credits.filter(({id}) => id != _id)
            const fields = {
                ...user,
                balance: newBalance,
                credits: myCredits.sort((x, y) => x.id - y.id),
            }
            dispatch(setUser(fields))
            save(fields)
        }
    }

    React.useEffect(()=>{
        if(amount != '' && term != ''){
            setCanCal(true)
        }
        
    },[term,amount])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        bgcolor: 'background.paper',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
      };

    return (
        <Box sx={{ width: '100%' }} >
            <Typography variant="subtitle1">Оформить кредит</Typography>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ marginTop: '10px'}} error>
                        <InputLabel id="credit-amount-label">Сумма</InputLabel>
                        <Select
                        labelId="credit-amount-label"
                        id="credit-amount-select"
                        value={amount}
                        label="Amount"
                        onChange={handleChange}
                        >
                        <MenuItem value={100}>100 К</MenuItem>
                        <MenuItem value={200}>200 К</MenuItem>
                        <MenuItem value={500}>500 К</MenuItem>
                        <MenuItem value={1000}>1000 К</MenuItem>
                        <MenuItem value={5000}>5000 К</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth sx={{ marginTop: '10px'}}>
                        <InputLabel id="credit-term-label">Срок</InputLabel>
                        <Select
                        labelId="credit-term-label"
                        id="credit-term-select"
                        value={term}
                        label="Term"
                        onChange={handleChangeTerm}
                        >
                        <MenuItem value={12}>12 мес</MenuItem>
                        <MenuItem value={24}>24 мес</MenuItem>
                        <MenuItem value={60}>60 мес</MenuItem>
                        <MenuItem value={120}>120 мес</MenuItem>
                        <MenuItem value={240}>240 мес</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Typography variant="caption">Расчитать и оформить кредит под ~18% годовых</Typography>
            <Stack direction={'column'}>
            <Button sx={{ marginTop: '15px'}} disabled={!canCal} size="small" variant="contained" onClick={()=>calculate()}>Рассчитать</Button></Stack>
            {calculated && <List>
                <ListItem 
                disablePadding
                secondaryAction={
                <Typography variant="body1">{payment} K</Typography>}>
                <ListItemText primary="Ежемесячный платеж" />
                </ListItem>
                <ListItem 
                disablePadding
                secondaryAction={
                <Typography variant="body1">{creditAmount} K</Typography>}>
                <ListItemText primary="Общая выплата" />
                </ListItem>
                <ListItem 
                disablePadding
                secondaryAction={
                <Typography variant="body1">{amount} K</Typography>}>
                <ListItemText primary="Сумма кредита" />
                </ListItem>
                <Stack direction={'column'}>
                <Button onClick={()=>takeCredit()} sx={{ marginTop: '10px'}} disabled={!canCal} size="small" variant="contained">Оформить</Button></Stack>
            </List>}
            <List>
                {user.credits.length >= 1 && <Typography variant="overline">Оформленные</Typography>}
                {user.credits.map((credit,index)=>(
                    <ListItem 
                    sx={{ marginTop: '10px'}}
                    key={index}
                    disablePadding
                    secondaryAction={<Stack alignItems="flex-end">
                        <Typography variant="body1">Сумма {credit.amount} K</Typography>
                        <Button onClick={()=>payOff(credit.id,credit.amount)} size="small">Погасить</Button>
                        </Stack>}>
                    <ListItemText primary={`Кредит от ${new Date(credit.id).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        })}`} 
                        secondary={<Typography variant="caption">Ежемесячный платеж {credit.payment} K</Typography>} />
                    </ListItem>
                ))}
            </List>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography>
                        Недостаточно средств 😥
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={creditLimit}
                onClose={()=>setCreditLimit(false)}
            >
                <Box sx={style}>
                    <Typography>
                        Максимальное количество кредитов 😥
                    </Typography>
                </Box>
            </Modal>
        </Box>
    )
}

export default Credit