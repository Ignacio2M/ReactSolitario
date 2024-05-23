import React from "react";
import { useState } from 'react'
import Card from "./card";
const { forwardRef, useRef, useImperativeHandle } = React;


const ColumCard = ({ listCards }) => {

    const [grupCard, setGrupCard] = useState(listCards)
    const childRef = useRef();

    const removeCard = ({type, number}) => {
        const new_grup = grupCard.filter(function(item) {
            return item.type !== type || item.number !== number
        })
        console.log(new_grup)
        setGrupCard(new_grup)
    }

    const AAAA = (a, b) => {
        const cardRemove = {type:a, number:b}
        console.log(cards)
        // removeCard(cardRemove)
    }

    const cards = grupCard.map((card) => <Card indxType={card.type} indxNumber={card.number} ref={childRef} handleDragStart_parent={AAAA}/>)
    
    


    const handleDragOver = (e) => {
        e.preventDefault();

    };

    const handleDrop = (e) => {
        e.preventDefault();
        console.log({type:e.dataTransfer.getData('indxType'),
        number:e.dataTransfer.getData('indxNumber')})
        setGrupCard([...grupCard, {type:e.dataTransfer.getData('indxType'),
        number:e.dataTransfer.getData('indxNumber')}])
    };


    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ backgroundColor: 'gray' }}>
            <div>{cards}</div>
            {/* <button onClick={() => childRef.current.flipCard()}>Click</button> */}
        </div>
    );



}
export default ColumCard;