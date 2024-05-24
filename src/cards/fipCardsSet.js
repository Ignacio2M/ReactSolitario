import React from "react";
import { useState } from 'react'
import Card from "./card";
const _ = require('lodash');
const { forwardRef, useRef, useImperativeHandle, useEffect } = React;



const FlipCardSet = forwardRef(({ listCards }, ref) => {

    const [grupCard, setGrupCard] = useState(listCards)

    const cards = grupCard.map((card) => 
    <Card row={card.row}
        column={card.colum}
        revelate={card.revelate}
        canMove={card.canMove}
        cardId={card.id} />)


    const handleDragStart = (e) => {
        e.dataTransfer.clearData();
        // const cardsInfo = _.map(grupCard, (card) => {return card.id})
        // console.log(cardsInfo)
        e.dataTransfer.setData('tepy', "relevateColums");
        e.dataTransfer.setData('cardsInfo', JSON.stringify(grupCard));
    };

//       useImperativeHandle(ref, () => {
//     return {
//       // ... tus métodos ...
//     };
//   }, []);

    useImperativeHandle(ref, () => ({
        updateCards(newCards) { setGrupCard(newCards) }
    }));

    return (
        <div
            draggable="true"
            onDragStart={handleDragStart}
            style={{ backgroundColor: 'green' }}>
            {cards}

        </div>
    );



})
export default FlipCardSet;