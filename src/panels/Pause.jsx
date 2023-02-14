import { Button, Paper, CssBaseline, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from '@happysanta/router'
import axios from '../axios.js'
import { setUser } from '../redux/slices/userSlice.js'
import PauseIcon from '@mui/icons-material/Pause'
import { PAGE_MAIN } from '../routers.js'
import bridge from "@vkontakte/vk-bridge"
import { Panel } from '@vkontakte/vkui'

function Pause() {
    const [disabled, setDisabled] = React.useState(true)
    const [pauseTime, setPauseTime] = React.useState('')
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector((state) => state.user.user)

    const checkAd = () => {
		bridge.send('VKWebAppCheckNativeAds', { ad_format: 'reward' })
  			.then((data) => {
        		if (data.result) {
					setDisabled(false)
        		} else {
            		console.log('Рекламные материалы не найдены.');
        		}
			})
			.catch((error) => { console.log(error); /* Ошибка */  });
	}

    checkAd()

    const showAd = () => {
        bridge.send('VKWebAppShowNativeAds', { ad_format: 'reward' })
            .then((data) => {
                if (data.result) // Успех
                {
                    play()
                }
                else // Ошибка 
                    console.log('Ошибка при показе');
            })
            .catch((error) => { console.log(error); })
	}

    const play = () => {
        const fields = {
            ...user,
            onGame: true,
            energy: user.maxEnergy,
        }
        dispatch(setUser(fields))
        save(fields)
        router.pushPage(PAGE_MAIN)
    }

    const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)
    }

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

    React.useEffect(()=>{
        const interval = setInterval(()=>{
            const t = +new Date();
            setPauseTime(user.datePoint - t)
            if(user.datePoint < t){
				play()
            }
        }, 1000)
		return () => {
            clearInterval(interval)
			}
    },[setPauseTime, user]) 

    return (
        <Paper sx={{ width: '100vw', height: '100%', minHeight: '100vh', borderRadius:0 }}>
            <Stack
            sx={{ width: '100vw', height: '100vh' }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            >
                <PauseIcon color="disabled"  sx={{ fontSize: 40}} />
                <Typography variant='h6'>ПАУЗА</Typography>
                <Typography variant='caption'>Необходима для восстановления энергии</Typography>
                <Typography variant='caption'>Можно продолжить через:</Typography>
                <Typography variant='h6'>{parseMillisecondsIntoReadableTime(pauseTime)}</Typography>
                <Typography variant='caption'>Можно пропустить посмотрев рекламный ролик</Typography>
                <Button disabled={disabled} onClick={()=>showAd()}>Смотреть рекламу</Button>
            </Stack>
        </Paper>
    )
}

export default Pause