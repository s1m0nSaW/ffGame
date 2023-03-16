import React from 'react'
import { useRouter } from '@happysanta/router'
import { useSelector } from 'react-redux';
import { Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeIcon from '@mui/icons-material/Home';
import { PAGE_INTRO } from '../routers';
import axios from '../axios';

function Head({ name }) {
  const router = useRouter()

  const user = useSelector((state) => state.user.user)
  const save = async (data) => {
    await axios.patch(`/auth/${user._id}`, data)
  }

  const handleBack = () => {
    router.popPage()
    save(user)
  }

  const handleMain = () => {
    router.pushPage(PAGE_INTRO)
    save(user)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleBack}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMain}
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
          {name}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Head