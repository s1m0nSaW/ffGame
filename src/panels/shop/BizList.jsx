import React from 'react'
import { useSelector } from 'react-redux';
import { List } from '@mui/material';
import BizLot from '../../components/BizLot';

function BizList() {
    const user = useSelector((state) => state.user.user)
	const bizs = useSelector((state) => state.bizs.bizs)
    const c = new Set(user.bizs)
	const avBizs = bizs.filter(({_id}) => !c.has(_id))
    return (
        
        <List>
            {avBizs.map((biz, index) => (<BizLot
            key={index}
            biz={biz}/>
            ))}
        </List>
    )
}

export default BizList