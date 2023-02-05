import { Toolbar, Typography, Button, Stack, Container, List, CircularProgress } from '@mui/material'
import React from 'react'
import PeopleIcon from '@mui/icons-material/People';

import { useDispatch, useSelector } from 'react-redux'
import Friend from '../../components/Friend';

function Friends() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const friends = useSelector((state) => state.user.friends)
    const users = useSelector((state) => state.user.users)
    const usersIds = friends.map(u=>u.id )
	const ids = usersIds.map(string => String(string))
	const myFriends = users.filter(({userId}) => ids.includes(userId))

    const hiInFriends = myFriends.filter(({userId}) => user.greetingIn.includes(userId))
    const hiOutFriends = myFriends.filter(({userId}) => user.greetingOut.includes(userId))
    const disableds = myFriends.filter(({userId}) => user.disabled.includes(userId))
    const noHiFriends1 = myFriends.filter(({userId}) => !user.greetingIn.includes(userId))
    const noHiFriends2 = noHiFriends1.filter(({userId}) => !user.greetingOut.includes(userId))
    const noHiFriends = noHiFriends2.filter(({userId}) => !user.disabled.includes(userId))

    return (
        <Container disableGutters>
        {friends.length == 0 ? 
        <Stack direction="column"
        sx={{ width: '100%', height: '60vh' }}
        alignItems="center"
        justifyContent="center"
        spacing={1}>
            <PeopleIcon color="disabled" sx={{ fontSize: 40 }} />
            <CircularProgress color="secondary" />
        </Stack> : <>
        {myFriends.length == 0 ? 
            <Stack 
            sx={{ width: '100%', height: '60vh' }}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}>
                <PeopleIcon color="disabled" sx={{ fontSize: 40 }} />
                <Typography variant="subtitle1">У Вас ещё нет друзей в игре</Typography>
                <Typography sx={{ padding:'20px' }} variant="caption">На этой вкладке будет список Ваших друзей, которые играют в эту игру. 
                Вы их можете поприветствовать, за каждого кто ответит, получите 5 энергетиков дополнительно.</Typography>
            </Stack> :
            <List dense>
                {hiInFriends.map((friend) => (<Friend
                key={friend.userId}
                friend={friend}
                invisible={false}
                disabled={false}/>
                ))}
                {noHiFriends.map((friend) => (<Friend
                key={friend.userId}
                friend={friend}
                invisible={true}
                disabled={false}/>
                ))}
                {hiOutFriends.map((friend) => (<Friend
                key={friend.userId}
                friend={friend}
                invisible={true}
                disabled={true}/>
                ))}
                {disableds.map((friend) => (<Friend
                key={friend.userId}
                friend={friend}
                invisible={true}
                disabled={true}/>
                ))}
            </List>
        }
        </>
        }
        <Toolbar/>
        </Container>
    )
}

export default Friends