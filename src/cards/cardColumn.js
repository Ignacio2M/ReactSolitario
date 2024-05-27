import React from "react";
import { useState } from 'react'
import Card from "./card";
import FlipCardSet from "./fipCardsSet";
import { useDrop } from 'react-dnd';

const { forwardRef, useRef, useImperativeHandle, useEffect } = React;
const _ = require('lodash');

const ColumCard = ({ listCards, column, moveCard }) => {
    const [, drop] = useDrop({
        accept: 'CARD',
        drop: (item) => {
            if (item.fromColumn.index !== column.index || 
                item.fromColumn.type !== column.type) {
                moveCard(item.fromColumn, column, item.card);
            }
        }
    });


    return (
        <div ref={drop} className='parent'>
            <h2>{`${column.type}_${column.index}`}</h2>
            {listCards.map(card => {
                // console.log(card)
                return (
                    <Card
                        key={card.id + card.revelate}
                        card={card}
                        fromColumn={column}
                        />)
            })}
        </div>
    );

};
export default ColumCard;