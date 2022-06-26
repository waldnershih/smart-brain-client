import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";
import { useDispatch } from "react-redux";
import { changeRoute } from "../../store/slice/routeSlice";

const Navigation = ({ isSignedIn }) => {
    const dispatch = useDispatch();

    if (isSignedIn) {
        return (
            <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                <ProfileIcon />
            </nav>
        );
    } else {
        return (
            <nav style={{ display: "flex", justifyContent: "flex-end" }}>
                <p
                    onClick={() => dispatch(changeRoute("signin"))}
                    className="f3 link dim black underline pa3 pointer"
                >
                    Sign In
                </p>
                <p
                    onClick={() => dispatch(changeRoute("register"))}
                    className="f3 link dim black underline pa3 pointer"
                >
                    Register
                </p>
            </nav>
        );
    }
};

export default Navigation;
