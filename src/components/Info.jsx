import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import axios from '../axios.js'

import { Button, Typography, Card, CardContent, Stack, Chip } from '@mui/material';

import BoltIcon from '@mui/icons-material/Bolt';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';

import { pink } from '@mui/material/colors';

function Info() {
    const dispatch = useDispatch()
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
    <Stack direction="row" justifyContent="space-around" alignItems="center">
        <Card>
        <CardContent>
            <Stack direction="column" alignItems="center">
                <QueryBuilderOutlinedIcon fontSize="small"/>
                <Typography variant="h6">{user.time - bizTime - workTime}/{user.time}</Typography>
                <Typography variant="caption">Время</Typography>
            </Stack>
        </CardContent>
        </Card>
        <Card sx={{ bgcolor: pink[500] }} >
        <CardContent>
            <Stack direction="column" alignItems="center">
                <BoltIcon fontSize="small"/>
                <Typography variant="h6">{user.energy}/{user.maxEnergy}</Typography>
                <Typography variant="caption">Энергия</Typography>
                <Chip disabled={disabled} onClick={()=>handleEnergyClick()} label={user.energizer} variant="outlined" color="primary" size="small" icon={<BatteryChargingFullOutlinedIcon />} sx={{marginTop:"5px"}}/>
            </Stack>
        </CardContent>
        </Card>
        <Card>
        <CardContent>
            <Stack direction="column" alignItems="center">
                <HourglassEmptyIcon fontSize="small"/>
                <Typography variant="h6">{user.age}/60</Typography>
                <Typography variant="caption">Возраст</Typography>
            </Stack>
        </CardContent>
        </Card>
    </Stack> 
    )
}

export default Info