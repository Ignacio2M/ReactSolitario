import React from "react";
import Card from "./card";
import { useDrop } from 'react-dnd';

const _ = require('lodash');

const DiscarSet = ({column, cardsList, moveCard}) => {
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
        <div ref={drop} className="discarArea">
            {_.size(cardsList)>0? <Card key={_.last(cardsList).id} card={_.last(cardsList)} fromColumn={column} />: <></>}
        </div>
    );

};

export default DiscarSet