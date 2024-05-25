import React from "react";
import { useState } from 'react'
import Card from "./card";
import FlipCardSet from "./fipCardsSet";
import { useDrop } from 'react-dnd';

const { forwardRef, useRef, useImperativeHandle, useEffect } = React;
const _ = require('lodash');

const ColumCard = ({ listCards, id, moveCard }) => {
    const [, drop] = useDrop({
        accept: 'CARD',
        drop: (item) => {
            if (item.fromColumn !== id) {
                moveCard(item.fromColumn, id, item.card);
            }
        }
    });


    return (
        <div ref={drop} className='parent'>
            <h2>{id}</h2>
            {listCards.map(card =>{
                // console.log(card)
                return (<Card key={card.id+card.revelate} card={card} fromColumn={id} />)
            })}
        </div>
    );

};
export default ColumCard;