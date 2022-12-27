import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

const initialState = {
    cars: [],
}

export const getCars = createAsyncThunk('cars/getCars', async ( _, { rejectWithValue, dispatch }) => {
    const res = await axios.get('/cars')
    dispatch(setCars((res).data))
})

export const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        setCars: ( state, action ) => {
            state.cars = action.payload
        },
    },
    extraReducers: {
        [getCars.fulfilled] : () => console.log('cars получены'),
        [getCars.pending] : () => console.log('запрос cars'),
        [getCars.rejected] : () => console.log('ошибка cars'),
    }
})

export const { setCars } = carSlice.actions

export default carSlice.reducer