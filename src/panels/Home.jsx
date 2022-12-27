import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, Toolbar, Typography, Stack, Avatar } from '@mui/material';
import HouseLot from '../components/HouseLot';
import CarLot from '../components/CarLot';

import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';

function Home() {
    const user = useSelector((state) => state.user.user)
    const cars = useSelector((state) => state.cars.cars)
    const houses = useSelector((state) => state.houses.houses)
    const myHouses = houses.filter(({_id}) => user.house.includes(_id))
    const myRents = houses.filter(({_id}) => user.rent.includes(_id))
    const myCars = cars.filter(({_id}) => user.car.includes(_id))
    return (
        <>
        <Typography variant="overline">
            Недвижимость
        </Typography>
        <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        sx={{marginBottom:'10px'}}
        >
            {myHouses.map((house, index) => (<HouseLot
            key={index}
            house={house}
            isMy={house._id}/>
            ))}
        </Grid>
        {myRents.length > 0 && <Typography variant="overline">
            Недвижимость в аренде
        </Typography>}
        <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        sx={{marginBottom:'10px'}}
        > 
            {myRents.map((house, index) => (<HouseLot
            key={house._id}
            house={house}
            isMy={house._id}
            isRent={true}/>
            ))}
        </Grid>
        {myCars.length > 0 && <Typography variant="overline">
            Транспорт
        </Typography>}
        <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        sx={{marginBottom:'10px'}}
        > 
            {myCars.map((car, index) => (
            <CarLot key={car._id} car={car} isMy={car._id}/>
            ))}
        </Grid>
        <Toolbar/>
        </>
    )
}

export default Home