import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

import { Avatar, Typography, LinearProgress, ListItem, ListItemAvatar, ListItemText, Divider, Stack, IconButton } from '@mui/material'

import BusinessIcon from '@mui/icons-material/Business';
import PaymentsIcon from '@mui/icons-material/Payments';

function Rent() {
    const [timeLeft, setTimeLeft] = React.useState(0)
    const [isCounting, setIsCounting] = React.useState(true)
    const value = timeLeft
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const houses = useSelector((state) => state.houses.houses)
    const myRents = houses.filter(({_id}) => user.rent.includes(_id))
    const sumRent = myRents.map(item => item.rentPrice).reduce((prev, curr) => prev + curr, 0)

    const result = () => {
        setIsCounting(true)
		const newBalance = user.balance + sumRent
		const fields = {
			...user,
			balance: newBalance,
		}
		dispatch(setUser(fields))
        setTimeLeft(0)
	}

    React.useEffect(() => {
        const interval = setInterval(() => {
            
            isCounting && setTimeLeft((timeLeft) => (timeLeft >= 100 ? 100 : timeLeft +1 ))
			
            if (timeLeft == 100) {
				setIsCounting(false)
			}
        },100)
        return () => {
            clearInterval(interval)
        }
    },[timeLeft])

    return (
        <>
        <ListItem disablePadding
          secondaryAction={<Stack alignItems="flex-end">
            <Typography variant="h6">{sumRent} K</Typography>
            <IconButton 
                        onClick={()=>result()} 
                        color="primary" 
                        disabled={isCounting} 
                        variant="contained" 
                        size="small"
                    ><PaymentsIcon/>
                    </IconButton>
            </Stack>}>
            <ListItemAvatar>
            <Avatar>
                <BusinessIcon color="action"/>
            </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={<Typography variant="body2">Недвижимость в аренде</Typography>}
                secondary={<LinearProgress sx={{ width: 1/2 }} variant="determinate" value={value} color="inherit"/>}
            />
        </ListItem>
        
        <Divider variant="inset" component="li" /><br/></>
    )
    }

export default Rent