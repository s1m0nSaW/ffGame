import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, Stack, Toolbar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import HouseLot from '../../components/HouseLot';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

function HouseList() {
    const user = useSelector((state) => state.user.user)
	const houses = useSelector((state) => state.houses.houses)
    const c = new Set(user.house)
	const avHouses = houses.filter(({_id}) => !c.has(_id))
    const c2 = new Set(user.rent)
	const avHouses2 = avHouses.filter(({_id}) => !c2.has(_id))
    return (
        <>
        {avHouses2.length >= 1 ? <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        >
            {avHouses2.map((house, index) => (<HouseLot
            key={index}
            house={house}/>
            ))}
        </Grid> : <Stack direction="column"
        justifyContent="space-evenly"
        alignItems="center">
        <Toolbar/>
        <MapsHomeWorkIcon sx={{ fontSize: 40, color: grey[500] }} />
        <Typography  sx={{ color: grey[700] }} variant="subtitle1">Нет доступной недвижимости</Typography>
        <Typography  sx={{ color: grey[700] }} variant="caption">Вы скупили всё</Typography>
        </Stack>}</>
    )
}

export default HouseList