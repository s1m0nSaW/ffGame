import { Toolbar, Box, Tab, Tabs, Typography, CircularProgress, Button, Stack, Container } from '@mui/material'
import { grey } from '@mui/material/colors';
import React from 'react'
import bridge from '@vkontakte/vk-bridge';
import PeopleIcon from '@mui/icons-material/People';

import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from '../../redux/slices/userSlice'

function Friends() {
    const dispatch = useDispatch()

    const friends = useSelector((state) => state.user.friends)
    const users = useSelector((state) => state.user.users)
    const usersIds = users.map(u=>u.userId )
	const ids = usersIds.map(string => parseInt(string))
	const myFriends = friends.filter(({id}) => ids.includes(id))

    async function fetchFriends() {
        const response = await bridge.send('VKWebAppGetAuthToken', { 
            app_id: 51483243, 
            scope: 'friends'
            })
            

        const data = await bridge.send('VKWebAppCallAPIMethod', {
            method: 'friends.get',
            params: {
                order: "hints",
                fields: 'photo_100',
                v: '5.131',
                access_token: response.access_token
            }})

            dispatch(setFriends(data.response.items))
    }
    
    return (
        <Container>
        {friends.length == 0 ? 
        <Stack direction="column"
        alignItems="center"
        spacing={1}>
            <Toolbar/>
            <Toolbar/>
            <PeopleIcon sx={{ fontSize: 40, color: grey[500] }} />
            <Button onClick={()=>fetchFriends()}>Посмотреть друзей</Button>
        </Stack> : <>
        {myFriends.length == 0 ? 
            <Stack direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}>
                <Toolbar/>
                <Toolbar/>
                <PeopleIcon sx={{ fontSize: 40, color: grey[500] }} />
                <Typography sx={{ color: grey[700] }} variant="subtitle1">У Вас ещё нет друзей в игре</Typography>
                <Typography sx={{ color: grey[700], padding:'20px' }} variant="caption">На этой вкладке будет список Ваших друзей, которые играют в эту игру. 
                Вы их можете поприветствовать, за каждого кто ответит, получите 5 энергетиков дополнительно.</Typography>
            </Stack> :
            <Box sx={{ display: 'flex' }}>
            <Typography>Друзья получены</Typography>
        </Box>}
        </>
        }
        <Toolbar/>
        </Container>
    )
}

export default Friends