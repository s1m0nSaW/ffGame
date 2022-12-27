import React from 'react'
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import CarLot from '../../components/CarLot';

function CarList() {
    const user = useSelector((state) => state.user.user)
	const cars = useSelector((state) => state.cars.cars)
    const c = new Set(user.car)
	const avCars = cars.filter(({_id}) => !c.has(_id))
    return (
        <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        >
            {avCars.map((car, index) => (
            <CarLot key={index} car={car}/>
            ))}
        </Grid>
    )
}

export default CarList