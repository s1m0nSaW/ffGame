import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

import { Avatar, Typography, Dialog, DialogContent, DialogContentText, DialogActions, Button, LinearProgress, ListItem, ListItemAvatar, DialogTitle, ListItemText } from '@mui/material'

import EngineeringIcon from '@mui/icons-material/Engineering';

function Work() {
    const user = useSelector((state) => state.user.user)
    const cars = useSelector((state) => state.cars.cars)
	const houses = useSelector((state) => state.houses.houses)
	const bizs = useSelector((state) => state.bizs.bizs)
	
    const myBizs = bizs.filter(({_id}) => user.bizs.includes(_id))
	const sumBizs = myBizs.map(item => item.sellPrice).reduce((prev, curr) => prev + curr, 0)
	const myHouses = houses.filter(({_id}) => user.house.includes(_id))
	const myCars = cars.filter(({_id}) => user.car.includes(_id))
    const sumHouseExp = myHouses.map(item => item.expenses).reduce((prev, curr) => prev + curr, 0)
	const sumCarExp = myCars.map(item => item.expenses).reduce((prev, curr) => prev + curr, 0)
    const totalExp = sumHouseExp + sumCarExp + user.expenses
    
    const [ ageTime, setAgeTime ] = React.useState(0)
    const [ open, setOpen ] = React.useState(false)

	const dispatch = useDispatch()
    
	const agePlus = () => {
        const newBalance = user.balance + user.salary - totalExp
        const fields = {
			...user,
			balance: newBalance,
		}
		dispatch(setUser(fields))
    }

    const quit = () => {
        const fields = {
			...user,
			prof: '',
		}
		dispatch(setUser(fields))
    }

    React.useEffect(() => {
        const ageInterval = setInterval(() => {
            setAgeTime((ageTime) => (ageTime >= 100 ? 100 : ageTime +1 ))
            if (ageTime == 100 ) {
                agePlus()
				setAgeTime(0)
            }
        },100)
        return () => {
            clearInterval(ageInterval)
        }
    },[ageTime])

    return (
        <>
        <ListItem disablePadding
          secondaryAction={<Typography variant="h6">{user.salary - totalExp} K</Typography>}>
            <ListItemAvatar onClick={()=>setOpen(true)}>
            <Avatar sx={{ bgcolor: "white" }}>
                <EngineeringIcon color="action"/>
            </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={<React.Fragment>Зарплата: {user.salary} K<br/>
                    <Typography variant="caption" color={'error'}>Расходы: -{totalExp} K</Typography>
                    </React.Fragment>}
                secondary={<LinearProgress sx={{ width: 1/2 }} variant="determinate" value={ageTime} color="inherit"/>}
            />
        </ListItem>
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}
            fullWidth
        >
            <DialogTitle>
            Работа
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                Профессия: <b>{user.prof}</b><br/>
                Расход времени: <b>8ч.</b><br/>
                Расходы на дом: <b>{sumHouseExp} K</b><br/>
                Расходы на транспорт: <b>{sumCarExp} K</b><br/>
                Общие расходы: <b>{user.expenses} K</b><br/>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{ 
                quit()
                setOpen(false)
                }}>
                Уволиться
            </Button>
            <Button onClick={()=>setOpen(false)}>
                Отмена
            </Button>
            </DialogActions>
        </Dialog></>
    )
}

export default Work