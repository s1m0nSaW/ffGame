import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import houseSlice from "./slices/housesSlice";
import carsSlice from "./slices/carsSlice";
import bizsSlice from "./slices/bizsSlice";

export const store = configureStore({
    reducer:{
        user: userSlice,
        houses: houseSlice,
        cars: carsSlice,
        bizs: bizsSlice,
    }
}) 