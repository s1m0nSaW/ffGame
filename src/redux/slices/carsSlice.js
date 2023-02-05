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
})

export const { setCars } = carSlice.actions

export default carSlice.reducer