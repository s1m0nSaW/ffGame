import { ListItem, Grid, Typography, ListItemAvatar, Avatar, ListItemText,
    LinearProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Divider, Skeleton } from '@mui/material'
import { deepOrange, deepPurple } from '@mui/material/colors';

import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import axios from '../axios.js'

import RestaurantIcon from '@mui/icons-material/Restaurant';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

function BizLot({biz}) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
	const bizs = useSelector((state) => state.bizs.bizs)
    const myBiz = bizs.filter(({_id}) => user.bizs.includes(_id))
    const bizTime = myBiz.map(item => item.requiredTime).reduce((prev, curr) => prev + curr, 0)
    
    const [ open, setOpen ] = React.useState(false)
    const [ color, setColor ] = React.useState("inherit")
    const [ disabled, setDisabled ] = React.useState(true)
    const [ workTime, setWorkTime ] = React.useState(8);
    
    const Restaurant = () => {
        return(
            <RestaurantIcon color={"warning"}/>
        )
    }

    const Market = () => {
        return(
            <StorefrontIcon color={"success"}/>
        )
    }

    const Service = () => {
        return(
            <HomeRepairServiceIcon color={"secondary"}/>
        )
    }

    const SkeletonIcon = () => {
        return(
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
        )
    }

    const [ bizIcon, setBizIcon ] = React.useState(SkeletonIcon)

    React.useEffect(()=>{
        if(biz.bizType == "Услуги") {
            setColor("secondary")
            setBizIcon(Service)
        } else
        if(biz.bizType == "Общепит") {
            setColor("warning")
            setBizIcon(Restaurant)
        } else
        if(biz.bizType == "Торговля") {
            setColor("success")
            setBizIcon(Market)
        }
        if(user.prof == ''){setWorkTime(0)}

        const freeTime = 14 - (bizTime + workTime)
        if(user.balance > biz.bizPrice){ 
            if(freeTime > biz.requiredTime){
                setDisabled(false)
            }
        }
    },[biz.bizType, user])

    const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)}

    const buyBiz = ( id, price ) => {
        const newBalance = user.balance - price
		const myBizs = [...user.bizs,id]
		const fields = {
			...user,
			balance: newBalance,
			bizs: myBizs,
		}
		
		dispatch(setUser(fields))
		save(fields)
    }

    return (
        <>
        <ListItem disablePadding
            disabled={disabled}
            onClick={()=>setOpen(true)}
            secondaryAction={<React.Fragment>
                <Typography variant="body2">Цена:</Typography><br/>
                <Typography variant="subtitle2">{biz.bizPrice} K</Typography>
            </React.Fragment>}
        >
            <ListItemAvatar>
                {bizIcon}
            </ListItemAvatar>
            <ListItemText
                primary={biz.bizName}
                secondary={<React.Fragment>
                    <Typography variant="caption">Макс. прибыль: <b>{biz.maxProfit} K</b></Typography><br/>
                    <Typography variant="caption">Расход времени: <b>{biz.requiredTime}ч.</b></Typography>
                    </React.Fragment>}
            />
        </ListItem>
        
        
        <Divider variant="inset" component="li" /><br/>
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}
            fullWidth
        >
            <DialogTitle>
            {biz.bizName}
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                Вид бизнеса: <b>{biz.bizType}</b><br/>
                Расход энергии: <b>{biz.requiredEnergy}</b><br/>
                Расход времени: <b>{biz.requiredTime}ч.</b><br/>
                Максимальная прибыль: <b>{biz.maxProfit} K</b><br/>
                Минимальная прибыль: <b>{biz.minProfit} K</b><br/>
                Риск: <b>{biz.risk}</b><br/>
                Сумма продажи: <b>{biz.sellPrice} K</b><br/>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button disabled={disabled} onClick={()=>{
                buyBiz(biz._id,biz.bizPrice); 
                setOpen(false)
                }}>
                Купить
            </Button>
            <Button onClick={()=>setOpen(false)}>
                Отмена
            </Button>
            </DialogActions>
        </Dialog></>
    )
}

export default BizLot