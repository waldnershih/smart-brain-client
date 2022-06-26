import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isProfileOpen: false,
};

export const modalSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        openProfileModal: (state) => {
            state.isProfileOpen = true;
        },
        closeProfileModal: (state) => {
            state.isProfileOpen = false;
        },
        toggleProfileModal: (state) => {
            state.isProfileOpen = state.isProfileOpen ? false : true;
        },
    },
});

export const { openProfileModal, closeProfileModal, toggleProfileModal } =
    modalSlice.actions;

export const modalReducer = modalSlice.reducer;
