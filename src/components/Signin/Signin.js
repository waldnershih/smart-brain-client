import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeRoute } from "../../store/slice/routeSlice";
import { fetchProfile } from "../../store/slice/profileSlice";

import "./Signin.css";

const Signin = () => {
    // const profile = useSelector((state) => state.profile.profile);
    const dispatch = useDispatch();

    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    const onEmailChange = (event) => {
        setSignInEmail(event.target.value);
    };

    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value);
    };

    const saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem("token", token);
    };

    const onSubmitSignIn = () => {
        fetch("http://localhost:3001/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            }),
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.userId && data.success) {
                    await dispatch(
                        fetchProfile({ id: data.userId, token: data.token })
                    );
                    saveAuthTokenInSession(data.token);
                    dispatch(changeRoute("home"));
                }
            });
    };

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset
                        id="sign_up"
                        className="ba b--transparent ph0 mh0"
                    >
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label
                                className="db fw6 lh-copy f6"
                                htmlFor="email-address"
                            >
                                Email
                            </label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label
                                className="db fw6 lh-copy f6"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                                type="password"
                                name="password"
                                id="password"
                                onChange={onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p
                            onClick={() => dispatch(changeRoute("register"))}
                            className="f6 link dim black db pointer"
                        >
                            Register
                        </p>
                    </div>
                </div>
            </main>
        </article>
    );
};

export default Signin;
