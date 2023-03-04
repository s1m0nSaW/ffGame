import { Toolbar, Box, Typography, Stack } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function Record() {
  const user = useSelector((state) => state.user.user)

  return (
    <Box sx={{ width: '100%' }} >
      <Stack direction={'column'} sx={{ width: '100%' }}>
        <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
          <Typography variant='caption'>Деятельность:</Typography>
          <Typography variant='caption'><b> {user.record.prof}</b></Typography>
        </Stack>
        <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
          <Typography variant='caption'>Пассивный доход:</Typography>
          <Typography variant='caption'><b> {user.record.cashflow} К</b></Typography>
        </Stack>
        <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
          <Typography variant='caption'>Количество предприятий:</Typography>
          <Typography variant='caption'><b> {user.record.bizCount}</b></Typography>
        </Stack>
        <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
          <Typography variant='caption'>Сумма вложений:</Typography>
          <Typography variant='caption'><b> {user.record.deposit} К</b></Typography>
        </Stack>
        <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
          <Typography variant='caption'>Недвижимость в аренде:</Typography>
          <Typography variant='caption'><b> {user.record.rentCount}</b></Typography>
        </Stack>
        <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
          <Typography variant='caption'>Стоимость недвижимости:</Typography>
          <Typography variant='caption'><b> {user.record.houseSumm} К</b></Typography>
        </Stack>
        <Stack justifyContent="space-between" alignItems="flex-start" direction={'row'}>
          <Typography variant='caption'>Стоимость транспорта:</Typography>
          <Typography variant='caption'><b> {user.record.carSum} К</b></Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Record