import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import axios from '../axios'

import { IconButton, Toolbar, Typography, Stack, List, ListItem, ListItemText, ListItemButton, Container } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Bank() {
  const user = useSelector((state) => state.user.user)
  const cars = useSelector((state) => state.cars.cars)
  const houses = useSelector((state) => state.houses.houses)
  const bizs = useSelector((state) => state.bizs.bizs)
  
  const myHouses = houses.filter(({_id}) => user.house.includes(_id))
  const myRents = houses.filter(({_id}) => user.rent.includes(_id))
  const myCars = cars.filter(({_id}) => user.car.includes(_id))
  const myBizs = bizs.filter(({_id}) => user.bizs.includes(_id))

  const sumBizProfit = myBizs.map(item => item.maxProfit).reduce((prev, curr) => prev + curr, 0)
	const sumCars = myCars.map(item => item.price).reduce((prev, curr) => prev + curr, 0)
	const sumHouses = myHouses.map(item => item.price).reduce((prev, curr) => prev + curr, 0)
	const sumHouseExp = myHouses.map(item => item.expenses).reduce((prev, curr) => prev + curr, 0)
	const sumCarExp = myCars.map(item => item.expenses).reduce((prev, curr) => prev + curr, 0)
  const sumRent = myRents.map(item => item.rentPrice).reduce((prev, curr) => prev + curr, 0)
	
	const incomes = sumBizProfit + user.salary
	const totalExp = sumHouseExp + sumCarExp + user.expenses
	const profit = incomes - totalExp

  const [open, setOpen] = React.useState(false);

  const handleClickTest = () => {
		const fields = {
			...user,
			credits: myBizs,
		}
    console.log('done')
		save(fields)
  };

  const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)}

  return (
    <Container disableGutters>
      <Stack direction="row">
        <Typography variant="overline">Активы</Typography>
        <IconButton onClick={()=>handleClickTest()} color="primary" sx={{marginLeft:'auto'}}>
          <InfoOutlinedIcon fontSize="inherit"/>
        </IconButton>
      </Stack>
      <List>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body1">{user.deposit} K</Typography>}>
          <ListItemText primary="Депозит" />
        </ListItem>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body1">{sumCars} K</Typography>}>
          <ListItemText primary="Стоимость недвижимости" />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body1">{sumHouses} K</Typography>}>
          <ListItemText primary="Стоимость транспорта" />
        </ListItem>
      </List>
      <Stack direction="row">
        <Typography variant="overline">Пассивы</Typography>
        <IconButton color="primary" sx={{marginLeft:'auto'}}>
          <InfoOutlinedIcon fontSize="inherit"/>
        </IconButton>
      </Stack>
      <List>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body1">{user.deposit} K</Typography>}>
          <ListItemText primary="Кредит"/>
        </ListItem>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body1">{sumCars} K</Typography>}>
          <ListItemText primary="Ипотека"/>
        </ListItem>
      </List>
      <Stack direction="row">
        <Typography variant="overline">Доходы</Typography>
      </Stack>
      <List>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body1" sx={{ color: 'green' }}>{user.deposit * 0.005} K/мес</Typography>}>
          <ListItemText primary="Дивиденды" />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body1" sx={{ color: 'green' }}>{sumRent} K/мес</Typography>}>
          <ListItemText primary="Доход от аренды" />
        </ListItem>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body1" sx={{ color: 'green' }}>{user.salary} K</Typography>}>
          <ListItemText primary="Зарплата" />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body1" sx={{ color: 'green' }}>{sumBizProfit} K</Typography>}>
          <ListItemText primary="Доход от бизнеса" />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body1" sx={{ color: 'green' }}>{(user.deposit * 0.005) + sumRent + user.salary} K/мес</Typography>}>
          <ListItemText primary="Итого" />
        </ListItem>
      </List>
      <Stack direction="row">
        <Typography variant="overline">Расходы</Typography>
        <IconButton color="primary" sx={{marginLeft:'auto'}}>
          <InfoOutlinedIcon fontSize="inherit"/>
        </IconButton>
      </Stack>
      <List>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body1" sx={{ color: 'red' }}>{user.payment} K</Typography>}>
          <ListItemText primary="Платеж по кредиту" />
        </ListItem>
        <ListItem 
        disablePadding
        secondaryAction={
          <Typography variant="body1" sx={{ color: 'red' }}>{sumHouseExp} K</Typography>}>
          <ListItemText primary="Расходы на недвижимость" />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body1" sx={{ color: 'red' }}>{sumCarExp} K</Typography>}>
          <ListItemText primary="Расходы на транспорт" />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body1" sx={{ color: 'red' }}>{user.expenses} K</Typography>}>
          <ListItemText primary="Общие расходы" />
        </ListItem>
        <ListItem 
        disablePadding 
        secondaryAction={
          <Typography variant="body1" sx={{ color: 'red' }}>{user.children * 5} K</Typography>}>
          <ListItemText primary="Расходы на детей" />
        </ListItem>
      </List>
      
      <Toolbar/>
    </Container>
  )
}

export default Bank