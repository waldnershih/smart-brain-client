import React, { useState } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

const ProfileIcon = ({ onRouteChange, toggleModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const handleSignout = () => {
        onRouteChange("signout");
        window.sessionStorage.clear();
    };

    return (
        <div className="pa4 tc">
            <Dropdown toggle={toggle} isOpen={isOpen}>
                <DropdownToggle
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={isOpen}
                >
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="br-100 ba h3 w3 dib"
                        alt="avatar"
                    />
                </DropdownToggle>
                <DropdownMenu
                    className="b--transparent shadow-5"
                    end
                    style={{
                        marginTop: "20px",
                        backgroundColor: "rgba(255,255,255,0.5)",
                    }}
                >
                    <DropdownItem onClick={toggleModal}>
                        View Profile
                    </DropdownItem>
                    <DropdownItem onClick={handleSignout}>Signout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default ProfileIcon;
