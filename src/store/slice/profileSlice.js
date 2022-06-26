import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi, putApi } from "../../apis";

const initialState = {
    profile: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
        age: "",
        pet: "",
    },
    loading: false,
    error: "",
    isEdit: false,
};

export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async ({ id, token }) => {
        try {
            return await fetchApi(`profile/${id}`, token);
        } catch (error) {
            throw error;
        }
    }
);

export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async ({ id, profile, token }) => {
        try {
            await putApi(`profile/${id}`, profile, token);
            return profile;
        } catch (error) {
            throw error;
        }
    }
);

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        initialiseProfile: (state) => {
            state.profile = initialState.profile;
        },
        updateEntries: (state, action) => {
            state.profile = { ...state.profile, entries: action.payload };
        },
    },
    extraReducers: {
        // fetchProfile
        [fetchProfile.pending]: (state, _) => {
            state.loading = true;
        },
        [fetchProfile.fulfilled]: (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        },
        [fetchProfile.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },

        // updateProfile
        [updateProfile.pending]: (state, _) => {
            state.loading = true;
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.loading = false;
            state.profile = { ...state.profile, ...action.payload };
        },
        [updateProfile.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
    },
});

export const { initialiseProfile, updateEntries } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
