import React, {useState} from "react";

const CardDisplay = (props) => {

    const sliceBoardPositions = (positions) => {
        const output = [];

        for (let i = 0; i < positions.length; i += 4) {
            output[output.length] = positions.slice(i, i + 4);
        }

        return output;
    }

    const changeItem = (itemNumber) => {
        console.log(`item: ${itemNumber}`);
    }

    return (
        <table style={{width: 500}}>
            <thead>
            <tr><th/></tr>
            <tr><th/></tr>
            <tr><th/></tr>
            <tr><th/></tr>
            </thead>
            <tbody>
            {props.positions.map((e,idx) => {
                return (<tr key={idx}>
                    <td style={{backgroundColor: "grey"}} key={idx}>{e.card}</td>
                </tr>)
            })}
            </tbody>
        </table>
    );
}

const Row = (props) => {

    return props.row.map((e, idx) => (<td key={idx}>{e.card}</td>));
}

export default CardDisplay;
