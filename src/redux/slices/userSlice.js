import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

const initialState = {
    user: {},
    users: [],
    friends: [],
    profs: [],
    status: '',
};

export const getUsers = createAsyncThunk('users/getUsers', async ( _, { rejectWithValue, dispatch }) => {
    const res = await axios.get('/auth/users')
    dispatch(setUsers((res).data))
})

export const getProfs = createAsyncThunk('users/getProfs', async ( _, { rejectWithValue, dispatch }) => {
    const res = await axios.get('/profs')
    dispatch(setProfs((res).data))
})


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: ( state, action ) => {
            state.user = action.payload
        },
        setUsers: ( state, action ) => {
            state.users = action.payload
        },
        setFriends: ( state, action ) => {
            state.friends = action.payload
        },
        setStatus: ( state, action ) => {
            state.status = action.payload
        },
        setProfs: ( state, action ) => {
            state.profs = action.payload
        },
    },
    extraReducers: {
        [getUsers.fulfilled] : () => {
            console.log('users получены')
        },
        [getUsers.pending] : () => {
            console.log('запрос users')
        },
        [getUsers.rejected] : () => {
            console.log('ошибка users')
        },
        [getProfs.fulfilled] : () => {
            console.log('profs получены')
        },
        [getProfs.pending] : () => {
            console.log('запрос profs')
        },
        [getProfs.rejected] : () => {
            console.log('ошибка profs')
        },
    },
});

export const { setUser, setUsers, setFriends, setStatus, setProfs } = userSlice.actions;

export default userSlice.reducer;