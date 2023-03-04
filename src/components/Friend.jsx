import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import axios from '../axios.js'

import { Avatar, Badge, Typography, ListItem, ListItemAvatar, ListItemText, Divider, IconButton, Stack, Collapse, List } from '@mui/material'

import PanToolIcon from '@mui/icons-material/PanTool';

function Friend({friend, invisible, disabled }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const [open, setOpen] = React.useState(false);

    const sendHi = (_id, userId) => {
        if(invisible == false){     //ответ
            const fields = {
                ...user,
                greetingIn: user.greetingIn.filter((id) => id !== userId),
                disabled: [...user.disabled, userId],
                energizer: user.energizer + 1,
            }
            dispatch(setUser(fields))
            save(fields)
            const friendFields = {
                ...friend,
                greetingOut: friend.greetingOut.filter((id) => id !== user.userId),
                disabled: [...friend.disabled, user.userId],
                energizer: friend.energizer + 1,
            }
            saveForFriend(_id,friendFields)
        } else {            //инициация
            const fields = {
                ...user,
                greetingOut: [...user.greetingOut, userId],
            }
            dispatch(setUser(fields))
            save(fields)
            const friendFields = {
                ...friend,
                greetingIn: [...friend.greetingIn, user.userId],
            }
            saveForFriend(_id,friendFields)
        }
    }

    const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)
    }

    const saveForFriend = async ( _id, data ) => {
		await axios.patch(`/auth/${_id}`, data)
    }

    return (
        <>
        <ListItem 
        disablePadding
        secondaryAction={
            <IconButton 
                onClick={()=>sendHi(friend._id,friend.userId)} 
                color="primary" 
                variant="contained" 
                size="small"
                disabled={disabled}
            ><Badge color="secondary" variant="dot" invisible={invisible}>
                <PanToolIcon/></Badge>
            </IconButton>}>
            <ListItemAvatar onClick={()=>setOpen(!open)}>
                <Avatar src={friend.photo100}/>
            </ListItemAvatar>
            <ListItemText
                primary={<Typography variant="subtitle1">{friend.firstName}</Typography>}
                secondary={
                        <Typography variant='caption'>Рекорд: {friend.record.cashflow} K</Typography>
                    }
            />
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div">
            <ListItem>
                <Stack direction={'column'} sx={{ width:'100%'}}>
                    <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
                        <Typography variant='caption'>Деятельность:</Typography>
                        <Typography variant='caption'><b> {friend.record.prof}</b></Typography>
                    </Stack> 
                    <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
                        <Typography variant='caption'>Пассивный доход:</Typography>
                        <Typography variant='caption'><b> {friend.record.cashflow} К</b></Typography>
                    </Stack>
                    <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
                        <Typography variant='caption'>Количество предприятий:</Typography>
                        <Typography variant='caption'><b> {friend.record.bizCount}</b></Typography>
                    </Stack>
                    <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
                        <Typography variant='caption'>Сумма вложений:</Typography>
                        <Typography variant='caption'><b> {friend.record.deposit} К</b></Typography>
                    </Stack>
                    <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
                        <Typography variant='caption'>Недвижимость в аренде:</Typography>
                        <Typography variant='caption'><b> {friend.record.rentCount}</b></Typography>
                    </Stack>
                    <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
                        <Typography variant='caption'>Стоимость недвижимости:</Typography>
                        <Typography variant='caption'><b> {friend.record.houseSumm} К</b></Typography>
                    </Stack>
                    <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
                        <Typography variant='caption'>Стоимость транспорта:</Typography>
                        <Typography variant='caption'><b> {friend.record.carSum} К</b></Typography>
                    </Stack>
                </Stack>
            </ListItem>
            </List>
        </Collapse>
        
        <Divider variant="inset" component="li" /><br/></>
    )
    }

export default Friend