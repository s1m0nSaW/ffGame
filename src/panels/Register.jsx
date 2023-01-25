import { Button, Card, CardActions, CardContent, Typography, Backdrop, 
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Container, Toolbar, Stack, CircularProgress } from '@mui/material'
import React from 'react'
import axios from '../axios.js'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setUser } from '../redux/slices/userSlice.js';

function Register({ fetchedUser }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profs = useSelector((state) => state.user.profs)
  const user = useSelector((state) => state.user.user)
  const [ open, setOpen ] = React.useState(false)
  const [ profession, setProfession] = React.useState()
  const [ timeLeft, setTimeLeft ] = React.useState(0)
  const [ isCounting, setIsCounting ] = React.useState(true)

  const handleClose = () => {
    setOpen(false);
    navigate('/main/main')
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
        
      isCounting && setTimeLeft((timeLeft) => (timeLeft >= 10 ? 10 : timeLeft +1 ))
  
      if (timeLeft == 10 && isCounting) {
        result()    
      }

    },200)
    return () => {
        clearInterval(interval)
    }
  },[timeLeft, isCounting, user])

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

  const result = () => {
		const p = getRandomIntInclusive( 0, profs.length-1)
    setProfession(profs[p])
	}

  const getProf = async () => {

    setIsCounting(false)

    if (Object.keys(user).length == 0){
      const deposit = {
        amount: 0,
        date: +new Date,
      }
      const fields = {
        
        firstName : fetchedUser.first_name,
        prof: profession.profName,
        workTime: 8,
        salary: profession.salary,
        userId: fetchedUser.id,
        balance: 100,
        debts: 0,
        age: profession.age,
        children: profession.childCount,
        house: profession.house,
        car: profession.car,
        rent: [],
        bizs: [],
        deposit: deposit,
        credits: [],
        records: [],
        expenses: profession.expenses,
        onGame: true,
        time: 10,
        energy: 100,
        maxEnergy: 100,
        energizer: 0,
        freeEnergizerOn: true,
      }

      console.log(fields)
      await axios.post(`/auth/register`, fields).then((data)=>{
        dispatch(setUser(data.data.user));
      });
      setOpen(true)

    } else {
      const deposit = {
        amount: 0,
        date: +new Date,
      }
      const fields = {
        _id: user._id,
        firstName : user.firstName,
        prof: profession.profName,
        workTime: 8,
        salary: profession.salary,
        userId: user.userId,
        balance: 100,
        debts: 0,
        age: profession.age,
        children: profession.childCount,
        house: profession.house,
        car: profession.car,
        rent: [],
        bizs: [],
        deposit: deposit,
        credits: [],
        records: user.records,
        expenses: profession.expenses,
        datePoint: user.datePoint,
        freeEnergizer: user.freeEnergizer,
        onGame: true,
        time: 10,
        energy: 100,
        maxEnergy: 100,
        energizer: 0,
        freeEnergizerOn: true,
        lifesCount: user.lifesCount + 1,
      }

      dispatch(setUser(fields));
      await axios.patch(`/auth/${user._id}`, fields)
      setOpen(true)
    }
    
  }

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
        {profession ? <><Typography variant='subtitle1'>Профессия:</Typography>
        <Typography variant='h6'>{profession.profName}</Typography>
        <Typography variant='caption'>Для начала игры необходимо выбрать профессию</Typography>
        <Button disabled={!isCounting} onClick={()=>getProf()}>Выбрать</Button></> : 
        <CircularProgress/>}
        {open && <>
        <Typography variant='caption'>Вы получили профессию <b>{user.prof}</b></Typography>
        <Typography variant='caption'>Ваша зарплата <b>{user.salary}</b> К, Вам <b>{user.age/12}</b>, количество детей: <b>{user.children}</b>.</Typography>
        <Typography variant='caption'><b>Удачной игры!</b></Typography>
        <Button onClick={()=>navigate('/main/main')}>Начать</Button>
        </>}
      </Stack>
    </Container>
  )
}

export default Register

//Пассивным доходом в игре считаются дивидендные акции и бизнес под управлением менеджера.<br/><br/>