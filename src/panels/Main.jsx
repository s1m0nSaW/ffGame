import { IconButton, Toolbar, List, Container, Stack, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, LinearProgress, Modal, Box, Button, Paper } from '@mui/material'
import { grey } from '@mui/material/colors';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from '@happysanta/router'
import { setUser } from '../redux/slices/userSlice';
import axios from '../axios.js'
import { PAGE_PAUSE, PAGE_REGISTER, PAGE_MAIN } from '../routers';

import { Header } from '../components/Header.jsx';
import BottomNav from '../components/BottomNav';
import Biz from '../components/Biz.jsx';
import Work from '../components/Work.jsx';
import Rent from '../components/Rent.jsx';
import SavingsIcon from '@mui/icons-material/Savings';
import PaymentsIcon from '@mui/icons-material/Payments';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BusinessIcon from '@mui/icons-material/Business';
import { Panel } from '@vkontakte/vkui';

function Main({fetchedUser}) {
    const dispatch = useDispatch()
    const router = useRouter()
    
    const user = useSelector((state) => state.user.user)
    const bizs = useSelector((state) => state.bizs.bizs)
    const houses = useSelector((state) => state.houses.houses)
    const cars = useSelector((state) => state.cars.cars)

    const myHouses = houses.filter(({_id}) => user.house.includes(_id))
    const myCars = cars.filter(({_id}) => user.car.includes(_id))
    const myBizs = bizs.filter(({_id}) => user.bizs.includes(_id))
    const myRents = houses.filter(({_id}) => user.rent.includes(_id))
    const sumRent = myRents.map(item => item.rentPrice).reduce((prev, curr) => prev + curr, 0)

    const sumHouseExp = myHouses.map(item => item.expenses).reduce((prev, curr) => prev + curr, 0)
    const sumHouses = myHouses.map(item => item.price).reduce((prev, curr) => prev + curr, 0)
	const sumCarExp = myCars.map(item => item.expenses).reduce((prev, curr) => prev + curr, 0)
    const sumCars = myCars.map(item => item.price).reduce((prev, curr) => prev + curr, 0)
    const sumRentExp = myRents.map(item => item.expenses).reduce((prev, curr) => prev + curr, 0)
    const sumRents = myRents.map(item => item.price).reduce((prev, curr) => prev + curr, 0)
    const sumCreditsDebt = user.credits.map(item => item.debt).reduce((prev, curr) => prev + curr, 0)
    const sumCreditsPayments = user.credits.map(item => item.payment).reduce((prev, curr) => prev + curr, 0)

    const totalExp = (user.children * 5) + user.expenses + sumCarExp + sumHouseExp + sumRentExp

    const [ageTime, setAgeTime] = React.useState(0)
    const [isCounting, setIsCounting] = React.useState(true)
    const [timeLeft, setTimeLeft] = React.useState(0)
    const [remind, setRemind] = React.useState(false)
    const [bankrot, setBankrot] = React.useState(false)
    const [ageLimit, setAgeLimit] = React.useState(false)
    const [winning, setWinning] = React.useState(false)

    const bankrotListener = () => {
        if(user.balance < (user.debts+sumCreditsDebt) && user.credits.length >= 5 && myHouses.length <= 1 
        && myBizs.length <= 0 && myCars.length <= 0 && myRents.length <= 0){
            setBankrot(true)
        }
    }

    const ageLimitListener = () => {
        if(user.age >= 720) {
            setAgeLimit(true)
        }
    }

    const winningListener = () => {
        if((((user.deposit.amount * 0.13)/12) + sumRent) > (totalExp + sumCreditsPayments) * 2) {
            setWinning(true)
        }
    }

    const victory = ( age, prof, summ ) => {
        if(age < user.record.age){
            const newRecord = {
                prof: prof,
                age: age,
                cashflow: summ,
                bizCount: myBizs.length,
                deposit: user.deposit.amount,
                rentCount: myRents.length,
                houseSumm: sumHouses + sumRents,
                carSum: sumCars,
            }
            const fields = {
                ...user,
                record: newRecord,
            }
            dispatch(setUser(fields))
            save(fields)
            router.pushPage(PAGE_REGISTER)
        } else {
            router.pushPage(PAGE_REGISTER)
        }
        
    }

    const accruePayments = () => {

        const getNewCreditData = credits => {
            let content = [];
            for (let i = 0; i < credits.length; i++) {
                const credit = credits[i];
                if(credit.debt >= credit.amount){
                    content.push({
                        id: credit.id,
                        amount: credit.amount,
                        debt: credit.debt,
                        payment: credit.payment,
                    });
                } else 
                {content.push({
                    id: credit.id,
                    amount: credit.amount,
                    debt: credit.debt + credit.payment,
                    payment: credit.payment,
                });}
            }
            return content.sort((x, y) => x.id - y.id);
        };
        const newAge = user.age + 1
        const newDebts = user.debts + totalExp
        const fields = {
            ...user,
            credits: getNewCreditData(user.credits),
            debts: newDebts,
            age: newAge,
        }
        dispatch(setUser(fields))
        save(fields)
    }

    const takeDividends = () => {
        const newBalance = user.balance + Math.round(user.deposit.amount * 0.13)
        const newDeposit = {
            ...user.deposit,
            date: +new Date + 120000,
        }
        const fields = {
            ...user,
            balance: newBalance,
            deposit: newDeposit,
        }
        
        dispatch(setUser(fields))
        save(fields)
        
    }

    const save = async (data) => {
		await axios.patch(`/auth/${user._id}`, data)
    }

    React.useEffect(()=>{if(user.onGame == false) router.pushPage(PAGE_PAUSE)},[user])

    React.useEffect(() => {
        const ageInterval = setInterval(() => {
            bankrotListener()
            ageLimitListener()
            winningListener()

            user.onGame && setAgeTime((ageTime) => (ageTime >= 1198 ? 1198 : ageTime +1 ))
            if (ageTime == 1198 ) {
                if(user.debts >= 0){
                    setRemind(true)
                }
                setAgeTime(0)
            }
            if (ageTime == 100 || ageTime == 200 || ageTime == 300 || ageTime == 400 ||  
                ageTime == 500 ||  ageTime == 600 ||  ageTime == 700 ||  ageTime == 800 ||  
                ageTime == 900 ||  ageTime == 1000 ||  ageTime == 1100 ||  ageTime == 1197) {
                    accruePayments()
                }
            const date = +new Date
            
            
            if(user.deposit.date <= date){
                
                setIsCounting(false)
                setTimeLeft(100)
            }
            isCounting && setTimeLeft(Math.round(100-(((user.deposit.date - date)/10)/120)))
            if(user.deposit.date > date) {
                setIsCounting(true)
            }
        },100)

        return () => {
            clearInterval(ageInterval)
        }
    },[ageTime])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        bgcolor: 'white',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
    };

    const BizPlaceHolder = () => {
        return (
        <Stack direction="column"
            justifyContent="space-evenly"
            alignItems="center">
            <BusinessCenterIcon color="disabled" sx={{ fontSize: 40, marginTop: '15px' }} />
            <Typography variant="subtitle1">У Вас еще нет бизнеса</Typography>
            <Typography variant="caption">Купить бизнес можно во вкладке "Сделки"</Typography>
        </Stack>)
    }

    const InvestPlaceHolder = () => {
        return (
        <Stack direction="column"
            justifyContent="space-evenly"
            alignItems="center">
            <SavingsIcon color="disabled" sx={{ fontSize: 40, marginTop: '15px' }} />
            <Typography variant="subtitle1">У Вас еще нет вклада</Typography>
            <Typography variant="caption">Открыть вклад можно во вкладке "Банк"</Typography>
        </Stack>)
    }

    const RentPlaceHolder = () => {
        return (
        <Stack direction="column"
            justifyContent="space-evenly"
            alignItems="center">
            <BusinessIcon color="disabled" sx={{ fontSize: 40, marginTop: '15px' }} />
            <Typography variant="subtitle1">У Вас еще нет недвижимости в аренде</Typography>
            <Typography variant="caption">Сдать недвижимость в аренду можно во вкладке "Профиль"</Typography>
        </Stack>)
    }

    return (
        <Paper sx={{ width: '100vw', height: '100%', minHeight: '100vh', borderRadius:0 }}>
            <Container>
            <Header fetchedUser={fetchedUser}/>
            {user.onGame ? 
            <>
            {user.salary != 0 && <>
            <Stack direction="row"><Typography sx={{ marginTop: '10px'}} variant="subtitle1">Работа</Typography></Stack>
            <Work/></>}
            <List dense>
            {myBizs.length >= 1 ? <Typography variant="subtitle1">Бизнес</Typography>:<BizPlaceHolder/>}
            {myBizs.map((biz, index) => (<Biz
            key={index}
            biz={biz}/>
            ))}
            
            </List>
            <List dense>
            {user.deposit.amount != 0 ? 
                <><Typography variant="subtitle1">Вклад</Typography>
                <ListItem disablePadding
                secondaryAction={<Stack alignItems="flex-end">
                    <Typography variant="h6">{Math.round(user.deposit.amount * 0.13)} K</Typography>
                    <IconButton 
                        onClick={()=>takeDividends()} 
                        color="primary" 
                        disabled={isCounting} 
                        variant="contained" 
                        size="small"
                    ><PaymentsIcon/>
                    </IconButton></Stack>}>
                    <ListItemAvatar>
                    <Avatar>
                        <SavingsIcon/>
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<React.Fragment>Вклад: {user.deposit.amount}К<br/></React.Fragment>}
                        secondary={<LinearProgress sx={{ width: 1/2 }} variant="determinate" value={timeLeft} color="inherit"/>}
                    />
                </ListItem></> : <InvestPlaceHolder/>}
            </List>
            <List dense> 
                {myRents.length >= 1 ? <><Typography variant="subtitle1">Аренда</Typography></> : <RentPlaceHolder/>}
                {myRents.map((house) => (<Rent
                key={house._id}
                house={house}/>
                ))}
            </List>
            <Toolbar/></> : 
            <Stack
                
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Typography variant="subtitle1">Не в игре</Typography>
            </Stack>}
            <Modal
            open={remind}
            onClose={()=>setRemind(false)}
            >
                <Box sx={style}>
                <Typography>
                    Задолженность {user.debts} K
                </Typography><br/>
                <Typography variant='caption'>Необходимо погасить во вкладке "Банк"</Typography>
                </Box>
            </Modal>
            <Modal
            open={winning}
            onClose={()=>setWinning(false)}
            >
                <Box sx={style}>
                <Typography>
                    Поздравляем!  🥳
                </Typography><br/>
                <Typography variant='caption'>Вы достигли финансовой свободы в возрасте <b>{Math.trunc(user.age/12)}</b>, с начальной профессией <b>{user.prof}</b>, 
                с суммой пассивного дохода <b>{Math.round(((user.deposit.amount * 0.13)/12) + sumRent)}</b></Typography><br/><br/>
                <Button onClick={()=>victory(Math.trunc(user.age/12),user.prof,Math.round(((user.deposit.amount * 0.13)/12) + sumRent))}>Начать заново</Button>
                </Box>
            </Modal>
            <Modal
            open={bankrot}
            >
                <Box sx={style}>
                <Typography>
                    Игра закончена
                </Typography><br/>
                <Typography variant='caption'>Вы банкрот 😥</Typography><br/><br/>
                <Button onClick={()=>router.pushPage(PAGE_REGISTER)}>Начать заново</Button>
                </Box>
            </Modal>
            <Modal
            open={ageLimit}
            >
                <Box sx={style}>
                <Typography>
                    Игра закончена
                </Typography><br/>
                <Typography variant='caption'>Вы достигли предельного возраста 😥</Typography><br/><br/>
                <Button onClick={()=>router.pushPage(PAGE_REGISTER)}>Начать заново</Button>
                </Box>
            </Modal>
            <BottomNav value={PAGE_MAIN}/>
            </Container>
        </Paper>
    
    )
}

export default Main