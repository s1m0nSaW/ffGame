import React from 'react'
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import HouseLot from '../../components/HouseLot';

function HouseList() {
    const user = useSelector((state) => state.user.user)
	const houses = useSelector((state) => state.houses.houses)
    const c = new Set(user.house)
	const avHouses = houses.filter(({_id}) => !c.has(_id))
    const c2 = new Set(user.rent)
	const avHouses2 = avHouses.filter(({_id}) => !c2.has(_id))
    return (
        <Grid
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
        </Grid>
    )
}

export default HouseList