import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

const initialState = {
    houses: [],
}

export const getHouses = createAsyncThunk('houses/getHouses', async ( _, { rejectWithValue, dispatch }) => {
    const res = await axios.get('/houses')
    dispatch(setHouses((res).data))
})

export const houseSlice = createSlice({
    name: 'houses',
    initialState,
    reducers: {
        setHouses: ( state, action ) => {
            state.houses = action.payload
        },
    },
})

export const { setHouses } = houseSlice.actions

export default houseSlice.reducer