import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    route: "signin",
};

export const routeSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        changeRoute: (state, action) => {
            state.route = action.payload;
        },
    },
});

export const { changeRoute } = routeSlice.actions;

export const routeReducer = routeSlice.reducer;
