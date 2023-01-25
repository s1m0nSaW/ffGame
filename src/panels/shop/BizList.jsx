import React from 'react'
import { useSelector } from 'react-redux';
import { List, Stack, Toolbar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import BizLot from '../../components/BizLot';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

function BizList() {
    const user = useSelector((state) => state.user.user)
	const bizs = useSelector((state) => state.bizs.bizs)
    const c = new Set(user.bizs)
	const avBizs = bizs.filter(({_id}) => !c.has(_id))
    return (
        <>
        {avBizs.length >= 1 ? <List>
            {avBizs.map((biz, index) => (<BizLot
            key={index}
            biz={biz}/>
            ))}
        </List> : 
        <Stack direction="column"
        justifyContent="space-evenly"
        alignItems="center">
        <Toolbar/>
        <BusinessCenterIcon sx={{ fontSize: 40, color: grey[500] }} />
        <Typography  sx={{ color: grey[700] }} variant="subtitle1">Нет доступного бизнеса</Typography>
        <Typography  sx={{ color: grey[700] }} variant="caption">Вы скупили всё</Typography>
        </Stack>}
        </>
    )
}

export default BizList