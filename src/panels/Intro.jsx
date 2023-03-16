import { Button, Paper, Stack, CircularProgress, Box, MobileStepper, Typography, } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { Panel } from '@vkontakte/vkui'
import bridge from '@vkontakte/vk-bridge';
import React from 'react'
import { useDispatch } from 'react-redux'
import axios from '../axios.js'
import { setUser } from '../redux/slices/userSlice.js'
import { useRouter } from '@happysanta/router'
import { PAGE_MAIN, PAGE_REGISTER, PAGE_TRAINING, PAGE_SETTINGS } from '../routers.js'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const steps = [
  {
    label: <CurrencyExchangeIcon color="disabled" sx={{ fontSize: 50, marginBottom: '40px' }}/>,
    description: <Typography>Есть четыре типа тюдей:<br/><br/>  
    E - Наёмные работники<br/> 
    S - те кто работает на себя<br/> 
    B - владельцы крупного бизнеса<br/> 
    I - инвесторы, деньги работают на них<br/> </Typography>,
  },
  {
    label: <AccessibilityNewIcon color="disabled" sx={{ fontSize: 50, marginBottom: '40px' }}/>,
    description:
      <Typography>В этой игре можно пройти весь путь - от наёмного работника до инвестора</Typography>,
  },
  {
    label: <AutoGraphIcon color="disabled" sx={{ fontSize: 50, marginBottom: '40px' }}/>,
    description: <Typography>Это симулятор жизни, который учит людей зарабатывать на инвестициях и улучшать свое финансовое положение.</Typography>,
  },
];


function Intro({ fetchedUser }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [firstTime, setFirstTime] = React.useState()
  const [playerChecked, setPlayerChecked] = React.useState(false)
  const [disabled, setDisabled] = React.useState(true)
  const [firstParams, setFirstParams] = React.useState()

  const getParams = () => {
    bridge.send('VKWebAppGetLaunchParams')
      .then((data) => {
        if (data.vk_app_id) {
          // Параметры запуска получены
          setFirstParams(data)
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  }

  const getPlayer = async () => {
    var url = new URLSearchParams(firstParams);

    await axios.get(`/auth/me/${url}`
    ).then(({ data }) => {
      dispatch(setUser(data))
      setPlayerChecked(true)
      setDisabled(false)
      setFirstTime('not')
    }).catch(() => {
      console.log('user not found')
      setFirstTime('yes')
      setPlayerChecked(true)
    })
  }

  if (fetchedUser) {
    if(!playerChecked){
      getParams()
      if(firstParams){getPlayer()}
    }
  }

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Panel centered>
      <Paper sx={{ width: '100vw', height: '100%', minHeight: '100vh', borderRadius: 0 }}>
        <Stack
          sx={{ width: '100vw', height: '100vh' }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          {!firstTime ? <CircularProgress /> : <>{firstTime == 'yes' && <><Box sx={{ width: '80%', p: 2 }}>
            <Box sx={{ width: '100%'}}>
              <Stack
                justifyContent="center"
                alignItems="center"
              >
                {steps[activeStep].label}
              </Stack>
              {steps[activeStep].description}
            </Box>
            <MobileStepper
              sx={{ marginTop: '25px'}}
              variant="dots"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  
                </Button>
              }
            />
            </Box>
            <Button onClick={() => setFirstTime('not')}>Начать</Button></>
          }
            {firstTime == 'not' && <>
              <Button disabled={disabled} onClick={() => router.pushPage(PAGE_MAIN)}>Играть</Button>
              <Button onClick={() => router.pushPage(PAGE_REGISTER)}>Новая игра</Button>
              <Button onClick={() => router.pushPage(PAGE_TRAINING)}>Обучение</Button>
              <Button onClick={() => router.pushPage(PAGE_SETTINGS)}>Настройки</Button></>}</>}
        </Stack>
      </Paper>
    </Panel>
  )
}

export default Intro