import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = ({ isProfileOpen, loadUser, toggleModal, user }) => {
	const { name, age, pet } = user;
	const [userState, setUserState] = useState({});

	useEffect(() => {
		setUserState({
			name,
			age,
			pet,
		});
	}, []);

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

	const handleProfileSave = (data) => {
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
	};

	return (
		<div className="profile-modal">
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
				<main className="pa4 black-80 w-80">
					<img
						src="http://tachyons.io/img/logo.jpg"
						className="h3 w3 dib"
						alt="avatar"
					/>
					<h1>{userState.name}</h1>
					<h4>{`Image Submitted: ${user.entries}`} </h4>
					<p>{`Member since: ${new Date(
						user.joined
					).toLocaleDateString()}`}</p>
					<hr />
					<label className="mt2 fw6" htmlFor="user-name">
						Name:
					</label>
					<input
						onChange={handleFormChange}
						className="pa2 ba w-100"
						placeholder={user.name}
						type="text"
						name="user-name"
						id="name"
					/>
					<label className="mt2 fw6" htmlFor="user-age">
						Age:
					</label>
					<input
						onChange={handleFormChange}
						className="pa2 ba w-100"
						placeholder={user.age}
						type="text"
						name="user-age"
						id="age"
					/>
					<label className="mt2 fw6" htmlFor="user-pet">
						Pet:
					</label>
					<input
						onChange={handleFormChange}
						className="pa2 ba w-100"
						placeholder={user.pet}
						type="text"
						name="user-pet"
						id="pet"
					/>
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
