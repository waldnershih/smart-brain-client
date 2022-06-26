import React, { useState } from "react";
import "./Profile.css";

const Profile = ({ loadUser, toggleModal, user }) => {
    const { name, age, pet } = user;
    const [userState, setUserState] = useState({ name, age, pet });
    const [image, setImage] = useState(null);
    const [warningLabel, setWarningLabel] = useState({
        name: false,
        age: false,
    });

    const handleFormChange = (e) => {
        switch (e.target.name) {
            case "user-name":
                return setUserState((preState) => ({
                    ...preState,
                    name: e.target.value,
                }));
            case "user-age":
                return setUserState((preState) => ({
                    ...preState,
                    age: e.target.value,
                }));
            case "user-pet":
                return setUserState((preState) => ({
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

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    };

    const handleImageChange = (e) => {
        console.log("image clicked");

        getBase64(e.target.files[0], (result) => {
            if (result) {
                setImage(result);
                console.log(result);
            }
        });
    };

    const handleProfileSave = (data) => {
        data.age = data.age ? parseInt(data.age) : 0;
        handleWarningLabel(data);

        if (data.name && data.age > 0) {
            const token = window.sessionStorage.getItem("token");
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
        }
    };

    return (
        <div className="profile-modal">
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <main className="pa4 black-80 w-80">
                    <div className="image-wrapper">
                        <div
                            className="image"
                            // style={{ backgroundImage: image }}
                        />
                        {/* <input
                            type="file"
                            onChange={handleImageChange}
                            accept=".jpeg,.png,.jpg"
                        /> */}
                    </div>
                    <h1>{userState.name ? userState.name : name}</h1>
                    <h4>{`Image Submitted: ${user.entries}`} </h4>
                    <p>{`Member since: ${new Date(
                        user.joined
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
                        value={userState.name}
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
                        value={userState.age}
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
                        value={userState.pet}
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
                            onClick={() => handleProfileSave(userState)}
                        >
                            Save
                        </button>
                        <button
                            className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                            onClick={toggleModal}
                        >
                            Cancel
                        </button>
                    </div>
                </main>
                <div className="modal-close-btn" onClick={toggleModal}>
                    &times;
                </div>
            </article>
        </div>
    );
};

export default Profile;
