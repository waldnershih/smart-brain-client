import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleProfileModal } from "../../store/slice/modalSlice";
import { updateProfile } from "../../store/slice/profileSlice";
import "./Profile.css";

const Profile = () => {
    const dispatch = useDispatch();
    const { profile, error } = useSelector((state) => state.profile);
    const { name, age, pet } = profile;
    const [userProfile, setUserProfile] = useState({ name, age, pet });
    const [warningLabel, setWarningLabel] = useState({
        name: false,
        age: false,
    });

    const handleFormChange = (e) => {
        switch (e.target.name) {
            case "user-name":
                return setUserProfile((preState) => ({
                    ...preState,
                    name: e.target.value,
                }));
            case "user-age":
                return setUserProfile((preState) => ({
                    ...preState,
                    age: e.target.value,
                }));
            case "user-pet":
                return setUserProfile((preState) => ({
                    ...preState,
                    pet: e.target.value,
                }));
            default:
                return;
        }
    };

    const handleWarningLabel = (data) => {
        const { name, age } = data;
        setWarningLabel({
            name: name === "",
            age: age <= 0,
        });
    };

    const handleProfileSave = async (data) => {
        data.age = data.age ? parseInt(data.age) : 0;
        handleWarningLabel(data);

        if (data.name && data.age > 0) {
            const token = window.sessionStorage.getItem("token");

            await dispatch(
                updateProfile({
                    id: profile.id,
                    data: {
                        formInput: data,
                    },
                    token,
                })
            );

            if (!error) {
                dispatch(toggleProfileModal());
            }
        }
    };

    return (
        <div className="profile-modal">
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <main className="pa4 black-80 w-80">
                    <div className="image-wrapper">
                        <div className="image" />
                    </div>
                    <h1>{userProfile.name ? userProfile.name : name}</h1>
                    <h4>{`Image Submitted: ${profile.entries}`} </h4>
                    <p>{`Member since: ${new Date(
                        profile.joined
                    ).toLocaleDateString()}`}</p>
                    <hr />
                    <label className="mt2 fw6" htmlFor="user-name">
                        Name:
                    </label>
                    <input
                        name="user-name"
                        id="name"
                        className="pa2 ba w-100"
                        type="text"
                        placeholder={name}
                        value={userProfile.name}
                        onChange={handleFormChange}
                    />
                    {warningLabel.name ? (
                        <div className="warning-label">
                            Name field must not be empty
                        </div>
                    ) : null}
                    <label className="mt2 fw6" htmlFor="user-age">
                        Age:
                    </label>
                    <input
                        onChange={handleFormChange}
                        className="pa2 ba w-100"
                        type="number"
                        min="1"
                        placeholder={age}
                        value={userProfile.age}
                        name="user-age"
                        id="age"
                    />
                    {warningLabel.age ? (
                        <div className="warning-label">
                            Age field must not be empty and must be greater than
                            0
                        </div>
                    ) : null}
                    <label className="mt2 fw6" htmlFor="user-pet">
                        Pet:
                    </label>
                    <input
                        onChange={handleFormChange}
                        className="pa2 ba w-100"
                        placeholder={pet}
                        value={userProfile.pet}
                        type="text"
                        name="user-pet"
                        id="pet"
                    />
                    {warningLabel.pet ? (
                        <div className="warning-label">
                            Pet field must not be empty
                        </div>
                    ) : null}
                    <div
                        className="mt4"
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            width: "100%",
                        }}
                    >
                        <button
                            className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                            onClick={() => handleProfileSave(userProfile)}
                        >
                            Save
                        </button>
                        <button
                            className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                            onClick={() => dispatch(toggleProfileModal())}
                        >
                            Cancel
                        </button>
                    </div>
                </main>
                <div
                    className="modal-close-btn"
                    onClick={() => dispatch(toggleProfileModal())}
                >
                    &times;
                </div>
            </article>
        </div>
    );
};

export default Profile;
