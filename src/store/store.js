import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./slice/modalSlice";
import { routeReducer } from "./slice/routeSlice";
// import { userReducer } from "./slice/userSlice";
import { profileReducer } from "./slice/profileSlice";

const store = configureStore({
    reducer: {
        modal: modalReducer,
        route: routeReducer,
        profile: profileReducer,
        // user: userReducer,
    },
});

export default store;
