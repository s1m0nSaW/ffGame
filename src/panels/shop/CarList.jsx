import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, Stack, Toolbar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import CarLot from '../../components/CarLot';
import CarCrashIcon from '@mui/icons-material/CarCrash';

function CarList() {
    const user = useSelector((state) => state.user.user)
	const cars = useSelector((state) => state.cars.cars)
    const c = new Set(user.car)
	const avCars = cars.filter(({_id}) => !c.has(_id))
    return (
        <>
        {avCars.length >= 1 ? <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        >
            {avCars.map((car, index) => (
            <CarLot key={index} car={car}/>
            ))}
        </Grid> : <Stack direction="column"
        justifyContent="space-evenly"
        alignItems="center">
        <Toolbar/>
        <CarCrashIcon sx={{ fontSize: 40, color: grey[500] }} />
        <Typography  sx={{ color: grey[700] }} variant="subtitle1">Нет доступного транспорта</Typography>
        <Typography  sx={{ color: grey[700] }} variant="caption">Вы скупили всё</Typography>
        </Stack> }
        </>
    )
}

export default CarList