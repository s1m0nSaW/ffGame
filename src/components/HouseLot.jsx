import { Button, Card, CardMedia, CardContent, CardActions, Grid, Typography, Stack } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import axios from '../axios.js'

function HouseLot({house, isMy, isRent}) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const houses = useSelector((state) => state.houses.houses)
    const myHouses = houses.filter(({_id}) => user.house.includes(_id))
    const rentHouses = houses.filter(({_id}) => user.rent.includes(_id))
    const [ disabled, setDisabled ] = React.useState(true)

    React.useEffect(()=>{
        if(isMy){
            if(isRent){
                setDisabled(false)
            } else {
                if(myHouses.length > 1) setDisabled(false)
                if(myHouses.length <= 1) setDisabled(true)
            }
        } else {
            if(user.balance > house.price) setDisabled(false)
        }
    },[myHouses])

    const buyHouse = () => {
        const newBalance = user.balance - house.price
		const myHouse = [...user.house,house._id]
        const myEnergy = user.maxEnergy + house.energy
		const fields = {
			...user,
			balance: newBalance,
			house: myHouse,
            maxEnergy: myEnergy,
		}
		dispatch(setUser(fields))
		save(fields)
    }

    const sellHouse = () => {
		const newBalance = user.balance + house.price
        if(!isRent){
            const myHouse = myHouses.filter((house) => house._id !== isMy)
            const myEnergy = user.maxEnergy - house.energy
            const fields = {
                ...user,
                balance: newBalance,
                house: myHouse.map(item => item._id),
                maxEnergy: myEnergy,
            }
            dispatch(setUser(fields))
            save(fields)
        } else {
            const myHouse = rentHouses.filter((house) => house._id !== isMy)
            const myEnergy = user.maxEnergy - house.energy
            const fields = {
                ...user,
                balance: newBalance,
                rent: myHouse.map(item => item._id),
                maxEnergy: myEnergy,
            }
            dispatch(setUser(fields))
            save(fields)
        }
	}

    const rentHouse = () => {
		const myHouse = myHouses.filter((house) => house._id !== isMy)
        const myEnergy = user.maxEnergy - house.energy
        const rentHouse = [...user.rent,house._id]
		const fields = {
			...user,
			house: myHouse.map(item => item._id),
            maxEnergy: myEnergy,
            rent: rentHouse,
		}
		dispatch(setUser(fields))
		save(fields)
	}
    
    const derentHouse = () => {
        const myHouses = [...user.house, house._id]
        const myEnergy = user.maxEnergy + house.energy
        const rentHouse = rentHouses.filter((h) => h._id !== house._id)
		const fields = {
			...user,
			house: myHouses,
            maxEnergy: myEnergy,
            rent: rentHouse.map(item => item._id),
		}
		dispatch(setUser(fields))
		save(fields)
	}

    const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)
    }

    return (
        <Grid item>
        <Card variant="outlined">
        <CardMedia
            component="img"
            height="140"
            image={`http://localhost:4444${house.imageUrl}`}
        />
        <CardContent>
            {isMy ? <Stack direction="row"><Typography gutterBottom variant="subtitle2">{house.name}</Typography>
            {isRent && <Typography variant="subtitle2" sx={{marginLeft:'auto'}}>в аренде</Typography>}</Stack> : <Typography gutterBottom variant="h6">
            Цена: {house.price} K
            </Typography>}
            {isMy ? <Typography gutterBottom variant="body2">Цена: {house.price} K</Typography> : <Typography gutterBottom variant="subtitle2">{house.name}</Typography>}
            <Typography variant="caption">
                Энергия: <b>+{house.energy}</b><br/>
                Затраты в месяц: <b>{house.expenses} К</b><br/>
                Сдача в аренду: <b>{house.rentPrice} К/мес</b>
            </Typography>
        </CardContent>
        <CardActions>
        {isMy ? <><Button disabled={disabled} size="small" onClick={()=>sellHouse()}>Продать</Button>
        {isRent ? <Button disabled={disabled} size="small" onClick={()=>derentHouse()}>Убрать с аренды</Button> : 
        <Button disabled={disabled} size="small" onClick={()=>rentHouse()}>Сдать в аренду</Button>}</>:
            <Button disabled={disabled} size="small" onClick={()=>buyHouse()}>Купить</Button>}
        </CardActions>
        </Card></Grid>
  )
}

export default HouseLot