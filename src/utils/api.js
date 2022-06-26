// get profile data
const signin = (token) => {
    fetch("http://localhost:3001/signin", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data && data.id) {
                getProfile(data, token);
            }
        })
        .catch((err) => console.log(err));
};

// get user data
const getUser = (data, token) => {
    // console.log("success we need to get user profile");
    fetch(`http://localhost:3001/profile/${data.id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    })
        .then((response) => response.json())
        .then((user) => {
            if (user && user.id) {
                this.loadUser(user);
                this.onRouteChange("home");
            }
        });
};

// get emoji
fetch(
    `https://dlrr0m1pxj.execute-api.us-east-1.amazonaws.com/rank?rank=${entries}`
)
    .then((res) => res.json())
    .then((data) => {
        setEmoji(data.emoji);
    })
    .catch((err) => console.log(err));

// post => get user
fetch("http://localhost:3001/register", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
    }),
})
    .then((response) => response.json())
    .then((user) => {
        if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange("home");
        }
    });

// sign in with body
fetch("http://localhost:3001/signin", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
    }),
})
    .then((response) => response.json())
    .then((data) => {
        if (data.userId && data.success) {
            this.saveAuthTokenInSession(data.token);
            getProfile(data, data.token);
        }
    });

// create user
fetch(`http://localhost:3001/profile/${user.id}`, {
    method: "post",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
        formInput: data,
    }),
})
    .then((res) => {
        if (res.status === 200 || res.status === 304) {
            toggleModal();
            loadUser({ ...user, ...data });
        }
    })
    .catch((err) => console.log(err));

// modify image
fetch("http://localhost:3001/image", {
    method: "put",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        id: user.id,
    }),
})
    .then((response) => response.json())
    .then((count) => {
        setUser((preState) => ({
            ...preState,
            entries: count,
        }));
    })
    .catch(console.log);
