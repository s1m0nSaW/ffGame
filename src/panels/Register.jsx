import { Button, Paper, Typography, Stack, CircularProgress } from '@mui/material'
import React from 'react'
import axios from '../axios.js'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from '@happysanta/router'
import { setUser } from '../redux/slices/userSlice.js';
import { PAGE_MAIN } from '../routers.js';
import Head from '../components/Head.jsx';
import bridge from '@vkontakte/vk-bridge';

function Register({ fetchedUser }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const profs = useSelector((state) => state.user.profs)
  const user = useSelector((state) => state.user.user)
  const [open, setOpen] = React.useState(false)
  const [profession, setProfession] = React.useState()
  const [timeLeft, setTimeLeft] = React.useState(0)
  const [isCounting, setIsCounting] = React.useState(true)
  const [params, setParams] = React.useState()


  React.useEffect(() => {
    const interval = setInterval(() => {

      isCounting && setTimeLeft((timeLeft) => (timeLeft >= 10 ? 10 : timeLeft + 1))

      if (timeLeft == 10 && isCounting) {
        result()
      }

    }, 200)
    return () => {
      clearInterval(interval)
    }
  }, [timeLeft, isCounting, user])

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

  const result = () => {
    const p = getRandomIntInclusive(0, profs.length - 1)
    setProfession(profs[p])
  }

  const sendToServer = async (data) => {
    const fields = {
      firstName: fetchedUser.first_name,
      photo100: fetchedUser.photo_100,
      userId: fetchedUser.id,
      profId: profession._id,
    }

    var url = new URLSearchParams(data);

    await axios.post(`/auth/register/${url}`, fields).then((data) => {
      dispatch(setUser(data.data.user));
    })

    setOpen(true)
  }

  const newGameServer = async (data) => {
    const fields = {
        profId: profession._id,
    }

    var url = new URLSearchParams(data);

    await axios.patch(`/auth/new/${url}`, fields).then((data) => {
      dispatch(setUser(data.data));
    });

    setOpen(true)
  }

  const getProf = async () => {

    setIsCounting(false)

    if (Object.keys(user).length == 0) {
      

      bridge.send('VKWebAppGetLaunchParams')
        .then((data) => {
          if (data.vk_app_id) {
            // Параметры запуска получены
            sendToServer(data)
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
        
    } else {
      bridge.send('VKWebAppGetLaunchParams')
        .then((data) => {
          if (data.vk_app_id) {
            // Параметры запуска получены
            newGameServer(data)
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
    }

  }

  return (
    <Paper sx={{ width: '100vw', height: '100%', minHeight: '100vh', borderRadius: 0 }}>
      <Head name={'Выбор профессии'} />
      <Stack
        sx={{ width: '100vw', height: '100vh' }}
        direction={'column'}
        alignItems='center'
        justifyContent='top'
        spacing={1}>
        <Typography variant='subtitle2' sx={{ width: '80vw', marginBottom: '20px', marginTop: "50px" }}>
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
          <Button disabled={!isCounting} onClick={() => getProf()}>Выбрать</Button></> :
          <CircularProgress />}
        {open && <>
          <Typography variant='caption'>Вы получили профессию <b>{profession.prof}</b></Typography>
          <Typography variant='caption'>Ваша зарплата <b>{profession.salary}</b> К, Вам <b>{profession.age / 12}</b>, количество детей: <b>{profession.childCount}</b>.</Typography>
          <Typography variant='caption'><b>Удачной игры!</b></Typography>
          <Button onClick={() => router.pushPage(PAGE_MAIN)}>Начать</Button>
        </>}
      </Stack>
    </Paper>
  )
}

export default Register

//Пассивным доходом в игре считаются дивидендные акции и бизнес под управлением менеджера.<br/><br/>