import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

import { Avatar, Typography, LinearProgress, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material'

import BusinessIcon from '@mui/icons-material/Business';

function Rent({house}) {
    const [timeLeft, setTimeLeft] = React.useState(0)
    const value = timeLeft
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)

    const result = () => {
		const newBalance = user.balance + house.rentPrice
		const fields = {
			...user,
			balance: newBalance,
		}
		dispatch(setUser(fields))
        setTimeLeft(0)
	}

    React.useEffect(() => {
        const interval = setInterval(() => {
            
            setTimeLeft((timeLeft) => (timeLeft >= 100 ? 100 : timeLeft +1 ))
			
            if (timeLeft == 100) {
				result()
			}
        },100)
        return () => {
            clearInterval(interval)
        }
    },[timeLeft])

    return (
        <>
        <ListItem disablePadding
          secondaryAction={<Typography variant="h6">{house.rentPrice} K</Typography>}>
            <ListItemAvatar>
            <Avatar>
                <BusinessIcon color="action"/>
            </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={<Typography variant="body2">{house.name}</Typography>}
                secondary={<LinearProgress sx={{ width: 1/2 }} variant="determinate" value={value} color="inherit"/>}
            />
        </ListItem>
        
        <Divider variant="inset" component="li" /><br/></>
    )
    }

export default Rent