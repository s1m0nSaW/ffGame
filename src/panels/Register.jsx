import { Button, Paper, Typography, Stack, CircularProgress } from '@mui/material'
import React from 'react'
import axios from '../axios.js'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from '@happysanta/router'
import { setUser } from '../redux/slices/userSlice.js';
import { PAGE_MAIN } from '../routers.js';

function Register({ fetchedUser }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const profs = useSelector((state) => state.user.profs)
  const user = useSelector((state) => state.user.user)
  const [ open, setOpen ] = React.useState(false)
  const [ profession, setProfession] = React.useState()
  const [ timeLeft, setTimeLeft ] = React.useState(0)
  const [ isCounting, setIsCounting ] = React.useState(true)

  const handleClose = () => {
    setOpen(false);
    router.pushPage(PAGE_MAIN)
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
      const record = {
        age: 60,
        prof: profession.profName,
        cashflow: 0,
        bizCount: 0,
        deposit: 0,
        rentCount: 0,
        houseSumm: 0,
        carSum: 0,
      }
      const fields = {
        
        firstName : fetchedUser.first_name,
        photo100: fetchedUser.photo_100,
        prof: profession.profName,
        workTime: 8,
        salary: profession.salary,
        userId: fetchedUser.id,
        balance: 500,
        debts: 0,
        age: profession.age,
        children: profession.childCount,
        house: profession.house,
        car: profession.car,
        rent: [],
        bizs: [],
        deposit: deposit,
        credits: [],
        record: record,
        expenses: profession.expenses,
        freeEnergizerCount: 2,
        onGame: true,
        time: 10,
        energy: 100,
        maxEnergy: 100,
        energizer: 0,
        freeEnergizerOn: true,
        greetingIn: [],
        greetingOut: [],
        disabled: [],
        promoter: false,
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
        photo100: user.photo100,
        prof: profession.profName,
        workTime: 8,
        salary: profession.salary,
        userId: user.userId,
        balance: 500,
        debts: 0,
        age: profession.age,
        children: profession.childCount,
        house: profession.house,
        car: profession.car,
        rent: [],
        bizs: [],
        deposit: deposit,
        credits: [],
        record: user.record,
        expenses: profession.expenses,
        datePoint: user.datePoint,
        freeEnergizer: user.freeEnergizer,
        freeEnergizerCount: user.freeEnergizerCount,
        onGame: true,
        time: 10,
        energy: 100,
        maxEnergy: 100,
        energizer: 0,
        freeEnergizerOn: true,
        lifesCount: user.lifesCount + 1,
        greetingIn: [],
        greetingOut: [],
        disabled: [],
        promoter: user.promoter,
      }

      dispatch(setUser(fields));
      await axios.patch(`/auth/${user._id}`, fields)
      setOpen(true)
    }
    
  }

  return (
    <Paper sx={{ width: '100vw', height: '100%', minHeight: '100vh', borderRadius:0 }}>
      
      <Stack 
      sx={{ width: '100vw', height: '100vh' }}
      direction={'column'}
      alignItems='center'
      justifyContent='top'
      spacing={1}>
        <Typography variant='subtitle2' sx={{ width: '80vw', marginBottom:'20px', marginTop: "50px"}}>
          КВАДРАНТ ДЕНЕЖНОГО ПОТОКА – это простой и надежный инструмент, позволяющий распределять людей по группам в соответствии с источником происхождения их денег.<br /><br />
          E (Employee) - Наёмный сотрудник.<br />
          S (Self-Employed) - Работа на себя.<br />
          B (Business Owner) - Владелец бизнеса.<br />
          I (Investor) - Инвестор.<br /><br />
          ЦЕЛЬ ИГРЫ: стать владельцем бизнеса или инвестором.
        </Typography>
        {profession ? <><Typography variant='subtitle1'>Профессия:</Typography>
        <Typography variant='h6'>{profession.profName}</Typography>
        <Typography variant='caption'>Для начала игры необходимо выбрать профессию</Typography>
        <Button disabled={!isCounting} onClick={()=>getProf()}>Выбрать</Button></> : 
        <CircularProgress/>}
        {open && <>
        <Typography variant='caption'>Вы получили профессию <b>{user.prof}</b></Typography>
        <Typography variant='caption'>Ваша зарплата <b>{user.salary}</b> К, Вам <b>{user.age/12}</b>, количество детей: <b>{user.children}</b>.</Typography>
        <Typography variant='caption'><b>Удачной игры!</b></Typography>
        <Button onClick={()=>router.pushPage(PAGE_MAIN)}>Начать</Button>
        </>}
      </Stack>
    </Paper>
  )
}

export default Register

//Пассивным доходом в игре считаются дивидендные акции и бизнес под управлением менеджера.<br/><br/>