import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeProfileModal } from "./store/slice/modalSlice";
import { changeRoute } from "./store/slice/routeSlice";
import {
    initialiseProfile,
    fetchProfile,
    updateEntries,
} from "./store/slice/profileSlice";

import Particles from "react-particles-js";
import {
    FaceRecognition,
    Navigation,
    Signin,
    Register,
    Logo,
    ImageLinkForm,
    Rank,
    Modal,
    Profile,
} from "./components";
import "./App.css";

const particlesOptions = {
    //customize this to your liking
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800,
            },
        },
    },
};

const App = () => {
    const { isProfileOpen } = useSelector((state) => state.modal);
    const { route } = useSelector((state) => state.route);
    const { profile } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const [input, setInput] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [boxes, setBoxes] = useState([]);

    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const token = window.sessionStorage.getItem("token");
        if (token) {
            fetch("http://localhost:3001/signin", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            })
                .then((response) => response.json())
                .then(async (data) => {
                    if (data && data.id) {
                        await dispatch(fetchProfile({ id: data.id, token }));

                        onRouteChange("home");
                    }
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const calculateFaceLocations = (data) => {
        if (data && data.outputs) {
            const faceLocations = data.outputs[0].data.regions.map((region) => {
                const clarifaiFace = region.region_info.bounding_box;
                const image = document.getElementById("inputimage");
                const width = Number(image.width);
                const height = Number(image.height);
                return {
                    leftCol: clarifaiFace.left_col * width,
                    topRow: clarifaiFace.top_row * height,
                    rightCol: width - clarifaiFace.right_col * width,
                    bottomRow: height - clarifaiFace.bottom_row * height,
                };
            });
            return faceLocations;
        }
        return;
    };

    const displayFaceBoxes = (boxes) => {
        if (boxes) {
            setBoxes(boxes);
        } else {
            setBoxes([]);
        }
    };

    const onInputChange = (event) => {
        setInput(event.target.value);
    };

    const onButtonSubmit = () => {
        const token = window.sessionStorage.getItem("token");
        setImageUrl(input);
        fetch("http://localhost:3001/imageurl", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                input,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response) {
                    fetch("http://localhost:3001/image", {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            id: profile.id,
                        }),
                    })
                        .then((response) => response.json())
                        .then((count) => {
                            dispatch(updateEntries(count));
                        })
                        .catch(console.log);
                }
                displayFaceBoxes(calculateFaceLocations(response));
            })
            .catch((err) => console.log(err));
    };

    const onRouteChange = (route) => {
        if (route === "signout") {
            return initialiseState();
        } else if (route === "home") {
            setIsSignedIn(true);
        }
        dispatch(changeRoute(route));
    };

    const initialiseState = () => {
        setInput("");
        setImageUrl("");
        setBoxes([]);
        dispatch(changeRoute("signin"));
        setIsSignedIn(false);
        dispatch(closeProfileModal());
        dispatch(initialiseProfile());
    };

    return (
        <div className="App">
            <Particles className="particles" params={particlesOptions} />
            <Navigation isSignedIn={isSignedIn} />
            {isProfileOpen && (
                <Modal>
                    <Profile />
                </Modal>
            )}
            {route === "home" ? (
                <div>
                    <Logo />
                    <Rank />
                    <ImageLinkForm
                        onInputChange={onInputChange}
                        onButtonSubmit={onButtonSubmit}
                    />
                    <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
                </div>
            ) : route === "signin" ? (
                <Signin />
            ) : (
                <Register />
            )}
        </div>
    );
};

export default App;
