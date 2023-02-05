import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

const initialState = {
    user: {},
    users: [],
    friends: [],
    profs: [],
    debts: false,
    greetings: false,
    theme: 'auto',
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
        setProfs: ( state, action ) => {
            state.profs = action.payload
        },
        setDebts: ( state, action ) => {
            state.debts = action.payload
        },
        setGreetings: ( state, action ) => {
            state.greetings = action.payload
        },
        setTheme: ( state, action ) => {
            state.theme = action.payload
        },
    },
});

export const { setUser, setUsers, setFriends, setDebts, setGreetings, setProfs, setTheme } = userSlice.actions;

export default userSlice.reducer;