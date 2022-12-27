import { Button, Card, CardMedia, CardContent, CardActions, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import axios from '../axios.js'

function CarLot({car,isMy}) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const cars = useSelector((state) => state.cars.cars)
    const myCars = cars.filter(({_id}) => user.car.includes(_id))
    const [ disabled, setDisabled ] = React.useState(true)

    React.useEffect(()=>{
        if(user.balance > car.price) setDisabled(false)
    },[user.balance])

    const buyCar = () => {
        const newBalance = user.balance - car.price
		const myCars = [...user.car,car._id]
        const myEnergy = user.maxEnergy + car.energy
        const myTime = user.time + car.time
		const fields = {
			...user,
			balance: newBalance,
			car: myCars,
            energy: myEnergy,
            time: myTime,
		}
		dispatch(setUser(fields))
		save(fields)
    }

    const sellCar = () => {
		const newBalance = user.balance + car.sellPrice
		const myCars1 = myCars.filter((car) => car._id !== isMy)
        const myEnergy = user.maxEnergy - car.energy
        const myTime = user.time - car.time
		const fields = {
			...user,
			balance: newBalance,
			car: myCars1.map(item => item._id),
            energy: myEnergy,
            time: myTime,
		}
		dispatch(setUser(fields))
		save(fields)
	}

    const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)
    }

    return (
        <Grid item>
        <Card>
        <CardMedia
            component="img"
            height="140"
            image={`http://localhost:4444${car.imageUrl}`}
        />
        <CardContent>
            {isMy ? <Typography gutterBottom variant="subtitle2">{car.name}</Typography> : <Typography gutterBottom variant="h6">
            Цена: {car.price} K
            </Typography>}
            {isMy ? <Typography gutterBottom variant="body2"> Цена: {car.price} K</Typography> : <Typography gutterBottom variant="subtitle2">{car.name}</Typography>}
            <Typography variant="caption" color="text.secondary">
                Плюс к времени:<b>{car.time}ч</b><br/>
                Плюс к энергии: <b>{car.energy}Ккал</b><br/>
                Затраты в месяц: <b>{car.expenses} К</b><br/>
                Цена продажи: <b>{car.sellPrice} К</b><br/>
            </Typography>
        </CardContent>
        <CardActions>
            {isMy ? <Button size="small" onClick={()=>sellCar()}>Продать</Button>:
            <Button disabled={disabled} size="small" onClick={()=>buyCar()}>Купить</Button>}
        </CardActions>
        </Card></Grid>
  )
}

export default CarLot