import { IconButton, Grid, Toolbar, List, Container, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

import Biz from '../components/Biz.jsx';
import Work from '../components/Work.jsx';
import Info from '../components/Info.jsx';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Main() {
    const dispatch = useDispatch()
    
    const user = useSelector((state) => state.user.user)
    const bizs = useSelector((state) => state.bizs.bizs)
    
    const myBizs = bizs.filter(({_id}) => user.bizs.includes(_id))

    const [ ageTime, setAgeTime ] = React.useState(0)

    const agePlus = () => {
        const newAge = user.age + 1
        const fields = {
            ...user,
            age: newAge,
        }
        dispatch(setUser(fields))
    }

    React.useEffect(() => {
        const ageInterval = setInterval(() => {
            setAgeTime((ageTime) => (ageTime >= 119 ? 119 : ageTime +1 ))
            if (ageTime == 119 ) {
                agePlus()
                setAgeTime(0)
            }
        },1000)

        return () => {
            clearInterval(ageInterval)
        }
    },[ageTime])

    return (
        <Container disableGutters>
            <List dense>
            {user.prof && <>
            <Stack direction="row"><Typography variant="overline">Работа</Typography></Stack>
            <Work/>
            <Divider variant="inset" component="li" /><br/></>}
            {myBizs && <Typography variant="overline">Бизнесы</Typography>}
            {myBizs.map((biz, index) => (<Biz
            key={index}
            biz={biz}/>
            ))}
                
            </List>
            <Toolbar/>
        </Container >
    )
}

export default Main