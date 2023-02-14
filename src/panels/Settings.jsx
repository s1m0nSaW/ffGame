import { Paper, Typography, Stack, ToggleButton, ToggleButtonGroup, Button, Checkbox, Link } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import bridge from '@vkontakte/vk-bridge'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, setUser } from '../redux/slices/userSlice'
import { useRouter } from '@happysanta/router'
import axios from '../axios.js'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto'
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh'

function Settings({fetchedUser}) {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const [value, setValue] = React.useState('auto')
  const [checkPost, setCheckPost] = React.useState(false)
  const [checkGroup, setCheckGroup] = React.useState(false)
  const [checkMessages, setCheckMessages] = React.useState(false)

  const handleTheme = (event, newTheme) => {
    if (newTheme !== null) {
      setValue(newTheme);
      dispatch(setTheme(newTheme))
    }
  };

  async function joinGroup() {
    bridge.send('VKWebAppJoinGroup', {
      group_id: 218628265
      })
      .then((data) => { 
        if (data.result) {
          // Пользователь подписался на сообщество
          setCheckGroup(true)
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  }

  async function messagesFromGroup() {
    bridge.send('VKWebAppAllowMessagesFromGroup', {
      group_id: 218628265,
      })
      .then((data) => { 
        if (data.result) {
          // Пользователь разрешил отправку сообщений от имени сообщества
          setCheckMessages(true)
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  }

  async function recommend() {
    bridge.send('VKWebAppShowWallPostBox', {
      message: 'Попробуй себя в роли среднестатистического жителя России, который решил добиться финансовой свободы',
      attachments: 'https://vk.com/app51483243'
      })
      .then((data) => { 
        if (data.post_id) {
          // Запись размещена
          setCheckPost(true)
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  }

  const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)
  }

  React.useEffect(() => {
    if (user.promoter == true) {
      setCheckPost(true)
      setCheckGroup(true)
      setCheckMessages(true)
    } else if (checkGroup == true && checkPost == true && checkMessages == true) {
      const fields = {
        ...user,
        freeEnergizerCount: 10,
        promoter: true,
      }
      dispatch(setUser(fields))
      save(fields)
    }
  }, [checkPost, checkGroup, checkMessages, user])

  return (
    <Paper sx={{ width: '100vw', height: '100%', minHeight: '100vh', borderRadius: 0 }}>
      <Stack
        sx={{ width: '100vw', height: '100vh' }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <ToggleButtonGroup sx={{ marginBottom: "20px"}}
          value={value}
          exclusive
          onChange={handleTheme}
          aria-label="theme"
        >
          <ToggleButton value="auto" aria-label="left aligned">
            <BrightnessAutoIcon />
          </ToggleButton>
          <ToggleButton value="light" aria-label="centered">
            <BrightnessHighIcon />
          </ToggleButton>
          <ToggleButton value="dark" aria-label="right aligned">
            <DarkModeIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        {user && <Box sx={{ width: '80vw' }}>
          <Typography variant='caption'>Выполни задания и каждый день количество бесплатных энергетиков увеличится до 10 </Typography>
          <Stack sx={{ marginTop: "15px"}} direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant='caption'>Подписаться на сообщество</Typography>
            {checkGroup?<Checkbox disabled checked />:<Button onClick={()=>joinGroup()}>Подписаться</Button>}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant='caption'>Подпишись на уведомления</Typography>
            {checkMessages?<Checkbox disabled checked />:<Button onClick={()=>messagesFromGroup()}>Подписаться</Button>}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant='caption'>Поделись на стене</Typography>
            {checkPost?<Checkbox disabled checked />:<Button onClick={()=>recommend()}>Поделиться</Button>}
          </Stack>
          <Stack sx={{ marginTop: "15px"}} direction="row" justifyContent="center" alignItems="center">
            <Button onClick={()=>router.popPage()}>Назад</Button>
          </Stack>
        </Box>}
      </Stack>
    </Paper>
  )
}

export default Settings