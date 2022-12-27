import { Chip, Toolbar, Box, Tab, Tabs, Stack } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

import BizList from './shop/BizList';
import CarList from './shop/CarList';
import HouseList from './shop/HouseList';

import BoltIcon from '@mui/icons-material/Bolt';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { pink } from '@mui/material/colors';

function Property() {
    const dispatch = useDispatch()
    
    const user = useSelector((state) => state.user.user)
    const bizs = useSelector((state) => state.bizs.bizs)
    const myBizs = bizs.filter(({_id}) => user.bizs.includes(_id))
    const bizTime = myBizs.map(item => item.requiredTime).reduce((prev, curr) => prev + curr, 0)

    const [value, setValue] = React.useState('one');
    const [ workTime, setWorkTime ] = React.useState(8);

    React.useEffect(()=>{if(user.prof == ''){setWorkTime(0)}},[user])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handlePlusEnergy = () => {
        console.log("plus energizer")
    }

    return (
        <Box sx={{ width: '100%' }} >
            <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            >
                <Tab value="one" label="Бизнес" />
                <Tab value="two" label="Транспорт" />
                <Tab value="three" label="Недвижимость" />
            </Tabs>
            
            {value === 'one'&&<BizList/>}
            {value === 'two'&&<CarList/>}
            {value === 'three'&&<HouseList/>}
            <Toolbar/>
        </Box>
    )
}

export default Property