import React, { useState, useEffect } from "react";

const Rank = ({ name, entries }) => {
    const [emoji, setEmoji] = useState("");

    useEffect(() => {
        generateEmoji(entries);
    }, [entries]);

    const generateEmoji = (entries) => {
        fetch(
            `https://dlrr0m1pxj.execute-api.us-east-1.amazonaws.com/rank?rank=${entries}`
        )
            .then((res) => res.json())
            .then((data) => {
                setEmoji(data.emoji);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className="white f3">
                {`${name}, your current entry count is...`}
            </div>
            <div className="white f1">{entries}</div>
            <div className="white f3">{`Rank Badge: ${emoji}`}</div>
        </div>
    );
};

export default Rank;
