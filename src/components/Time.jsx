import React from 'react'
import { useSelector } from 'react-redux';

import { Typography, Grid, LinearProgress, Card, CardContent } from '@mui/material';

import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';

function Time() {
    const [ workTime, setWorkTime ] = React.useState(8);
    
    const bizs = useSelector((state) => state.bizs.bizs)
    const user = useSelector((state) => state.user.user)

    const myBizs = bizs.filter(({_id}) => user.bizs.includes(_id))
    const bizTime = myBizs.map(item => item.requiredTime).reduce((prev, curr) => prev + curr, 0)

    React.useEffect(()=>{
        if(user.prof == ''){setWorkTime(0)}
    },[user.prof])

    const enValue = ((bizTime + workTime) * 100) / user.time
    

    return (
        <Card sx={{ margin:'10px' }}>
            <CardContent><Grid container>
                <QueryBuilderOutlinedIcon fontSize="small" />&nbsp; 
                <Typography>Свободное время: {user.time - (bizTime + workTime)}/{user.time}</Typography></Grid>
                <LinearProgress variant="determinate" value={enValue} />
            </CardContent>
        </Card>
    )
}

export default Time