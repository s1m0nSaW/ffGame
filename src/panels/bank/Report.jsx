import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import axios from '../../axios.js'

import { IconButton, Toolbar, Typography, Stack, List, ListItem, ListItemText, ListItemButton, Container, Button, Modal, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Report() {
  const user = useSelector((state) => state.user.user)
  const cars = useSelector((state) => state.cars.cars)
  const houses = useSelector((state) => state.houses.houses)
  const bizs = useSelector((state) => state.bizs.bizs)
  
  const myHouses = houses.filter(({_id}) => user.house.includes(_id))
  const sumHouses = myHouses.map(item => item.price).reduce((prev, curr) => prev + curr, 0)
  const sumHouseExp = myHouses.map(item => item.expenses).reduce((prev, curr) => prev + curr, 0)
  const myRents = houses.filter(({_id}) => user.rent.includes(_id))
  const sumRent = myRents.map(item => item.rentPrice).reduce((prev, curr) => prev + curr, 0)
  const sumRentExp = myRents.map(item => item.expenses).reduce((prev, curr) => prev + curr, 0)
  
  const myCars = cars.filter(({_id}) => user.car.includes(_id))
  const sumCars = myCars.map(item => item.price).reduce((prev, curr) => prev + curr, 0)
	const sumCarExp = myCars.map(item => item.expenses).reduce((prev, curr) => prev + curr, 0)
  
  const myBizs = bizs.filter(({_id}) => user.bizs.includes(_id))
  const sumBizProfit = myBizs.map(item => item.maxProfit).reduce((prev, curr) => prev + curr, 0)
	
  const sumCredits = user.credits.map(item => item.amount).reduce((prev, curr) => prev + curr, 0)
  const sumCreditsPayments = user.credits.map(item => item.payment).reduce((prev, curr) => prev + curr, 0)
	

  const [disabled, setDisabled] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()


  React.useEffect(() => {
    if(user.debts > 0) setDisabled(false)
  },[user])

  const payOff = () => {
		if(user.balance < user.debts){
      setOpen(true)
    } else
    {
      const newBalance = user.balance - user.debts
      const fields = {
			...user,
			balance: newBalance,
      debts: 0,
		}
    dispatch(setUser(fields))
		save(fields)}
  };

  const payCreditDebt = (_id, amount, summ, payment) => {
    if(summ > user.balance){
        setOpen(true)
    }else{
        const newBalance = user.balance - summ
        
        const myCredits = user.credits.filter(({id}) => id != _id)
        
        const newCredit = {
          id: _id,
          amount: amount - summ,
          debt: 0,
          payment: payment,
        }
        
        if(newCredit.amount > 0){
          const fields = {
            ...user,
            balance: newBalance,
            credits: [...myCredits, newCredit].sort((x, y) => x.id - y.id),
          }
          dispatch(setUser(fields))
          save(fields)
        } else {
          const fields = {
            ...user,
            balance: newBalance,
            credits: myCredits.sort((x, y) => x.id - y.id),
          }
          dispatch(setUser(fields))
          save(fields)
        }
    }
}

  const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'white',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container disableGutters>
      <Stack direction="row">
        <Typography variant="subtitle1">Деятельность:</Typography>
        <Typography sx={{marginLeft:'auto'}} variant="subtitle1">{user.prof}&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
      </Stack>
      <Stack direction="row">
        <Typography variant="subtitle1">Долги</Typography>
      </Stack>
      <List>
        {user.credits.map((credit,index)=>(
                    <ListItem 
                    sx={{ marginTop: '10px'}}
                    key={index}
                    disablePadding
                    secondaryAction={<Stack alignItems="flex-end">
                        <Typography variant="body1">Долг: {credit.debt} K</Typography>
                        <Button disabled={!credit.debt > 0} onClick={()=>payCreditDebt(credit.id, credit.amount, credit.debt, credit.payment)} size="small">Оплатить</Button>
                        </Stack>}>
                      <ListItemText primary={`Кредит от ${new Date(credit.id).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        })}`} 
                        secondary={<Typography variant="caption">Ежемесячный платеж {credit.payment} K</Typography>} />
                    </ListItem>
                ))}
        <ListItem
          disablePadding
          secondaryAction={<Stack alignItems="flex-end">
              <Typography variant="body1">{user.debts} K</Typography>
              <Button disabled={!user.debts > 0} onClick={()=>payOff()} size="small">Погасить</Button>
              </Stack>}>
          <ListItemText primary={'Задолженность на сегодня'} 
              secondary={'Погашать необходимо ежегодно'} />
        </ListItem>
      </List>
      
      <Stack direction="row">
        <Typography variant="subtitle1">Доходы</Typography>
      </Stack>
      <List>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body2" sx={{ color: 'green' }}>~ {Math.round((user.deposit.amount * 0.13)/12)} K/мес</Typography>}>
          <ListItemText primary={<Typography variant="body2">Дивиденды</Typography>} />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body2" sx={{ color: 'green' }}>{sumRent} К/мес</Typography>}>
          <ListItemText primary={<Typography variant="body2">Доход от аренды</Typography>} />
        </ListItem>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body2" sx={{ color: 'green' }}>{user.salary} K/мес</Typography>}>
          <ListItemText primary={<Typography variant="body2">Зарплата</Typography>} />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body2" sx={{ color: 'green' }}>~ {sumBizProfit} K/мес</Typography>}>
          <ListItemText primary={<Typography variant="body2">Доход от бизнеса</Typography>} />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="subtitle1" sx={{ color: 'green' }}>~ {(Math.round((user.deposit.amount * 0.13)/12)) + sumRent + user.salary + sumBizProfit} K/мес</Typography>}>
          <ListItemText primary={<Typography sx={{ color: 'green' }} variant="subtitle1">Итого</Typography>} />
        </ListItem>
      </List>
      <Stack direction="row">
        <Typography variant="subtitle1">Расходы</Typography>
      </Stack>
      <List>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body2" sx={{ color: 'red' }}>{sumCreditsPayments} K/мес</Typography>}>
          <ListItemText primary={<Typography variant="body2">Платежи по кредитам</Typography>} />
        </ListItem>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body2" sx={{ color: 'red' }}>{sumHouseExp + sumRentExp} K/мес</Typography>}>
          <ListItemText primary={<Typography variant="body2">Расходы на недвижимость</Typography>} />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body2" sx={{ color: 'red' }}>{sumCarExp} K/мес</Typography>}>
          <ListItemText primary={<Typography variant="body2">Расходы на транспорт</Typography>} />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body2" sx={{ color: 'red' }}>{user.expenses} K/мес</Typography>}>
          <ListItemText primary={<Typography variant="body2">Общие расходы</Typography>} />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body2" sx={{ color: 'red' }}>{user.children * 5} K/мес</Typography>}>
          <ListItemText primary={<Typography variant="body2">Расходы на детей</Typography>} />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="subtitle1" sx={{ color: 'red' }}>{(user.children * 5) + user.expenses + sumCarExp + sumHouseExp + sumRentExp + sumCreditsPayments} K/мес</Typography>}>
          <ListItemText primary={<Typography sx={{ color: 'red' }} variant="subtitle1">Итого</Typography>} />
        </ListItem>
      </List>
      <Stack direction="row">
        <Typography variant="subtitle1">Активы</Typography>
      </Stack>
      <List>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body1">{user.deposit.amount} K</Typography>}>
          <ListItemText primary={<Typography variant="body2">Вклады</Typography>} />
        </ListItem>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body1">{sumHouses} K</Typography>}>
          <ListItemText primary={<Typography variant="body2">Стоимость недвижимости</Typography>} />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body1">{sumCars} K</Typography>}>
          <ListItemText primary={<Typography variant="body2">Стоимость транспорта</Typography>} />
        </ListItem>
      </List>
      <Stack direction="row">
        <Typography variant="subtitle1">Пассивы</Typography>
      </Stack>
      <List>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body1">{sumCredits} K</Typography>}>
          <ListItemText primary={<Typography variant="body2">Кредиты на сумму</Typography>}/>
        </ListItem>
      </List>
      <Modal
      open={open}
      onClose={()=>setOpen(false)}
      >
        <Box sx={style}>
          <Typography>
            Недостаточно средств 😥
          </Typography>
        </Box>
      </Modal>
      <Toolbar/>
    </Container>
  )
}

export default Report