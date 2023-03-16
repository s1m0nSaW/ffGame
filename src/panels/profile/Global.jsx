import { Toolbar, Container, List, ListItem, Typography, ListItemAvatar, ListItemText, Avatar, Button } from '@mui/material'
import React from 'react'

import { useSelector } from 'react-redux'

function Global() {
    const users = useSelector((state) => state.user.users)
    const rateUsers = [...users]

    function byField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }
    const sorted = rateUsers.sort(byField('lifesCount')).reverse()

    return (
        <Container disableGutters>
            <List dense>
                {sorted.map((user) => (<ListItem
                    key={user.userId}
                    disablePadding
                    secondaryAction={
                        <Typography variant='subtitle1'>{user.lifesCount} K/год</Typography>}>
                    <ListItemAvatar>
                        <Avatar src={user.photo100} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Typography variant="subtitle1">{user.firstName}</Typography>}
                        secondary={
                            <Typography variant='caption'>Рекорд:</Typography>
                        }
                    />
                </ListItem>
                ))}
            </List>
            <Toolbar />
        </Container>
    )
}

export default Global