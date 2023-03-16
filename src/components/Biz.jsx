import { ListItem, Stack, Typography, ListItemAvatar, Avatar, ListItemText,
    LinearProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Button, Divider, Skeleton } from '@mui/material'
import { green, pink } from '@mui/material/colors';

import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import axios from '../axios.js'

import PaymentsIcon from '@mui/icons-material/Payments';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import EngineeringIcon from '@mui/icons-material/Engineering';

function Biz({ biz }) {

    const [ color, setColor ] = React.useState("inherit")
    const Restaurant = () => {
        return(
            <RestaurantIcon color={"warning"} onClick={()=>setOpen(true)}/>
        )
    }

    const Market = () => {
        return(
            <StorefrontIcon color={"success"} onClick={()=>setOpen(true)}/>
        )
    }

    const Service = () => {
        return(
            <HomeRepairServiceIcon color={"secondary"} onClick={()=>setOpen(true)}/>
        )
    }

    const Production = () => {
        return(
            <EngineeringIcon onClick={()=>setOpen(true)} />
        )
    }

    const SkeletonIcon = () => {
        return(
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
        )
    }

    const [ profitColor, setProfitColor ] = React.useState(green[300])
    const [ open, setOpen ] = React.useState(false)
    const [ profit, setProfit ] = React.useState(((biz.maxProfit - biz.minProfit)/2)+biz.minProfit)
    const [timeLeft, setTimeLeft] = React.useState(0)
    const value = timeLeft * 10
    const [ isCounting, setIsCounting ] = React.useState(true)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const expenditure = useSelector((state) => state.user.expenditure)
	const bizs = useSelector((state) => state.bizs.bizs)
    const myBizs = bizs.filter(({_id}) => user.bizs.includes(_id))
    const bizTime = myBizs.map(item => item.requiredTime).reduce((prev, curr) => prev + curr, 0)
    
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
        }else
        if(biz.bizType == "Производство") {
            setBizIcon(Production)
        }
    },[biz.bizType])

    const getRandomIntInclusive = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
	  }

    const result = () => {
		setIsCounting(false)
		const p = getRandomIntInclusive( biz.minProfit, biz.maxProfit)
        if( p > 0 ) {setProfitColor(green[700])} else {setProfitColor(pink[500])}
		setProfit(p)
	}

    React.useEffect(()=>{

    },[user])

    const handleStart = (price,requiredEnergy) => {
        setIsCounting(true)
        if (timeLeft == 10)setTimeLeft(0)
        const newBalance = user.balance + price
        const newEnergy = user.energy - expenditure
        const newRecord = {
            ...user.record,
            carSum: user.record.carSum + price,
        }
        const fields = {
			...user,
			balance: newBalance,
            energy: newEnergy,
            record: newRecord,
		}
		dispatch(setUser(fields))
    }

    const sellBiz = ( id, price) => {
		const newBalance = user.balance + price
		const myNewBizs = myBizs.filter((biz) => biz._id !== id)
		const fields = {
			...user,
			balance: newBalance,
			bizs: myNewBizs.map(item => item._id)
		}
		dispatch(setUser(fields))
	}

    const pause = () => {
        const date = +new Date
        const fields = {
            ...user,
            onGame: false,
            datePoint: date + 300000
        }
        dispatch(setUser(fields))
    }

    const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            
            if(!biz.requiredTime <= (user.time - (bizTime + user.workTime))||user.prof == 'Средний бизнес'||user.prof == 'Крупный бизнес'){
                isCounting && setTimeLeft((timeLeft) => (timeLeft >= 10 ? 10 : timeLeft +1 ))
            }
			
            if (timeLeft == 10) {
                if(user.energy <= 0){
                    pause()
                } else {
                    result()
                }
			}
        },500)
        return () => {
            clearInterval(interval)
        }
    },[isCounting, timeLeft, biz])

    return (
        <>
        <ListItem disablePadding
            secondaryAction={<Stack alignItems="flex-end">
                <Typography variant="h6" sx={{ color: profitColor }}>{Math.trunc(profit)} K</Typography>
                <IconButton 
                    onClick={()=>handleStart(Math.trunc(profit),biz.requiredEnergy)} 
                    color="primary" 
                    disabled={isCounting} 
                    variant="contained" 
                    size="small"
                ><PaymentsIcon/></IconButton></Stack>}
        >
            <ListItemAvatar>
                <Avatar>
                {bizIcon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={<React.Fragment>{biz.bizName}<br/><Typography variant="caption">Макс. прибыль: {biz.maxProfit} K</Typography></React.Fragment>}
                secondary={<LinearProgress sx={{ width: 1/2 }} variant="determinate" value={value} color={color}/>}
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
                Расход времени: <b>{biz.requiredTime}ч.</b><br/>
                Максимальная прибыль: <b>{biz.maxProfit} K</b><br/>
                Минимальная прибыль: <b>{biz.minProfit} K</b><br/>
                Сумма продажи: <b>{biz.sellPrice} K</b><br/>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{
                sellBiz(biz._id,biz.sellPrice); 
                setOpen(false)
                }}>
                Продать
            </Button>
            <Button onClick={()=>setOpen(false)}>
                Отмена
            </Button>
            </DialogActions>
        </Dialog></>
    )
    }

export default Biz