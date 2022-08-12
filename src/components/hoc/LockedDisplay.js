import React from "react";

const LockedDisplay = (props) => {
    return (
        <table style={{width: 500}}>
            <thead>
            <tr><th/></tr>
            <tr><th/></tr>
            <tr><th/></tr>
            <tr><th/></tr>
            </thead>
            <tbody>
            {props.playingPositions.map((e,idx) => {
                if (e.style) {
                    return (<tr key={idx}>
                        <td style={{backgroundColor: "green"}} key={idx}>{e.card}</td>
                    </tr>)
                } else {
                    return (<tr key={idx}>
                        <td style={{backgroundColor: "grey"}} key={idx}>{e.card}</td>
                    </tr>)
                }
            })}
            </tbody>
        </table>
    );
}

export default LockedDisplay;
