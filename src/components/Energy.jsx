import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import axios from '../axios.js'

import { Button, Typography, Grid, LinearProgress, Card, CardContent, CardActions, Collapse, IconButton, Stack } from '@mui/material';

import BoltIcon from '@mui/icons-material/Bolt';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import BatterySaverOutlinedIcon from '@mui/icons-material/BatterySaverOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';

function Energy() {
    const dispatch = useDispatch()
    const [ expanded, setExpanded ] = React.useState(false);
    const [ workTime, setWorkTime ] = React.useState(8);
    const [ disabled, setDisabled ] = React.useState(true)
    
    const bizs = useSelector((state) => state.bizs.bizs)
    const user = useSelector((state) => state.user.user)

    const myBizs = bizs.filter(({_id}) => user.bizs.includes(_id))
    const bizTime = myBizs.map(item => item.requiredTime).reduce((prev, curr) => prev + curr, 0)

    
    React.useEffect(()=>{
        if(user.prof == ''){setWorkTime(0)}
        if(user.energizer > 0) {
            if(user.maxEnergy > user.energy) {
                setDisabled(false)
            } else setDisabled(true)
        }
        if(user.maxEnergy <= user.energy) {
            setDisabled(true)
        } 
    },[user])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleEnergyClick = () => {
        let newEnergy = user.energy + 10
        if(newEnergy > user.maxEnergy) newEnergy = user.maxEnergy
        const newEnergizer = user.energizer - 1
        const fields = {
			...user,
			energy: newEnergy,
            energizer: newEnergizer,
		}
		dispatch(setUser(fields))
        save(fields)
    }

    const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)}

    const enValue = (user.energy * 100) / user.maxEnergy
    

    return (
        <Card sx={{ margin:'10px'}}>
            <CardContent><Grid container>
                <BoltIcon fontSize="small" />
                <Typography>Энергия: {user.energy}/{user.maxEnergy}</Typography></Grid>
                <LinearProgress variant="determinate" value={enValue} />
            </CardContent>
            <CardContent>
                <Grid container>
                <BatteryChargingFullOutlinedIcon fontSize="small" />
                <Typography variant="body2">Энергетик: {user.energizer}</Typography></Grid>
            </CardContent>
            <CardActions>
                <Stack spacing={1} direction="row">
                    <Button disabled={disabled} size="small" variant="outlined" startIcon={<BatteryChargingFullOutlinedIcon />} onClick={()=>handleEnergyClick()}>
                        Применить
                    </Button>
                    <Button size="small" variant="outlined" startIcon={<BatterySaverOutlinedIcon />}>
                        Добавить
                    </Button>
                </Stack>
                <IconButton onClick={handleExpandClick} sx={{marginLeft:'auto', transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)'}}>
                <ExpandMoreIcon/>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography variant="subtitle2" paragraph>Время</Typography>
                <Typography variant="body2">
                    Общее количество времени: <b>{user.time}ч</b><br/>
                    Время на бизнес: <b>{bizTime}ч.</b><br/>
                </Typography>
                    {user.prof && <Typography variant="body2"> Время на работу: <b>{workTime}ч</b></Typography>}
                
                <Typography variant="body2">
                    Свободное время: <b>{user.time - bizTime - workTime}ч.</b><br/>
                </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default Energy