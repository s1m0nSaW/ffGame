
import { AppBar, Avatar, Container, ListItemText, Skeleton, Toolbar, Typography, Stack, Chip, Snackbar, Button, IconButton } from '@mui/material'
import { purple } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react'
import { useSelector } from 'react-redux';

import BoltIcon from '@mui/icons-material/Bolt';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const Header = ({fetchedUser}) => {
  const user = useSelector((state) => state.user.user)
  const [ workTime, setWorkTime ] = React.useState(8);
  const bizs = useSelector((state) => state.bizs.bizs)
  const myBizs = bizs.filter(({_id}) => user.bizs.includes(_id))
  const bizTime = myBizs.map(item => item.requiredTime).reduce((prev, curr) => prev + curr, 0)

  const handlePlusEnergy = () => {
    console.log("plus energizer")
  }

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const textLorem = (
    <Typography>"Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Similique unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus 
    quibusdam, aliquam dolore excepturi quae. Distinctio enim at eligendi 
    perferendis in cum quibusdam sed quae, accusantium et aperiam? Quod itaque 
    exercitationem, at ab sequi qui modi delectus quia corrupti alias distinctio 
    nostrum. Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. 
    Sed numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis asperiores, 
    exercitationem eius nostrum consequuntur iure aliquam itaque, assumenda et! 
    Quibusdam temporibus beatae doloremque voluptatum"</Typography>
  )

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
      <AppBar component="nav" color="inherit" sx={{padding:'10px', borderRadius:'10px'}} position='sticky'>
        {fetchedUser ?
        <Toolbar disableGutters>
          <Stack direction="column">
          <Stack direction="row" spacing={1}>
          <Stack>
            <Avatar src={fetchedUser.photo_200}/>
          </Stack>
          <Stack direction="column">
            <Typography variant='caption' >{fetchedUser.first_name} {fetchedUser.last_name}</Typography>
            <Typography>Баланс: {user.balance} K</Typography>
          </Stack>
          </Stack>
          <Stack 
            sx={{ marginTop: '15px'}}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}>
                <Chip label={user.energizer} color="primary" deleteIcon={<AddCircleIcon />} onDelete={handlePlusEnergy} icon={<BatteryChargingFullOutlinedIcon />} size="small" />
                <Chip label={`${user.energy}/${user.maxEnergy}`} icon={<BoltIcon />} size="small" />
                <Chip label={`${user.time - bizTime - workTime}/${user.time}`} variant={'outlined'} sx={{ bgcolor: purple[100] }} icon={<QueryBuilderOutlinedIcon />} size="small" />
                <Chip label={`${user.age}/60`} variant={'outlined'} sx={{ bgcolor: 'blue' }} icon={<HourglassEmptyIcon />} size="small" />
                <IconButton onClick={()=>handleClick()} color="primary" size="small">
                  <InfoOutlinedIcon fontSize="small"/>
                </IconButton>
            </Stack>
            </Stack>
        </Toolbar> : 
        <Toolbar> 
          <Skeleton variant="circular" width={40} height={40} animation="wave" /> 
          <Container>
          <ListItemText 
              primary={<Skeleton/>} 
              secondary={<Skeleton/>}/>
          </Container>
        </Toolbar>}
        <div>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={textLorem}
            action={action}
          />
        </div>
      </AppBar>
    
  )
}
