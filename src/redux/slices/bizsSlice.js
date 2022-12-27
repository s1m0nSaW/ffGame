import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

const initialState = {
    bizs: [],
}

export const getBizs = createAsyncThunk('bizs/getBizs', async ( _, { rejectWithValue, dispatch }) => {
    const res = await axios.get('/bizs')
    dispatch(setBizs((res).data))
})

export const bizSlice = createSlice({
    name: 'bizs',
    initialState,
    reducers: {
        setBizs: ( state, action ) => {
            state.bizs = action.payload
        },
    },
    extraReducers: {
        [getBizs.fulfilled] : () => console.log('bizs получены'),
        [getBizs.pending] : () => console.log('запрос bizs'),
        [getBizs.rejected] : () => console.log('ошибка bizs'),
    }
})

export const { setBizs } = bizSlice.actions

export default bizSlice.reducer