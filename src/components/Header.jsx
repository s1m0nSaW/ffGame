
import { AppBar, Avatar, Container, ListItemText, Skeleton, Toolbar, Typography, Stack, Chip, Snackbar, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import axios from '../axios.js';
import { PAGE_INTRO } from '../routers';
import { useRouter } from '@happysanta/router';

import BoltIcon from '@mui/icons-material/Bolt';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const Header = ({fetchedUser}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [energyColor, setEnergyColor] = React.useState("default")
  const [timeLeft, setTimeLeft] = React.useState(0)
  const [enerTime, setEnerTime] = React.useState(0)
  const user = useSelector((state) => state.user.user)
  const bizs = useSelector((state) => state.bizs.bizs)
  const myBizs = bizs.filter(({_id}) => user.bizs.includes(_id))
  const bizTime = myBizs.map(item => item.requiredTime).reduce((prev, curr) => prev + curr, 0)

  React.useEffect( () => {
    if(user.energizer > 0){
      if(user.energy < user.maxEnergy){
        setEnergyColor("primary")
      } else setEnergyColor("default")
    } else setEnergyColor("default")

    const interval = setInterval(() => {
      !user.freeEnergizer && setTimeLeft((timeLeft) => (timeLeft >= 100 ? 100 : timeLeft +1 ))
      const date = +new Date
      if(date > user.freeEnergizer){
        const fields = {
          ...user,
          freeEnergizerOn: true,
        }
        dispatch(setUser(fields))
        save(fields)
      }
      setEnerTime(user.freeEnergizer - date)
      
      if (timeLeft == 100) {
        setTimeLeft(0)
      }
    },100)
    return () => {
        clearInterval(interval)
    }
  },[user, setTimeLeft])
  
  const handlePlusEnergy = () => {
    if(user.energizer > 0){
      if(user.energy < user.maxEnergy){
        const newEnergizer = user.energizer - 1
        const newEnergy = user.maxEnergy
        const fields = {
          ...user,
          energizer: newEnergizer,
          energy: newEnergy,
        }
        dispatch(setUser(fields))
        save(fields)
      }
    }
  }

  const handleFreeEnergy = () => {
    const date = +new Date
    const newEnergizer = user.energizer + user.freeEnergizerCount
		const fields = {
			...user,
			energizer: newEnergizer,
      freeEnergizer: date + 86400000,
      freeEnergizerOn: false,
      disabled:[], 
		}
		dispatch(setUser(fields))
		save(fields)
  }

  const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)}

  const textInfo = (
    <Stack direction="column">
      <Typography></Typography><br/>
      <Stack direction="row" spacing={1}>
        <BoltIcon />
        <Typography>Энергия - расходуется каждый раз когда фиксируется прибыль от бизнеса. 
          Купив недвижимость, не сдавая её в аренду, можно увеличить максимальное количество энергии.<br/><br/>
          Пополнить энергию можно с помощью энергетика.
        </Typography>
      </Stack><br/>
      <Stack direction="row" spacing={1}>
        <BatteryChargingFullOutlinedIcon />
        <Typography>Энергетик пополняет энергию на 5 пунктов. Каждые 24 часа предлагается 10 бесплатных энергетиков, 
          их колисество можно увеличить до 50, выполнив некоторые условия в настройках.
        </Typography>
      </Stack><br/>
      <Stack direction="row" spacing={1}>
        <QueryBuilderOutlinedIcon />
        <Typography> Время необходимо для покупки бизнеса. Общее количество времени 10 ч. Увеличить его можно купив транспорт.
        </Typography>
      </Stack><br/>
      <Stack direction="row" spacing={1}>
        <HourglassEmptyIcon />
        <Typography>Возраст игрока на данный момент, по достижении 60 лет игра заканчивается.
        </Typography>
      </Stack>
    </Stack>
  )

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=>setOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function parseMillisecondsIntoReadableTime(milliseconds){
    //Get hours from milliseconds
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
  
    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
  
    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
  
  
    return h + ':' + m + ':' + s;
  }


  return (
      <AppBar component="nav" color="inherit" sx={{padding:'10px', borderRadius:'10px', top: 10, marginBottom: '10px'}} position='sticky'>
        {fetchedUser ?
        <Toolbar disableGutters>
          <Stack direction="column" sx={{ width: '100%' }} >
          <Stack direction="row" spacing={1}>
          <Stack>
            <Avatar onClick={()=>{router.pushPage(PAGE_INTRO)}} src={fetchedUser.photo_200}/>
          </Stack>
          <Stack direction="column">
            <Typography variant='caption' >{fetchedUser.first_name} {fetchedUser.last_name}</Typography>
            <Typography>Баланс: {user.balance} K</Typography>
          </Stack>
          </Stack>
          <Stack 
            sx={{ marginTop: '15px'}}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}>
              <Chip 
                label={<Typography variant='caption'><b>{user.energy}/{user.maxEnergy}</b></Typography>} 
                deleteIcon={<AddCircleIcon sx={{ color: 'black' }}/>} 
                onDelete={handlePlusEnergy} 
                icon={<BoltIcon/>} 
                size="small"
                color={energyColor}
              />
              <Chip 
                label={<Typography variant='caption'><b>{user.energizer}</b></Typography>} 
                icon={<BatteryChargingFullOutlinedIcon sx={{ color: 'black' }}/>} 
                size="small"
                color="secondary" 
              />
              <Chip 
                label={<Typography variant='caption'><b>{user.time - (bizTime + user.workTime)}/{user.time}</b></Typography>} 
                icon={<QueryBuilderOutlinedIcon sx={{ color: 'black' }}/>} 
                size="small" 
                color="success" 
              />
              <Chip 
                label={<Typography variant='caption'><b>{Math.trunc(user.age/12)}/60</b></Typography>} 
                icon={<HourglassEmptyIcon/>} 
                size="small" 
                color="warning" 
              />
            </Stack>
            <Stack 
              direction="row"
              sx={{ marginTop: '15px'}}>
                {user.freeEnergizerOn ? <Chip label={<b>Энергетики +{user.freeEnergizerCount}</b>} onClick={()=>handleFreeEnergy()} color="primary" icon={<BatteryChargingFullOutlinedIcon />} size="small" />:
                <Chip label={`Бесплатные через ${parseMillisecondsIntoReadableTime(enerTime)}`} icon={<BatteryChargingFullOutlinedIcon />} size="small" />}
              </Stack>
            </Stack>
        </Toolbar> : 
        <Toolbar> 
          <Skeleton variant="circular" width={40} height={40} animation="wave" /> 
          <Container>
          <ListItemText 
              primary={<Skeleton/>} 
              secondary={<Skeleton/>}/>
          </Container>
        </Toolbar>}
        <div>
          <Snackbar
            open={open}
            onClose={()=>setOpen(false)}
            message={textInfo}
            action={action}
          />
        </div>
      </AppBar>
    
  )
}
