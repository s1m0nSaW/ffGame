import { Button, Card, CardActions, CardContent, Typography, Backdrop, 
  Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import React from 'react'
import axios from '../axios.js'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setUser } from '../redux/slices/userSlice.js';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Register({ fetchedUser }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profs = useSelector((state) => state.user.profs)
  const user = useSelector((state) => state.user.user)
  const [ open, setOpen ] = React.useState(false)

  const handleClose = () => {
    setOpen(false);
    navigate('/main/main')
  };

  const getProf = async () => {

    const len = profs.length;
    const i = Math.floor(Math.random() * len);

    const fields = {
        firstName : fetchedUser.first_name,
        prof: profs[i].profName,
        salary: profs[i].salary,
        userId: fetchedUser.id,
        age: profs[i].age,
        children: profs[i].childCount,
        house: profs[i].house,
        car: profs[i].car,
        expenses: profs[i].expenses,
        onGame: true,
      }

    await axios.post(`/auth/register`, fields).then((data)=>{
      dispatch(setUser(data.data.user));
      console.log(data.data.user)
    });

    setOpen(true)
    
}

  return (
    <Backdrop
        sx={{ color: '#fff' }}
        open={true}
      >
    <Card sx={{ minWidth: 275, margin:'15px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Описание игры
        </Typography>
        <Typography variant="h6" component="div">
          Привет, {fetchedUser.first_name}
        </Typography>
        <Typography variant="body2">
            "Финансовая свобода" - экономический кликер.<br/><br/>
            Цель игры - достижение финансовой свободы, для этого нужно чтобы ваш пассивный доход был больше расходов.<br/><br/>
            
            Для начала получаете случайную профессию и исходные данные, далее покупая бизнес увеличивайте свой капитал.<br/><br/>
        </Typography>
        <Grid container>
        <Grid>
          <Typography variant="body2">Подробная информация - </Typography>
        </Grid>
        <Grid>
          <InfoOutlinedIcon  sx={{ fontSize: 20 }} color="primary"/>
        </Grid>
        </Grid>
        
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>getProf()}>Начать</Button>
      </CardActions>
    </Card>
    <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {`Вы получили профессию ${user.prof}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ваша зарплата {user.salary} К, 
                Вам {user.age}, количество детей: {user.children}.<br/><br/> <b>Удачной игры!</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  )
}

export default Register

//Пассивным доходом в игре считаются дивидендные акции и бизнес под управлением менеджера.<br/><br/>